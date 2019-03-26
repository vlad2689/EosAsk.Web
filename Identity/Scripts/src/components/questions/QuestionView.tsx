import * as React from "react";
import {Answer, AnswerDTO, IdentityUser, QuestionsClient} from '../../api/EosAskApiFetch'
import {QuestionDTO, BountyDTO} from "../../api/EosAskApiFetch";
import {Button, Row, Col} from 'reactstrap'
import {Link, Route} from 'react-router-dom';
import Answers from './answers'
import {BountyFullView, BountyListView} from "components/questions/bounties/BountyView";
import PostBounty from "components/questions/bounties/PostBounty";

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
                    <Col xs="4" className="text-center">
                        <div className="d-inline-block">
                            <div className="text-secondary">
                                {this.props.upVotes}
                            </div>
                            <div className="text-primary">
                                Upvotes
                            </div>
                        </div>
                        <div className="d-inline-block pl-4">
                            <div className="text-secondary">
                                {(this.props.answers && this.props.answers.length) || 0}
                            </div>
                            <div className="text-primary">
                                Answers
                            </div>
                        </div>
                    </Col>
                    
                    <Col xs="8" className="">
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
    question: QuestionDTO,
    isLoading: boolean,
    canPostBounty: boolean
}

export class QuestionFullView extends React.Component<PropsFullView, StateFullView> {
    constructor(props) {
        super(props);
        
        this.state = {
            question: null,
            isLoading: true,
            canPostBounty: false
        }
    }
    
    componentDidMount() {
        let questionsClient = new QuestionsClient();
        questionsClient.getQuestion(this.props.match.params.id).then(question => {
            this.setState({
                question: question,
                isLoading: false,
                canPostBounty: !!question && !question.bounty
            })
        });
    }

    render() {
        let { question } = this.state;
        
        if (this.state.isLoading) {
            return null;
        }
        
        let locationPostBounty = {
            pathname: `/questions/post_bounty/${this.props.match.params.id}`,
            question: question
        };
        
        return (
            <div>
                {this.state.canPostBounty && (
                    <Link to={locationPostBounty}>
                        <Button color="primary" className="btn-block mb-5">Add Bounty</Button>
                    </Link>
                )}
                <QuestionFullViewStateless question={question}/>
            </div>
        )
    }
}

interface FullViewStateless {
    question: QuestionDTO
}

export function QuestionFullViewStateless(props: FullViewStateless) {
    let { question } = props;
    
    return (
        <div className="w-100">
            <Row>
                <Col xs="2"/>
                <Col xs="8">
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
                                    Asked by: {question.owner.userName}
                                </small>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col>
                            <Answers answers={question.answers} 
                                     questionOwner={question.owner}
                                     questionId={question.questionId}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}