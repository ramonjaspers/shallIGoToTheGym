import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import useWorkoutState from '../helpers/WorkoutHelper';
import Loader from 'react-loader-spinner';

export default function Login() {
  // Init hooks
  const { login, isAuth } = useContext(AuthContext);
  const { storeWorkout } = useWorkoutState();
  const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();


  /**
   * Login functionality
   * @param {object} data html field values aliased by name
   */
  const signIn = async (data) => {
    setIsLoading(true);
    // Post login data 
    axios.post(`https://polar-lake-14365.herokuapp.com/api/auth/signin`, {
      ...data
    }).then(({ data }) => {
      // On succesfull post try to login with the received accesstoken
      // insert JWT into local storage, fetch user data and set auth = true
      localStorage.setItem('token', data.accessToken);
      // Get user data from JWT token
      const userData = jwtDecode(data.accessToken);
      // set IsAuth login state
      login(userData);
      if (history.location.state && history.location.state.exercises ) {
        // if exercises are set in the current location state we want to store these for the logged in user.
        storeWorkout(history.location.state.exercises, data.id);
      }
      //remove loader and redirect
      setIsLoading(false);
      history.push('/profile');
    }).catch((e) => {
      setIsLoading(false);
      // Set user error
      setError("api", {
        type: "manual",
        message: "Username or password incorrect, try again",
      });
    });
  };

  return (
    <div className='content'>
      <div className='container'>
        <div className='back-button' onClick={() => history.push('/')}>&#8592;</div>
        <div className="container-title"><h4>Login</h4></div>
        {!isAuth
          ?
          <form onSubmit={handleSubmit(signIn)}>
            <input type="text" placeholder="username" {...register("username", {
              required: 'Username is required.',
              maxLength: { value: 80, message: 'Invalid username given.' }
            })} /><br />
            {errors.username && <p className='error-message'>{errors.username.message}</p>}
            <input type="password" placeholder="Password" {...register("password", {
              required: 'Password is required.',
              maxLength: { value: 100, message: 'Invalid password given.' }
            })} /><br />
            {errors.password && <p className='error-message'>{errors.password.message}</p>}
            {!isLoading
              ? <input className="default-button" type="submit" onClick={() => clearErrors('api')} />
              : <Loader type="TailSpin" color="#00BFFF" height={150} width={150} />
            }
            <br />
            {errors.api && <p className='error-message'>{errors.api.message}</p>}
            <p>Dont have an account? <Link to="/signup">Sign up</Link> to our platform.</p>
          </form>
          : <h4 className='error-message'>You are already logged in</h4>
        }
      </div>
    </div>
  );
}
