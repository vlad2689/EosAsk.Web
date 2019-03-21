import * as React from "react";
import {Button} from "reactstrap";
import {isUserSignedIn, LOGIN_URL} from "../../api/LoginClient";

class RequireSignIn extends React.Component<any, any> {
    constructor(props) {
        super(props);
        
        this.state = {
            isSignedIn: isUserSignedIn()
        }
    }
    
    render() {
        if (this.state.isSignedIn == true) {
            return (
                <div>
                    {this.props.children}
                </div>
            )
        }
        else {
            return (
                <RequireSignInScreen/>
            )
        }
    }
}

class RequireSignInScreen extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleLoginClick = this.handleLoginClick.bind(this);
    }
    
    handleLoginClick() {
        window.location.href = LOGIN_URL;
    }
    
    render() {
        return (
            <div>
                A login is required
                <Button color="danger" onClick={this.handleLoginClick()}>Login or Register</Button>
            </div>
        )
    }
}

export default RequireSignIn;