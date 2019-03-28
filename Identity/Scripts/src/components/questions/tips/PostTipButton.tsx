import * as React from "react";
import {Row, Col, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {createAnsTipAction, getEosioActionLocation} from "components/eosio-client/bounty-actions";
import {Redirect} from "react-router-dom";

interface Props {
    answerId: number,
    questionId: number
}

interface State {
    isOpen: boolean;
}

class PostTipButton extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            isOpen: false
        }
    }

    handleClick() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        if (this.state.isOpen) {
            return (
                <PostTip answerId={this.props.answerId} questionId={this.props.questionId} 
                         onCancel={this.handleClick}
                />
            )
        }

        return (
            <Button color="secondary" onClick={this.handleClick}>
                Tip Answer
            </Button>
        )
    }
}

class PostTip extends React.Component<{
    answerId: number;
    questionId: number;
    onCancel: Function
}, {
    tipAmount: string;
    redirectLocation: string;
}> {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTipAmountChange = this.handleTipAmountChange.bind(this);

        this.state = {
            tipAmount: '0',
            redirectLocation: null
        }
    }

    handleSubmit() {
        let redirectLocation = getEosioActionLocation(createAnsTipAction(this.props.answerId,
            this.props.questionId,
            this.state.tipAmount));

        this.setState({
            redirectLocation
        })
    }

    handleTipAmountChange(e) {
        this.setState({
            tipAmount: e.target.value,
        })
    }

    render() {
        if (this.state.redirectLocation) {
            return (
                <Redirect to={this.state.redirectLocation}/>
            )
        }

        return (
            <div className="">
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="answerTip">
                            <h6>
                                EOS Amount
                            </h6>
                        </Label>
                        <Input type="number"
                               name="answerTip"
                               value={this.state.tipAmount}
                               onChange={this.handleTipAmountChange}
                               id="answerTip"
                        />
                    </FormGroup>

                    <Button color="secondary" className="btn-block mb-1">Submit</Button>
                    <Button color="danger" className="btn-block" type="button" onClick={this.props.onCancel}>Cancel</Button>
                </Form>
            </div>
        )
    }
}

export default PostTipButton;