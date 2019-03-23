import * as React from "react";
import {Container, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Nav, NavLink, UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import {getPostSignInRedirectUrlAndRemove} from "../../api/SignInClient";
import {withRouter} from 'react-router-dom';

import {Link} from "react-router-dom";

class Layout extends React.Component<any, any> {
     constructor(props) {
         super(props);
         
         this.toggle = this.toggle.bind(this);
         this.state = {
             isOpen: false,
         };

         let redirectUrl = getPostSignInRedirectUrlAndRemove();
         if (redirectUrl != null) {
             window.location.href = redirectUrl;
         }
     }
     
     toggle() {
         this.setState({
             isOpen: !this.state.isOpen
         });
     }

     render() {
         return (
             <div>
                 <Navbar className="mb-3" color="light" light expand="md">
                     <NavbarBrand href="/">EosAsk</NavbarBrand>
                     <NavbarToggler onClick={this.toggle} />
                     <Collapse isOpen={this.state.isOpen} navbar>
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
                             <UncontrolledDropdown nav inNavbar>
                                 <DropdownToggle nav caret>
                                     Options
                                 </DropdownToggle>
                                 <DropdownMenu right>
                                     <DropdownItem>
                                         Option 1
                                     </DropdownItem>
                                     <DropdownItem>
                                         Option 2
                                     </DropdownItem>
                                     <DropdownItem divider />
                                     <DropdownItem>
                                         Reset
                                     </DropdownItem>
                                 </DropdownMenu>
                             </UncontrolledDropdown>
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

export default withRouter(props => <Layout {...props}/>);