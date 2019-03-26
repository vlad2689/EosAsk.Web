import * as React from "react";
import {AnswerDTO, IdentityUser} from "../../../api/EosAskApiFetch";
import RequireSignInSoft from "../../../components/authentication/RequireSignInSoft";
import AnswerView from "components/questions/answers/AnswerView";
import PostAnswer from "components/questions/answers/PostAnswer";

interface Props {
    answers: AnswerDTO[];
    questionId: number;
    questionOwner: IdentityUser;
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
               {this.props.answers.map((a, i) => {
                   return (
                       <AnswerView {...a} key={i} 
                                   questionOwner={this.props.questionOwner}
                                   questionId={this.props.questionId}/>
                   )
               })}
               <RequireSignInSoft reasonToSignIn="Sign in or register to post your own answer">
                   <PostAnswer questionId={this.props.questionId}/>
               </RequireSignInSoft>
           </div> 
        )
    }
}