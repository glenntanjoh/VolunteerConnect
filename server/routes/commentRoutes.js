const express = require("express");
const router = express.Router();
const {
    postComment,
    getComments,
    deleteComment
} = require("../controllers/commentControllers");

router.post("/postComment/:profileID", postComment);

router.get("/getComments/:profileID", getComments);

router.delete("/deleteComment/:commentID", deleteComment);

module.exports = router;
