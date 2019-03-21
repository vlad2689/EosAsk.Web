import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Questions from "components/questions/Questions";
import Layout from "components/shared/Layout";

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Router>
                <Layout>
                    <div>
                        <Route exact path="/" component={Home} />
                        <Route path="/questions" component={Questions} />
                        <Route path="/bounties" component={Bounties} />
                    </div>
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