import * as React from 'react';
import {BountyDTO, IdentityUser} from "../../../api/EosAskApiFetch";

interface ListViewProps {
    bounty?: BountyDTO;
}

export class BountyListView extends React.Component<ListViewProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.bounty == null) {
            return null;
        }

        return (
            <div>
                <strong> Bounty: {this.props.bounty.amount} {this.props.bounty.amountSym.toUpperCase()} </strong>
                <BountyStatus {...this.props.bounty.awarded} init={()=>{}} toJSON={()=>{}}/>
            </div>
        )
    }
}

interface FullViewProps {
    bounty: BountyDTO
}

export class BountyFullView extends React.Component<FullViewProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.bounty == null) {
            return null;
        }
        
        return (
            <div>
                <strong> Bounty: {this.props.bounty.amount} {this.props.bounty.amountSym.toUpperCase()} </strong>
                <BountyStatus {...this.props.bounty.awarded} init={()=>{}} toJSON={()=>{}}/>
            </div>
        )
    }
}

function BountyStatus(props: IdentityUser) {
    if (props.userName) {
        return (
            <small className="text-secondary">(Claimed - {props.userName})</small>
        )
    }
    
    return (
        <small className="text-success">(Active)</small>
    )
}