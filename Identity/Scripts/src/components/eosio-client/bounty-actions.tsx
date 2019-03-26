import {Answer, AnswersClient} from "../../api/EosAskApiFetch";

const ANS_ADD = "ansadd";

export interface BountyAction {
    name: string,
    data: Object,
    fromParamName: string,
}

export function createAddAnsAction(questionId, answerId) : BountyAction {
    return {
        name: ANS_ADD,
        data: {
            question_id: questionId,
            answer_id: answerId
        },
        fromParamName: "answerer",
    }
}

export function createOnSuccessCb(bountyAction: BountyAction) : Function {
    if (bountyAction.name == ANS_ADD) {
        return async (result) => {
            console.log('result', result);
            
            await new AnswersClient().markCreatedOnBlockchain((bountyAction.data as any).answer_id);
            window.location.href = `/questions/view/${(bountyAction.data as any).question_id}`
        }
    }
}

export function createOnFailureCb(bountyAction: BountyAction) : Function {
    // can customize by checking bountyAction.name
    return (e) => {
        alert(e);
        console.log(e);
    }
}
