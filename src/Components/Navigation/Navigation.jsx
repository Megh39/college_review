import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
const Navigation = () => {
    
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };
    return (
        <>
            <div className="navigationBar">
                <div className="navLinks">
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/nirfranking">NIRF Rankings</Link>
                    <Link to="/colleges">Colleges</Link>
                    <Link to="/review">Write a Review</Link>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>

                </div>
            </div>
        </>
    )
}
export default Navigation;