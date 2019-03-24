import * as React from "react";
import {PostAnswerDTO, AnswersClient} from '../../../api/EosAskApiFetch'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Redirect } from 'react-router-dom';

interface Props {
    questionId: number;
}

interface State {
    text: string;
    error: string;
    answersClient: AnswersClient;
}

export default class PostAnswer extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        
        this.state = {
            text: '',
            error: '',
            answersClient: new AnswersClient()
        }
    }

    handleSubmit(event) {
        let model = PostAnswerDTO.fromJS({
            text: this.state.text,
            questionId: this.props.questionId
        });

        this.state.answersClient.postAnswer(model).then(() => {
            location.reload();
        });

        event.preventDefault();
    }

    handleBodyChange(event) {
        this.setState({
            text: event.target.value,
            error: ''
        })
    }
    
    render() {
        return (
            <div className="mt-3">
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="questionText">
                            <h6>
                                Add your own answer
                            </h6>
                        </Label>
                        <Input type="textarea"
                               name="questionText"
                               value={this.state.text}
                               onChange={this.handleBodyChange}
                               id="questionText"
                               rows="6"
                               />
                    </FormGroup>

                    <Button color="primary" className="">Post Answer</Button>
                    {this.state.error.length > 0 &&
                    <div>
                        {this.state.error}
                    </div>
                    }
                </Form>
            </div>
        )
    }
}