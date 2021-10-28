import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

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
    <>
      <div class='container'>
        <h3 class='containerTitle'>Registreren</h3>
        <form onSubmit={handleSubmit(signUp)}>
          <input type="email" placeholder="email" {...register("email", { required: true, maxLength: 80 })} />
          <input type="password" placeholder="password" {...register("password", { required: true, maxLength: 100 })} />
          <input type="text" placeholder="username" {...register("username", {})} />
          {errors.api && <p class='errMssg'>{errors.api.message}</p>}
          <input type="submit" onClick={() => clearErrors('api')} />
        </form>
      </div>
    </>
  );
}

export default SignUp;