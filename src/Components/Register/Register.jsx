import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div className="registerScreen">
            <h1>Welcome to College Review and Ranking Website!</h1>
            <div className="registerForm">
                <h2>Register</h2>
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
                    <button type="submit" className="registerButton">Register</button>
                </form>
                <p>Already A Member? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;