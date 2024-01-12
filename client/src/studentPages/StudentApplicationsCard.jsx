import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const StudentApplicationsCard = ({ application }) => {
    const [postings, setPostings] = useState([]);

    useEffect(() => {
        const fetchPosting = async () => {
            try {
                const response = await axios.get(`/studentPostings/${application.posting_id}`);

                setPostings(response.data || []);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPosting();
    }, []);

    const [showDetails, setDetails] = useState(false);
    const HandleClick = () => {
        setDetails(!showDetails);
    };

    const handleDelete = async () => {
        console.log("Application Id:", application._id);
        if (
            window.confirm(
                "Are you sure you want to delete this application? This action cannot be undone."
            )
        ) {
            try {
                const response = await axios.delete(
                    `/deleteStudentAppSubmission/${application._id}`
                );
                console.log("Delete response:", response.data); // Log the response data
                if (response.status === 200) {
                    alert("Application deleted successfully."); // Alert the user
                    window.location.reload(); // Refresh the page
                } else {
                    alert("Error deleting application. Please try again.");
                }
            } catch (error) {
                console.log("Delete error:", error); // Log the error
                alert("Error deleting application. Please try again.");
            }
        }
    };

    return (
        <div className="card mb-5">
            <div className="appcard-body">
                <h5 className="appcard-title"> Job title: {postings.title}</h5>
                <p className="appcard-text">{postings.date}</p>
                <p className="appcard-text">{postings.description}</p>

                {showDetails ? (
                    <div>
                        {" "}
                        <h5 className="mb-2">Application Submission:</h5>
                        <p>
                            <strong>Name:</strong> {application.name}
                        </p>
                        <p>
                            <strong>Email: </strong> {application.email}
                        </p>
                        <p>
                            <strong>NSID:</strong> {application.nsid}
                        </p>
                        <p>
                            <strong>Major: </strong> {application.major}
                        </p>
                        <p>
                            <strong>Experince: </strong> {application.experience}
                        </p>
                        <p>
                            <strong>Why am I interested?:</strong> {application.message}
                        </p>
                    </div>
                ) : (
                    <></>
                )}

                <button onClick={HandleClick}>{showDetails ? "Hide" : "Show"} Submission</button>
                <button onClick={handleDelete} style={{ margin: "5px" }}>
                    Delete Submission
                </button>
                {/* Add more details as needed */}
                <div></div>
            </div>
        </div>
    );
};
export default StudentApplicationsCard;
