import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setUserRole(user?.role || "user"); // Default to "user" if no role
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="dashboard-page">
            <h1>Welcome!</h1>
            <h2>What Would You Like To Do Today?</h2>
            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <img src="/Images/Filling Survey1.png" alt="Write a Review" />
                    <button onClick={() => handleNavigation("/review")}>Write A Review</button>
                </div>
                <div className="dashboard-card">
                    <img src="/Images/2.jpg" alt="View Reviews" />
                    <button onClick={() => handleNavigation("/reviews")}>View Reviews</button>
                </div>
                <div className="dashboard-card">
                    <img src="/Images/Newsletter1.png" alt="View NIRF Rankings" />
                    <button onClick={() => handleNavigation("/nirfranking")}>View NIRF Rankings</button>
                </div>
                <div className="dashboard-card">
                    <img src="/Images/college.jpg" alt="View Colleges" />
                    <button onClick={() => handleNavigation("/colleges")}>View Colleges</button>
                </div>
            </div>
            <div className="dashboard-actions">
                {userRole === "admin" && (
                    <button className="admin-btn" onClick={() => handleNavigation("/admindashboard")}>
                        Admin Dashboard
                    </button>
                )}
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Dashboard;