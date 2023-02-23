import React, { useState, useEffect } from "react";
import axios from "axios";
import Logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import registerRoute from "../routes/APIRoutes"

const Register = () => {

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = credentials;
    if (password !== confirmPassword) {
      console.log( "Password and confirm password should be same.");
      return false;
    } else if (username.length < 3) {
      console.log("Username should be greater than 3 characters.");
      return false;
    } else if (password.length < 8) {
      console.log("Password should be equal or greater than 8 characters.");
      return false;
    } else if (email === "") {
      console.log("Email is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = credentials;
      const data = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
    }
  };

  return (
    <>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Circle Chat</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
    </>
  );
}
;
export default Register