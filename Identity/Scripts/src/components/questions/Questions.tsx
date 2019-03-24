import * as React from 'react';
import {Route} from 'react-router-dom';
import {QuestionDTO} from "../../api/EosAskApiFetch";
import {QuestionListView} from "components/questions/QuestionView";

interface State {
}

interface Props {
    questions: QuestionDTO[]
}

class Questions extends React.Component<Props, State> {
    constructor(props) {
       super(props);
    }
    
    render() {
        return (
            <div>
                {this.props.questions.length > 0 && this.props.questions.map((q, i) => {
                    return (
                        <div key={i}>
                            <QuestionListView {...q} answers={q.answers} />
                        </div>
                    )
                })}
                
                {this.props.questions.length == 0 &&
                    <h1>
                        No questions have been created on EosAsk until now.
                    </h1>
                }
            </div>
        )
    }
}

export default Questions;