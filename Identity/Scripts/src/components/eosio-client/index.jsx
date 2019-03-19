import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs2';
import {JsonRpc, Api} from 'eosjs';

import React from 'react';

ScatterJS.plugins(new ScatterEOS());

const network = ScatterJS.Network.fromJson({
  blockchain: 'eos',
  chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
  host: 'localhost',
  port: 8888,
  protocol: 'http',
});

const rpc = new JsonRpc(network.fullhost());
const getApi = (signatureProvider) => new Api({ rpc, signatureProvider });

class EosioClient extends React.Component {
  constructor() {
    super();

    this.state = {
      scatter: null,
      api: null,
      status: 'No Scatter'
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.transfer = this.transfer.bind(this);
    this.hookTransfer = this.hookTransfer.bind(this);
    this.tryTransfer = this.tryTransfer.bind(this);
  }

  componentDidMount() {
    this.setStatus();
    setInterval(() => {
      this.setStatus();
    }, 50);

    console.log(ScatterJS.scatter);

    ScatterJS.scatter.connect('eosjs2-test', {
      network
    }).then(connected => {
      if (!connected) return false;

      this.setState({
        scatter: ScatterJS.scatter
      });

      console.log(this.state);
    });
  }

  setStatus = () => {
    let {status, scatter} = this.state;

    if (!scatter) {
      status = 'No Scatter';
    }
    else if (!scatter.identity) {
      status = 'No Identity';
    } 
    else {
      status = scatter.identity.accounts[0].name;
    }

    this.setState({status})
  };

  login = () => this.state.scatter.login();
  logout = () => this.state.scatter.logout();

  transfer = async () => {
    const api = this.state.scatter.eos(network, Api, {rpc, beta3:true})
    return this.setState({api: api}, this.tryTransfer);
  };

  hookTransfer = async () => {
    const api = getApi(this.state.scatter.eosHook(network));
    const from = this.state.scatter.identity.accounts[0];
    tryTransfer();
  };

  tryTransfer = async () => {
    try {
      const { api } = this.state;

      const from = this.state.scatter.account('eos');
      const result = await api.transact({
        actions: [{
          account: 'bounty',
          name: 'erase',
          authorization: [{
            actor: from.name,
            permission: from.authority,
          }],
          data: {
            // from: from.name,
            // to: 'bob2',
            // quantity: '0.0001 EOS',
            // memo: from.name,
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      });
      console.log('result', result);
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    return (
      <div>
        <div>
          {this.state.status}
        </div>

        <br/>
        <br/>
        <br/>

        <button type="button" onClick={this.login}>Get Identity</button>
        <button type="button" onClick={this.logout}>Forget Identity</button>
        <button type="button" onClick={this.transfer}>Transfer</button>
        <button type="button" onClick={this.hookTransfer}>Hook Transfer</button>
      </div>
    )
  }
}

export default EosioClient;