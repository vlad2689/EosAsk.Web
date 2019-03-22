import * as React from 'react';
import {Question} from "../../api/EosAskApiFetch";
import QuestionView from "components/questions/QuestionView";

interface State {
}

interface Props {
    questions: Question[]
}

class Questions extends React.Component<Props, State> {
    constructor(props) {
       super(props);
    }
    
    render() {
        return (
            <div>
                {this.props.questions.length > 0 && this.props.questions.map((q, i) => {
                    return (<QuestionView {...q} init={q.init} toJSON={q.toJSON} key={i}/>)
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