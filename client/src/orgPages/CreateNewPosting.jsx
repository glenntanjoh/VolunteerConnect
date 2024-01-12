import React, { useState, useContext } from "react";
import { UserContext } from "../../hooks/UserContext.jsx";
import PropTypes from "prop-types";
import styles from "./CreateNewPosting.module.css";
import axios from "axios";
import { toast } from "react-hot-toast";

const VolunteerPostingForm = ({ onClose }) => {
    const [formData, setformData] = useState({
        title: "",
        description: "",
        duties: "",
        benefits: "",
        tags: "",
        date: "",
    });
    const { user } = useContext(UserContext);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const { title, description, duties, benefits, tags, date } = formData;
        const author = user.id;
        try {
            const { formData } = await axios.post("/createNewPosting", {
                title,
                author,
                description,
                duties,
                benefits,
                tags,
                date,
            });
            if (formData.error) {
                toast.error(error);
            } else {
                setformData({});
                toast.success("Success");
            }
        } catch (error) {
            console.log(error);
        }
        onClose();
    };

    return (
        <div className={styles.createNewPosting}>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                ></textarea>

                <label htmlFor="duties">Duties and Responsibilities:</label>
                <textarea
                    id="duties"
                    name="duties"
                    value={formData.duties}
                    onChange={handleInputChange}
                    required
                ></textarea>

                <label htmlFor="benefits">Benefits:</label>
                <textarea
                    id="benefits"
                    name="benefits"
                    value={formData.benefits}
                    onChange={handleInputChange}
                    required
                ></textarea>

                <label htmlFor="tags">Tags (comma-separated):</label>
                <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                />

                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                />

                <button type="submit">Post</button>
            </form>
        </div>
    );
};

VolunteerPostingForm.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default VolunteerPostingForm;
