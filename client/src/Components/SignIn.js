import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function SignIn() {

    const [name,setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile,setMobile] = useState("");
    const [errors, setErrors] = useState({});

    function UpdateName(e){
        setName(e.target.value);
    }
    function UpdateEmail(e) {
        setEmail(e.target.value);
    }

    function UpdateMobile(e){
        setMobile(e.target.value);
    }

    function UpdatePassword(e) {
        setPassword(e.target.value);
    }

    function validate() {
        const errors = {};

        if(name.trim.length === 0){
            errors.name = 'Name filed cannot be empty';
        }

        if(mobile.length != 10){
            errors.mobile = 'Enter a valid mobile Number';
        }
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
            try {
                const response = await axios.post('http://localhost:5000/api/Sign', {
                    Name : name,
                    Email: email,
                    Password: password,
                    Mobile : mobile

                });
                //Navigate to login
                <Navigate to='/login'/>
                setName("");
                setMobile("");
                setEmail("");
                setPassword("");
                setErrors({});
                
            } catch (err) {
                console.log("Error submitting data", err);
                setErrors({ general: "An error occurred. Please try again." });
                setName("");
                setMobile("");
                setEmail("");
                setPassword("");
            }
        } else {
            setErrors(error);
            console.log('Form has errors');
        }
    }

    return (
        <div className="main-container">
            <div className="Details-container">
                <div className="form-container">
                    <form onSubmit={submit}>
                    <div>
                            <input
                                type="text"
                                name='UserName'
                                placeholder="Enter Your UserName"
                                value={name}
                                onChange={UpdateName}
                            />
                            {errors.name && <p>{errors.name}</p>}
                        </div>

                        <div>
                            <input
                                type="text"
                                name='UserMobile'
                                placeholder="Enter Your Mobile Number"
                                value={mobile}
                                onChange={UpdateMobile}
                            />
                            {errors.mobile && <p>{errors.mobile}</p>}
                        </div>
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
            <div className='img-container'>
                {/* Add any additional content or images here */}
            </div>
        </div>
    );
}

export default SignIn;
