const { Database: DB } = require("../database/db");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
// import { UserContext } from '../../context/userContext';
const { ObjectId } = require("mongodb");

const test = (req, res) => {
    res.json("test is working");
};

const registerStudent = async (req, res) => {
    try {
        const { email, password, name, phoneNumber, bio, skills, exp } = req.body;

        // checks -----------
        // prettier-ignore
        for (const [key, value] of Object.entries({
            "Name": name,
            "Phone Number": phoneNumber,
            "Email": email,
            "Password": password,
            "Bio": bio,
            "Skills and Interests": skills,
            "Experience": exp,
        })) {
            if (!value) {
                return res.json({
                    error: `${key} is required`,
                });
            } else if (key == "password" && value.length < 6) {
                return res.json({
                    error: "password must be 6 characters long",
                });
            }
        }

        // Check email
        const exists = await DB.getStudent({ email: email });
        if (exists) {
            return res.json({
                error: "Email is taken already",
            });
        }
        // -----------------

        // Hashing the password before entering in the database
        const hashedPassword = await hashPassword(password);

        // Create a user in the database
        let newstd = {
            email: email,
            password: hashedPassword, // Using the hashedPassword here
            applications: [],
            profileInfo: {
                name: name,
                phoneNumber: phoneNumber,
                bio: bio,
                skills_interests: skills,
                experience: exp,
            },
        };

        const result = await DB.newStudent(newstd);

        if (result) {
            return res.json(newstd);
        } else {
            throw new Error("Failed to register");
        }
    } catch (error) {
        console.error(error);
        return res.json({ error: error });
    }
};

const registerOrg = async (req, res) => {
    try {
        const {
            email,
            password,
            orgName,
            contactName,
            contactEmail,
            contactPhoneNumber,
            description,
            more,
        } = req.body;

        // checks
        // prettier-ignore
        for (const [key, value] of Object.entries({
            "Organization Name": orgName,
            "Email": email,
            "Password": password,
            "Description": description,
            "Contact Name": contactName,
            "Contact Number": contactPhoneNumber,
            "Contact email": contactEmail,
        })) {
            if (!value) {
                return res.json({
                    error: `${key} is required`,
                });
            } else if (key == "password" && value.length < 6) {
                return res.json({
                    error: "password must be 6 characters long",
                });
            }
        }

        // Check email
        const exists = await DB.getOrg({ email: email });
        if (exists) {
            return res.json({
                error: "Email is taken already",
            });
        }

        // Hashing the password before entering in the database
        const hashedPassword = await hashPassword(password);

        let neworg = {
            email: email,
            password: hashedPassword,
            profileInfo: {
                orgName: orgName,
                contactName: contactName,
                contactEmail: contactEmail,
                contactPhoneNumber: contactPhoneNumber,
                description: description,
                more: more,
            },
        };

        const result = await DB.newOrg(neworg);

        if (result) {
            return res.json(neworg);
        } else {
            throw new Error("Failed to register");
        }
    } catch (error) {
        console.error(error);
        return res.json({ error: error });
    }
};

// Login endpoint
const loginUser = async (req, res) => {
    const { userType, email, password } = req.body;

    // check the user type to determine if its a student or an org login
    if (userType === "student") {
        try {
            // Check if the user exists in the student DB
            const user = await DB.getStudent({ email: email });
            if (!user) {
                return res.json({
                    error: "No student found",
                });
            }

            // Check if the password matches
            const match = await comparePassword(password, user.password);
            if (match) {
                // Assign a web token
                jwt.sign(
                    {
                        email: user.email,
                        id: user._id,
                        name: user.profileInfo.name,
                        type: "student",
                    },
                    process.env.JWT_SECRET,
                    {},
                    (err, token) => {
                        if (err) throw err;
                        res.cookie("token", token, {
                            maxAge: 1000 * 60 * 60 * 24,
                        }).json(user);
                    }
                );
            } else {
                return res.json({
                    error: "Passwords do not match",
                });
            }
        } catch (error) {
            console.log(error);
        }
    } else if (userType === "organization") {
        try {
            // Check if the user exists in the student DB
            const user = await DB.getOrg({ email: email });
            if (!user) {
                return res.json({
                    error: "No organization found",
                });
            }

            // Check if the password matches
            const match = await comparePassword(password, user.password);
            if (match) {
                // Assign a web token
                jwt.sign(
                    {
                        email: user.email,
                        id: user._id,
                        name: user.profileInfo.orgName,
                        type: "organization",
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "24h" },
                    (err, token) => {
                        if (err) throw err;
                        res.cookie("token", token, {
                            maxAge: 1000 * 60 * 60 * 24,
                        }).json(user);
                    }
                );
            } else {
                return res.json({
                    error: "Passwords do not match",
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
};

// Logout endpoint
const logoutUser = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies.token) return res.sendStatus(204);

    res.clearCookie("token");
    res.sendStatus(204);
};

const getProfile = (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            res.json(user);
        });
    } else {
        res.json(null);
    }
};

module.exports = {
    test,
    registerOrg,
    registerStudent,
    loginUser,
    logoutUser,
    getProfile,
};
