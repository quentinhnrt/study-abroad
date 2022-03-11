import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router";

export const Login = () => {
  const [error, setError] = useState("");
  const [redirectToHome, setRedirect] = useState(false);
  async function login(e) {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let password = document.getElementById("password").value;
    console.log(name, password);
    await axios
      .get(`http://localhost:8000/user/login/${name}/${password}`)
      .then((res) => {
        console.log(res.data);
        if (res.data != "") {
          setRedirect(true);
        } else {
          setError("Login or password incorrect");
        }
      });
  }
  if (redirectToHome) {
    return redirectToHome ? <Navigate to="/" /> : null;
  } else {
    return (
      <div className="login">
        <form>
          <input type="text" id="name" />
          <input type="password" id="password" />
          <button onClick={(e) => login(e)}>Login</button>
          <h1>{error}</h1>
        </form>
      </div>
    );
  }
};
