import * as React from "react";
import {Answer, IdentityUser, Question, QuestionsClient} from '../../api/EosAskApiFetch'
import {Button, Row, Col} from 'reactstrap'
import {Link, Route} from 'react-router-dom';

interface PropsListView {
    questionId: number;
    title: string;
    text: string;
    upVotes: number;
    owner: IdentityUser;
    answers: Answer[];
}

// class QuestionView extends React.Component<Props, State> {
//     constructor(props) {
//         super(props);
//     }
//    
//     render() {
//         if (this.props.isListView) {
//             return <QuestionListView {...this.props} />
//         }
//         else {
//             return <QuestionFullView {...this.props} />
//         }
//     }
// }

export class QuestionListView extends React.Component<PropsListView, any> {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="w-100">
                <div className="d-flex">
                    <div className="text-center">
                        <div className="d-inline-block">
                            {this.props.upVotes}
                            <div>
                                Upvotes
                            </div>
                        </div>
                        <div className="d-inline-block pl-4">
                            {(this.props.answers && this.props.answers.length) || 0}
                            <div>
                                Answers
                            </div>
                        </div>
                    </div>
                    
                    <div className="">
                        <h5>
                            <Link to={`/questions/${this.props.questionId}`}>
                            {this.props.title}
                            </Link>
                        </h5>
                        <div className="pt-2">
                            QuestionID: {this.props.questionId}
                        </div>
                    </div>
                </div>
                
                <div>
                </div>
                <div>
                </div>
                <div>
                    Title: {this.props.title}
                </div>
                <div>
                    Owner: {this.props.owner.userName}
                </div>
            </div>
        )
    }
}

interface PropsFullView {
    match: any
}

interface StateFullView {
    question: Question
}

export class QuestionFullView extends React.Component<PropsFullView, any> {
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
        return (
            <div>
                {!this.state.isLoading && (
                    <div className="w-100">
                        <div className="d-flex">
                            <div className="text-center">
                                <div className="d-inline-block">
                                    {question.upVotes}
                                    <div>
                                        Upvotes
                                    </div>
                                </div>
                                <div className="d-inline-block pl-4">
                                    {(question.answers && question.answers.length) || 0}
                                    <div>
                                        Answers
                                    </div>
                                </div>
                            </div>

                            <div className="">
                                <h5>
                                    <Link to={`/questions/${question.questionId}`}>
                                        {question.title}
                                    </Link>
                                </h5>
                                <div className="pt-2">
                                    QuestionID: {question.questionId}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}