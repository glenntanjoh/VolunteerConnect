import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../hooks/UserContext.jsx";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import "./Login.css";
import { toast } from "react-hot-toast";

export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        userType: "student",
        email: "",
        password: "",
    });
    const { user, fetchData, setLoaded } = useContext(UserContext);

    useEffect(() => {
        if (user && user.type == "student") {
            navigate("/dashboardstd");
        } else if (user && user.type == "organization") {
            navigate("/dashboardorg");
        }
    }, [user]);

    const handleRadioChange = (e, value) => {
        setData({ ...data, userType: value });
    };

    const loginUser = async (e) => {
        e.preventDefault();
        const { userType, email, password } = data;
        try {
            if (!email || !password) {
                toast.error("Email or Password is empty!");
                return;
            }

            const { data } = await axios.post("/login", {
                userType,
                email,
                password,
            });

            if (data.error) {
                toast.error(data.error);
            } else {
                setData({});
                if (userType === "student") {
                    setLoaded(false);
                    fetchData();
                    navigate("/dashboardstd");
                } else if (userType === "organization") {
                    setLoaded(false);
                    fetchData();
                    navigate("/dashboardorg");
                }
            }
        } catch (error) {
            alert(data.error);
        }
    };

    return (
        <div>
            <Navbar />

            <div className="container mt-5 small-input text-left" id="loginBox">
                <h3 className="text-center">Login</h3>
                <div>
                    <form action="/" onSubmit={loginUser}>
                        <div className="btn-group d-flex row" data-toggle="buttons">
                            <label
                                className={`btn btn-success ${
                                    data.userType === "student" ? "active" : ""
                                } col-md-6`}
                                onClick={(e) => handleRadioChange(e, "student")}
                            >
                                <input
                                    type="radio"
                                    name="userType"
                                    id="student"
                                    autoComplete="off"
                                    readOnly={true}
                                    checked={data.userType === "student"}
                                />
                                Student
                            </label>
                            <label
                                className={`btn btn-success ${
                                    data.userType === "organization" ? "active" : ""
                                } col-md-6`}
                                onClick={(e) => handleRadioChange(e, "organization")}
                            >
                                <input
                                    type="radio"
                                    name="userType"
                                    id="organization"
                                    autoComplete="off"
                                    readOnly={true}
                                    checked={data.userType === "organization"}
                                />
                                Organization
                            </label>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                name="email"
                                htmlFor="email"
                                className="form-control"
                                id="email"
                                aria-describedby="emailHelp"
                                value={data.email}
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                            />
                            <small id="emailHelp" className="form-text text-muted">
                                We'll never share your email with anyone else.
                            </small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                htmlFor="password"
                                name="password"
                                className="form-control"
                                id="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        password: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <button type="submit" className="btn btn-dark">
                            Login
                        </button>
                    </form>
                    <div className="ml-0 mt-0 text-center border border-2 rounded-3">
                        <a href="/registerStudent" className="custom-link ">
                            New Student?
                        </a>
                        <span className="mx-2">|</span> {/* Add a separator */}
                        <a href="/registerOrg" className="custom-link">
                            New Organization?
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
