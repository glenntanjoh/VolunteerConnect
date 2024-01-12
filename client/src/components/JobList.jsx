// JobList.jsx
import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";

const JobList = () => {
  const [jobPostings, setJobPostings] = useState([]);

  useEffect(() => {
    // Fetch job postings from your API or database
    // Replace 'http://localhost:8000/orgPostings' with the actual API endpoint
    fetch('http://localhost:8000/orgPostings')
      .then((response) => response.json())
      .then((data) => setJobPostings(data))
      .catch((error) => console.error('Error fetching job postings:', error));
  }, []);

  const handleDelete = async (postingToDelete) => {
    try {
      // Make an API call to delete the posting on the server
      // Replace 'http://localhost:8000/deletePosting' with the actual API endpoint
      await fetch(`http://localhost:8000/deletePosting/${postingToDelete._id}`, {
        method: 'DELETE',
      });

      // Update state to reflect the deletion
      setJobPostings((prevPostings) =>
        prevPostings.filter((posting) => posting._id !== postingToDelete._id)
      );

      console.log('Posting deleted successfully');
    } catch (error) {
      console.error('Error deleting posting:', error);
    }
  };

  return (
    <div>
      <h2>Job Listings</h2>
      {jobPostings.map((posting) => (
        <JobCard key={posting._id} posting={posting} onDelete={() => handleDelete(posting)} />
      ))}
    </div>
  );
};

export default JobList;
