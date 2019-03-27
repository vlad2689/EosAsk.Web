import * as React from "react";
import {QuestionDTO, BountiesClient, PostBountyDTO} from "../../../api/EosAskApiFetch";
import {Row, Col, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {QuestionFullViewStateless} from "components/questions/QuestionView";
import {createAddBountyAction, getEosioActionLocation} from "components/eosio-client/bounty-actions";
import {Redirect} from "react-router-dom";

interface Props {
    location: any;
    match: any;
}

interface State {
    bountiesClient: BountiesClient;
    bountyAmount: string;
    error: string;
    redirectLocation: any;
    question: QuestionDTO;
}

class PostBounty extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);

        if (this.props.location.question == null || !Object.keys(this.props.location.question).length) {
            window.location.href = `/questions/view/${this.props.match.params.id}`;
        }

        this.state = {
            bountiesClient: new BountiesClient(),
            bountyAmount: this.props.location.bountyAmount || 0,
            error: '',
            redirectLocation: null,
            question: this.props.location.question
        }
    }

    async handleSubmit(e) {
        let {question, bountyAmount, bountiesClient} = this.state;

        let model = PostBountyDTO.fromJS({
            questionId: question.questionId,
            amount: bountyAmount,
            amountSym: "EOS"
        });

        if (question.bounty && Object.keys(question.bounty).length > 0) {
            bountiesClient.deleteBounty(question.bounty.bountyId).then(() => {
                postBounty.apply(this);
            }).catch(() => {
                postBounty.apply(this);
            });
        }
        else {
            postBounty.apply(this);
        }
        
        function postBounty() {
            bountiesClient.postBounty(model).then((bounty) => {
                let bountyAction = createAddBountyAction(bountyAmount,
                    question.questionId,
                    bounty.bountyId,
                    `qId ${question.questionId}`);

                this.setState({
                    redirectLocation: getEosioActionLocation(bountyAction)
                })
            }).catch((e) => {
                alert(e);
            });
        }
        
        e.preventDefault();
    }

    handleAmountChange(event) {
        this.setState({
            bountyAmount: event.target.value,
            error: ''
        })
    }

    render() {
        if (this.state.redirectLocation) {
            return (
                <Redirect to={this.state.redirectLocation}/>
            )
        }

        return (
            <div>
                <h4 className="text-success">
                    You may add a bounty to this question, using EOS tokens.
                </h4>
                <small className="text-secondary">
                    This will incentivize others to answer your question; you'll be able to award
                    this bounty once you are happy with an answer you receive. You will also be able
                    to reclaim your full bounty amount if no answer is received, or if you judge all answers to be
                    inappropriate.
                </small>
                <Form className="mb-5 mt-1" onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="bountyAmount" className="text-primary">
                            <h5>Bounty Amount (EOS)</h5>
                        </Label>
                        <Input type="number"
                               name="bountyAmount"
                               id="bountyAmount"
                               onChange={this.handleAmountChange}
                               value={this.state.bountyAmount}
                        />
                    </FormGroup>

                    <Button color="primary" className="btn-block">Create Bounty</Button>
                    {this.state.error.length > 0 &&
                    <div>
                        {this.state.error}
                    </div>
                    }
                </Form>

                <hr/>

                <QuestionFullViewStateless question={this.state.question} addBountyButton={null}/>
            </div>
        )
    }
}

export default PostBounty;