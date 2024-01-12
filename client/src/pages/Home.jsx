import React from "react";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { UserContext } from "../../hooks/UserContext.jsx";

export default function Home() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.type == "student") {
            navigate("/dashboardstd");
        } else if (user && user.type == "organization") {
            navigate("/dashboardorg");
        }
    }, [user]);

    return (
        <div>
            {/*<nav class="navbar navbar-expand-lg navbar-light bg-light">*/}
            {/*    <a class="navbar-brand" href="#">VolunteerConnect</a>*/}
            {/*    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"*/}
            {/*        aria-controls="navbarNavAltMarkup" aria-expanded="true" aria-label="Toggle navigation">*/}
            {/*        <span class="navbar-toggler-icon"></span>*/}
            {/*    </button>*/}
            {/*    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">*/}
            {/*        <div class="navbar-nav">*/}
            {/*            <div className="mr-4">*/}
            {/*                <Link to="/">Home</Link>*/}
            {/*            </div>*/}
            {/*            <div className="mr-4"><Link to="/registerStudent">Register Student </Link></div>*/}
            {/*            <div className="mr-4"><Link to="/registerOrg">Regsiter Organization </Link></div>*/}
            {/*            <div className="mr-4"><Link to="/login">Login</Link></div>*/}

            {/*        </div>*/}
            {/*    </div>*/}
            {/*</nav>*/}
            <Navbar />
            <div className="container mt-5">
                <h1>Welcome to Volunteer Connect</h1>
                <div className="container mt-5">
                    <h5>Volunteering solutions for both students or organizations!</h5>
                    <h5>Create a profile and get started today.</h5>
                    <Link to="/login">Get Started</Link>
                </div>
            </div>
        </div>
    );
}
