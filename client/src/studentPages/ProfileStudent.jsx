import React, { useContext } from "react";
import { UserContext } from "../../hooks/UserContext";
// const { Database: DB } = require("../../../server/database/db");
import { useState, useEffect } from "react";
import axios from "axios";
// import Navbar from '../components/Studentnavbar';
// import "./ProfileOrg.css"
// import EditProfileFormOrg from '../components/EditProfileFormOrg'; // Import the edit form component
import Studentnavbar from "../components/NavbarStd";
import "./ProfileStudent.css";
import EditProfileFormStd from "../components/EditProfileFormStd";
import { Card } from "react-bootstrap";
import { toast } from "react-hot-toast";

export default function ProfileOrg() {
    const { user } = useContext(UserContext);
    const [stdData, setstdData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // console.log(user);
        if (user) {
            // Make an HTTP request to your server to fetch organization data based on user.id
            // console.log("H1");
            axios.get("/studentProfile").then((data) => {
                // console.log(data);
                const version = data.data.profileInfo;
                setstdData(version);
            });
        }
    }, [user]); // Include user as a dependency to trigger the effect when user changes

    useEffect(() => {
        if (user) {
            const fetchComments = async () => {
                try {
                    const profileID = user.id;
                    const response = await axios.get(`/getComments/${profileID}`);
                    const reversedComments = response.data.reverse();
                    setComments(reversedComments);
                } catch (error) {
                    console.error(error);
                    // Handle error fetching comments
                }
            };

            fetchComments();
        }
    }, [user]);

    const handleEditClick = () => {
        setIsEditing(true);
        setShowEditModal(true);
    };

    const handleCancelEdit = () => {
        window.location.reload();
        setIsEditing(false);
        setShowEditModal(false);
    };

    const handleFormSubmit = async (e) => {
        try {
            e.preventDefault();
            // Check if required fields are empty
            if (!stdData.name || !stdData.bio || !stdData.phoneNumber) {
                // Alert the user that required fields are empty
                toast.error("Please fill in all required fields");
                return;
            }

            // Make an Axios PUT request to update the organization's profile
            const response = await axios.patch("/editStdProfile", stdData);

            // Check if the request was successful
            if (response.status === 200) {
                // Data was successfully updated on the server
                setIsEditing(false); // Return to view mode
                setShowEditModal(false); // Close the edit modal if needed

                // You can also update your local state with the updated data if necessary
                const updatedstdData = response.data;
                setstdData(updatedstdData);

                // Reload the page to reflect the changes
                window.location.reload();
            } else {
                // Handle the case where the request was not successful
                // You may want to show an error message to the user
            }
        } catch (error) {
            // Handle any errors that occur during the request
            console.error("Failed to update organization profile:", error);

            // You may want to show an error message to the user
        }
    };

    const handleInputChange = (e, fieldName) => {
        const value = e.target.value;
        setstdData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    return (
        <div>
            <Studentnavbar />
            {user ? (
                <div className="container mt-5 main-content">
                    {stdData ? (
                        <div>
                            <div className="p-3 mb-2 bg-success-light text-emphasis-success border border-success p-2 mb-2 border-top-10 border-3 rounded-2">
                                <h1 className="text-center border border-2 bg-white p-1 rounded-3 mb-5 mt-2">
                                    Student Profile
                                </h1>

                                <div className="container-flex">
                                    {/* <h2 className='container'>Welcome</h2> */}

                                    <div>
                                        <div className="container row">
                                            <div className="col-9">
                                                {/* name */}
                                                <h4 className="mb-4">{stdData.name}</h4>

                                                {/* Bio */}
                                                <h4>Bio</h4>
                                                <p
                                                    className="border border-white border-3 rounded-1 p-2 mb-2 "
                                                    style={{ whiteSpace: "pre-line" }}
                                                >
                                                    {stdData.bio}
                                                </p>

                                                {/* Check for data in more , if found, only then show this field */}
                                                {stdData.skills_interests && (
                                                    <div>
                                                        <h4>Skills and Interests</h4>
                                                        <p style={{ whiteSpace: "pre-line" }}>
                                                            {stdData.skills_interests}
                                                        </p>
                                                    </div>
                                                )}

                                                {stdData.experience && (
                                                    <div>
                                                        <h4>Experience</h4>
                                                        <p style={{ whiteSpace: "pre-line" }}>
                                                            {stdData.experience}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                            {/* <div className="col-auto"></div> */}
                                            <div className="col-3">
                                                <h4 className="text-center border rounded-2 bg-warning">
                                                    Contact Me
                                                </h4>

                                                {/* <h5>Name</h5>
                                            <p className="">{stdData.contactName}</p> */}

                                                <h5>Email</h5>
                                                <p typeof="email">{user.email}</p>

                                                <h5>Number</h5>
                                                <p>{stdData.phoneNumber}</p>
                                            </div>

                                            {isEditing ? (
                                                <EditProfileFormStd
                                                    stdData={stdData}
                                                    handleInputChange={handleInputChange}
                                                    handleFormSubmit={handleFormSubmit}
                                                    handleCancel={handleCancelEdit}
                                                    show={showEditModal}
                                                />
                                            ) : (
                                                <div className="container-flex">
                                                    <button
                                                        onClick={handleEditClick}
                                                        className="btn btn-success wider-button"
                                                    >
                                                        Edit Profile
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <section className="container-flex border border-success border-3 rounded-3 p-5 pt-0">
                                <h3 className="m-3 mt-4">Comments</h3>
                                {comments.length === 0 ? (
                                    <div className="m-3 mb-0">No comments yet.</div>
                                ) : (
                                    comments.map((comment, index) => (
                                        <Card key={index} className="m-2">
                                            <Card.Body className="d-flex flex-row justify-content-between align-items-start">
                                                <div className="d-flex flex-column">
                                                    <Card.Title>{comment.userName}</Card.Title>
                                                    <Card.Subtitle className="mb-2 text-muted">
                                                        {comment.timestamp}
                                                    </Card.Subtitle>
                                                    <Card.Text>{comment.commentText}</Card.Text>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    ))
                                )}
                            </section>
                        </div>
                    ) : (
                        <p>Loading student data...</p>
                    )}
                </div>
            ) : (
                <p>User not logged in</p>
            )}
        </div>
    );
}
