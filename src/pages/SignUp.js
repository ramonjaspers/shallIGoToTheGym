// imports
// import components
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Loader from 'react-loader-spinner';
// import background image
import defaultBG from '../assets/images/defaultBG.jpeg';

export default function SignUp() {
  // init hooks
  const history = useHistory();
  const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Tries to create a user
   * @param {*} data 
   */
  const createUser = async (data) => {
    if (data.password === data.repeatedPassword) {
      // enable spinner
      setIsLoading(true);
      // Register with form data
      await axios.post(`https://polar-lake-14365.herokuapp.com/api/auth/signup`, {
        ...data,
        'role': ['user']
      }).then((data) => {
        // Stop loader, inform user and redirect to login
        setIsLoading(false);
        alert('User created succesfully');
        history.push('/login');
      }).catch((e) => {
        setIsLoading(false);
        // Show user error and show real error in console
        setError("api", {
          type: "manual",
          message: "Invalid user or user already exists",
        });
      });
    } else {
      setError("repeatedPassword", {
        type: "manual",
        message: "Passwords do not match.",
      });
    }
  }

  return (
    <div className='content' style={{ backgroundImage: `url(${defaultBG})` }}>
      <div className='container'>

        <h4 className='containerTitle'>Registreren</h4>
        {isLoading ?
          <Loader type="TailSpin" color="#00BFFF" height={150} width={150} />
          :
          <form onSubmit={handleSubmit(createUser)}>
            <input type="email" placeholder="email" {...register("email", { required: true, maxLength: 80 })} /> <br />
            {errors.email && <p className='errMssg'>{errors.email.message}</p>}
            <input type="text" placeholder="username" {...register("username", {})} /><br />
            {errors.username && <p className='errMssg'>{errors.username.message}</p>}
            <input type="password" placeholder="password" {...register("password", { required: true, maxLength: 100 })} /><br />
            {errors.password && <p className='errMssg'>{errors.password.message}</p>}
            <input type="password" placeholder="Repeat password" {...register("repeatedPassword", { required: true, maxLength: 100 })} /><br />
            {errors.repeatedPassword && <p className='errMssg'>{errors.repeatedPassword.message}</p>}
            <input className='defaultButton' type="submit" onClick={() => clearErrors('api')} /><br />
            {errors.api && <p className='errMssg'>{errors.api.message}</p>}
          </form>
        }
      </div>
    </div>
  );
}