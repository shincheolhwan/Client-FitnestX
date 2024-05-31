import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import OnBoarding_1 from "./pages/OnBoarding/OnBoarding_1";
import Register from "./pages/SignUp/Register";
import Login from "./pages/Login/Login";
import Workout from "./pages/Workout/Workout";
import WorkoutHistory from "./pages/Workout/History/WorkoutHistory";
import WorkoutDetail from "./pages/Workout/Detail/WorkoutDetail";
import WorkoutDoing from "./pages/Workout/Doing/WorkoutDoing";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" Component={OnBoarding_1}/>
                <Route path="/register" Component={Register}/>
                <Route path="/login" Component={Login}/>
                <Route path="/workout" Component={Workout}/>
                <Route path="/workout/history" Component={WorkoutHistory}/>
                <Route path="/workout/:name/detail" Component={WorkoutDetail}/>
                <Route path="/workout/:name/doing" Component={WorkoutDoing}/>
            </Routes>
        </Router>
    );
}

export default App;
