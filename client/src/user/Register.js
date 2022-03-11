import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router'
import { Header } from "../header/Header";
export default function Register() {
    const [error, setError] = useState('');
    async function registerUser(e) {
        e.preventDefault();
        let name = document.getElementById('name').value;
        let password = document.getElementById('password').value;
        let confirmPassword = document.getElementById('confirmPassword').value;

        await axios.get(`http://localhost:8000/user/register/${name}`)
            .then(res => {
                if (res.data.length === 0) {
                    if (password === confirmPassword) {

                        axios.post(`http://localhost:8000/user/register/`, { name: name, password: password, admin: 0 }).then(() => {
                            setError("Account created")
                            return <Navigate to="/" />;
                        });
                    } else {
                        setError("Password are not the same")
                    }
                } else {
                    setError("This username is already taken")
                }
            });




    }


    return (
        <><Header /><div className="container2">
            <div className="card">
                <article className="card-body">
                    <a href="/user/login" className="float-right btn btn-outline-primary">Sign in</a>
                    <h4 className="card-title mb-4 mt-1">Sign up</h4>
                    {/* <div className="register"> */}
                    <h1>Register</h1>
                    <form>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" id="name" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" id="password" />
                        </div>
                        <div className="form-group">
                            <label>Confirm password</label>
                            <input type="password" id="confirmPassword" />
                        </div>
                        <button onClick={(e) => registerUser(e)}>Register</button>
                        <h3>{error}</h3>
                    </form>
                </article>
            </div></div></>
    )
}