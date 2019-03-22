import * as React from 'react';
import RequireSignIn from "components/authentication/RequireSignIn";
import Questions from "components/questions/Questions";
import {Question, QuestionsClient} from "../../api/EosAskApiFetch";
import {Route, Link} from "react-router-dom";
import PostQuestion from "components/questions/PostQuestion";
import {Button} from 'reactstrap';

interface Props {
    match: any
}

interface State {
    questions: Question[],
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
    
    componentDidMount() {
        this.state.questionsClient.getQuestions().then(questions => {
            this.setState({
                questions: questions,
                isLoading: false
            })
        }).finally(() => {
            this.setState({
                isLoading: false
            })
        })
    }
    
    render() {
        let { match } = this.props;
        
        return (
            <RequireSignIn>
                <h2>
                    <div>
                        Top Questions
                        <Link to={`${match.url}/new`}>
                            <Button color="primary">Ask a Question</Button>
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