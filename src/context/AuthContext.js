// Import react module and components
import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Loader from "react-loader-spinner";
// import helpers
import tokenState from '../helpers/tokenState.js';

export const AuthContext = createContext({});

/**
 * 
 * Authentication logic for the app 
 * @param {*} children 
 * @returns void
 */
export default function AuthContextProvider({ children }) {
    // Set default states
    const [isAuth, toggleIsAuth] = useState({ isAuth: false, user: null, status: 'pending' });
    const history = useHistory();

    /**
     * Mounting phase
     * checks for existing tokens and mounts the state
     */
    useEffect(() => {
        // Fetch token from localStorage
        const token = localStorage.getItem('token');

        if (token && tokenState(token)) {
            fetchUserData(token);
        } else {
            // Set default values
            toggleIsAuth({ ...isAuth, status: 'done' });
        }
    }, []);

    /**
     * 
     * Sets the user JWT token and IsAuth
     * @param {*} JWT 
     */
    function login(JWT) {
        // insert JWT into local storage, fetch user data and set auth = true
        localStorage.setItem('token', JWT);
        //set user data
        const token = jwtDecode(JWT);
        toggleIsAuth({ user: { id: token.sub }, isAuth: true, status: 'done' });
        // goto profile page
        history.push('/profile');
    }

    /**
     * 
     * Removes the JWT token, sets the authState to false and redirects to the hompeage
     */
    function logout() {
        // Remove token and unset authentication
        localStorage.removeItem('token')
        toggleIsAuth({ isAuth: false, user: null, status: 'done' });
        // Goto homepage
        history.push('/');
    }

    async function fetchUserData(JWT) {
        // Fetch the user data with the given token
        axios.get(`https://polar-lake-14365.herokuapp.com/api/user`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JWT}`,
            }
        }).then(({ data }) => {
            // Set the recieved user data into the state
            toggleIsAuth({
                isAuth: true,
                user: {
                    email: data.email,
                    username: data.username,
                    id: data.id
                },
                status: 'done'
            });
            // If something goes wrong it means the do nothing
        }).catch((e) => {
            toggleIsAuth({ isAuth: false, user: null, status: 'done' });
        });
    }

    // Set ContextData which are being exported
    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login,
        logout,
        fetchUserData
    };

    // app auth wrapper
    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'done' ? children :
                <div style={{ textAlign: "center" }}>
                    <h1>Loading... please wait.</h1>
                    <Loader type="TailSpin" color="#00BFFF" height={400} width={400} />
                </div>}
        </AuthContext.Provider>
    );
}