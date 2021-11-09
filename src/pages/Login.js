import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import useWorkoutState from '../helpers/WorkoutHelper';
import Loader from 'react-loader-spinner';
// background image
import defaultBG from '../assets/images/defaultBG.jpeg';

export default function Login() {
  // Init hooks
  const { login, isAuth } = useContext(AuthContext);
  const { storeWorkout } = useWorkoutState();
  const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();


  /**
   * Login functionality
   * @param {*} data 
   */
  const signIn = async (data) => {
    setIsLoading(true);
    // Post login data 
    await axios.post(`https://polar-lake-14365.herokuapp.com/api/auth/signin`, {
      ...data
    }).then(({ data }) => {
      // On succesfull post try to login with the received accesstoken
      login(data.accessToken);
      if (history.location.state && history.location.state.workout) {
        // if the workout state is set we want to set this
        storeWorkout(history.location.state.workout);
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
    <div className='content' style={{ backgroundImage: `url(${defaultBG})` }}>
      <div className='container'>
        <div className='backButton' onClick={() => history.push('/')}>&#8592;</div>
        <div className="containerTitle"><h4>Login</h4></div>
        {!isAuth
          ?
          <form onSubmit={handleSubmit(signIn)}>
            <input type="text" placeholder="username" {...register("username", {
              required: 'Username is required.',
              maxLength: { value: 80, message: 'Invalid username given.' }
            })} /><br />
            {errors.username && <p className='errMssg'>{errors.username.message}</p>}
            <input type="password" placeholder="Password" {...register("password", {
              required: 'Password is required.',
              maxLength: { value: 100, message: 'Invalid password given.' }
            })} /><br />
            {errors.password && <p className='errMssg'>{errors.password.message}</p>}
            {!isLoading
              ? <input className="defaultButton" type="submit" onClick={() => clearErrors('api')} />
              : <Loader type="TailSpin" color="#00BFFF" height={150} width={150} />
            }
            <br />
            {errors.api && <p className='errMssg'>{errors.api.message}</p>}
            <p>Dont have an account? <Link to="/signup">Sign up</Link> to our platform.</p>
          </form>
          : <h4 className='errMssg'>You are already logged in</h4>
        }
      </div>
    </div>
  );
}

