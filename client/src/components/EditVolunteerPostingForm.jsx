import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../hooks/UserContext.jsx";
import PropTypes from "prop-types";
import styles from "../orgPages/CreateNewPosting.jsx";
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-hot-toast";

const EditVolunteerPostingForm = ({ onClose, editingPosting, onUpdate }) => {
    const initialFormData = editingPosting || {
        title: "",
        description: "",
        duties: "",
        benefits: "",
        tags: [],
        date: "",
    };
    const [newTags, setNewTags] = useState("");

    const [formData, setFormData] = useState(initialFormData);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (editingPosting) {
            setFormData(editingPosting);
        }
    }, [editingPosting]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === "tags") {
            setNewTags(value);
        }
    };

    const handleFormSubmit = async (e) => {
        try {
            e.preventDefault();

            if (!formData.title || !formData.description || !formData.duties || !formData.date) {
                toast.error("Please fill in all required fields");
                return;
            }

            if (newTags) {
                formData.tags = newTags.split(",");
            } else {
                formData.tags = initialFormData.tags;
            }

            const response = await axios.patch(`/editPosting/${editingPosting._id}`, formData);

            if (response.status === 200) {
                onClose;
                const updatedPosting = response.data;
                setFormData(updatedPosting);

                toast.success("Posting Updated Successfully");

                window.location.reload();
            } else {
                toast.success("Posting Updated Successfully");
            }
        } catch (error) {
            console.error("Failed to update organization profile:", error);
        }
    };

    return (
        <Modal show={true} onHide={onClose} dialogClassName="custom-modal">
            <Modal.Header closeButton>
                <Modal.Title>Edit Volunteer Posting</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleFormSubmit} style={{ margin: "10px", boxShadow: "none" }}>
                <Form.Group>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Duties and Responsibilities:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="duties"
                        value={formData.duties}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Benefits:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="benefits"
                        value={formData.benefits}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Tags (comma-separated):</Form.Label>
                    <Form.Control
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Date:</Form.Label>
                    <Form.Control
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Button type="submit">Submit</Button>
                <Button onClick={onClose} style={{ marginLeft: "5px" }}>
                    Cancel
                </Button>
            </Form>
        </Modal>
    );
};

EditVolunteerPostingForm.propTypes = {
    onClose: PropTypes.func.isRequired,
    editingPosting: PropTypes.object, // Optional prop for editing existing postings
    onUpdate: PropTypes.func.isRequired, // Function to update the postings list
};

export default EditVolunteerPostingForm;
