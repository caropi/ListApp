import React from 'react';
import moment from 'moment';
import TimerDisplay from './TimerDisplay/components/TimerDisplay.js';
import TimerButton from './TimerButton/components/TimerButton.js';
import TimerConfig from './TimerConfig/components/TimerConfig.js';
import * as timerStates from './timerStates.js';
class Timer extends React.Component {
    constructor() {
        super();
        this.state = {
            currentTime: moment.duration(5, 'minutes'),
            baseTime: moment.duration(5, 'minutes'),
            timerState: timerStates.NOT_SET,
            timer: null,
        }

        this.setBaseTime = this.setBaseTime.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.reduceTimer = this.reduceTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
    }

    setBaseTime(newBaseTime) {
        this.setState({
            baseTime: newBaseTime,
            currentTime: newBaseTime
        })
    }

    startTimer() {
        this.setState({
            timerState: timerStates.RUNNING,
            timer: setInterval(this.reduceTimer, 1000)
        });
    }

    reduceTimer() {
        if(this.state.currentTime.get('minutes') === 0 
                && this.state.currentTime.get('seconds') === 0
        )
        {
            this.completeTimer();
            return;
        }

        const newTime = moment.duration(this.state.currentTime);
        newTime.subtract(1, 'second');

        this.setState({
            currentTime: newTime
        });
    }

    stopTimer() {
        if (this.state.timer) {
            clearInterval(this.state.timer);
        }
        this.setState({
            timerState: timerStates.NOT_SET,
            timer: null,
            currentTime: moment.duration(this.state.baseTime)
        });
    }

    completeTimer() {
        if(this.state.timer) {
            clearInterval(this.state.timer);
        }

        this.setState({
            timerState: timerStates.COMPLETE,
            timer: null,
        })
    }

    render() {
        return (
            <div className = "pomodoroContainer" >
                <h3>Time Your Routine</h3>
                <p>Need a bit of help keeping track of wait times or too lazy to get your phone or open a new tab and google '5 minute timer'? We've got you covered <i class="far fa-heart"></i>. Use this timer to help you know when to move to the next step in your routine. Click the <i className="fas fa-info-circle"></i> on the main page for more details on wait times.</p>
                <TimerDisplay 
                    currentTime={this.state.currentTime} 
                    timerState={this.state.timerState}
                />
                <TimerButton 
                    startTimer={this.startTimer} 
                    timerState={this.state.timerState}
                    stopTimer={this.stopTimer}
                />
                {
                    (this.state.timerState !== timerStates.RUNNING)
                    &&
                        (<TimerConfig 
                            baseTime={this.state.baseTime}
                            setBaseTime={this.setBaseTime}
                        />)
                }
            </div>
        );
    }
}

export default Timer;