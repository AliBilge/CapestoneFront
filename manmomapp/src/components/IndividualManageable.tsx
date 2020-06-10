import * as React from 'react';
import { ManageableItem } from '../models/ManageableItem';
import {Button} from 'semantic-ui-react';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store';
import { AppActions } from '../models/action';
import { 
    toggledDoneStatusForManageable, 
    updatingAllManageable, 
    deleteManageable 
} from '../store/actions';
import { connect } from 'react-redux';

export interface IIndividualManageableItemProps {
    manageableItem: ManageableItem;
}

interface IIndividualManageableItemStateProps {}

interface IIndividualManageableItemDispatchProps {
    deleteManageableItems: (id: string) => void;
    toggledDoneStatusForManageable: (id: string) => void;
    updatingAllManageable: (manageable: ManageableItem) => void;
}

type Props = IIndividualManageableItemProps & IIndividualManageableItemStateProps & IIndividualManageableItemDispatchProps;

export class IndividualManageableItem extends React.Component<Props> {

    private deleteManageableItem(id: string): void {
        let {deleteManageableItems} = this.props;
        deleteManageableItems(id);
    }

    private UpdateContent(manageableItem: ManageableItem): void {
        let {updatingAllManageable} = this.props;
        updatingAllManageable(manageableItem);
    }

    private ToggleContent(id: string): void {
        let {toggledDoneStatusForManageable} = this.props;
        toggledDoneStatusForManageable(id);
    }

    public render() {
        let {manageableItem} = this.props;
        return (
            <div>
                <div className="ui segment">
                    <h3>{`${manageableItem.title}`}</h3>
                    <p>{`Competed : ${manageableItem.isDone}`} </p>
                </div>
                <Button className="tiny orange ui button"
                    onClick={() => this.UpdateContent(manageableItem)}>
                    Priority
                </Button>
                <Button className="tiny orange ui button" 
                    onClick={() => this.ToggleContent(manageableItem.id)}>
                    Completed
                </Button>
                <Button className="tiny orange ui button" 
                    onClick={() => this.deleteManageableItem(manageableItem.id)}>
                    Delete
                </Button>
            </div>   
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
    }
}

const mapDispatchToProps = (
    dispatch: ThunkDispatch<RootState, undefined, AppActions>
): IIndividualManageableItemDispatchProps => {
    return {
        deleteManageableItems: (id: string) => {
            dispatch(deleteManageable(id));
        },
        toggledDoneStatusForManageable: (id: string) => {
            dispatch(toggledDoneStatusForManageable(id));
        },
        updatingAllManageable: (manageable: ManageableItem) => {
            dispatch(updatingAllManageable(manageable));
        }
    };
};

export default connect<IIndividualManageableItemStateProps, 
IIndividualManageableItemDispatchProps, 
IIndividualManageableItemProps, 
RootState>(
    mapStateToProps,
    mapDispatchToProps
)(IndividualManageableItem);