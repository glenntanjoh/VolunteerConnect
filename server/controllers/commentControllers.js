const { Database: DB } = require("../database/db");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
// import { UserContext } from '../../context/userContext';
const { ObjectId } = require("mongodb");
const { getUserNamefromID } = require("../helpers/userName");
const { getEmailFromToken, getIdFromToken } = require("../helpers/authToken");

const postComment = async (req, res) => {
    try {
        const { comment, timestamp } = req.body;

        // Check is comment was entered
        if (!comment.trim()) {
            return res.json({
                error: "Comment is empty :(",
            });
        }

        const { token } = req.cookies;
        const userID = await getIdFromToken(token);
        const name = await getUserNamefromID(userID);
        const profileID = req.params.profileID;

        let newComment = {
            profileID: new ObjectId(profileID), // ID of the profile where comment is made
            userID: new ObjectId(userID), // ID of the user who is commetning
            userName: name,
            commentText: comment, // text of the comment - content
            timestamp: timestamp, // Time stamp
        };

        const result = await DB.newComment(newComment);

        if (result) {
            return res.json(newComment);
        } else {
            error: "not working";
        }
    } catch (error) {
        alert(error);
    }
};

const getComments = async (req, res) => {
    const profileID = req.params.profileID;

    try {
        // Fetch comments from MongoDB based on the profileID
        const comments = await DB.getAllComments({ profileID: new ObjectId(profileID) });

        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteComment = async (req, res) => {
    try {
        const commentID = req.params.commentID;
        const comment = await DB.getComment({ _id: new ObjectId(commentID) });
        await DB.deleteComment(comment);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    postComment,
    getComments,
    deleteComment,
};
