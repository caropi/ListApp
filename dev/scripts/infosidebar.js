import React from 'react';

//2 returns

const InfoSideBar = (props) => {
    return (
        <ol>
            {props.skincareSteps.map((step) => {
                return (
                    <li>
                        <h3>{step.name}</h3>
                        <div className="description">
                            <img src={step.img} alt={step.alt} />
                            <div className="text-container">
                                <p>
                                    {step.description}
                                </p>
                                <i className="fas fa-stopwatch" /><strong> Time to wait before moving to next step:</strong> {step.waitTime}
                                <p />
                            </div>
                        </div>
                    </li>
                )
            })}
        </ol>
    )
}

export default InfoSideBar;
