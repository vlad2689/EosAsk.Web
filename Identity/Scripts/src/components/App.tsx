import * as React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import Layout from "components/shared/Layout";
import QuestionsHome from "components/questions";
import PostQuestion from "components/questions/PostQuestion";
import {QuestionFullView} from "components/questions/QuestionView";
import PostBounty from "components/questions/bounties/PostBounty";
import EosioClient from "components/eosio-client"

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Router>
                <Layout>
                    <Route exact path="/" component={Home} />
                    
                    <Route exact path="/questions" component={QuestionsHome} />
                    <Route exact path="/questions/new" component={PostQuestion} />
                    
                    <Route exact path="/questions/view/:id" component={QuestionFullView} />
                    <Route exact path="/questions/post_bounty/:id" component={PostBounty} />
                    
                    <Route exact path="/eosio_action" component={EosioClient} />

                    {/*<Route path="/bounties" component={Bounties} />*/}

                </Layout>
            </Router>
        );
    }
}

function Home() {
    return (
        <div>
            <div>
                <h5>
                    Welcome to <em>EosAsk</em>, a questions and answers forum powered by the EOS blockchain.
                </h5>
            </div>
            <div>
                <h4>Get started by navigating to the <Link to="/questions">Questions</Link> section</h4>
            </div>
        </div>
    )
}

export default App;