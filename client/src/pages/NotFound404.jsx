import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

export default function Home() {
    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <h1>404 Not Found</h1>
                <h5>The page you were looking for could not be found.</h5>
                <div className="container mt-5">
                    <Link to="/">Return Home</Link>
                </div>
            </div>
        </div>
    );
}
