import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs2';
import {JsonRpc, Api} from 'eosjs';

import * as React from 'react';
import {BountyAction, createOnFailureCb, createOnSuccessCb} from "components/eosio-client/bounty-actions";

enum ScatterStatus {
    NO_SCATTER = "No Scatter",
    NO_IDENTITY = "No Identity"
}

ScatterJS.plugins(new ScatterEOS());

const network = ScatterJS.Network.fromJson({
    blockchain: 'eos',
    chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
    host: 'localhost',
    port: 8888,
    protocol: 'http',
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

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.runAction = this.runAction.bind(this);
        this.tryRunAction = this.tryRunAction.bind(this);
    }

    componentDidMount() {
        this.setStatus();
        setInterval(() => {
            this.setStatus();
        }, 50);

        ScatterJS.scatter.connect('eosjs2-test', {
            network
        }).then(connected => {
            if (!connected) return false;

            this.setState({
                scatter: ScatterJS.scatter,
                isLoading: false
            });
        });
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
        if (!this.state.isLoading && Object.keys(this.state.scatter).length > 0) {
            this.state.scatter.login();
        } else if (!this.state.isLoading) {
            alert("Please login into your Scatter first");
        }
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
                action.data = {
                    ...action.data,
                    [action.fromParamName]: from.name
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
                    data: action.data
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
        let buttons = this.state.status !== ScatterStatus.NO_SCATTER && 
                      this.state.status !== ScatterStatus.NO_IDENTITY ?
            (
                <div>
                    <button type="button" onClick={this.logout}>Forget Identity</button>
                    <button type="button" onClick={this.runAction}>Run Bounty {this.state.bountyAction.name}</button>
                </div>
            )
            :
            (
                <div>
                    <button type="button" onClick={this.login}>Get Identity</button>
                </div>

            );
        
        return (
            <div>
                <div>
                    {this.state.status}
                </div>

                <br/>
                {buttons}
            </div>
        )
    }
}

export default EosioClient;