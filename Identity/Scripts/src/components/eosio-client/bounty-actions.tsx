import {AnswersClient, BountiesClient} from "../../api/EosAskApiFetch";

const ANS_ADD = "ansadd";
const BOUNTY_ADD = "bountyadd";

export interface BountyAction {
    name: string,
    eosTransactionData: Object,
    extraData: Object,
    fromParamName: string, // the param name given in the smart contract for who is sending the transaction
}

export function createAddAnsAction(questionId: number, answerId: number): BountyAction {
    return {
        name: ANS_ADD,
        eosTransactionData: {
            question_id: questionId,
            answer_id: answerId
        },
        extraData: {},
        fromParamName: "answerer",
    }
}

export function createAddBountyAction(quantity: string, questionId: number, bountyId: number, memo: string): BountyAction {
    return {
        name: BOUNTY_ADD,
        eosTransactionData: {
            question_id: questionId,
            quantity: `${parseFloat(quantity).toFixed(4)} EOS`,
            memo
        },
        extraData: {
            bountyId: bountyId
        },
        fromParamName: "from"
    }
}

export function getEosioActionLocation(bountyAction): any {
    return {
        pathname: "/eosio_action",
        bountyAction: bountyAction
    }
}

export function createOnSuccessCb(bountyAction: BountyAction): Function {
    if (bountyAction.name == ANS_ADD) {
        return async (result) => {
            console.log('result', result);

            await new AnswersClient().markCreatedOnBlockchain((bountyAction.eosTransactionData as any).answer_id);
            window.location.href = `/questions/view/${(bountyAction.eosTransactionData as any).question_id}`;
        }
    } else if (bountyAction.name == BOUNTY_ADD) {
        return async (result) => {
            console.log('result', result);

            let bountyId = (bountyAction.extraData as any).bountyId;
            await new BountiesClient().markCreatedOnBlockchain(bountyId);
            window.location.href = `/questions/view/${(bountyAction.eosTransactionData as any).question_id}`;
        }
    }

    return () => {
    };
}

export function createOnFailureCb(bountyAction: BountyAction): Function {
    // can customize by checking bountyAction.name
    return (e) => {
        alert(e);
        console.log(e);
    }
}
