import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
            Home
        </div>
    )
}

export default App;