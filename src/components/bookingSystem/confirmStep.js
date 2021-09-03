import React from 'react';
import PropTypes from 'prop-types';

const previousButton = (currentStep, setCurrentStep, _prev) => {
    if (currentStep !== 1) {
        return (
            <button className="btn btn-secondary"
                type="button" onClick={() => _prev(currentStep, setCurrentStep)}>
                Previous
            </button>
        )
    }
    return null;
}

const nextButton = (currentStep, setCurrentStep, _next) => {
    if (currentStep < 3) {
        return (
            <button
                className="btn btn-primary float-right"
                type="button" onClick={() => _next(currentStep, setCurrentStep)}>
                Continue<span>>></span>
            </button>
        )
    }
    return null;
}

const ConfirmStep = props => {

    if (props.currentStep !== 3) return null;
    return(
        <>
            <button className="btn btn-success btn-block">Sign up</button>

            {previousButton(props.currentStep, props.setCurrentStep, props.prev)}
            {nextButton(props.currentStep, props.setCurrentStep, props.next)}

        </>
    );
};

ConfirmStep.propTypes = {
    currentStep: PropTypes.number.isRequired,
};

export default React.memo(ConfirmStep);