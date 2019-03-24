import * as React from 'react'
import {IdentityUser, Question} from "../../../api/EosAskApiFetch";
import {Row, Col} from "reactstrap";

interface Props {
    answerId: number;
    text: string;
    question: Question;
    owner: IdentityUser;
    upvoteCount: number;
}

interface State {
    
}

export default class AnswerView extends React.Component<Props, State> {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <Row>
                    <Col xs={2}>
                        <div className="text-center">
                            {this.props.upvoteCount}
                            <div className="text-secondary">
                                Upvotes
                            </div>
                        </div>
                    </Col>
                    <Col xs={10}>
                        <h6>
                            {this.props.text}
                        </h6>
                    </Col>
                </Row>
                <hr/>
            </div>
        )
    }
}