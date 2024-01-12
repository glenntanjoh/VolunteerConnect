import React, { useState, useEffect, useContext } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import "../orgPages/ProfileOrg.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserContext } from "../../hooks/UserContext";
import { toast } from "react-hot-toast";

// import { AxiosPromise } from "axios";
// import alert from 'react';

const Comment = () => {
    const { user } = useContext(UserContext);
    // const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([]);

    // Working on POST comment
    const [comment, setComment] = useState({
        comment: "",
        timestamp: "",
    });

    const { profileID } = useParams();

    const postComment = async (e) => {
        e.preventDefault();
        const currentTimestamp = new Date().toLocaleString();
        try {
            const response = await axios.post(`/postComment/${profileID}`, {
                comment: comment.comment,
                timestamp: currentTimestamp,
            });

            const { data } = response;

            if (data.error) {
                toast.error(data.error);
            } else {
                // Find the index where the new comment should be inserted
                const insertIndex = comments.findIndex((c) => c.timestamp < data.timestamp);

                // If insertIndex is -1, it means the new comment is the latest, so add it to the end
                if (insertIndex === -1) {
                    setComments((prevComments) => [...prevComments, data]);
                } else {
                    // Insert the new comment at the appropriate index
                    setComments((prevComments) => [
                        ...prevComments.slice(0, insertIndex),
                        data,
                        ...prevComments.slice(insertIndex),
                    ]);
                }

                setComment({ comment: "", timestamp: "" });
                toast.success("Comment Posted!");
                window.location.reload();
            }
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/getComments/${profileID}`);
                const reversedComments = response.data.reverse();
                // console.log(response);
                setComments(reversedComments);
            } catch (error) {
                console.error(error);
                // Handle error fetching comments
            }
        };

        fetchComments();
    }, [profileID]);

    const handleDeleteComment = async (commentID) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this comment?');

        if (isConfirmed) {
            try {
                await axios.delete(`/deleteComment/${commentID}`);
                // After successful deletion, update the comments state to reflect the changes
                setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentID));
                toast.success('Comment deleted!');
                // window.location.reload();
            } catch (error) {
                console.error(error);
                toast.error('Error deleting comment');
            }
        }

    };

    return (
        <Container>
            <Row>
                <Col className="m-4">
                    <h3 className="mb-3">Post a Comment</h3>
                    <Form className="comment-form" onSubmit={postComment}>
                        <Form.Group controlId="commentBox">
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Write your comment here..."
                                value={comment.comment}
                                onChange={(e) =>
                                    setComment({
                                        ...comment,
                                        comment: e.target.value,
                                    })
                                }
                            />
                            <Button
                                variant="primary"
                                type="submit"
                                className="mt-0 comment-button btn btn-success"
                            >
                                Post
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col className="m-4">
                    <h3 className="mb-3">Comments</h3>
                    {comments.length === 0 ? (
                        <p>No comments yet.</p>
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
                                    {comment.userID === user.id && (
                                        <div className="">
                                            <Button
                                                variant="danger"
                                                onClick={() => handleDeleteComment(comment._id)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        ))
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Comment;
