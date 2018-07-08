import React from 'react';

class TimerConfig extends React.Component {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(ev) {
        const newBaseTime = this.props.baseTime;

        if (ev.target.id === 'minutes') newBaseTime.subtract(newBaseTime.get('minutes'), 'minutes').add(parseInt(ev.target.value, 10), 'minutes');


        this.props.setBaseTime(newBaseTime);
    }

    render() {
        return (
            <div className="timerForm">
                <h4>Set Timer</h4>
                <label htmlFor="minutes">Minutes</label>
                <input 
                    id="minutes" 
                    type="text" 
                    className="" 
                    type="number"  
                    defaultValue={this.props.baseTime.get('minutes')} 
                    onChange={this.handleChange}
                />
            </div>

        )
    }
}; 

export default TimerConfig;