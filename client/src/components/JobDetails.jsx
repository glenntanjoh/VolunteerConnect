// JobDetails.jsx
import React from "react";

const JobDetails = ({ posting }) => {
  return (
    <div>
      <h2>{posting.title}</h2>
      <p>Date: {posting.date}</p>
      <p>Description: {posting.description}</p>
      <p>Duties: {posting.duties}</p>
      <p>Benefits: {posting.benefits}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default JobDetails;
