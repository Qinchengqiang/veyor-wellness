import React from "react";
import '../assets/styles/App.scss';
import loadable from "@loadable/component";

const BookingPage = loadable(() => import('./bookingSystem/bookingPage'));

function App() {

    return (
        <div className="App h-100 container d-flex flex-column align-items-center" data-testid={`App`}>
            <BookingPage/>
        </div>
    );
}

export default App;
