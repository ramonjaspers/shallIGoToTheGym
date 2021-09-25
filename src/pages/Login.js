import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../components/globals';
import { useForm } from "react-hook-form";
//TEMP
import users from '../assets/data/user.json';


export default function Login() {
    const history = useHistory();
    const globalState = useContext(GlobalContext);
    const { register, handleSubmit, setError, formState: { errors } } = useForm();

    const validate = (data) => {
        console.log(data);
        if (users.find((user) => { return user.email === data.email && user.password === data.password })) {
            globalState.setAuthenticated(true);
            history.push('/');
        } else {
            setError("password", {
                type: "focus",
                message: "Login failed, try again."
            },
                {
                    shouldFocus: true
                }
            );
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <p>Je bent helaas nog niet inglogged :(</p>
            <form onSubmit={handleSubmit(data => validate(data))}>
                <label htmlFor="email">email: </label>
                <input
                    id="email"
                    {...register("email", {
                        required: "required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Entered value does not match email format"
                        }
                    })}
                    type="email"
                />
                {errors.email && <span role="alert">{errors.email.message}</span>}
                <br />
                <label htmlFor="password">password: </label>
                <input
                    id="password"
                    {...register("password", {
                        required: "required",
                    })}
                    type="password"
                />
                {errors.password && <span role="alert">{errors.password.message}</span>}
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}