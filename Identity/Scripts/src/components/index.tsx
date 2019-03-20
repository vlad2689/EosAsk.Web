import React from 'react';
import ReactDOM from 'react-dom';
import EosioClient from './eosio-client'
import {AnswersClient, QuestionsClient} from '../api/EosAskApiFetch';

let questionsClient = new QuestionsClient();
questionsClient.getQuestions().then(response => {
    console.log(response);
});

// ReactDOM.render(<EosioClient />, document.getElementById('app'));
