import * as React from "react";
import {AnswerDTO} from "../../../api/EosAskApiFetch";
import RequireSignInSoft from "../../../components/authentication/RequireSignInSoft";
import AnswerView from "components/questions/answers/AnswerView";
import PostAnswer from "components/questions/answers/PostAnswer";

interface Props {
    answers: AnswerDTO[]
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
               {/*TODO: update the list without a page refresh*/}
               <RequireSignInSoft reasonToSignIn="Sign in or register to post your own answer">
                   <PostAnswer questionId={this.props.questionId}/>
               </RequireSignInSoft>
           </div> 
        )
    }
}