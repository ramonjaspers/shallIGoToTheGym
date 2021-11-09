import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import jwtDecode from 'jwt-decode';
import Exercise from '../components/Exercise';

export default function Profile() {
  const { user, fetchUserData, logout } = useContext(AuthContext);
  const [exercises, setExercises] = useState([])

  useEffect(() => {
    // if user is set fetch the user data
    if (!user.email) {
      fetchUserData(localStorage.getItem('token'));
    }
      // getUserSpecificWorkout(localStorage.getItem('token'));

  }, []);

  /**
   * Get the user their workout
   * @param {string} JWT 
   * @returns void
   */
  // const getUserSpecificWorkout = (JWT) => {
  // const token = jwtDecode(JWT);
  // fetchUserData(localStorage.getItem('workout'));

  // Get the workout based on the userId stored within the workout object 
  // const workoutObject = workout.filter(obj => {
  // return obj.userId === token
  // });
  // Set the user specified workout
  // setExercises(workoutObject.exercises);
  // }

  return (
    <div id='content'>
      <div className='container'>
        {/* left bar */}
        <section>
          <h2>Gegevens</h2>
          <p><strong>Gebruikersnaam: </strong>{user.username}</p>
          <p><strong>Email: </strong>{user.email}</p>
        </section>
        <section>
          {/* {exercises && exercises.length > 0 ?
            <>
              <p>To search for the exercise, just click on the exercise of choice.</p>
              {exercises.map(exercise =>
                <Exercise key={exercise.id} exercise={exercise} />
              )}
            </>
            : <h5>No workout is saved.</h5>
          } */}
          <p><strong>Workout: </strong>{user.email}</p>
        </section>
        <p>Terug naar de <Link to="/">Homepagina</Link></p>
      </div>
    </div>
  );
}
