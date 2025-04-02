import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/register");
    };

    return (
        <div className="navigationBar">
            <div className="navLinks">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/nirfranking">NIRF Rankings</Link>
                <Link to="/colleges">Colleges</Link>
                <Link to="/review">Write a Review</Link>
                <Link to="#" onClick={handleLogout} >
                    Logout
                </Link>
            </div>
        </div>
    );
};

export default Navigation;
