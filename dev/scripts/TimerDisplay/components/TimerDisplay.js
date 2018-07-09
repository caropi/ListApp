import React from 'react';
import * as timerStates from '../../timerStates.js';

const leftPad = (val) => {
    if (val < 10) return `0${val}`;

    return `${val}`;
}



const TimerDisplay = (props) => (
    <div>
        
        <h4 className="timerDisplay">
            {`${leftPad(props.currentTime.get('minutes'))}:${leftPad(props.currentTime.get('seconds'))}`}
        </h4>

    </div>
);

export default TimerDisplay;