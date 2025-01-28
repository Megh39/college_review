import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
const Navigation = () => {
    return (
        <>
            <div className="navigationBar">
                <div className="navLinks">
                    <Link to="/">Home</Link>
                    <Link to="/Login">Login</Link>
                    <Link to="/Dashboard">Dashboard</Link>
                </div>
            </div>
        </>
    )
}
export default Navigation;