import * as React from "react";
import {Answer, IdentityUser} from '../../api/EosAskApiFetch'
import {Button, Row, Col} from 'reactstrap'

interface Props {
    questionId: number;
    title: string;
    text: string;
    upVotes: number;
    owner: IdentityUser;
    answers: Answer[];
    isListView: boolean,
}

interface State {
}

class QuestionView extends React.Component<Props, State> {
    constructor(props) {
        super(props);
    }
    
    render() {
        if (this.props.isListView) {
            return <QuestionListView {...this.props} />
        }
        else {
            return <QuestionFullView {...this.props} />
        }
    }
}

class QuestionListView extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <div className="d-flex">
                    <div>
                        Summary to the left
                    </div>
                    
                    <div>
                        Summary to the right
                    </div>
                </div>
                
                <div>
                    QuestionID: {this.props.questionId}
                </div>
                <div>
                    Text: {this.props.text}
                </div>
                <div>
                    Title: {this.props.title}
                </div>
                <div>
                    Owner: {this.props.owner.userName}
                </div>
                <Button color="danger">My Button</Button>
            </div>
        )
    }
}

class QuestionFullView extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                    QuestionID: {this.props.questionId}
                </div>
                <div>
                    Text: {this.props.text}
                </div>
                <div>
                    Owner: {this.props.owner.userName}
                </div>
                <Button color="danger">My Button</Button>
            </div>
        )
    }
}

export default QuestionView