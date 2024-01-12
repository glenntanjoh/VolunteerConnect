import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../hooks/UserContext.jsx";
import "./Navbar.css";

export default function Navbar() {
    const { user } = useContext(UserContext);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        console.log(user);
        setUserName(user?.name || "Loading...");
    }, [user]);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-success-light">
                <a className="navbar-brand" href="/Dashboardorg">
                    <div className={"vc-logo"}> VolunteerConnect</div>
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="true"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <div className="mr-4">
                            <Link to="/dashboardOrg">
                                <button className="nav-link">Organization Dashboard</button>
                            </Link>
                        </div>
                        <div className="mr-4">
                            <Link to="/managePostings">
                                <button className="nav-link">Manage Postings</button>
                            </Link>
                        </div>
                        <div className="mr-4">
                            <Link to="/applications">
                                <button className="nav-link">Applications</button>
                            </Link>
                        </div>
                        <div className="mr-4">
                            <Link to="/profileOrg">
                                <button className="nav-link">{userName}</button>
                            </Link>
                        </div>
                        <div className="mr-4">
                            <Link to="/logout">
                                <button className="nav-link">Logout</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
