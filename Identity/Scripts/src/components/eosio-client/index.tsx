import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs2';
import {JsonRpc, Api} from 'eosjs';
import {Button, Row, Col} from 'reactstrap';

import * as React from 'react';
import {BountyAction, createOnFailureCb, createOnSuccessCb} from "components/eosio-client/bounty-actions";

enum ScatterStatus {
    NO_SCATTER = "No Scatter",
    NO_IDENTITY = "No Identity"
}

ScatterJS.plugins(new ScatterEOS());

const network = ScatterJS.Network.fromJson({
    blockchain: 'eos',
    chainId: process.env.CHAIN_ID,
    host: process.env.HOST,
    port: process.env.PORT,
    protocol: process.env.PROTOCOL,
});

const rpc = new JsonRpc(network.fullhost());

interface Props {
    location: any
}

interface State {
    bountyAction: BountyAction
    scatter: any;
    api: any;
    status: string;
    isLoading: boolean;
}

class EosioClient extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.runAction = this.runAction.bind(this);
        this.tryRunAction = this.tryRunAction.bind(this);
        this.tryConnect = this.tryConnect.bind(this);

        // store bountyAction in localStorage for page refreshes
        let bountyAction = null;
        if (this.props.location != null) {
            bountyAction = this.props.location.bountyAction;
        }

        if (bountyAction != null && Object.keys(bountyAction).length > 0) {
            localStorage.setItem('bountyAction', JSON.stringify(bountyAction));
        }

        const storedBountyAction = JSON.parse(localStorage.getItem('bountyAction'));
        if (!storedBountyAction) {
            alert("No action was given to sync with eos blockchain. Redirecting to home page");
            window.location.href = "/";
        }

        this.state = {
            bountyAction: storedBountyAction,
            scatter: {},
            api: {},
            status: ScatterStatus.NO_SCATTER,
            isLoading: true
        };
    }

    componentDidMount() {
        this.setStatus();
        setInterval(() => {
            this.setStatus();
        }, 50);

        this.tryConnect(() => {});
    }

    tryConnect(cb) {
        if (Object.keys(this.state.scatter).length > 0) {
            cb();
        }
        else {
            ScatterJS.scatter.connect('EosAsk', {
                network
            }).then(connected => {
                let scatter = connected ? ScatterJS.scatter : {};
                (window as any).ScatterJS = null;
                let isLoading = false;

                this.setState({
                    scatter,
                    isLoading
                }, () => {
                    cb()
                });

                if (!connected) return false;
            });
        }
    }

    setStatus = () => {
        let {status, scatter} = this.state;

        if (!scatter) {
            status = ScatterStatus.NO_SCATTER;
        }
        else if (!scatter.identity) {
            status = ScatterStatus.NO_IDENTITY;
        }
        else {
            status = scatter.identity.accounts[0].name;
        }

        this.setState({status})
    };

    login = () => {
        this.tryConnect(() => {
            if (!this.state.isLoading && Object.keys(this.state.scatter).length > 0) {
                this.state.scatter.login();
            } else if (!this.state.isLoading) {
                alert("Make sure to login into your Scatter Desktop or Scatter Web first.");
            }
        })
    };

    logout = () => {
        if (Object.keys(this.state.scatter).length > 0) {
            this.state.scatter.logout();
        }
    };

    runAction = async () => {
        const api = this.state.scatter.eos(network, Api, {rpc, beta3: true});
        return this.setState({api: api}, this.tryRunAction);
    };

    tryRunAction = async () => {
        try {
            const {api} = this.state;

            const from = this.state.scatter.account('eos');
            let action = this.state.bountyAction;

            if (action.fromParamName) {
                action.eosTransactionData = {
                    ...action.eosTransactionData,
                    [action.fromParamName]: from.name,
                };
            }

            const result = await api.transact({
                actions: [{
                    account: 'bounty',
                    name: this.state.bountyAction.name,
                    authorization: [{
                        actor: from.name,
                        permission: from.authority,
                    }],
                    data: action.eosTransactionData
                }]
            }, {
                blocksBehind: 3,
                expireSeconds: 30,
            });
            createOnSuccessCb(action)(result);
        } catch (e) {
            createOnFailureCb(this.state.bountyAction)(e);
        }
    };

    render() {
        // TODO: Make this look pretty and ask users to refresh the page after they open scatter.

        let isNoIdentity = this.state.status == ScatterStatus.NO_IDENTITY;
        let isNoScatter = this.state.status == ScatterStatus.NO_SCATTER;

        let buttons = !isNoIdentity && !isNoScatter ?
            (
                <div>
                    <Row>
                        <Col>
                            <Button color="secondary" className="btn-block" type="button" onClick={this.logout}>
                                Logout from Scatter
                            </Button>
                        </Col>
                        <Col>
                            <Button color="primary" className="btn-block" type="button" onClick={this.runAction}>
                                Run {this.state.bountyAction.name}
                            </Button>
                        </Col>
                    </Row>
                </div>
            )
            :
            (
                <div>
                    <Button disabled={this.state.isLoading} color="primary" className="btn-block" type="button"
                            onClick={this.login}>
                        Login with Scatter
                    </Button>
                </div>

            );

        return (
            <div className="text-center">
                <h5>
                    You are logged in as: <strong>{this.state.status}</strong>
                </h5>
                <h5>
                    Push action to EOS blockchain: <strong>{this.state.bountyAction.name}</strong>.
                </h5>

                <br/>
                <div>
                    {buttons}
                </div>

                <div className="mt-2">
                    <small>
                        You'll be able to view and confirm the details of this transaction in Scatter before pushing it.
                    </small>
                </div>
            </div>
        )
    }
}

export default EosioClient;