import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Exercise from '../components/Exercise';
import Loader from 'react-loader-spinner';
import { useForm } from 'react-hook-form';
// import css
import '../assets/styles/Profile.css'

export default function Profile() {
  const { user, fetchUser, updateUser } = useContext(AuthContext);
  const { handleSubmit } = useForm();
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
      console.log(workout);
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
  const setNewUserData = async (data) => {
    // show loader
    setIsLoading(true);
    try {
      if (data.password === data.secondPassword) {
        await updateUser(localStorage.getItem('token'), data.email, data.password);
        setUserNotice({ type: 'success', message: `Data has been updated` });
      } else {
        setUserNotice({ type: 'password', message: 'Passwords do not match' });
      }
      // when done set loading to false and stop the updating section
      setIsUpdating(null)
      setIsLoading(false);
    } catch (e) {
      // on error set user message and turn off the loader
      setUserNotice({ type: 'failed', message: `Data has not been updated, try again.` });
      setIsUpdating(null)
      setIsLoading(false);
    }
  }

  return (
    <div className='content'>
      {!isLoading ?
        <>
          <div id='profileWrapper'>
            {/* left bar, user info */}
            <div id='userInfo'>
              {userNotice.type !== 'api' ?
                <>
                  {!isUpating ?
                    <>
                      {/* default show user info */}
                      <h2>User info</h2>
                      <p><b>Username: </b>{user.username}</p>
                      <p><b>email: </b>{user.email}</p>
                      {userNotice.type === 'success' && <p className='okM ssg'>{userNotice.message}</p>}
                      {userNotice.type === 'failed' && <p className='errMssg'>{userNotice.message}</p>}
                      <button className='defaultButton' onClick={(() => setIsUpdating(true))}>Update email/password</button>
                    </>
                    :
                    <>
                      {/* If we are updating show update form  */}
                      {isUpating &&
                        <form onSubmit={handleSubmit(setNewUserData)}>
                          <label>New email: </label>
                          <input type='email' name='email' /><br />
                          <p>You can change your password by inserting the new password twice: </p>
                          <label>password: </label>
                          <input type='password' minLength={6} name='password' /><br />
                          <label>Repeat password: </label>
                          <input type='password' name='secondPassword' minLength={6} /> <br />
                          <button type='button' className='cancelButton'>Cancel</button>
                          <button type='submit' className='defaultButton'>Save</button>
                        </form>
                      }
                    </>
                  }
                </>
                :
                <>
                  {/* show userNotice if one is set */}
                  <p className='errMssg'>{userNotice.message}</p>
                </>
              }
            </div>
            <div id='workoutInfo'>
              {/* right bar, workout info */}
              <p id='workoutTitle'>Your saved workout</p>
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
