import React, { useState } from "react";
import "./Login.css";
const Login = () => {
    const buttonClicked = () => {
        console.log("Button clicked");
    }
    return (
        <>
            <div className="loginScreen">
                <div className="loginForm">
                    <h2>Login</h2>
                    <form>
                        <div className="formGroup">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" placeholder="Enter your name" required />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="Enter your email" required />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" placeholder="Enter your password" required />
                        </div>
                        <button type="submit" className="registerButton" onClick={buttonClicked}>Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Login;