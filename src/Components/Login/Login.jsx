import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { Modal, Input, Button, Form, message } from "antd";

import { Link } from "react-router-dom";
const Login = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleResetPassword = async () => {
        const { username, newPassword, confirmPassword } = formData;

        if (!username || !newPassword || !confirmPassword) {
            message.error("All fields are required!");
            return;
        }
        if (newPassword !== confirmPassword) {
            message.error("Passwords do not match!");
            return;
        }
        try {
            await axios.post("https://college-review-backend.vercel.app/api/auth/reset-password", { username, newPassword });
            message.success("Password reset successfully!");
            setForgotPasswordVisible(false);
            setFormData({ username: "", newPassword: "", confirmPassword: "" });
        } catch (error) {
            message.error("Error resetting password!");
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const isEmail = usernameOrEmail.includes("@"); // Check if input is email
            const requestData = isEmail
                ? { email: usernameOrEmail, password }
                : { username: usernameOrEmail, password };

            const response = await axios.post("https://college-review-backend.vercel.app/api/auth/login", requestData);

            const user = response.data.user; // Extract user object

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
                <p className="forgot-password">
                    <Link onClick={() => setForgotPasswordVisible(true)}>Forgot Password?</Link>
                </p>

                <p className="registerLink">Not a User? <Link to="/Register">Register</Link></p>
            </div>
             {/* Forgot Password Modal */}
             <Modal
                title="Reset Password"
                open={forgotPasswordVisible}
                onCancel={() => setForgotPasswordVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setForgotPasswordVisible(false)}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleResetPassword}>
                        Reset Password
                    </Button>,
                ]}
            >
                <Form layout="vertical">
                    <Form.Item label="Username">
                        <Input name="username" placeholder="Enter your username" value={formData.username} onChange={handleChange} />
                    </Form.Item>
                    <Form.Item label="New Password">
                        <Input.Password name="newPassword" placeholder="Enter new password" value={formData.newPassword} onChange={handleChange} />
                    </Form.Item>
                    <Form.Item label="Confirm New Password">
                        <Input.Password name="confirmPassword" placeholder="Confirm new password" value={formData.confirmPassword} onChange={handleChange} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
        
    );
};

export default Login;
