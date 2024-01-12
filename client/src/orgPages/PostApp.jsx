import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/NavbarOrg.jsx";
import JobAppCard from "../components/JobAppCard.jsx";
import { Link, useParams } from "react-router-dom";
import StudentAppCard from "../components/StudentAppCard.jsx";
const PostApp = () => {
    const [applications, setApplication] = useState([]);
    const { postID } = useParams();
    useEffect(() => {
        axios
            .get(`http://localhost:8000/postApp/${postID}`)
            .then((response) => {
                console.log("API Response:", response.data);
                setApplication(response.data);
            })
            .catch((error) => {
                console.error("Error fetching post applicants:", error);
            });
    }, []);
    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <h2>Student Applications</h2>
                {applications.length > 0 ? (
                    applications.map((application) => (
                        <StudentAppCard key={application} application={application} />
                    ))
                ) : (
                    <p>There are no applications to this post.</p>
                )}
            </div>
        </div>
    );
};

export default PostApp;
