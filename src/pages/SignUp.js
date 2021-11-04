import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import '../assets/styles/Auth.css';

function SignUp() {
  // init hooks
  const history = useHistory();
  const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm();

  /**
   * Creates a user
   * @param {*} data 
   */
  const signUp = async (data) => {
    // Register with form data
    await axios.post(`https://polar-lake-14365.herokuapp.com/api/auth/signup`, {
      ...data,
      'role': ['user']
    }).then(() => {
      alert('User created succesfully');
      history.push('/login');
    }).catch((e) => {
      // Show user error and show real error in console
      setError("api", {
        type: "manual",
        message: "Invalid user or user already exists",
      });
    });
  }

  return (
    <div className='wrapper'>
      <div className='container'>
        <h4 className='containerTitle'>Registreren</h4>
        <form onSubmit={handleSubmit(signUp)}>
          <label>Email</label>
          <input type="email" placeholder="email" {...register("email", { required: true, maxLength: 80 })} /> <br />
          {errors.email && <p className='errMssg'>{errors.api.message}</p>}
          <label>Password</label>
          <input type="password" placeholder="password" {...register("password", { required: true, maxLength: 100 })} /><br />
          {errors.password && <p className='errMssg'>{errors.api.message}</p>}
          <label>Username</label>
          <input type="text" placeholder="username" {...register("username", {})} /><br />
          {errors.username && <p className='errMssg'>{errors.api.message}</p>}
          <input type="submit" onClick={() => clearErrors('api')} /><br />
          {errors.api && <p className='errMssg'>{errors.api.message}</p>}

        </form>
      </div>
    </div>
  );
}

export default SignUp;