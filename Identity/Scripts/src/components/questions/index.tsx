import * as React from 'react';
import RequireSignIn from "components/authentication/RequireSignIn";
import Questions from "components/questions/Questions";
import {QuestionDTO, QuestionsClient} from "../../api/EosAskApiFetch";
import {Route, Link} from "react-router-dom";
import {Button} from 'reactstrap';

interface Props {
    match: any
}

interface State {
    questions: QuestionDTO[],
    questionsClient: QuestionsClient,
    isLoading: boolean
}

class QuestionsHome extends React.Component<Props, State> {
    constructor(props) {
       super(props);
       
       this.state = {
           questionsClient: new QuestionsClient(),
           questions: [],
           isLoading: true
       }
    }
    
    async componentDidMount() {
        let questions = await this.state.questionsClient.getQuestions();
        this.setState({
            questions: questions,
            isLoading: false
        });
    }
    
    render() {
        let { match } = this.props;
        
        return (
            <RequireSignIn>
                <h2>
                    <div>
                        Top Questions
                        <Link to={`${match.url}/new`}>
                            <Button color="primary" className="float-right">Ask a Question</Button>
                        </Link>
                    </div>
                </h2>
                <hr/>
                {!this.state.isLoading &&
                    <Questions questions={this.state.questions} />
                }
            </RequireSignIn>
        )
    }
}

export default QuestionsHome;