// Import react module and components
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
// import helpers
import tokenState from '../helpers/tokenState.js';

/**
 * Serves a context which holds the context data in the app so it can be accessed wherever
 */
export const AuthContext = createContext({});

/**
 * 
 * Authentication logic for the app 
 * @param {object} children 
 * @returns {AuthContext.Provider} AuthContext app wrapper
 */
export default function AuthContextProvider({ children }) {
    // Set default states
    const [isAuth, toggleIsAuth] = useState({ isAuth: false, user: null, status: 'pending' });
    const navigate = useNavigate();

    /**
     * 
     * checks for existing tokens and mounts the state
     * @returns {void} returns nothing
     */
    useEffect(() => {
        // Fetch token from localStorage
        const token = localStorage.getItem('token');

        if (token) {
            if (tokenState(token)) {
                // Fetch the user data since token is set and valid
                fetchUser(token);
            } else {
                // Logout since token is not valid
                logout();
            }
        } else {
            // Set default values since there is no token
            toggleIsAuth({ ...isAuth, status: 'done' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [/* only on mount */]);

    /**
     * 
     * Enables isAuth state with userData
     * @param {object} userData userData from the recieved JWT
     * @returns {void} returns nothing
     */
    const login = (userData) => toggleIsAuth({ user: { id: userData.sub }, isAuth: true, status: 'done' });

    /**
     * 
     * Removes the JWT token, sets the authState to false and redirects to the hompeage
     * @returns {void} returns nothing
     */
    const logout = () => {
        // Remove token and unset authentication
        localStorage.removeItem('token')
        toggleIsAuth({ isAuth: false, user: null, status: 'done' });
        // Go to homepage
        navigate('/');
    };

    /**
     * 
     * Fetches the user data from the external NOVI heorku API
     * @param {string} JWT JSON Web Token
     * @throws {Error} optionally throws an error
     * @returns {void} returns nothing
     */
    const fetchUser = async (JWT) => {
        // Fetch the user data with the given token
        await axios.get('https://polar-lake-14365.herokuapp.com/api/user', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JWT}`,
            }
        }).then(({ data }) => {
            // Set the recieved user data into the state
            toggleIsAuth({
                isAuth: true,
                user: {
                    email: data.email,
                    username: data.username,
                    id: data.id,
                },
                status: 'done',
            });
        }).catch((e) => {
            // If something goes wrong, finish Auth process with default values
            toggleIsAuth({ ...isAuth, status: 'done' });
        });
    };

    /**
     * 
     * Updates isAuth state with userData
     * @param {object} userData userData from the update
     * @returns {void} returns nothing
     */
    const updateUser = (userData) => toggleIsAuth({ ...isAuth, user: { ...isAuth.user, email: userData.email } });

    // Set ContextData (params which get exported and are resusable within the context)
    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login,
        logout,
        fetchUser,
        updateUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'done'
                ? children
                : <div style={{ textAlign: 'center' }}>
                    <h1>Loading... please wait.</h1>
                    <TailSpin color='#00BFFF' height={400} width={400} />
                </div>
            }
        </AuthContext.Provider>
    );
}