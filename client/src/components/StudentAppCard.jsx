import React from "react";
import { Link } from "react-router-dom";

const StudentAppCard = ({ application }) => {
    return (
        <div className="card mb-5">
            <div className="studentappcard-body">
                <h5 className="appcard-title">Applicant Name: {application.name}</h5>
                <p className="appcard-text">NSID: {application.nsid}</p>
                <p className="appcard-text">Contact Email: {application.email}</p>
                <p className="appcard-text">Major: {application.major}</p>
                <p className="appcard-text">Message: {application.message}</p>
                <p className="appcard-text">Experience: {application.experience}</p>

                <Link to={`/viewStudentProfile/${application.author}`}>
                    <button>View Profile</button>
                </Link>
                <div></div>
            </div>
        </div>
    );
};

export default StudentAppCard;
