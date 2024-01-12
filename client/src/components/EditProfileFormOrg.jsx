import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

function EditProfileFormOrg({
    orgData,
    handleInputChange,
    handleFormSubmit,
    handleCancel,
    show,
}) {
    return (
        <Modal show={show} onHide={handleCancel} dialogClassName="custom-modal">
            <Modal.Header closeButton>
                <Modal.Title>Edit Organization Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleFormSubmit} id="edit-form-org">
                    {/* Organization Name input */}
                    <Form.Group>
                        <Form.Label>Organization Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="orgName"
                            value={orgData.orgName}
                            onChange={(e) => handleInputChange(e, "orgName")}
                        />
                    </Form.Group>

                    {/* Description input */}
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={orgData.description}
                            onChange={(e) =>
                                handleInputChange(e, "description")
                            }
                        />
                    </Form.Group>

                    {/* More Info input (if orgData.more exists) */}
                    {/* {orgData.more && ( */}
                        <Form.Group>
                            <Form.Label>More Info</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="more"
                                value={orgData.more}
                                onChange={(e) => handleInputChange(e, "more")}
                            />
                        </Form.Group>
                    {/* )} */}

                    {/* Contact Name input (if orgData.contactName exists) */}
                    {/* {orgData.contactName && ( */}
                        <Form.Group>
                            <Form.Label>Contact Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="contactName"
                                value={orgData.contactName}
                                onChange={(e) =>
                                    handleInputChange(e, "contactName")
                                }
                            />
                        </Form.Group>
                    {/* )} */}

                    {/* Contact Email input (if orgData.contactEmail exists) */}
                    {/* {orgData.contactEmail && ( */}
                        <Form.Group>
                            <Form.Label>Contact Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="contactEmail"
                                value={orgData.contactEmail}
                                onChange={(e) =>
                                    handleInputChange(e, "contactEmail")
                                }
                            />
                        </Form.Group>
                    {/* )} */}

                    {/* Contact Phone Number input (if orgData.contactPhoneNumber exists) */}
                    {/* {orgData.contactPhoneNumber && ( */}
                        <Form.Group>
                            <Form.Label>Contact Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="contactPhoneNumber"
                                value={orgData.contactPhoneNumber}
                                onChange={(e) =>
                                    handleInputChange(e, "contactPhoneNumber")
                                }
                            />
                        </Form.Group>
                    {/* )} */}

                    <Button variant="secondary" className="m-1" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="primary" className="m-1" type="submit">
                        Save
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default EditProfileFormOrg;
