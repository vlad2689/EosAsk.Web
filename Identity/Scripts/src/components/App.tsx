import * as React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import Questions from "components/questions/Questions";
import Layout from "components/shared/Layout";
import RequireSignIn from "components/authentication/RequireSignIn";
import QuestionsHome from "components/questions";
import PostQuestion from "components/questions/PostQuestion";

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


                    <Route path="/bounties" component={Bounties} />

                </Layout>
            </Router>
        );
    }
}

function Home() {
    return (
        <div>
            <h2>Home</h2>
        </div>
    );
}

function Bounties({ match }) {
    return (
        <div>
            <h2>Bounties</h2>
            <ul>
                <li>
                    <Link to={`${match.url}/rendering`}>Rendering with React</Link>
                </li>
                <li>
                    <Link to={`${match.url}/components`}>Components</Link>
                </li>
                <li>
                    <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
                </li>
            </ul>

            <Route path={`${match.path}/:topicId`} component={Topic} />
            <Route
                exact
                path={match.path}
                render={() => <h3>Please select a topic.</h3>}
            />
        </div>
    );
}

function Topic({ match }) {
    return (
        <div>
            <h3>{match.params.topicId}</h3>
        </div>
    );
}

export default App;