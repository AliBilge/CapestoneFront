import * as React from 'react';
import {ManageableItem} from './models/ManageableItem';
import {Input, Button, Grid} from 'semantic-ui-react';
import {Formik, Form, Field} from 'formik';
import IndividualManageableItem from './components/IndividualManageable';
import { AppActions } from './models/action';
import { RootState } from './store';
import { ThunkDispatch } from 'redux-thunk';
import { getManageableItems, createNewManageable} from './store/actions';
import { connect } from 'react-redux';
import TaskTimer from './components/TaskTimer';
import BreakTimer from './components/BreakTimer';
import Picker from './components/DatePicker'
import './App.css';

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
        <Grid container columns={8}>  
      <Grid.Row></Grid.Row>
        <Grid.Column className="headerIcon">
          <i className="calendar check outline icon massive"></i>
        </Grid.Column>
        <Grid.Column>
          <h1> Manageable Moments</h1>
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>
      {/*  ===============  Date slider  =====================*/}
      <Grid container columns={5}> 
        <Grid.Column></Grid.Column>
        <Grid.Column>
          <button className="circular orange ui icon button">
            <i className="angle left icon" />
          </button>
        </Grid.Column>
        <Grid.Column>
        <Picker />
          <h2> Today's Date </h2>
        </Grid.Column>
        <Grid.Column>
          <button className="circular orange ui icon button">
            <i className="angle right icon " />
          </button>
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>
      {/*  ===============  Timers task block =====================*/}
      <Grid container columns={5} stackable>
        <Grid.Column></Grid.Column>
        <Grid.Column className="timer">
          <BreakTimer /><h4>BREAK TIME</h4>
          </Grid.Column>
          <Grid.Column></Grid.Column>
          <Grid.Column className="timer">
          <TaskTimer /><h4>TASK TIME</h4>
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>

      {/*  ===============  Priority task block =====================*/}
      <Grid container columns={3} stackable>
        <Grid.Column></Grid.Column>
        <Grid.Column>
          <div className="ui raised segments">
            <div className="ui segment">
              <h4>Today's Priority Task</h4>
            </div>
            <div className="ui segment">
              <p>Finish website </p>
            </div>
          </div>
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>

      {/*  ===============  Additional tasks block =====================*/}
      <Grid container columns={3} stackable>
        <Grid.Column></Grid.Column>
        <Grid.Column>
          <div className="ui raised segments">
            <div className="ui segment">
              <h4>Additional Tasks</h4>
            </div>
           {/** Formic added from here */}
           <div>
              {manageableLoop}
            </div>
            <Formik
              initialValues = {{
                id: "0",
                isDone: false,
                title: ""
              }}
              onSubmit={(data: ManageableItem) => {
                this.createNewManageable(data);
              }}>
                {({values, handleChange, handleSubmit, handleBlur}) => (
                  <Form>
                    <div>
                      <Field placeholder="title..." name="title" type="input" as={Input} />
                    </div>
                    <div><br/>
                      <Button
                      type="submit" className="tiny orange ui button">
                        Add Task
                      </Button>   
                    </div>
                  </Form>
                )}
            </Formik>   
          </div>
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>

      <Grid container columns={3}>
        <Grid.Column></Grid.Column>
        <Grid.Column><h4>Designed by Code Warriors<br />2020</h4></Grid.Column>
        <Grid.Column></Grid.Column>
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