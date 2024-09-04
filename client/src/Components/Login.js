import React, { useState,useContext} from "react";
import axios from "axios";
import { LoginContext } from "../ConextProvider/LoginContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [LoginStatus,handleLogin] = useContext(LoginContext);

    function UpdateEmail(e) {
        setEmail(e.target.value);
    }

    function UpdatePassword(e) {
        setPassword(e.target.value);
    }

    function validate() {
        const errors = {};

        if (email.length === 0) {
            errors.email = 'Email field cannot be empty';
        }

        if (password.length === 0) {
            errors.password = 'Password field cannot be empty';
        }

        return errors; // Return the errors object
    }

    async function submit(e) {
        e.preventDefault();
        const error = validate();

        if (Object.keys(error).length === 0) { 
            handleLogin(email,password);
        } else {
            setErrors(error);
            console.log('Form has errors');
        }
    }

    if(LoginStatus){
        //We will redirect it to main Page
    }

    return (
        <div className="main-container">
            <div className="Details-container">
                <div className="form-container">
                    <form onSubmit={submit}>
                        <div>
                            <input
                                type="email"
                                name='UserEmail'
                                placeholder="Enter Your Email"
                                value={email}
                                onChange={UpdateEmail}
                            />
                            {errors.email && <p>{errors.email}</p>}
                        </div>
                        <div>
                            <input
                                type='password'
                                name='UserPassword'
                                placeholder="Enter Your Password"
                                value={password}
                                onChange={UpdatePassword}
                            />
                            {errors.password && <p>{errors.password}</p>}
                        </div>
                        {errors.general && <p>{errors.general}</p>}
                        <div>
                            <button type="submit">Log In</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='img_container'>
                {/* Add any additional content or images here */}
            </div>
        </div>
    );
}

export default Login;
