import * as React from "react";
import {Answer} from "../../../api/EosAskApiFetch";
import AnswerView from "components/questions/answers/AnswerView";
import PostAnswer from "components/questions/answers/PostAnswer";

interface Props {
    answers: Answer[]
    questionId: number
}

interface State {
    
}

export default class Answers extends React.Component<Props, State> {
    constructor(props) {
       super(props)
    }
    
    render() {
        return (
           <div>
               <h5>
                   Answers
               </h5>
               <hr/>
               {this.props.answers.map(a => {
                   return (
                       <AnswerView {...a}/>
                   )
               })}
               <PostAnswer questionId={this.props.questionId}/>
           </div> 
        )
    }
}