import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
// background image
import defaultBG from '../assets/images/defaultBG.jpeg';

export default function Login() {
  // Init hooks
  const { login } = useContext(AuthContext);
  const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm();

  /**
   * Login functionality
   * @param {*} data 
   */
  const signIn = async (data) => {
    // Post login data 
    await axios.post(`https://polar-lake-14365.herokuapp.com/api/auth/signin`, {
      ...data
    }).then(({ data }) => {
      // On succesfull post try to login with the received accesstoken
      login(data.accessToken);
    }).catch((error) => {
      // Show user error and show real error in console
      console.log(error);
      setError("api", {
        type: "manual",
        message: "User not found!",
      });
    });
  };

  return (
    <div className='content' style={{ backgroundImage: `url(${defaultBG})` }}>
      <div className='container'>
        <h4 className='containerTitle'>Inloggen</h4>
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
          {errors.api && <p className='errMssg'>{errors.api.message}</p>}
          <input className="defaultButton" type="submit" onClick={() => clearErrors('api')} /><br />
          <p>Dont have an account? <Link to="/signup">Sign up</Link> to our platform.</p>
        </form>
      </div>
    </div>
  );
}

