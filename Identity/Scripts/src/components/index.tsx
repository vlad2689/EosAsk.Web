import React from 'react';
import ReactDOM from 'react-dom';
import EosioClient from './eosio-client'
import {AnswersClient} from '../api/EosAskApiFetch';

let answersClient = new AnswersClient();
answersClient.getAnswers().then(answers => {
    console.log(answers);
});


// ReactDOM.render(<EosioClient />, document.getElementById('app'));
