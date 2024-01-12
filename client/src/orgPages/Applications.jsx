//import React from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/NavbarOrg";
import JobAppCard from "../components/JobAppCard.jsx";
import { Link } from "react-router-dom";

export default function Applications() {
    const [postings, setPostings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        axios
            .get(`http://localhost:8000/orgPostings?page=${currentPage}`)
            .then((response) => {
                console.log("API Response:", response.data);
                setPostings(response.data.postings);
            })
            .catch((error) => {
                console.error("Error fetching org postings:", error);
            });
    }, []);
    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h2>Post Applications</h2>
                {postings.length > 0 ? (
                    postings.map((posting) => <JobAppCard key={posting._id} posting={posting} />)
                ) : (
                    <p>No Postings</p>
                )}
            </div>
        </>
    );
}
