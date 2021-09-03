import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/bookingSystem/chooseStep.scss';
import _ from 'lodash';

const nextButton = (currentStep, setCurrentStep, _next) => {
    if (currentStep < 3) {
        return (
            <button className="btn step-btn btn-primary float-right"
                    type="button" onClick={() => _next(currentStep, setCurrentStep)}>
                Continue<span>>></span>
            </button>
        )
    }
    return null;
}

const ChooseStep = props => {
    const [errors, setErrors] = useState({});
    const [appointmentList, setAppointmentList] = useState('');
    const [appointment, setAppointment] = useState({
        "name": "",
        "price": ""
    });

    useEffect(() => {
        setAppointmentList([
            {
                "name": "Physiotherapy",
                "price": "$45.00"
            },
            {
                "name": "Chiro",
                "price": "$100.00"
            },
            {
                "name": "Aroma Therapy",
                "price": "$45.00"
            }
        ])
    }, []);

    if (props.currentStep !== 1) return null;

    const choose = (
        <div className="form-group mt-4">
            {(appointmentList || []).map(item => (
                <div className='card w-100 text-start mb-2 p-2'
                     key={item.name}
                     onClick={() => setAppointment(item)}
                >
                    <p>{item.name}</p>
                    <p>30 minutes @ {item.price}</p>
                </div>))}
        </div>
    )

    const datePicking = (
        <p>{appointment.name}</p>
    )

    return (
        <>

            { _.isEmpty(appointment.name)? choose : datePicking}

            <div className='w-100 text-start mt-4 mb-4'>
                {nextButton(props.currentStep, props.setCurrentStep, props.next)}
            </div>

        </>
    );
};

ChooseStep.propTypes = {
    currentStep: PropTypes.number.isRequired,
};

export default React.memo(ChooseStep);