import {cleanup, render, screen} from '@testing-library/react';  // testing-library
import renderer from 'react-test-renderer';
import React from 'react';
import BookingPage from "../components/bookingSystem/bookingPage";

const AppWrapper = () => {

    return (
        <BookingPage/>
    )
}

afterEach(() => {
    cleanup();
});

describe('App group:', () => {
    // test 1
    it('App test 1: render newBooking page', () => {
        render(<AppWrapper/>);
        const BookEle = screen.getByTestId('Booking');
        expect(BookEle).toBeInTheDocument();
    })

    // test 2
    test('App test 2: title', () => {
        render(<AppWrapper/>);
        const linkElement = screen.getByText(/Book a wellness session/i);
        expect(linkElement).toBeInTheDocument();
    });

})


/**
 * snapshot test (using react-test-renderer)
 */
test('App test: matches snapshot', () => {
    const tree = renderer.create(<AppWrapper/>).toJSON();
    expect(tree).toMatchSnapshot();                 // failed，press ‘u’ to update. (jest -u)
})