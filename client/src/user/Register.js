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
        <><Header /><div className="register">
            <h1>Register</h1>
            <form>
                <input type="text" id="name" />
                <input type="password" id="password" />
                <input type="password" id="confirmPassword" />
                <button onClick={(e) => registerUser(e)}>Register</button>
                <h3>{error}</h3>
            </form>
        </div></>
    )
}