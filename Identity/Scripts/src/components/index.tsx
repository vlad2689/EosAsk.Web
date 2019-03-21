import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import EosioClient from './eosio-client'
import {QuestionsClient} from '../api/EosAskApiFetch';
import App from './App';

let questionsClient = new QuestionsClient();
questionsClient.getQuestions().then(response => {
    console.log(response);
});

ReactDOM.render(<App />, document.getElementById('app'));

// ReactDOM.render(<EosioClient />, document.getElementById('app'));
