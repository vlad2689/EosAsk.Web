const ANS_ADD = "ansadd";

export interface BountyAction {
    name: string,
    data: Object,
    fromParamName: string,
}

export function createAddAnsAction(questionId) : BountyAction {
    return {
        name: ANS_ADD,
        data: {
            question_id: questionId
        },
        fromParamName: "answerer",
    }
}

export function createOnSuccessCb(bountyAction: BountyAction) : Function {
    if (bountyAction.name == ANS_ADD) {
        return (result) => {
            alert('result: ' + result);
            console.log('result', result);
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
