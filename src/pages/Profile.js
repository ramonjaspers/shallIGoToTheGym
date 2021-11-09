import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Exercise from '../components/Exercise';
import Loader from 'react-loader-spinner';
// import css
import '../assets/styles/Profile.css'

export default function Profile() {
  const { user, fetchUser, updateUser } = useContext(AuthContext);
  const [exercises, setExercises] = useState([]);
  const [userNotice, setUserNotice] = useState({ type: null, message: null });
  const [isLoading, setIsLoading] = useState(false);
  const [isUpating, setIsUpdating] = useState(null);

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
      const { workout } = JSON.parse(workoutString);
      // Set the user specified workout
      return workout;
    }
    return [];
  }

  const setNewUserData = (event, field) => {
    event.preventDefault();
    try {
      if (field === 'password') {
        if (event.target.pass.value === event.target.scndPass.value) {
          updateUser(localStorage.getItem('token'), event.target.pass.value);
        } else {
          setUserNotice({ type: 'password', message: 'Passwords do not match' });
        }
      }
      if (field === 'email') {
        updateUser(localStorage.getItem('token'), event.target.email.value)
      }
      setUserNotice({ type: 'success', message: `${field} has been updated` });
    } catch (e) {
      setUserNotice({ type: 'failed', message: `${field} has not been updated, try again.` });
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
                      {userNotice.type === 'success' && <p className='okMssg'>{userNotice.message}</p>}
                      {userNotice.type === 'failed' && <p className='errMssg'>{userNotice.message}</p>}
                      <button className='defaultButton' onClick={(() => setIsUpdating('email'))}>Update email</button>
                      <button className='defaultButton' onClick={(() => setIsUpdating('password'))}>Update password</button>
                    </>
                    :
                    <>
                      {/* If we are updating show form based on set value */}
                      {isUpating === 'email' &&
                        <form onSubmit={(e) => {
                          updateUser(localStorage.getItem('token'), e.target.email.value);
                          e.preventDefault();
                        }}>
                          <input type='email' name='email' placeholder='new email' /><br />
                          <button type='button' onClick={ () => setIsUpdating(null)} className='cancelButton'>Cancel</button>
                          <button type='submit' className='defaultButton'>Save</button>
                        </form>
                      }
                      {isUpating === 'password' &&
                        <form onSubmit={(e) => (setNewUserData(e, 'password'))}>
                          <input type='password' name='pass' placeholder='Password' /><br />
                          <input type='password' name='scndPass' placeholder='Repeat password' /> <br />
                          {userNotice.type === 'password' && <p className='errMssg'>{userNotice.message}</p>}
                          <button type='button' onClick={ () => setIsUpdating(null)} className='cancelButton'>Cancel</button>
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
