const express = require("express");
const router = express.Router();
const {
    createNewApplication,
    getStudentApplications,
    getAllPostings,
    viewStudentProfile,
    studentProfile,
    editStdProfile,
    deleteStudentAppSubmission,
    getStudentPostings,
} = require("../controllers/studentControllers");


// Post route for application submission
router.post("/createNewApplication", createNewApplication);

router.get("/studentProfile", studentProfile);

router.get("/postings", getAllPostings);

//Get route for student application retrieval
router.get("/student/applications", getStudentApplications);

router.get("/studentPostings/:postID",getStudentPostings);

router.patch("/editStdProfile", editStdProfile);

router.get("/viewStudentProfile/:profileID", viewStudentProfile);

router.delete("/deleteStudentAppSubmission/:applicationID", deleteStudentAppSubmission);

module.exports = router;
