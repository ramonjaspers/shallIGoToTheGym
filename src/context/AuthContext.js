// Import react module and components
import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Loader from "react-loader-spinner";
// import helpers
import tokenState from '../helpers/tokenState.js';

/**
 * Serves a context which holds the context data in the app so it can be accessed wherever
 */
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
     * 
     * Mounting phase
     * checks for existing tokens and mounts the state
     */
    useEffect(() => {
        // Fetch token from localStorage
        const token = localStorage.getItem('token');

        if (token) {
            if (tokenState(token)) {
                // Fetch the user data since token is set and valid
                fetchUserData(token);
            } else {
                // Logout since token is not valid
                logout();
            }
        } else {
            // Set default values since there is no token
            toggleIsAuth({ ...isAuth, status: 'done' });
        }
    }, []);

    /**
     * 
     * Sets the user JWT token and IsAuth
     * @param {*} JWT 
     */
    const login = (JWT) => {
        // insert JWT into local storage, fetch user data and set auth = true
        localStorage.setItem('token', JWT);
        //set user data
        const token = jwtDecode(JWT);
        toggleIsAuth({ user: { id: token.sub }, isAuth: true, status: 'done' });
    }

    /**
     * 
     * Removes the JWT token, sets the authState to false and redirects to the hompeage
     */
    const logout = () => {
        // Remove token and unset authentication
        localStorage.removeItem('token')
        toggleIsAuth({ isAuth: false, user: null, status: 'done' });
        // Goto homepage
        history.push('/');
    }

    const fetchUserData = async (JWT) => {
        // Fetch the user data with the given token
        await axios.get(`https://polar-lake-14365.herokuapp.com/api/user`, {
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
            // If something goes wrong, log error and do nothing
        }).catch((e) => {
            toggleIsAuth({ ...isAuth, status: 'done' });
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