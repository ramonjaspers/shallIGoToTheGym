import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Exercise from '../components/Exercise';
import Loader from 'react-loader-spinner';
import axios from 'axios';
import { useForm } from 'react-hook-form';
// import css
import '../assets/styles/Profile.css'

export default function Profile() {
  const { user, fetchUser, updateUser } = useContext(AuthContext);
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const [exercises, setExercises] = useState([]);
  const [userNotice, setUserNotice] = useState({ type: null, message: null });
  const [isLoading, setIsLoading] = useState(false);
  const [isUpating, setIsUpdating] = useState(false);

  useEffect(() => {
    // if user isnt set fetch the user data one more time
    if (!user.email) {
      setIsLoading(true);
      try {
        // Fetch user data with the stored json webtoken
        fetchUser(localStorage.getItem('token'));
      } catch (e) {
        setUserNotice({ type: 'api', message: 'An error has occured, the user data seems incomplete.\n Try to login again or contact support.' });
      }
    } else {
      // get the user workout from localstorage
      const workout = getUserSpecificWorkout('workout' + user.id);
      // store the exercises in the state
      setExercises(workout.exercises);
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  /**
   * Get the user their workout
   * @param {string} JWT 
   * @returns void
   */
  const getUserSpecificWorkout = (storageKey) => {
    const workoutString = localStorage.getItem(storageKey);
    if (workoutString) {
      const workout = JSON.parse(workoutString);
      // Set the user specified workout
      return workout;
    }
    return [];
  }



  /**
       * Fetches the user data from the external NOVI heorku API
       * @param {string} JWT JSON Web Token
       * @throws {Error} optionally throws an error
       * @returns {bool} returns success=true||false
       */
  const setNewUserData = async (data) => {
    // show loader
    setIsLoading(true);
    if (data.password === data.repeatedPassword) {
      // fetch token for auth
      const token = localStorage.getItem('token');
      // Fetch the user data with the given token and params
      axios.post('https://polar-lake-14365.herokuapp.com/api/user/update', {
        ...data
      },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        }).then(({ data }) => {
          updateUser(data);
          setUserNotice({ type: 'success', message: `Data has been updated` });
          setIsUpdating(false);
        }).catch((e) => {
          setUserNotice({ type: 'failed', message: `Data has not been updated, try again.` });
        });
    } else {
      setError("repeatedPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
    }
    // when done set loading to false and stop the updating section
    setIsLoading(false);
  }

  return (
    <div className='content'>
      {!isLoading ?
        <>
          <div id='profile-wrapper'>
            {/* left bar, user info */}
            <div id='user-info'>
              {userNotice.type !== 'api' ?
                <>
                  {!isUpating ?
                    <>
                      {/* default show user info */}
                      <h2>User info</h2>
                      <p><b>Username: </b>{user.username}</p>
                      <p><b>email: </b>{user.email}</p>
                      {userNotice.type === 'success' && <p className='okM ssg'>{userNotice.message}</p>}
                      {userNotice.type === 'failed' && <p className='error-message'>{userNotice.message}</p>}
                      <button className='default-button' onClick={(() => setIsUpdating(true))}>Update email/password</button>
                    </>
                    :
                    <>
                      {/* If we are updating show update form  */}
                      {isUpating &&

                        <form onSubmit={handleSubmit(setNewUserData)}>
                        <h2>Update user</h2>
                          <label>New email: </label>
                          <input type='email' name='email' {...register("email", {
                            required: 'Email is required.',
                          })} /><br />
                          {errors.email && <p className='error-message'>{errors.email.message}</p>}
                          <p>You can change your password by inserting the new password twice: </p>
                          <label>password: </label>
                          <input type='password' minLength={6} name='password' {...register("password", {
                            required: 'Password is required.',
                            maxLength: { value: 100, message: 'Invalid password given.' },
                            minLength: { value: 6, message: 'Invalid password given.' }
                          })} /><br />
                          {errors.password && <p className='error-message'>{errors.password.message}</p>}

                          <label>Repeat password: </label>
                          <input type='password' name='repeatedPassword' minLength={6} {...register("repeatedPassword", {
                            required: 'Password is required.',
                            maxLength: { value: 100, message: 'Invalid password given.' },
                            minLength: { value: 6, message: 'Invalid password given.' }
                          })} /> <br />
                          {errors.repeatedPassword && <p className='error-message'>{errors.repeatedPassword.message}</p>}

                          <button type='button' className='cancel-button' onClick={(() => setIsUpdating(false))}>Cancel</button>
                          <button type='submit' className='default-button'>Save</button>
                        </form>
                      }
                    </>
                  }
                </>
                :
                <>
                  {/* show userNotice if one is set */}
                  <p className='error-message'>{userNotice.message}</p>
                </>
              }
            </div>
            <div id='workout-info'>
              {/* right bar, workout info */}
              <p id='workout-title'>Your saved workout</p>
              {exercises && exercises.length > 0 ?
                <>
                  <h5>To search for the exercise, just click on the exercise of choice.</h5>
                  {exercises.map(exercise =>
                    <Exercise key={exercise.id} exercise={exercise} />
                  )}
                </>
                : <h5>No workout is saved.</h5>
              }
            </div>
          </div>
        </>
        : <Loader type="TailSpin" color="#00BFFF" height={150} width={150} />
      }
    </div>
  );
}
