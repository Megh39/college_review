import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
const Navigation = () => {
    return (
        <>
            <div className="navigationBar">
                <div className="navLinks">
                    {/* <Link to="/">Home</Link> */}
                    {/* <Link to="/login">Login</Link> */}
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/nirfranking">NIRF Rankings</Link>
                    <Link to="/colleges">Colleges</Link>

                    <Link to="/review">Write a Review</Link>
                </div>
            </div>
        </>
    )
}
export default Navigation;