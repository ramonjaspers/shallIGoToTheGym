// Import react module and components
import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Loader from 'react-loader-spinner';
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
 * @returns {AuthContext.Provider} AuthContext app wrapper
 */
export default function AuthContextProvider({ children }) {
    // Set default states
    const [isAuth, toggleIsAuth] = useState({ isAuth: false, user: null, status: 'pending' });
    const history = useHistory();

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
                fetchUser(token).catch(e => toggleIsAuth({ ...isAuth, status: 'done' }));
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
        // Goto homepage
        history.push('/');
    }

    /**
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
                    id: data.id
                },
                status: 'done'
            });
            // If something goes wrong, log error and do nothing
        }).catch((e) => {
            toggleIsAuth({ ...isAuth, status: 'done' });
            throw new Error('Fetching user failed');
        });
    }

    /**
     * Fetches the user data from the external NOVI heorku API
     * @param {string} JWT JSON Web Token
     * @throws {Error} optionally throws an error
     * @returns {void} returns nothing
     */
    const updateUser = async (JWT, newEmail, password) => {
        // create a URLSearchParam object so we can pass keys only if they are needed
        const apiParams = new URLSearchParams();
        // Set the data we want to update
        apiParams.append('email', newEmail);
        password && apiParams.append('password', password);
        // Fetch the user data with the given token
        await axios.post('https://polar-lake-14365.herokuapp.com/api/user/update/', {
            data: { apiParams },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JWT}`,
            }
        }).then(({ data }) => {
            console.log(data);
        }).catch((e) => {
            console.log(e);
            throw new Error('Updating user');
        });
    }


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
                    <Loader type='TailSpin' color='#00BFFF' height={400} width={400} />
                </div>
            }
        </AuthContext.Provider>
    );
}