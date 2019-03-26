import * as React from 'react'
import {IdentityUser, Question} from "../../../api/EosAskApiFetch";
import {Row, Col, Button} from "reactstrap";
import {createAddAnsAction, getEosioActionLocation} from "components/eosio-client/bounty-actions";
import {Link} from "react-router-dom";
import {isSignedIn} from "../../../api/SignInClient";

interface Props {
    answerId: number;
    text: string;
    question: Question; // can be null if the answer is retrieved from a Question object (to avoid circular reference)
    owner: IdentityUser;
    upvoteCount: number;
    isCreatedOnBlockchain: boolean;
    questionId: number;
    questionOwner: IdentityUser
}

interface State {
    showUpdateBlockchainLink: boolean
}

export default class AnswerView extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            showUpdateBlockchainLink: false
        }
    }

    async componentDidMount() {
        this.setState({
            showUpdateBlockchainLink: !this.props.isCreatedOnBlockchain 
                && this.props.questionOwner.userName != this.props.owner.userName
                && (await isSignedIn(this.props.owner))
        })
    }

    render() {
        let linkToCreateAnswerOnBlockchain = null;

        if (this.state.showUpdateBlockchainLink) {
            let linkLocation = getEosioActionLocation(createAddAnsAction(this.props.questionId, this.props.answerId));

            linkToCreateAnswerOnBlockchain = (
                <div className="mt-5">
                    <Link to={linkLocation}>
                        Update Eos Blockchain
                    </Link>
                    <div>
                        <small className="text-danger">
                            Your answer has not been recorded on the eos blockchain and cannot receive tips or be 
                            awarded bounties until it is.
                        </small>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <Row>
                    <Col xs={2}>
                        <div className="text-center">
                            {this.props.upvoteCount}
                            <div className="text-secondary">
                                Upvotes
                            </div>
                        </div>
                    </Col>
                    <Col xs={10}>
                        <h6>
                            {this.props.text}
                        </h6>
                        {linkToCreateAnswerOnBlockchain}
                    </Col>
                </Row>
                <hr/>
            </div>
        )
    }
}