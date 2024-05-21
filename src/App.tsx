import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import OnBoarding_1 from "./pages/OnBoarding/OnBoarding_1";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" Component={OnBoarding_1}/>
            </Routes>
        </Router>
    );
}

export default App;
