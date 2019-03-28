import * as React from 'react'
import {BountyDTO, IdentityUser, Question} from "../../../api/EosAskApiFetch";
import {Row, Col, Button} from "reactstrap";
import {
    createAddAnsAction,
    createAnsBadAction,
    createPayoutAction,
    getEosioActionLocation
} from "components/eosio-client/bounty-actions";
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
    questionOwner: IdentityUser;
    status: number;
    questionBounty: BountyDTO;
}

interface State {
    canShowUpdateBlockchainLink: boolean;
    canMarkAnswerBad: boolean;
    canPayoutBounty: boolean;
}

export default class AnswerView extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            canShowUpdateBlockchainLink: false,
            canMarkAnswerBad: false,
            canPayoutBounty: false
        }
    }

    async componentDidMount() {
        let isViewerSignedIn = await isSignedIn(this.props.owner);
        let isAnswerFromQuestionOwner = this.props.questionOwner.userName == this.props.owner.userName;
        let canShowUpdateBlockchainLink = !this.props.isCreatedOnBlockchain && isViewerSignedIn;
        let canMarkAnswerBad = !canShowUpdateBlockchainLink && (this.props.status == 0) && !isAnswerFromQuestionOwner;

        let {questionBounty} = this.props;
        let isActiveBounty = questionBounty != null && questionBounty.isCreatedOnBlockchain && questionBounty.awarded == null;
        let canPayoutBounty = !canShowUpdateBlockchainLink && isActiveBounty && this.props.status != 2 && 
            !isAnswerFromQuestionOwner;

        this.setState({
            canShowUpdateBlockchainLink,
            canMarkAnswerBad, // status 2 == incorrect
            canPayoutBounty
        })
    }

    render() {
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
                        <AnswerStatus status={this.props.status}/>
                        <UpdateBlockchainLink canShowUpdateBlockchainLink={this.state.canShowUpdateBlockchainLink}
                                              answerId={this.props.answerId} questionId={this.props.questionId}/>
                        <MarkAnswerBadLink canMarkAnswerBad={this.state.canMarkAnswerBad}
                                           answerId={this.props.answerId}
                                           questionId={this.props.questionId}
                        />
                        <PayoutLink canPayoutBounty={this.state.canPayoutBounty}
                                    questionBounty={this.props.questionBounty}
                                    answerId={this.props.answerId}
                                    questionId={this.props.questionId}
                        />
                    </Col>
                </Row>
                <hr/>
            </div>
        )
    }
}

function UpdateBlockchainLink(props) {
    let linkToCreateAnswerOnBlockchain = null;

    if (props.canShowUpdateBlockchainLink) {
        let linkLocation = getEosioActionLocation(createAddAnsAction(props.questionId, props.answerId));

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

    return linkToCreateAnswerOnBlockchain;
}

function MarkAnswerBadLink(props) {
    let markAnsBadLink = null;

    if (props.canMarkAnswerBad) {
        let linkLocation = getEosioActionLocation(createAnsBadAction(props.answerId, props.questionId));

        markAnsBadLink = (
            <div className="mt-5">
                <Link to={linkLocation} className="text-danger">
                    Mark Answer Bad
                </Link>
                <div>
                    <small className="text-info">
                        Mark this answer bad if it is not good enough to receive the bounty. You will only be able
                        to reclaim your bounty once all answers are marked bad.
                    </small>
                </div>
            </div>
        )
    }

    return markAnsBadLink;
}

function PayoutLink(props) {
    let payoutLink = null;

    if (props.canPayoutBounty) {
        let linkLocation = getEosioActionLocation(createPayoutAction(
            props.questionId,
            props.answerId,
            props.questionBounty.bountyId));

        payoutLink = (
            <div className="mt-3">
                <hr/>
                <Link to={linkLocation}>
                    <Button color="primary">
                        Payout Bounty
                    </Button>
                </Link>
                <div>
                    <small className="text-info">
                        (You approve this answer as the correct one. Award the bounty to this user.)
                    </small>
                </div>
            </div>
        )
    }

    return payoutLink;
}

function AnswerStatus(props) {
    let status = props.status;

    if (status == 2) {
        return (
            <small className="text-danger">This answer was marked as bad by the bounty creator.</small>
        )
    }
    else if (status == 1) {
        return (
            <small className="text-success">Received bounty.</small>
        )
    }

    return null;
}
