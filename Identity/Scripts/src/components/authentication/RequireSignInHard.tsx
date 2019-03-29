import * as React from "react";
import {Button, Row, Col} from "reactstrap";
import {isUserSignedIn, LOGIN_URL, setPostSignInRedirectUrl} from "../../api/SignInClient";

class RequireSignInHard extends React.Component<any, any> {
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
        setPostSignInRedirectUrl();
        window.location.href = LOGIN_URL;
    }
    
    render() {
        return (
            <Row className="mt-4">
                <Col xs="2"/>
                <Col xs="">
                    <h2 className="text-center">
                        An EosAsk account is required to access this page. Please login or register below.
                    </h2>
                    <Button color="primary" className="mt-4 btn-block" onClick={this.handleLoginClick}>
                        Login or Register
                    </Button>
                </Col>
                <Col xs="2"/>
            </Row>
        )
    }
}

export default RequireSignInHard;