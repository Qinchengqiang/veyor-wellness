import React from 'react';
import '../../assets/styles/bookingSystem/bookingPage.scss';


const BookingPage = props => {
    return (
        <div className='booking h-100 d-flex flex-column align-items-center'>
            <h1 data-testid={`Booking`}>Book a wellness session.</h1>
            <p className='mt-4'>Visit one of our expert consultant to get yourself feeling 100% again.</p>
            <div className='tabs mt-4 d-flex flex-row align-items-stretch'>
                <div className='tab h-100 p-2 border-left-radius3 d-flex flex-row align-items-center zIndex2'>
                    <div className='tabLeft'>Choose Appointment</div>
                    <div className='tabTriangle'></div>
                </div>
                <div className='tab h-100 p-2 d-flex flex-row align-items-center border-left-0 zIndex1'>
                    <div className='tabLeft paddingLeft'>Your info</div>
                    <div className='tabTriangle'></div>
                </div>
                <div className='tab h-100 p-2 d-flex flex-row align-items-center border-left-0 border-right-radius3'>
                    <div className='tabLeft paddingLeft'>Confirmation</div>
                </div>
            </div>

        </div>
    );
};

export default BookingPage;