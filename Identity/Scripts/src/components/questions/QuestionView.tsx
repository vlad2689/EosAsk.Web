import * as React from "react";
import {Answer, AnswerDTO, IdentityUser, QuestionsClient} from '../../api/EosAskApiFetch'
import {QuestionDTO, BountyDTO} from "../../api/EosAskApiFetch";
import {Button, Row, Col} from 'reactstrap'
import {Link, Route} from 'react-router-dom';
import Answers from './answers'
import {BountyFullView, BountyListView} from "components/questions/bounties/BountyView";
import {isSignedIn} from "../../api/SignInClient";
import {createReclaimAction, getEosioActionLocation} from "components/eosio-client/bounty-actions";

interface PropsListView {
    questionId: number;
    title: string;
    text: string;
    upVotes: number;
    owner: IdentityUser;
    answers: AnswerDTO[];
    bounty?: BountyDTO;
}

export class QuestionListView extends React.Component<PropsListView, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="w-100">
                <Row className="d-flex">
                    <Col xs="2" className="text-center">
                        <div className="d-inline-block pl-4">
                            <div className="text-secondary">
                                {(this.props.answers && this.props.answers.length) || 0}
                            </div>
                            <div className="text-primary">
                                Answers
                            </div>
                        </div>
                    </Col>

                    <Col xs="10">
                        <h5>
                            <Link to={`/questions/view/${this.props.questionId}`}>
                                {this.props.title}
                            </Link>
                        </h5>
                        <div>
                            <BountyListView bounty={this.props.bounty}/>
                        </div>
                        <div className="text-right text-info">
                            <small>
                                Asked by: {this.props.owner.userName}
                            </small>
                        </div>
                    </Col>
                </Row>
                <hr/>
            </div>
        )
    }
}

interface PropsFullView {
    match: any
}

interface StateFullView {
    question: QuestionDTO;
    isLoading: boolean;
    isViewerQuestionOwner: boolean;
    canPostBounty: boolean;
    canReclaimBounty: boolean;
}

export class QuestionFullView extends React.Component<PropsFullView, StateFullView> {
    constructor(props) {
        super(props);

        this.state = {
            question: null,
            isLoading: true,
            isViewerQuestionOwner: false,
            canPostBounty: false,
            canReclaimBounty: false,
        }
    }

    async componentDidMount() {
        let questionsClient = new QuestionsClient();
        questionsClient.getQuestion(this.props.match.params.id).then(async (question) => {
            let isViewerQuestionOwner = await isSignedIn(question.owner);
            let canReclaimBounty =
                isViewerQuestionOwner &&
                (question.bounty && question.bounty.isCreatedOnBlockchain) &&
                (!question.answers
                    || question.answers.length == 0
                    || (question.answers.find((answer) =>
                        answer.isCreatedOnBlockchain &&
                        answer.status == 0 &&
                        answer.owner.userName != question.owner.userName
                    ) == undefined));

            this.setState({
                question: question,
                isLoading: false,
                canPostBounty: isViewerQuestionOwner && !!question &&
                    (!question.bounty || !question.bounty.isCreatedOnBlockchain),
                isViewerQuestionOwner,
                canReclaimBounty
            })
        });
    }

    render() {
        if (this.state.isLoading) {
            return null;
        }

        let canPostBounty = this.state.canPostBounty,
            questionId = this.props.match.params.id,
            question = this.state.question;

        let addBountyButton = (
            <AddBountyButton canPostBounty={canPostBounty}
                             questionId={questionId}
                             question={question}
            />
        );

        let reclaimBountyButton = (
            <ReclaimBountyButton canReclaimBounty={this.state.canReclaimBounty}
                                 questionId={question.questionId}
                                 bounty={question.bounty}
            />
        );

        return (
            <div>
                <QuestionFullViewStateless addBountyButton={addBountyButton}
                                           reclaimBountyButton={reclaimBountyButton}
                                           question={question}/>
            </div>
        )
    }
}

function AddBountyButton(props) {
    let addBountyButton = null;

    if (props.canPostBounty) {
        let locationPostBounty = {
            pathname: `/questions/post_bounty/${props.questionId}`,
            question: props.question,
            bountyAmount: 0
        };

        addBountyButton = (
            <div>
                <Link to={locationPostBounty}>
                    <Button color="primary" className="btn-block mb-5">Add Bounty</Button>
                </Link>
            </div>
        )
    }

    return addBountyButton;
}

function ReclaimBountyButton(props) {
    let addBountyButton = null,
        bounty = props.bounty;

    if (props.canReclaimBounty) {
        let linkLocation = getEosioActionLocation(createReclaimAction(props.questionId, bounty.bountyId));

        addBountyButton = (
            <div>
                <Link to={linkLocation}>
                    <Button color="primary" className="btn-block mb-5">Reclaim Bounty</Button>
                </Link>
            </div>
        )
    }

    return addBountyButton;
}

interface FullViewStateless {
    question: QuestionDTO;
    addBountyButton: any;
    reclaimBountyButton: any;
}

export function QuestionFullViewStateless(props: FullViewStateless) {
    let {question, addBountyButton, reclaimBountyButton} = props;

    return (
        <div className="w-100">
            {addBountyButton}
            {reclaimBountyButton}

            <h3>
                {question.title}
            </h3>
            <hr/>
            <Row>
                <Col xs={2}>
                    <div className="d-inline-block text-center">
                        <div className="text-secondary">
                            {question.upVotes}
                        </div>
                        <div className="text-secondary">
                            Upvotes
                        </div>
                    </div>
                </Col>
                <Col xs={10}>
                    <h5>
                        {question.text}
                    </h5>
                    <BountyFullView bounty={question.bounty}/>
                    <div className="text-right text-info">
                        <small>
                            Asked By: {question.owner.userName}
                        </small>
                    </div>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <Answers answers={question.answers}
                             questionId={question.questionId}
                             questionOwner={question.owner}
                             questionBounty={question.bounty}
                    />
                </Col>
            </Row>
        </div>
    )
}