import React, { useState } from "react";
import "./Dashboard.css"
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user"); // Clear user data
        navigate("/login"); // Redirect to login
    };
    return (
        <>
            <div className="dashboardPage">
                <h1>WELCOME!</h1>
                <br />
                <h3>Site will be updated soon.</h3>
                {/* <button onClick={handleLogout}>Logout</button> */}
            </div>
        </>
    )
}
export default Dashboard;