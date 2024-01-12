import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../hooks/UserContext.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Form.css";
import Studentnavbar from "../components/NavbarStd.jsx";

const Form = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        nsid: "",
        email: "",
        major: "",
        message: "",
        experience: "",
    });
    const { user } = useContext(UserContext);

    const { postID } = useParams();
    const [error, setError] = useState({
        name: "",
        nsid: "",
        email: "",
        major: "",
        message: "",
        experience: "",
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value });

        if (!value) {
            setError({ ...error, [name]: "This field is required" });
        } else {
            setError({ ...error, [name]: "" });
        }
    };

    const handleSubmit = async (e) => {
        console.log("Submitting!");
        e.preventDefault();

        const { name, nsid, email, major, message, experience } = data;
        try {
            console.log("HERE");

            const { data } = await axios.post("/createNewApplication", {
                posting_id: postID,
                author: user.id,
                name: name,
                nsid: nsid,
                email: email,
                major: major,
                message: message,
                experience: experience,
            });
            if (data.error) {
                alert(data.error);
            } else {
                alert("Submitted");
                navigate("/dashboardstd");
            }
        } catch (error) {
            alert(error);
            console.error(error.stack);
        }
    };

    return (
        <div>
            <Studentnavbar />
            <form method="post" onSubmit={handleSubmit}>
                <h1 className="header">Volunteer Application Form</h1>
                <h2 className="header-posting">{}</h2>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" onChange={handleChange} value={data.name} />
                {error.name && <p style={{ color: "red" }}>{error.name}</p>}
                <label htmlFor="nsid">NSID</label>
                <input
                    type="text"
                    name="nsid"
                    onChange={handleChange}
                    value={data.nsid}
                    maxLength="6"
                />
                {error.nsid && <p style={{ color: "red" }}>{error.nsid}</p>}
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={data.email}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                />
                {error.email && <p style={{ color: "red" }}>{error.email}</p>}
                <label htmlFor="major">Major</label>
                <input type="text" name="major" onChange={handleChange} value={data.major} />
                {error.major && <p style={{ color: "red" }}>{error.major}</p>}
                <label htmlFor="message">Let them know why you are interested</label>
                <textarea
                    name="message"
                    id=""
                    cols="30"
                    rows="10"
                    onChange={handleChange}
                    value={data.message}
                    placeholder="Tell them a little bit about yourself and motivation..."
                />
                {error.message && <p style={{ color: "red" }}>{error.message}</p>}
                <label htmlFor="experience">Relevant experience and skills</label>
                <textarea
                    name="experience"
                    id=""
                    cols="30"
                    rows="10"
                    onChange={handleChange}
                    value={data.experience}
                    placeholder="Paste resume here..."
                />
                {error.experience && <p style={{ color: "red" }}>{error.experience}</p>}
                <button type="button" onClick={() => navigate(-1)}>
                    Back
                </button>
                <button type="submit" style={{ margin: "5px" }}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Form;
