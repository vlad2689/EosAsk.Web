import * as React from "react";
import {Answer, IdentityUser, Question, QuestionsClient} from '../../api/EosAskApiFetch'
import {Button, Row, Col} from 'reactstrap'
import {Link, Route} from 'react-router-dom';
import Answers from './answers'

interface PropsListView {
    questionId: number;
    title: string;
    text: string;
    upVotes: number;
    owner: IdentityUser;
    answers: Answer[];
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
    question: Question,
    isLoading: boolean
}

export class QuestionFullView extends React.Component<PropsFullView, StateFullView> {
    constructor(props) {
        super(props);
        // TODO: Make this query the api and display the question like that.
        
        this.state = {
            question: null,
            isLoading: true
        }
    }
    
    componentDidMount() {
        let questionsClient = new QuestionsClient();
        questionsClient.getQuestion(this.props.match.params.id).then(question => {
            console.log(question);
            this.setState({
                question: question,
                isLoading: false
            })
        });
    }

    render() {
        let { question } = this.state;
        
        if (this.state.isLoading) {
            return null;
        }
        
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
                                <div className="text-right text-info">
                                    <small>
                                        Asked by: {question.owner.userName}
                                    </small>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <Col>
                                <Answers answers={question.answers} questionId={question.questionId}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}