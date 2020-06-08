import * as React from 'react';
import { ManageableItem } from '../models/ManageableItem';
import {Grid, Button} from 'semantic-ui-react';
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
          <Grid celled>
              <Grid.Row>
                  <Grid.Column width={3}>

                  </Grid.Column>
                  <Grid.Column width={7}>
                      <h1>{`Title: ${manageableItem.title}`}</h1>
                      <h3>{`Due at: ${manageableItem.dueAt}`}</h3>
                      <h3>{`Task Status: ${manageableItem.isDone}`}</h3>
                      <h3>{`Moments Id: ${manageableItem.id}`}</h3>
                      <h3>{`User Id: ${manageableItem.userId}`}</h3>
                  </Grid.Column>
                  ><Grid.Column width={3}>
                      <Button
                      onClick={() => this.ToggleContent(manageableItem.id)}
                      color="green">
                          Completed
                      </Button>
                      <Button
                      onClick={() => this.UpdateContent(manageableItem)}
                      color="blue">
                          New Content
                      </Button>
                      <Button
                      onClick={() => this.deleteManageableItem(manageableItem.id)}
                      color="red">
                          Delete
                      </Button>
                  </Grid.Column>
              </Grid.Row>
          </Grid>
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