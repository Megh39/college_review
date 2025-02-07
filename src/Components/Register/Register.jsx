import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            const response = await axios.post("https://college-review-backend.vercel.app/api/auth/register", {
                username, email, age, password
            });
            alert("Registration successful");
            navigate("/login");

        }
        catch (error) {
            alert(`Error: ${error.response?.data?.message || "Server error"}`);
        }
    }
    return (
        <div className="registerScreen">
            <h1>Welcome to College Review and Ranking Website!</h1>
            <div className="registerForm">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="formGroup">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" placeholder="Enter your name" onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="formGroup">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="formGroup">
                        <label for="password">Set Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter a password" onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="formGroup">
                        <label for="password">Confirm Password</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Enter a password" onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>

                    <div className="formGroup">
                        <label for="age">Age</label>
                        <input type="text" id="age" name="age" placeholder="Enter your age" onChange={(e) => setAge(e.target.value)} required />
                    </div>
                    <button className="registerButton">Register</button>
                </form>
                <p>Already A Member? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;