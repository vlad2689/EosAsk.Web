import * as React from 'react';
import {Question, QuestionsClient} from "../../api/EosAskApiFetch";
import QuestionView from "components/questions/QuestionView";

interface QuestionsState {
    questions: Question[],
    questionsClient: QuestionsClient
}

class Questions extends React.Component<any, QuestionsState> {
    constructor(props) {
       super(props);
       
       this.state = {
           questions: [],
           questionsClient: new QuestionsClient()
       }
    }
    
    componentDidMount() {
        this.state.questionsClient.getQuestions().then(result => {
            this.setState({
                questions: result
            })
        })
    }
    
    render() {
        return (
            <div>
                {this.state.questions.map((q, i) => {
                    return (<QuestionView {...q} init={q.init} toJSON={q.toJSON} key={i}/>)
                })}
            </div>
        )
    }
}

export default Questions;