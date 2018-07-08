import React from 'react';
import * as timerStates from '../../timerStates.js';

class TimerButton extends React.Component {
    constructor() {
        super();

        this.getButton = this.getButton.bind(this);
    }

    getButton() {
        if (this.props.timerState === timerStates.NOT_SET)
            return (<button className="row__start" onClick={this.props.startTimer}>Start</button>);

        if (this.props.timerState === timerStates.RUNNING)
            return (<button className="row__pause" onClick={this.props.stopTimer}>Pause</button>);

        if (this.props.timerState === timerStates.COMPLETE)
            return (<button className="row__reset" onClick={this.props.stopTimer}>Reset</button>);
    }

    render() {
        return (
            <div className="row">
                {this.getButton()}
            </div>
        )
    }
} 


export default TimerButton;