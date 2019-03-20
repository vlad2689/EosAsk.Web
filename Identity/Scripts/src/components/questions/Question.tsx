import * as React from "react";
import {Question} from '../../api/EosAskApiFetch'

class QuestionView extends React.Component<Question> {
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
            </div>
        )
    }
}

export default QuestionView