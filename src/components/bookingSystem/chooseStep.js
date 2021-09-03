import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/bookingSystem/chooseStep.scss';
import "react-datepicker/dist/react-datepicker.css";
import _ from 'lodash';
import Dropdown from 'react-bootstrap/Dropdown';
import Down from 'bootstrap-icons/icons/chevron-compact-down.svg';
import DatePicker from 'react-datepicker';
import {shallowEqual, useSelector} from "react-redux";


const nextButton = (currentStep, setCurrentStep, _next) => {
    if (currentStep < 3) {
        return (
            <button className="btn step-btn btn-primary float-right" type="button"
                    onClick={() => _next(currentStep, setCurrentStep)}>
                Continue<span>>></span>
            </button>
        )
    }
    return null;
};

const filterBookedDate = (allBookings) => {
    let curDate = new Date().toLocaleDateString();
    console.log(curDate);

}

const ChooseStep = props => {
    const appointmentsRedux = useSelector(state => state.appointments, shallowEqual);
    const allBookingsRedux = useSelector(state => state.allBookings, shallowEqual);

    const [appointmentList, setAppointmentList] = useState('');
    const [appointment, setAppointment] = useState({"name": "", "price": ""});

    const [startDate, setStartDate] = useState(new Date());
    const [bookedDate, setBookedDated] = useState({})


    useEffect(() => {
        setAppointmentList(appointmentsRedux.data)
    }, [appointmentsRedux]);

    useEffect(() => {
        if (!_.isEmpty(allBookingsRedux.data)){
            const latestBookedDates = filterBookedDate(allBookingsRedux)
        }
    },[allBookingsRedux])

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

    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    };

    const datePicking = (
        <>
            <p>{appointment.name}</p>

            <Dropdown className='choose-dropdown w-100'>
                <Dropdown.Toggle id="dropdown-basic"
                                 className='w-100 p-1 d-flex flex-row align-items-center justify-content-between'>
                    <div className='Toggle-card text-start p-2'>
                        <p>{appointment.name}</p>
                        <p>30 minutes @ {appointment.price}</p>
                    </div>
                    <div className='downIcon'>
                        <img src={Down} alt='down'/>
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {(appointmentList || []).map(item => (
                        <Dropdown.Item key={item.name} onClick={() => setAppointment(item)}>
                            <div className='card w-100 text-start mb-2 p-2'>
                                <p>{item.name}</p>
                                <p>30 minutes @ {item.price}</p>
                            </div>
                        </Dropdown.Item>))}
                </Dropdown.Menu>
            </Dropdown>

            <div className='w-100 d-flex flex-row justify-content-center'>
                <div className='datePicker-box mt-5 w-100 d-flex flex-row justify-content-center'>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        filterDate={isWeekday}
                        placeholderText={startDate.toString()}
                    />
                </div>
            </div>

            <div className='time-checkbox w-100 text-start'>
                <p className={'timeCheck'}>please select a time:</p>

                {['10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm'].map(time => (
                    <div key={time}>
                        <input type="checkbox" className='layers-item-selector' name={`time:${time}`} value={time}/>
                        <label htmlFor={`time:${time}`}>{time}</label><br/>
                    </div>
                ))}

                <input type="checkbox" className='layers-item-selector' name="vehicle2" value="Car" disabled={true}/>
                <label htmlFor="vehicle2" className='text-secondary'>5:00pm</label><br/>
            </div>
        </>
    )

    return (
        <>

            {_.isEmpty(appointment.name) ? choose : datePicking}

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