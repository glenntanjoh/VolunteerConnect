import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const JobAppCard = ({ posting }) => {
    return (
        <div className="card mb-5">
            <div className="appcard-body">
                <h5 className="appcard-title">{posting.title}</h5>
                <p className="appcard-text">{posting.date}</p>
                <p className="appcard-text">{posting.description}</p>
                <Link to={`/postApp/${posting._id}`}>
                    <button className="btn btn-dark">View Applicants</button>
                </Link>
                <a
                    className="btn btn-dark"
                    href={`http://localhost:8000/postApp/${posting._id}/to-csv`}
                    target="_blank"
                    style={{ margin: "5px" }}
                >
                    Download as CSV
                </a>
            </div>
        </div>
    );
};

export default JobAppCard;
