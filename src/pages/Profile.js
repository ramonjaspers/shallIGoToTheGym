import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
// import { WorkoutContext } from '../context/WorkoutContext';
import axios from 'axios';

function Profile() {
  const { user, fetchUserData } = useContext(AuthContext);
  // const { workout } = useContext(WorkoutContext);

  useEffect(() => {
    if (!user.email) {
      fetchUserData(localStorage.getItem('token'));
    }
  }, []);

  return (
    <>
      <h1>Profielpagina</h1>
      <section>
        <h2>Gegevens</h2>
        <p><strong>Gebruikersnaam: </strong>{user.username}</p>
        <p><strong>Email: </strong>{user.email}</p>
      </section>
      <section>
        <p><strong>Workout: </strong>{user.email}</p>
      </section>
      <p>Terug naar de <Link to="/">Homepagina</Link></p>
    </>
  );
}

export default Profile;