import React from "react";
import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { UserContext } from "../../hooks/UserContext.jsx";
import axios from "axios";

export default function Logout() {
    const { setUser } = useContext(UserContext);
    useEffect(() => {
        async function doLogout() {
            await axios.post("/logout");
            setUser(null);
        }
        doLogout();
    }, []);
    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <h5>You have successfully logged out.</h5>
                <div className="container mt-5">
                    <Link to="/">Home</Link>
                    <br></br>
                    <Link to="/login">Return to Login</Link>
                </div>
            </div>
        </div>
    );
}
