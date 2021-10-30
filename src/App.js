import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Goals from './pages/Goals';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import TDEE from './pages/TDEE';
import Quiz from './pages/Quiz';
import Exercises from './pages/Exercises';
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
    function PrivateRoute({ children, authState, ...rest }) {
        return (
            <Route {...rest}>
                {authState ? children : <Redirect to="/" />}
            </Route>
        );
    }

    return (
        <div class='box'>
            <Navigation />
            <>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/goals/:goal">
                        <Goals />
                    </Route>
                    <Route path="/goals/">
                        <Goals />
                    </Route>
                    <Route exact path="/home" >
                        <Home />
                    </Route>
                    <Route exact path="/tdee" >
                        <TDEE />
                    </Route>
                    <Route exact path="/quiz" >
                        <Quiz />
                    </Route>
                    <Route exact path="/exercises" >
                        <Exercises />
                    </Route>
                    <Route exact path="/login" >
                        <Login />
                    </Route>
                    <Route exact path="/signup">
                        <SignUp />
                    </Route>
                    <PrivateRoute exact path="/profile" authState={isAuth}>
                        <Profile />
                    </PrivateRoute>
                    <PrivateRoute exact path="/logout" authState={isAuth}>
                        <Profile />
                    </PrivateRoute>
                </Switch>
            </>
            <Footer />
        </div>
    );
};
