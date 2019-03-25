import * as React from "react";
import {
    Container, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Nav, NavLink, UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem, Button
} from "reactstrap";
import {
    getPostSignInRedirectUrlAndRemove,
    getSignedInUser,
    setPostSignInRedirectUrl,
    LOGIN_URL,
    logout
} from "../../api/SignInClient";
import {withRouter} from 'react-router-dom';

import {Link} from "react-router-dom";
import {UserDTO} from "../../api/EosAskApiFetch";

interface State {
    isAccountDropdownOpen: boolean
}

class Layout extends React.Component<any, State> {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isAccountDropdownOpen: false,
        };

        let redirectUrl = getPostSignInRedirectUrlAndRemove();
        if (redirectUrl != null) {
            window.location.href = redirectUrl;
        }
    }

    toggle() {
        this.setState({
            isAccountDropdownOpen: !this.state.isAccountDropdownOpen
        });
    }

    render() {
        return (
            <div className="pb-4">
                <Navbar className="mb-3" color="light" light expand="md">
                    <NavbarBrand href="/">EosAsk</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isAccountDropdownOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink><Link to="/">Home</Link></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink><Link to="/questions">Questions</Link></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink><Link to="/bounties">Bounties</Link></NavLink>
                            </NavItem>
                            <AccountDropdown/>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Container>
                    {this.props.children}
                </Container>
            </div>
        )
    }
}


interface AccountDropdownState {
    userDTO: UserDTO,
}

class AccountDropdown extends React.Component<any, AccountDropdownState> {
    constructor(props) {
        super(props);
        this.onLoginClick = this.onLoginClick.bind(this);
        this.onLogoutClick = this.onLogoutClick.bind(this);

        this.state = {
            userDTO: null
        }
    }

    async componentDidMount() {
        let user = await getSignedInUser();

        this.setState({
            userDTO: user 
        })
    }

    onLoginClick() {
        setPostSignInRedirectUrl();
        window.location.href = LOGIN_URL;
    }

    onLogoutClick() {
        logout();
        this.setState({
            userDTO: null
        })
    }

    render() {
        let dropdownMenu = 
            this.state.userDTO == null ?
            (
                <DropdownMenu right>
                    <DropdownItem onClick={this.onLoginClick}>
                        Login
                    </DropdownItem>
                </DropdownMenu>
            )
            :
            (
                <DropdownMenu right>
                    <DropdownItem onClick={this.onLogoutClick}>
                        Logout
                    </DropdownItem>
                </DropdownMenu>
            );

        return (
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    {this.state.userDTO == null ? 
                        (
                            <span>
                                Account
                            </span>
                        )
                        :
                        (
                            <span>
                                {this.state.userDTO.user.userName}
                            </span>
                        )
                    }
                </DropdownToggle>
                {dropdownMenu}
            </UncontrolledDropdown>
        )
    }
}

export default withRouter(props => <Layout {...props}/>);