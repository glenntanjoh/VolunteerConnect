import React, { useState } from "react";

const JobCard = ({ posting, onDelete, onEdit }) => {
    const [showDetails, setShowDetails] = useState(false);

  const handleDelete = () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this posting?');

    if (isConfirmed) {
      onDelete(posting);
    }
  };

    const handleToggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className="card mb-4">
            <div className="card-body">
                <h5 className="card-title">{posting.title}</h5>
                <p className="card-text">{posting.date}</p>
                <p className="card-text" style={{whiteSpace: "pre-line"}}>{posting.description}</p>

                {showDetails && (
                    <div>
                        <p style={{whiteSpace: "pre-line"}}> <strong>Duties: </strong>{posting.duties}</p>
                        <p style={{whiteSpace: "pre-line"}}><strong>Benefits: </strong>{posting.benefits}</p>
                    </div>
                )}

                <button className="btn btn-primary mr-3" onClick={handleToggleDetails}>
                    {showDetails ? "Hide Details" : "Show Details"}
                </button>
                <button
                    className="btn btn-warning mr-3"
                    onClick={() => onEdit(posting)}
                    style={{ margin: "5px" }}
                >
                    Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(posting)}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default JobCard;
