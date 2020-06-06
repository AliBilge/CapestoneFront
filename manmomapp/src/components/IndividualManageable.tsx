import * as React from 'react';
import { ManageableItem } from '../models/ManageableItem';
import {Grid, Button} from 'semantic-ui-react';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store';
import { AppActions } from '../models/action';
import { deleteManageable } from '../store/actions';
import { connect } from 'react-redux';

export interface IIndividualManageableItemProps {
    manageableItem: ManageableItem;
}

interface IIndividualManageableItemStateProps {}

interface IIndividualManageableItemDispatchProps {
    deleteManageableItems: (id: string) => void;
}

type Props = IIndividualManageableItemProps & IIndividualManageableItemStateProps & IIndividualManageableItemDispatchProps;

export class IIndividualManageableItem extends React.Component<Props> {

    private deleteManageableItem(id: string): void {
        let {deleteManageableItems} = this.props;
        deleteManageableItems(id);
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
                      <h3>{`Is Done: ${manageableItem.isDone}`}</h3>
                      <h3>{`Moments Id: ${manageableItem.id}`}</h3>
                      <h3>{`User Id: ${manageableItem.userId}`}</h3>
                  </Grid.Column>
                  ><Grid.Column width={3}>
                      <Button
                      onClick={() => this.deleteManageableItem(manageableItem.id)}
                      color="red">
                          Delete The Moment
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
    };
};

export default connect<IIndividualManageableItemStateProps, IIndividualManageableItemDispatchProps, IIndividualManageableItemProps, RootState>(
    mapStateToProps,
    mapDispatchToProps
)(IIndividualManageableItem);