import * as React from 'react';
import {ManageableItem} from './models/ManageableItem';
import {Grid, Input, Button} from 'semantic-ui-react';
import {Formik, Form, Field} from 'formik';
import IndividualManageableItem from './components/IndividualManageable';
import { AppActions } from './models/action';
import { RootState } from './store';
import { ThunkDispatch } from 'redux-thunk';
import { getManageableItems, createNewManageable} from './store/actions';
import { connect } from 'react-redux';

export interface IAppProps {
  manageableItemList?: ManageableItem[];
}

interface IAppStateProps {}

interface IAppDispatchProps {
  getManageableItems: () => void;
  createNewManageable: (newManageableItem: ManageableItem) => void;
}

type Props = IAppProps & IAppStateProps & IAppDispatchProps;

export class App extends React.Component<Props> {
 
  componentDidMount() {
    this.props.getManageableItems();
  }

  createNewManageable(newManageableItem: ManageableItem) {
    this.props.createNewManageable(newManageableItem);
  }

  public render() {
    let {manageableItemList} = this.props;
    let manageableLoop: JSX.Element[];

    if (manageableItemList) {
      manageableLoop = manageableItemList.map(individualManageable => {
        return <IndividualManageableItem manageableItem={individualManageable} />
      })
    } else {
      manageableLoop = [<React.Fragment />]
    }

    return (
      <React.Fragment>
        <Grid centered>
          <Grid.Row>
            {manageableLoop}
          </Grid.Row>

          <Grid.Row>
            <Formik
            initialValues = {{
              id: "0",
              isDone: false,
              title: "",
              dueAt: "2020-01-06T17:08:19",
              userId: ""
             }}
            onSubmit={(data: ManageableItem) => {
              this.createNewManageable(data);
            }}>
              {({values, handleChange, handleBlur}) => (
                <Form>
                  <div>
                    <h3>Create Task</h3>
                    <Field placeholder="title..." name="title" type="input" as={Input} />
                  </div>
                  <div>
                    <Button
                    type="submit" color="green">
                      Submit
                    </Button>
                  </div>
                </Form>
              )}

            </Formik>
          </Grid.Row>
        </Grid>

      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: RootState): IAppStateProps => {
  return {
    manageableItemList: state.manageableReducer.manageableItems
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, undefined, AppActions>
): IAppDispatchProps => {
  return {
    getManageableItems: () => {
      dispatch((getManageableItems()));
    },
    createNewManageable: (newManageableItem: ManageableItem) => {
      dispatch((createNewManageable(newManageableItem)));
    }
  }
};

export default connect<IAppStateProps, IAppDispatchProps, IAppProps, RootState>(
  mapStateToProps, mapDispatchToProps
)(App);