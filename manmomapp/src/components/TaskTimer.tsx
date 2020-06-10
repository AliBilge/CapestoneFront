import React from "react";
import Timer from 'react-compound-timer';
import {Container, Button} from "semantic-ui-react";

class TaskTimer extends React.Component {
    
    render() {
        return (
<Timer
    initialTime={1500000}
    startImmediately={false}
    direction="backward"
>
{({ start, pause, reset, timerState}: any) => (
                    <React.Fragment>
                        <Container className="timerFace">
                            <Timer.Minutes /> minutes<br />
                            <Timer.Seconds /> seconds
                  <br /><br />
                        </Container>

                        <Button.Group size='large'>
                            <button className=" ui orange button" onClick={start}>
                                <i className="play icon"></i>
                            </button>
                            <button className=" ui orange button" onClick={pause}>
                                <i className="pause icon"></i>
                                </button>
                                <button className="ui orange button" onClick={reset}>
                                    <i className="repeat icon"></i>
                                </button>
                            </Button.Group>
                        
                    </React.Fragment>
                )}
</Timer>
        )
    }
}

export default TaskTimer