import Studentnavbar from "../components/NavbarStd.jsx";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./StudentPostpage.css";

const StudentPostpage = () => {
    const location = useLocation();
    const post = location.state;

    return (
        <div>
            <Studentnavbar />
            <div className="student-post-page mb-5">
                <h2 className="post-title">Post Details</h2>
                {post ? (
                    <div>
                        <div>
                            <p className="post-detail">
                                <strong>Title:</strong> {post.title}
                            </p>
                            <p
                                className="post-detail"
                                style={{
                                    whiteSpace: "pre-line",
                                }}
                            >
                                <strong>Description:</strong> {post.description}
                            </p>
                            <p
                                className="post-detail"
                                style={{
                                    whiteSpace: "pre-line",
                                }}
                            >
                                <strong>Duties:</strong> {post.duties}
                            </p>
                            <p className="post-detail">
                                <strong>Date:</strong> {post.date}
                            </p>
                            <p
                                className="post-detail mb-4"
                                style={{
                                    whiteSpace: "pre-line",
                                }}
                            >
                                <strong>Benefits:</strong> {post.benefits}
                            </p>
                        </div>
                        <div className="d-flex flex-row justify-content-between">
                            <div className="">
                                <Link className="m-2 ml-0" to={`/post/${post._id}/postapplication`}>
                                    <button className="btn btn-dark"> Apply now </button>
                                </Link>
                                <Link to={"/dashboardstd"} className="m-2">
                                    <button className="btn btn-outline-dark"> Go back</button>
                                </Link>
                            </div>
                            <div className="d-flex justify-content-end">
                                <Link
                                    to={`/viewOrgProfile/${post.author}`}
                                    className="m-2 mt-0 flex-end"
                                >
                                    <button className="btn btn-dark">Visit Profile</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="no-post-selected">Select a post to view details.</p>
                )}
            </div>
        </div>
    );
};

export default StudentPostpage;
