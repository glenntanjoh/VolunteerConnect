const express = require("express");
const router = express.Router();
const {
    orgProfile,
    createNewPosting,
    editOrgProfile,
    viewOrgProfile,
    getAllOrgPosting,
    deletePosting,
    getAllApplications,
    getAllApplicationsToCSV,
    editPosting,
} = require("../controllers/orgControllers");

router.get("/orgProfile", orgProfile);

router.post("/createNewPosting", createNewPosting);

// Add route for getAllOrgPosting
router.get("/orgPostings", getAllOrgPosting);

router.patch("/editOrgProfile", editOrgProfile);

router.get("/viewOrgProfile/:profileID", viewOrgProfile);

router.get("/postApp/:postID", getAllApplications);

router.get("/postApp/:postID/to-csv", getAllApplicationsToCSV);

// DELETE route for deleting a posting
router.delete("/deletePosting/:postId", deletePosting);

router.patch("/editPosting/:postId", editPosting);

module.exports = router;
