import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [password, setPassword] = useState("");
    const [college_name, set_college_name] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [course, setCourse] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Validation functions
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateAge = (age) => {
        return !isNaN(age) && parseInt(age) > 0 && parseInt(age) < 100;
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset errors
        const newErrors = {};

        // Validate all fields
        if (!username.trim()) newErrors.username = "Name is required";

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!age.trim()) {
            newErrors.age = "Age is required";
        } else if (!validateAge(age)) {
            newErrors.age = "Please enter a valid age (numeric value between 1-99)";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (!validatePassword(password)) {
            newErrors.password = "Password must be at least 6 characters long";
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (!college_name.trim()) newErrors.college_name = "College name is required";
        if (!course.trim()) newErrors.course = "Course name is required";

        // If there are errors, update state and stop submission
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // If validation passes, proceed with submission
        try {
            const response = await axios.post("https://college-review-backend.vercel.app/api/auth/register", {
                username, email, age, password, college_name, course
            });
            alert("Registration successful");
            navigate("/login");
        }
        catch (error) {
            alert(`Error: ${error.response?.data?.message || "Server error"}`);
        }
    };

    return (
        <div className="registerScreen">
            <h1>Welcome to College Review and Ranking Website!</h1>
            <div className="registerForm">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="formGroup">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your full name (required)"
                            onChange={(e) => setUsername(e.target.value)}
                            className={errors.username ? "error" : ""}
                            required
                        />
                        {errors.username && <span className="errorMessage">{errors.username}</span>}
                    </div>
                    <div className="formGroup">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter a valid email address (example@domain.com)"
                            onChange={(e) => setEmail(e.target.value)}
                            className={errors.email ? "error" : ""}
                            required
                        />
                        {errors.email && <span className="errorMessage">{errors.email}</span>}
                    </div>
                    <div className="formGroup">
                        <label htmlFor="password">Set Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Minimum 6 characters required"
                            onChange={(e) => setPassword(e.target.value)}
                            className={errors.password ? "error" : ""}
                            required
                        />
                        {errors.password && <span className="errorMessage">{errors.password}</span>}
                    </div>
                    <div className="formGroup">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Must match password above"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={errors.confirmPassword ? "error" : ""}
                            required
                        />
                        {errors.confirmPassword && <span className="errorMessage">{errors.confirmPassword}</span>}
                    </div>
                    <div className="formGroup">
                        <label htmlFor="age">Age</label>
                        <input
                            type="text"
                            id="age"
                            name="age"
                            placeholder="Enter a number between 1-99"
                            onChange={(e) => setAge(e.target.value)}
                            className={errors.age ? "error" : ""}
                            required
                        />
                        {errors.age && <span className="errorMessage">{errors.age}</span>}
                    </div>
                    <div className="formGroup">
                        <label htmlFor="college_name">College Name</label>
                        <input
                            type="text"
                            id="college_name"
                            name="college_name"
                            placeholder="Enter full college name (required)"
                            onChange={(e) => set_college_name(e.target.value)}
                            className={errors.college_name ? "error" : ""}
                            required
                        />
                        {errors.college_name && <span className="errorMessage">{errors.college_name}</span>}
                    </div>
                    <div className="formGroup">
                        <label htmlFor="course">Course Name</label>
                        <input
                            type="text"
                            id="course"
                            name="course"
                            placeholder="Enter your course name (required)"
                            onChange={(e) => setCourse(e.target.value)}
                            className={errors.course ? "error" : ""}
                            required
                        />
                        {errors.course && <span className="errorMessage">{errors.course}</span>}
                    </div>
                    <button className="registerButton">Register</button>
                </form>
                <p>Already A Member? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;