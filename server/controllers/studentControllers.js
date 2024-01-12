const { Database: DB } = require("../database/db");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
// import { UserContext } from '../../context/userContext';
const { ObjectId } = require("mongodb");
const { getEmailFromToken, getIdFromToken } = require("../helpers/authToken");

const studentProfile = async (req, res) => {
    const { token } = req.cookies;
    const email = await getEmailFromToken(token);

    const stdData = await DB.getStudent({ email: email });

    if (!stdData) {
        res.status(404).json({ message: "Student not found" });
    } else {
        res.json(stdData);
    }
};

const createNewApplication = async (req, res) => {
    try {
        const { posting_id, author, name, nsid, email, major, message, experience } = req.body;

        // checks -----------
        if (!author) {
            return res.json({
                error: "You must be logged in to create a posting",
            });
        }
        // check if title was entered
        if (!name) {
            return res.json({
                error: "Name is required",
            });
        }
        if (!nsid) {
            return res.json({
                error: "nsid is required",
            });
        }
        if (!email) {
            return res.json({
                error: "email is required",
            });
        }
        if (!major) {
            return res.json({
                error: "major is required or add undecided",
            });
        }
        if (!message) {
            return res.json({
                error: "message is required",
            });
        }
        if (!experience) {
            return res.json({
                error: "experience is required or add N/A",
            });
        }

        // Create a user in the database
        let newApplication = {
            posting_id: new ObjectId(posting_id),
            author: new ObjectId(author),
            name: name,
            nsid: nsid,
            email: email,
            major: major,
            message: message,
            experience: experience,
        };

        let result = await DB.newApplication(newApplication);

        let postingData = await DB.getPosting({ _id: new ObjectId(posting_id) });
        postingData.applications.push(new ObjectId(posting_id));
        result = result & (await DB.setPosting(postingData));

        if (result) {
            return res.json(newApplication);
        } else {
            error = "not working";
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const getStudentApplications = async (req, res) => {
    try {
        const { token } = req.cookies;
        const studentId = await getIdFromToken(token);
        // Retrieve applications for the student from the database
        try {
            const applications = await DB.getAllApplications({
                author: new ObjectId(studentId),
            });
            console.log(applications);

            if (applications && applications.length > 0) {
                return res.json(applications);
            } else {
                return res.json({
                    applications: [],
                    message: "No applications found for the student",
                });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: "Error fetching applications" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const getAllPostings = async (req, res) => {
    try {
        // const page = parseInt(req.query.page) || 1;
        // const limit = parseInt(req.query.limit) || 10; // Adjust the limit as needed
        //
        // const startIndex = (page - 1) * limit;
        //
        // // Fetch job postings with pagination from the database
        // // const postings = await DB.getAllPostingsPaginated(startIndex, limit); // Implement this function in your database module
        // const { postings, totalPages, totalPostings } = await DB.getAllPostingsPaginated(page, limit);

        // Fetch all job postings from the database
        const postings = await DB.getAllPostings(); // Implement this function in your database module

        //console.log(postings); // Test to log the result fc

        // if (postings && postings.length > 0) {
        //     return res.json({postings,totalPages,totalPostings});
        // } else {
        //     return res.status(404).json({ error: 'No job postings found' });
        // }
        if (postings) {
            return res.json(postings);
        } else {
            return res.status(404).json({ error: "No job postings found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching job postings" });
    }
};

const editStdProfile = async (req, res) => {
    const { token } = req.cookies;
    const stdEmail = await getEmailFromToken(token);
    const updatedData = req.body;

    let oldData = await DB.getStudent({ email: stdEmail });

    try {
        oldData.profileInfo.name = updatedData.name;
        oldData.profileInfo.phoneNumber = updatedData.phoneNumber;
        oldData.profileInfo.bio = updatedData.bio;
        oldData.profileInfo.skills_interests = updatedData.skills_interests;
        oldData.profileInfo.experience = updatedData.experience;

        const org = await DB.setStudent(oldData);

        res.json(org);
    } catch (error) {
        res.status(500).json({
            error: "Failed to update organization profile",
        });
    }
};

const viewStudentProfile = async (req, res) => {
    const userId = req.params.profileID;
    let user = null;
    try {
        user = await DB.getStudent({ _id: new ObjectId(userId) });
        res.json(user);
    } catch (error) {
        res.status(500).json({
            error: "Error fetching user from the database",
        });
    }
};

const getStudentPostings = async (req, res) => {
    const postId = req.params.postID;
    console.log(postId);

    try {
        const StudentApplicationPost = await DB.getPosting({ _id: new ObjectId(postId) });
        return res.json(StudentApplicationPost);
    } catch (error) {
        return res.status(500).json({ error: "Error fetching postings applications" });
    }
};

const deleteStudentAppSubmission = async (req, res) => {
    try {
        // Validate id
        const applicationId = req.params.applicationID;
        if (!ObjectId.isValid(applicationId)) {
            console.log("Invalid id format:", applicationId);
            return res.status(400).json({ error: "Bad Request: Invalid id format." });
        }

        // Get the application from the database
        const application = await DB.getApplication({ _id: new ObjectId(applicationId) });
        console.log("Fetched application:", application);

        // Check if the application exists
        if (!application) {
            console.log("Application not found:", applicationId);
            return res
                .status(404)
                .json({ error: "Not Found: Application with the provided id does not exist." });
        }

        // TODO: Add authorization check here

        // Delete the application
        const result = await DB.deleteApplication(application);
        console.log("Deletion result:", result);

        // Check if the deletion was successful
        if (!result) {
            console.log("Failed to delete application:", applicationId);
            return res
                .status(500)
                .json({ error: "Internal Server Error: Failed to delete the application." });
        }

        // If everything went well
        console.log("Application deleted successfully:", applicationId);
        return res.status(200).json({ message: "Application deleted successfully." });
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
};

module.exports = {
    studentProfile,
    createNewApplication,
    getStudentApplications,
    getAllPostings,
    editStdProfile,
    viewStudentProfile,
    getStudentPostings,
    deleteStudentAppSubmission,
};
