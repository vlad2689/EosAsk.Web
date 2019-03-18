(function() {
    ScatterJS.plugins( new ScatterEOS(), new ScatterLynx() );

    // const network = ScatterJS.Network.fromJson({
    //     blockchain:'eos',
    //     chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
    //     host: 'api.pennstation.eosnewyork.io',
    //     port: 7101,
    //     protocol: 'https',
    // });

    const network = ScatterJS.Network.fromJson({
        blockchain:'eos',
        chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
        host: 'localhost',
        port: 8888,
        protocol: 'http',
    });

// const network = ScatterJS.Network.fromJson({
//     blockchain:'eos',
//     chainId:'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
//     host:'192.168.1.6',
//     port:8888,
//     protocol:'http'
// });

// const network = ScatterJS.Network.fromJson({
//     blockchain:'eos',
//     chainId:'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
//     host:'dev.cryptolions.io',
//     port:18888,
//     protocol:'http'
// });

    let scatter = null;

    const beta3 = false;

    const rpc = beta3
        ? new eosjs_jsonrpc2.default(network.fullhost())
        : new eosjs_jsonrpc.JsonRpc(network.fullhost());

    const getApi = (signatureProvider) => beta3
        ? new eosjs_api.default({ rpc, signatureProvider })
        : new eosjs.Api({ rpc, signatureProvider });

    const getScatterEos = () => beta3
        ? scatter.eos(network, eosjs_api.default, {rpc, beta3:true})
        : scatter.eos(network, eosjs.Api, {rpc});




    const setStatus = () => {
        const status = document.getElementById('status');
        if(!scatter) return status.innerText = 'No Scatter';
        if(!scatter.identity) return status.innerText = 'No Identity';
        status.innerText = scatter.identity.accounts[0].name;
        
        // status.innertext = scatter.identity.name;
    };

    setStatus();
    setInterval(() => {
        setStatus();
    }, 50);

    ScatterJS.scatter.connect('eosjs2-test', {network}).then(connected => {
        if(!connected) return false;
        scatter = ScatterJS.scatter;
    });

    window.login = async () => await scatter.login();
    window.logout = () => scatter.logout();

    window.transfer = async () => {
        const api = getScatterEos();
        tryTransfer(api);
    };

    window.hookTransfer = async () => {
        const api = getApi(scatter.eosHook(network));
        const from = scatter.identity.accounts[0];
        tryTransfer(api);
    };

    const tryTransfer = async api => {
        try {
            const from = scatter.account('eos');
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
    }
})();
