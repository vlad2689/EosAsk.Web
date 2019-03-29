import * as React from "react";
import {
    Container, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Nav, UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem, Button, Row, Col
} from "reactstrap";
import {
    getPostSignInRedirectUrlAndRemove,
    getSignedInUser,
    setPostSignInRedirectUrl,
    LOGIN_URL,
    logout, setSignedInUser
} from "../../api/SignInClient";
import {withRouter} from 'react-router-dom';

import {Link} from "react-router-dom";
import {UserDTO} from "../../api/EosAskApiFetch";

interface State {
    isAccountDropdownOpen: boolean,
    signedInUser: UserDTO
}

class Layout extends React.Component<any, State> {
    constructor(props) {
        super(props);
        this.onLogoutClick = this.onLogoutClick.bind(this);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isAccountDropdownOpen: false,
            signedInUser: null
        };
    }

    async componentDidMount() {
        let redirectUrl = getPostSignInRedirectUrlAndRemove();
        
        if (redirectUrl != null) {
            await setSignedInUser();
            window.location.href = redirectUrl;
        }

        let signedInUser = getSignedInUser();
        this.setState({
            signedInUser: signedInUser
        });
    }

    toggle() {
        this.setState({
            isAccountDropdownOpen: !this.state.isAccountDropdownOpen
        });
    }
    
    async onLogoutClick() {
        await logout();
        this.setState({
            signedInUser: getSignedInUser()
        });
        location.reload();
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
                                <Link to="/" className="nav-link">Home</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/questions" className="nav-link">Questions</Link>
                            </NavItem>
                            <AccountDropdown signedInUser={this.state.signedInUser} onLogoutClick={this.onLogoutClick}/>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Container>
                    <Row>
                        <Col xs={2}/>
                        <Col xs={8}>
                            {this.props.children}
                        </Col>
                        <Col xs={2}/>
                    </Row>
                </Container>
            </div>
        )
    }
}


interface Props {
    signedInUser: UserDTO;
    onLogoutClick: Function;
}

class AccountDropdown extends React.Component<Props, any> {
    constructor(props) {
        super(props);
        this.onLoginClick = this.onLoginClick.bind(this);
    }

    onLoginClick() {
        setPostSignInRedirectUrl();
        window.location.href = LOGIN_URL;
    }

    render() {
        let dropdownMenu =
            this.props.signedInUser == null ?
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
                        <DropdownItem onClick={this.props.onLogoutClick}>
                            Logout
                        </DropdownItem>
                    </DropdownMenu>
                );

        return (
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    {this.props.signedInUser == null ?
                        (
                            <span>
                                Account
                            </span>
                        )
                        :
                        (
                            <span>
                                {this.props.signedInUser.user.userName}
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