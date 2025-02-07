import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const isEmail = usernameOrEmail.includes("@"); // Check if input is email
            const requestData = isEmail
                ? { email: usernameOrEmail, password }
                : { username: usernameOrEmail, password };
    
            const response = await axios.post("https://college-review-backend.vercel.app/api/auth/login", requestData);
    
            const user = response.data.user; // Extract user object
            console.log("User object:", user); // Debugging - Check if role exists
    
            if (!user || !user.role) {
                alert("Invalid credentials");
                return;
            }
    
            alert("Login successful!");
            localStorage.setItem("user", JSON.stringify(user));
    
            // ✅ Redirect based on role
            if (user.role === "admin") {
                navigate("/adminDashboard");
            } else {
                navigate("/dashboard");
            }
        } catch (error) {
            alert(`Error: ${error.response?.data?.message || "Server error"}`);
        }
    };
    
    return (
        <div className="loginScreen">
            <div className="loginForm">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="formGroup">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={(e) => setUsernameOrEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="registerButton">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
