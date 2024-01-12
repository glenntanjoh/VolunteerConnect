import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/NavbarOrg";
import JobCard from "../components/JobCard.jsx";
import EditVolunteerPostingForm from "../components/EditVolunteerPostingForm.jsx";

export default function ManagePostings() {
    const [postings, setPostings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPosting, setSelectedPosting] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/orgPostings`)
            .then((response) => {
                setPostings(response.data.postings);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching org postings:", error);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (deletedPosting) => {
        try {
            await axios.delete(`http://localhost:8000/deletePosting/${deletedPosting._id}`);
            const updatedPostings = postings.filter(
                (posting) => posting._id !== deletedPosting._id
            );
            setPostings(updatedPostings);
        } catch (error) {
            console.error("Error deleting posting:", error);
        }
    };

    const handleEdit = (posting) => {
        setSelectedPosting(posting);
        setIsEditing(true);
    };

    const handleUpdate = (updatedPosting) => {
        const updatedPostings = postings.map((posting) =>
            posting._id === updatedPosting._id ? updatedPosting : posting
        );
        setPostings(updatedPostings);
    };

    const closeEditModal = () => {
        setIsEditing(false);
        setSelectedPosting(null);
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <h2>Manage Postings</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : postings.length > 0 ? (
                    <div className="card-deck">
                        {postings.map((posting) => (
                            <JobCard
                                key={posting._id}
                                posting={posting}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                            />
                        ))}
                    </div>
                ) : (
                    <p>No Postings</p>
                )}

                {isEditing && selectedPosting && (
                    <EditVolunteerPostingForm
                        onClose={closeEditModal}
                        editingPosting={selectedPosting}
                        onUpdate={handleUpdate}
                    />
                )}
            </div>
        </div>
    );
}
