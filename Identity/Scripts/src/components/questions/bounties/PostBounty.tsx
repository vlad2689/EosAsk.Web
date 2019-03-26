import * as React from "react";
import {QuestionDTO, BountiesClient} from "../../../api/EosAskApiFetch";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {QuestionFullViewStateless} from "components/questions/QuestionView";

interface State {
    bountiesClient: BountiesClient,
    bountyAmount: number,
    error: string,
    question: QuestionDTO
}

export default class PostBounty extends React.Component<any, State> {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);

        if (this.props.location.question == null || !Object.keys(this.props.location.question).length) {
            window.location.href = `/questions/view/${this.props.match.params.id}`;
        }
        
        this.state = {
            bountiesClient: new BountiesClient(),
            bountyAmount: 0,
            error: '',
            question: this.props.location.question
        }
    }

    componentDidMount() {
    }

    handleSubmit() {
        let state = this.state;
    }

    handleAmountChange(event) {
        this.setState({
            bountyAmount: event.target.value,
            error: ''
        })
    }

    render() {
        return (
            <div className="mb-5">
                <h5>
                    You are the owner of this question.
                </h5>
                <h6>
                    You may add a bounty to this question 
                </h6>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="bountyAmount"><h5>Bounty Amount</h5></Label>
                        <Input type="number"
                               name="bountyAmount"
                               id="bountyAmount"
                               onChange={this.handleAmountChange}
                               />
                    </FormGroup>

                    <Button color="primary" className="btn-block">Submit</Button>
                    {this.state.error.length > 0 &&
                    <div>
                        {this.state.error}
                    </div>
                    }
                </Form>
                
                <QuestionFullViewStateless question={this.state.question}/>
            </div> 
        )
    }
}