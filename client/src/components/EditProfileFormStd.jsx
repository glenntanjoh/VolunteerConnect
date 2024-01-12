import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

function EditProfileFormStd({
    stdData,
    handleInputChange,
    handleFormSubmit,
    handleCancel,
    show,
}) {
    return (
        <Modal show={show} onHide={handleCancel} dialogClassName="custom-modal">
            <Modal.Header closeButton>
                <Modal.Title>Edit Student Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleFormSubmit} id="edit-form-org">
                    {/* Organization Name input */}
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={stdData.name}
                            onChange={(e) => handleInputChange(e, "name")}
                        />
                    </Form.Group>

                    {/* Description input */}
                    <Form.Group>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="text"
                            name="phoneNumber"
                            value={stdData.phoneNumber}
                            onChange={(e) =>
                                handleInputChange(e, "phoneNumber")
                            }
                        />
                    </Form.Group>

                    {/* More Info input (if orgData.more exists) */}
                    {/* {stdData.bio && ( */}
                        <Form.Group>
                            <Form.Label>Bio</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="bio"
                                value={stdData.bio}
                                onChange={(e) => handleInputChange(e, "bio")}
                            />
                        </Form.Group>
                    {/* )} */}

                    {/* Contact Name input (if orgData.contactName exists) */}
                    {/* {stdData.skills_interests && ( */}
                        <Form.Group>
                            <Form.Label>Skills and Interests <div className='text-muted m-0' style={{display:"inline", fontWeight:"lighter"}}>(Optional)</div></Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="skills_interests"
                                value={stdData.skills_interests}
                                onChange={(e) =>
                                    handleInputChange(e, "skills_interests")
                                }
                            />
                        </Form.Group>
                    {/* )} */}

                    {/* Contact Email input (if orgData.contactEmail exists) */}
                    {/* {stdData.experience && ( */}
                        <Form.Group>
                            <Form.Label>Experience <div className='text-muted m-0' style={{display:"inline", fontWeight:"lighter"}}>(Optional)</div></Form.Label>
                            <Form.Control
                                as="textarea"
                                name="experience"
                                value={stdData.experience}
                                onChange={(e) =>
                                    handleInputChange(e, "experience")
                                }
                            />
                        </Form.Group>
                    {/* )} */}

                    <Button variant="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default EditProfileFormStd;
