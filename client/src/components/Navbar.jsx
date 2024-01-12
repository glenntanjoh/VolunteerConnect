// To use routes
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-success-light">
                <a className="navbar-brand" href="/Dashboardstd">
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
                            <Link to="/">
                                <button className="nav-link">Home</button>
                            </Link>
                        </div>
                        <div className="mr-4">
                            <Link to="/registerStudent">
                                <button className="nav-link">Register Student</button>
                            </Link>
                        </div>
                        <div className="mr-4">
                            <Link to="/registerOrg">
                                <button className="nav-link">Register Organization</button>
                            </Link>
                        </div>
                        <div className="mr-4">
                            <Link to="/login">
                                <button className="nav-link">Login</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            {/* Link all the routes with text in navbar
            <Link to="/">Home </Link>
            <Link to="/registerStudent">Register Student </Link>
            <Link to="/registerOrg">Regsiter Organization </Link>
            <Link to="/login">Login</Link> */}
        </div>
    );
}
