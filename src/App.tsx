import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import OnBoarding_1 from "./pages/OnBoarding/OnBoarding_1";
import Register from "./pages/SignUp/Register";
import Login from "./pages/Login/Login";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" Component={OnBoarding_1}/>
                <Route path="/register" Component={Register} />
                <Route path="/login" Component={Login} />
            </Routes>
        </Router>
    );
}

export default App;
