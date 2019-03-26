import * as React from "react";
import {Button, Row, Col} from "reactstrap";
import {isUserSignedIn, LOGIN_URL, setPostSignInRedirectUrl} from "../../api/SignInClient";

interface Props {
    reasonToSignIn: string
}

class RequireSignIn extends React.Component<Props, any> {
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
                <PromptSignIn reasonToSignIn={this.props.reasonToSignIn}/>
            )
        }
    }
}

class PromptSignIn extends React.Component<Props, any> {
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
                    <h5>
                        {this.props.reasonToSignIn}
                    </h5>
                    <Button color="primary" className="mt-4 btn-block" onClick={this.handleLoginClick}>
                        Login or Register
                    </Button>
                </Col>
                <Col xs="2"/>
            </Row>
        )
    }
}

export default RequireSignIn;
