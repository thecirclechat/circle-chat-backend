import React from 'react'
import styles from "../style";
import { discount, Daccord } from "../assets";
import GetStarted from "./GetStarted";
import Google from "../img/google.png"
import Facebook from "../img/facebook.png"
import Github from "../img/githubBlueDark.png"

const Login = () => {
  return (
    <>
    <div className='login'>
        {/* <h1 className="text-gradient" id="login">Login Page</h1> */}
        <div className="loginWrapper">
        <form>
        <div className='btn-div'>
            <div id="toggle-click-btn"></div>
            <button className="logResButton text-gradient toggle-login-btn" id="login">
            Log In
            </button>
            <button className="logResButton text-gradient toggle-login-btn" id="login">
            Register
            </button>
        </div>
            <div className="loginTop">
                <input
                type="text"
                placeholder='Username'
                required
                />
                <input
                type="text"
                placeholder='Password'
                required
                />
                <button className="submit loginButton">Login</button>
                {/* <input tpe="submit" value="Login" */}
            </div>
            <div>
                <p> Not a member? Signup</p>
            </div>
            <div className="icon-btn">
            <div className="loginBottom">
                <div className="oAuthButton google">
                    <img src={Google} alt="" className="icon" />
                </div>
            <div className="loginBottom github">
                <div className="oAuthButton">
                    <img src={Github} alt="" className="icon" />
                </div>
                </div>
            <div className="loginBottom facebook">
                <div className="oAuthButton">
                    <img src={Facebook} alt="" className="icon" />
                </div>
                </div>
            </div>
            </div>
            </form>
        </div>
    </div>    
    </>
  )
}

export default Login