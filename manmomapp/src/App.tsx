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
import Timer from 'react-compound-timer';

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

        {/**Trinas code */}

        <div className="App">
      <div className="ui padded grid container">
        <div className="five wide column"></div>
        <div className="two wide column">
          <i className="calendar check outline icon massive"></i>
        </div>
        <div className="six wide column">
          <h1> Manageable Moments</h1>
        </div>
        <div className="six wide column"></div>
      </div>
      <div className="ui grid container">
        <div className="six wide column"></div>
        <div className="two wide column">
          <button className="circular orange ui icon button">
            <i className="angle left icon" />{" "}
          </button>
        </div>
        <div className="four wide column">
          <div id="dateToday"></div>
          <div className="two wide column">
            <button className="circular orange ui icon button">
              <i className="angle right icon " />
            </button>
          </div>
        </div>
        <div className="ui grid container">
          <div className="six wide column"></div>
          <div className="six wide column"><div className="timerFace">
            </div>
            <Timer
    initialTime={55000}
    startImmediately={false}
    direction="backward"
>
    {({ start, pause}: any) => (
        <React.Fragment>
            <div>
                <Timer.Minutes /> min
                <Timer.Seconds /> sec
            </div>
            <br />
            <div>

            <div className="six wide column"></div>
        </div>
        <div className="ui grid container">
          <div className="four wide column"></div>
          <div className="one wide column">
            <div className="ui tiny buttons">
              <button className="ui orange button" onClick={start}>
              <i className="play icon"></i>
                </button>
              <div className="or"></div>
              <button className="ui orange button" onClick={pause}>
                <i className="pause icon"></i></button>
            </div>
          </div>
          <div className="one wide column"></div>
          <div className="three wide column">
            <div className="ui mini buttons">
              <button className="ui orange button">
                25
                <br />
                minutes
              </button>
              <button className="ui orange button">
                45
                <br />
                minutes
              </button>
              <button className="ui orange button">
                90
                <br />
                minutes
              </button>
            </div>
          </div>
          <div className="one wide column"></div>
          <div className="two wide column">
            <div className="ui tiny buttons">
              <button className="ui orange button">
                <i className="volume off icon"></i>
              </button>
              <div className="or"></div>
              <button className="ui orange button">
                <i className="volume up icon"></i>
              </button>
            </div>
          </div>

                {/*<button >Start</button>*/}
                {/*<button >Pause</button>*/}
            </div>
        </React.Fragment>
    )}
</Timer>
            </div>
          
          <div className="ui grid container">
            <div className="four wide column"></div>
            <div className="eight wide column">
              <div className="ui raised segments">
                <div className="ui segment">
                  <h4>Today's Priority Task</h4>
                </div>
                <div className="ui segment">
                  <p>Finish website </p>
                </div>
              </div>
            </div>
            <div className="ui grid container">
              <div className="four wide column"></div>
              <div className="eight wide column">
                <div className="ui raised segments">
                  <div className="ui segment">
                    <h4>Additional Tasks</h4>
                  </div>
                  <div className="ui segment">
                    <p>Link content together </p>
                  </div>
                  <div className="ui segment">
                    <p>Make it look beautiful </p>
                  </div>
                  <div className="ui button segment">
                  <button className="tiny orange ui button"> Add Task</button>
                  <button className="tiny orange ui button"> Remove Task</button>
                  <button className="tiny orange ui button"> Change Day</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="ui grid container">
              <div className="six wide column"></div>
              <div className="five wide column"><h4>Designed by Code Warriors<br/>2020</h4></div>
              <div className="six wide column"></div>
            </div>
          </div>
        </div>
      </div>
      </div>

        {/**Trinas code ends */}
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