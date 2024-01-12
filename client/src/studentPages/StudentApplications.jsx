import axios from "axios";
import React, { useEffect, useState } from "react";
import Studentnavbar from "../components/NavbarStd";
import StudentApplicationsCard from "./StudentApplicationsCard";

const StudentApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get("/student/applications");

                setApplications(response.data);
                console.log(response.data);
            } catch (error) {
                setError("Error fetching student applications");
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []); // Run this effect only once when the component mounts

    if (loading) {
        return;
    }

    if (error) {
        return;
    }

    return (
        <div>
            <Studentnavbar />
            <div className="container mt-4">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                <h2>Your Applications</h2>
                {!loading & !error & (applications.length > 0) ? (
                    <div>
                        {applications.map((application) => (
                            <StudentApplicationsCard
                                key={application._id}
                                application={application}
                            />
                        ))}
                    </div>
                ) : (
                    <p>No applications found.</p>
                )}
            </div>
        </div>
    );
};

export default StudentApplications;
