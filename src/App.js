import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext.js';
import Navigation from './components/Navigation.js';
import Footer from './components/Footer.js';
import Home from './pages/Home.js';
import Goals from './pages/Goals.js';
import Login from './pages/Login.js';
import Logout from './pages/Logout.js';
import SignUp from './pages/SignUp.js';
import Profile from './pages/Profile.js';
import TDEE from './pages/TDEE.js';
import Quiz from './pages/Quiz.js';
import Exercises from './pages/Exercises.js';
import './assets/styles/App.css';

export default function App() {
    const { isAuth } = useContext(AuthContext);

    /**
     * renders the correct nodes based on the user state
     * 
     * @param {object} children contains the underlaying nodes
     * @param {boolean} authState contains the user state
     * @param {object} rest provides the data
     * @returns 
     */
    const PrivateRoute = ({ children, authState }) => {
        return authState ? children : <Navigate to="/" replace />;
    };

    return (
        <div className='box'>
            <Navigation />
            <>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/goals/:goal" element={<Goals />} />
                    <Route path="/goals/" element={<Goals />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/tdee" element={<TDEE />} />
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path="/exercises" element={<Exercises />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/profile" element={
                        <PrivateRoute authState={isAuth}>
                            <Profile />
                        </PrivateRoute>
                    } />
                    <Route path="/logout" element={
                        <PrivateRoute authState={isAuth}>
                            <Logout />
                        </PrivateRoute>
                    } />
                </Routes>
            </>
            <Footer />
        </div>
    );
};
