const express = require("express");
const router = express.Router();
const {
    test,
    registerStudent,
    registerOrg,
    loginUser,
    logoutUser,
    getProfile,
} = require("../controllers/userControllers");
// const { default: ViewProfile } = require('../../client/src/pages/ViewProfile');
// const { default: RegisterOrg } = require('../../client/src/pages/RegisterOrg');

// test will have the req, res thing but instaed of adding it all here it will be inside the controllers
router.get("/", test);

// Post route for  register Student
router.post("/registerStudent", registerStudent);

// Post route for register Org
router.post("/registerOrg", registerOrg);

// Post route for login
router.post("/login", loginUser);

// Get route for logout
router.post("/logout", logoutUser);

// Get request for profile
router.get("/profile", getProfile);

module.exports = router;