const { Database: DB } = require("../database/db");
const csvWriter = require("csv-writer");
const fs = require("fs");
const path = require("path");
const { ObjectId } = require("mongodb");
const { getEmailFromToken, getIdFromToken } = require("../helpers/authToken");

const orgProfile = async (req, res) => {
    const { token } = req.cookies;
    const email = await getEmailFromToken(token);

    const orgData = await DB.getOrg({ email: email });
    // console.log(orgData);
    if (!orgData) {
        res.status(404).json({ message: "Organization not found" });
    } else {
        res.json(orgData);
    }
};

const getAllOrgPosting = async (req, res) => {
    const getAllPostingsPaginated = async (userID, pageNumber, pageSize) => {
        const startIndex = Math.max((pageNumber - 1) * pageSize, 0);
        try {
            const postings = await DB.getAllPostings(
                { author: new ObjectId(userID) },
                { skip: startIndex, limit: pageSize }
            );

            const totalPostings = postings.length;
            const totalPages = Math.ceil(totalPostings / pageSize);

            return { postings, totalPages, totalPostings };
        } catch (error) {
            throw error;
        }
    };

    try {
        const { token } = req.cookies;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10; // Adjust the limit as needed
        const startIndex = (page - 1) * limit;

        const userID = await getIdFromToken(token);
        // Fetch job postings with pagination from the database
        const { postings, totalPages, totalPostings } = await getAllPostingsPaginated(
            userID,
            page,
            limit
        );

        if (postings && postings.length > 0) {
            return res.json({ postings, totalPages, totalPostings });
        } else {
            return res.json({ postings: [], totalPages: 0, totalPostings: 0 });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching job postings" });
    }
};

const editOrgProfile = async (req, res) => {
    const { token } = req.cookies;
    const orgEmail = await getEmailFromToken(token);
    const updatedData = req.body;

    let oldData = await DB.getOrg({ email: orgEmail });

    try {
        oldData.profileInfo.orgName = updatedData.orgName;
        oldData.profileInfo.description = updatedData.description;
        oldData.profileInfo.more = updatedData.more;
        oldData.profileInfo.contactEmail = updatedData.contactEmail;
        oldData.profileInfo.contactName = updatedData.contactName;
        oldData.profileInfo.contactPhoneNumber = updatedData.contactPhoneNumber;

        const org = await DB.setOrg(oldData);

        res.json(org);
    } catch (error) {
        res.status(500).json({
            error: "Failed to update organization profile",
        });
    }
};

const viewOrgProfile = async (req, res) => {
    const userId = req.params.profileID;
    let user = null;
    try {
        user = await DB.getOrg({ _id: new ObjectId(userId) });
        res.json(user);
    } catch (error) {
        res.status(500).json({
            error: "Error fetching user from the database",
        });
    }
};

const deletePosting = async (req, res) => {
    try {
        const postId = req.params.postId;
        const { token } = req.cookies;
        const userID = await getIdFromToken(token);

        const post = await DB.getPosting({ _id: new ObjectId(postId) });

        if (post && post.author !== new ObjectId(userID)) {
            const result = await DB.deletePosting(post);

            if (result) {
                return res.json({ success: true, message: "Post deleted successfully" });
            } else {
                return res.status(404).json({ success: false, message: "Post not found" });
            }
        } else {
            return res
                .status(403)
                .json({ success: false, message: "Unauthorized to delete this post" });
        }
    } catch (error) {
        console.error("Error deleting posting:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const getAllApplications = async (req, res) => {
    const postId = req.params.postID;

    try {
        const postApplications = await DB.getAllApplications({ posting_id: new ObjectId(postId) });
        if (postApplications) {
            return res.json(postApplications);
        } else {
            return res.status(404).json({ error: "No applications found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching postings applications" });
    }
};

const getAllApplicationsToCSV = async (req, res) => {
    const postId = req.params.postID;
    try {
        const postApplications = await DB.getAllApplications({ posting_id: new ObjectId(postId) });
        if (postApplications) {
            const un_IDified_Apps = postApplications.map(
                ({ name, nsid, major, experience, message, email }) => ({
                    name,
                    nsid,
                    major,
                    experience,
                    message,
                    email,
                })
            );
            console.log(postApplications);
            console.log(un_IDified_Apps);

            fs.mkdir("tmp", { recursive: false }, (err) => {});

            const writer = csvWriter.createObjectCsvWriter({
                path: path.join("tmp", `${postId}.csv`),
                header: [
                    { id: "name", title: "Applicant Name" },
                    { id: "nsid", title: "NSID" },
                    { id: "major", title: "Major of Study" },
                    { id: "experience", title: "Experience/Skills" },
                    { id: "message", title: "Message of Interest" },
                    { id: "email", title: "Contact Email" },
                ],
            });
            writer
                .writeRecords(un_IDified_Apps)
                .then(() => {
                    console.log("written");
                    return res.download(path.join("tmp", `${postId}.csv`), "PostApplicants.csv");
                })
                .catch((err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: "Failed to create csv file." });
                    }
                });
        } else {
            return res.status(404).json({ error: "No applications found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching postings applications" });
    }
};

const createNewPosting = async (req, res) => {
    try {
        const { author, title, description, duties, benefits, tags, date } = req.body;

        // checks -----------
        if (!author) {
            return res.status(403).json({
                error: "You must be logged in to create a posting",
            });
        }

        // check if title was eneterd
        if (!title) {
            return res.status(400).json({
                error: "Title is required",
            });
        }
        if (!description) {
            return res.status(400).json({
                error: "Description is required",
            });
        }
        if (!duties) {
            return res.status(400).json({
                error: "Duties and Responsibilities is required",
            });
        }
        if (!date) {
            return res.status(400).json({
                error: "Date is required",
            });
        }

        // Create a user in the database
        // Creates a new posting in the database FC
        let newPost = {
            title: title,
            author: new ObjectId(author),
            date: date,
            description: description,
            duties: duties,
            benefits: benefits,
            tags: tags.split(","),
        };

        const result = await DB.newPosting(newPost);
        // const r = await DB.setOrg.postings(newPost);

        if (result) {
            return res.json(newPost);
        } else {
            error = "not working";
        }
    } catch (error) {
        alert(error);
    }
};

const editPosting = async (req, res) => {
    const postId = req.params.postId;
    const updatedData = req.body;
    // const tags = updatedData.tags;
    // try {
    // tags = tags.split(",");
    // } catch (error) {
    //     tags = updatedData.tags;
    // }
    // let tags = updatedData.tags;
    // tags = tags.split(",");
    console.log("Tags: ", updatedData.tags);
    let oldData = await DB.getPosting({ _id: new ObjectId(postId) });

    try {
        oldData.title = updatedData.title;
        oldData.description = updatedData.description;
        oldData.duties = updatedData.duties;
        oldData.benefits = updatedData.benefits;
        oldData.tags = updatedData.tags;
        oldData.date = updatedData.date;
        oldData.applications = updatedData.applications;

        const postingInfo = await DB.setPosting(oldData);

        res.json(postingInfo);
    } catch (error) {
        res.status(500).json({
            error: "Failed to update organization profile",
        });
    }
};

module.exports = {
    orgProfile,
    getAllOrgPosting,
    editOrgProfile,
    viewOrgProfile,
    deletePosting,
    getAllApplications,
    getAllApplicationsToCSV,
    createNewPosting,
    editPosting,
};
