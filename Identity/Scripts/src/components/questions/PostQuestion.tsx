import * as React from "react";
import {QuestionsClient, PostQuestionDTO} from '../../api/EosAskApiFetch'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Redirect } from 'react-router-dom';

interface Props {
}

interface State {
    title: string;
    text: string;
    error: string;
    questionsClient: QuestionsClient;
    questionId: number;
    redirectToQuestion: boolean;
}

class PostQuestion extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.state = {
            title: '',
            text: '',
            error: '',
            questionsClient: new QuestionsClient(),
            redirectToQuestion: false,
            questionId: null
        }
    }
    
    handleBodyChange(event) {
        this.setState({
            text: event.target.value,
            error: ''
        })
    }
    
    handleTitleChange(event) {
         this.setState({
            title: event.target.value,
            error: ''
        })
    }
    
    handleSubmit(event) {
        let model = PostQuestionDTO.fromJS({
            title: this.state.title,
            text: this.state.text,
        });
        
        this.state.questionsClient.postQuestion(model).then((question) => {
            if (question == null) {
                // handle error
                console.log("couldn't post for some reason");
            }

            this.setState({
                redirectToQuestion: true,
                questionId: question.questionId
            });
        });
        
        event.preventDefault();
    }
    
    render() {
        if (this.state.redirectToQuestion) {
            return (
                <Redirect to={`/questions/view/${this.state.questionId}`}/>
            )
        }
        
        return (
            <div className="mt-3">
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="questionTitle">Title</Label>
                        <Input type="textarea" 
                               name="questionTitle" 
                               id="questionTitle" 
                               onChange={this.handleTitleChange}
                               placeholder="What is your programming question today?" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="questionText">Body</Label>
                        <Input type="textarea" 
                               name="questionText" 
                               value={this.state.text}
                               onChange={this.handleBodyChange}
                               id="questionText" 
                               placeholder="Describe your question." />
                    </FormGroup>
                    
                    <Button color="primary" className="btn-block">Submit</Button>
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

export default PostQuestion;