import React from 'react';
import { Routes, Route} from 'react-router-dom';

import LoginPage from "./components/login/LoginPage";
import SignupPage from "./components/registration/SignupPage";
import Wall from "./components/dashboard/Wall";
function App() {
    return (
        <Routes>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/sign-up' element={<SignupPage/>}/>
            <Route path='/dashboard' element={<Wall/>}/>
        </Routes>
    );
}

export default App;
