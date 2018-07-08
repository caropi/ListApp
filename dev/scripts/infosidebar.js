import React from 'react';

const InfoSideBar = (props) => {
    return (
        <ul>
            {props.skincareSteps.map((step, i) => {
                return (
                    <li key={`step=${i}`} >
                        <h3>{step.name}</h3>
                        <div className="description">
                            <img src={step.img} alt={step.alt} />
                            <div className="text-container">
                                <p>
                                    {step.description}
                                </p>
                                <p className="waitTime">
                                    <i className="fas fa-stopwatch" /><strong> Time to wait before moving to next step:</strong> {step.waitTime}
                                </p>
                            </div>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default InfoSideBar;
