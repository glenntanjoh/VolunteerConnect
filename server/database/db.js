const { MongoClient, ServerApiVersion } = require("mongodb");
const URI =
    `mongodb+srv://${process.env.MONGODB_SECRET_USER}:${process.env.MONGODB_SECRET_PASS}` +
    `@370-database.qfatnmj.mongodb.net/?retryWrites=true&w=majority`;
const dataVersions = require("./dataVersions");
const { ObjectId } = require("mongodb");
/**
 * Access the MongoDB database through wrapper functions aimed to reduce mistakes & simplify usage.
 * init() must be called before any other function.
 *
 * NOTE: Do not use the direct insert/find/replace/delete functions unless you have a good reason.
 * Use the new/find/set wrappers for each collection (student/org/etc).
 */
const Database = {
    CLIENT: undefined,
    DB: undefined,
    COLLECTIONS: {
        STUDENTS: undefined,
        ORGANIZATIONS: undefined,
        POSTINGS: undefined,
        APPLICATIONS: undefined,
        COMMENTS: undefined,
    },
    COLLECTION_NAMES: {
        STUDENTS: "students",
        ORGANIZATIONS: "organizations",
        POSTINGS: "postings",
        APPLICATIONS: "applications",
        COMMENTS: "comments",
    },

    /**
     * Initialize and establish a connection to the database.
     * This can only be done once.
     */
    init: async function () {
        if (this.DB) {
            console.error("DATABASE ALREADY INITIALIZED; ATTEMPT TO REINITIALIZE.");
            return;
        }

        this.CLIENT = new MongoClient(URI, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });
        await this.CLIENT.connect();

        this.DB = this.CLIENT.db(process.env.MONGODB_SECRET_DB);
        this.COLLECTIONS.STUDENTS = this.DB.collection(this.COLLECTION_NAMES.STUDENTS);
        this.COLLECTIONS.ORGANIZATIONS = this.DB.collection(this.COLLECTION_NAMES.ORGANIZATIONS);
        this.COLLECTIONS.POSTINGS = this.DB.collection(this.COLLECTION_NAMES.POSTINGS);
        this.COLLECTIONS.APPLICATIONS = this.DB.collection(this.COLLECTION_NAMES.APPLICATIONS);
        this.COLLECTIONS.COMMENTS = this.DB.collection(this.COLLECTION_NAMES.COMMENTS);

        process.on("SIGINT", (event) => {
            this.CLIENT.close();
            console.log("Database exited!");
            process.exit(0);
        });
        process.on("SIGTERM", (event) => {
            this.CLIENT.close();
            console.log("Database exited!");
            process.exit(0);
        });

        console.log("Database initialized!");
    },

    /**
     * Convert a collection name into the predefined collection object if it is not one already.
     *
     * @param {string|object} collection The name/object of the collection.
     *
     * @returns {object|null} The collection object, or null if it does not exist.
     */
    convertCollection: function (collection) {
        if (typeof collection === "string") {
            if (Object.values(this.COLLECTION_NAMES).includes(collection)) {
                return this.DB.collection(collection);
            } else {
                console.error(
                    `DATABASE ERROR: invalid collection name ${collection}; cannot convert to collection.`
                );
                return null;
            }
        } else {
            if (Object.values(this.COLLECTIONS).includes(collection)) {
                return collection;
            } else {
                console.error(
                    `DATABASE ERROR: invalid collection; something is seriously wrong...`
                );
                return null;
            }
        }
    },

    /**
     * Insert a document into a collection.
     *
     * @param {string|object} collection The name/object of the collection.
     * @param {object} data The document to insert.
     *
     * @returns {object} The result of the insert (https://mongodb.github.io/node-mongodb-native/6.1/interfaces/InsertOneResult.html).
     */
    insertOne: async function (collection, data) {
        if (!this.DB) {
            console.error("DATABASE NOT INITIALIZED YET; ATTEMPT TO insertOne().");
            return;
        }

        let collection_obj = this.convertCollection(collection);
        return await collection_obj.insertOne(data);
    },

    /**
     * Query for a document in a collection.
     *
     * @param {string|object} collection The name/object of the collection.
     * @param {object} query An object containing the key/value pairs to search for.
     * @param {object} options (Optional) Options for finding (https://mongodb.github.io/node-mongodb-native/6.1/interfaces/FindOptions.html).
     *
     * @returns {object|null} The document containing the first occurance of the query, or null if no documents match.
     */
    findOne: async function (collection, query, options) {
        if (!this.DB) {
            console.error("DATABASE NOT INITIALIZED YET; ATTEMPT TO findOne().");
            return;
        }

        let collection_obj = this.convertCollection(collection);
        return await collection_obj.findOne(query, options);
    },

    /**
     * Query for all matching documents in a collection.
     *
     * @param {string|object} collection The name/object of the collection.
     * @param {object} query An object containing the key/value pairs to search for.
     * @param {object} options (Optional) Options for finding (https://mongodb.github.io/node-mongodb-native/6.1/interfaces/FindOptions.html).
     *
     * @returns {object} A cursor object for iterating through matches (https://mongodb.github.io/node-mongodb-native/6.1/classes/FindCursor.html).
     */
    find: async function (collection, query, options) {
        if (!this.DB) {
            console.error("DATABASE NOT INITIALIZED YET; ATTEMPT TO find().");
            return;
        }

        let collection_obj = this.convertCollection(collection);
        return await collection_obj.find(query, options);
    },

    /**
     * Replace a document in a collection.
     *
     * @param {string|object} collection The name/object of the collection.
     * @param {object} query An object containing the key/value pairs to search for.
     * @param {object} data The data to replace the existing data.
     * @param {object} options (Optional) Options for replacing (https://mongodb.github.io/node-mongodb-native/6.1/interfaces/ReplaceOptions.html).
     *
     * @returns {object} The result of the replacement (https://mongodb.github.io/node-mongodb-native/6.1/interfaces/UpdateResult.html).
     */
    replaceOne: async function (collection, query, data, options) {
        if (!this.DB) {
            console.error("DATABASE NOT INITIALIZED YET; ATTEMPT TO replaceOne().");
            return;
        }

        if (typeof options != "object") options = {};
        if (!Object.hasOwn(options, "upsert")) options.upsert = true;
        let collection_obj = this.convertCollection(collection);
        return await collection_obj.replaceOne(query, data, options);
    },

    /**
     * Delete a document constituting the first match in a collection.
     *
     * @param {string|object} collection The name/object of the collection.
     * @param {object} query An object containing the key/value pairs to search for.
     *
     * @returns The result of the deletion (https://mongodb.github.io/node-mongodb-native/6.1/interfaces/DeleteResult.html).
     */
    deleteOne: async function (collection, query) {
        if (!this.DB) {
            console.error("DATABASE NOT INITIALIZED YET; ATTEMPT TO deleteOne().");
            return;
        }

        let collection_obj = this.convertCollection(collection);
        return await collection_obj.deleteOne(query);
    },

    /**
     * Delete all matching documents in a collection.
     *
     * @param {string|object} collection The name/object of the collection.
     * @param {object} query An object containing the key/value pairs to search for.
     *
     * @returns The result of the deletion (https://mongodb.github.io/node-mongodb-native/6.1/interfaces/DeleteResult.html).
     */
    delete: async function (collection, query) {
        if (!this.DB) {
            console.error("DATABASE NOT INITIALIZED YET; ATTEMPT TO delete().");
            return;
        }

        let collection_obj = this.convertCollection(collection);
        return await collection_obj.delete(query);
    },

    /**
     * Get a document for a student's account.
     *
     * @param {object} query An object containing the key/pair pairs to search for.
     *
     * @returns {object|null} The document that matches the query, or null if one is not found.
     */
    getStudent: async function (query) {
        let studentData = await this.findOne(this.COLLECTIONS.STUDENTS, query);
        if (!studentData) {
            return null;
        } else {
            while (studentData.DATA_VERSION < dataVersions.STUDENTS_VERSIONS.length - 1) {
                studentData =
                    dataVersions.STUDENTS_VERSIONS[studentData.DATA_VERSION + 1].upgrade(
                        studentData
                    );
            }
            await this.setStudent(studentData);
            return studentData;
        }
    },

    /**
     * Get all student account documents.
     *
     * @param {object} query An object containing the key/value pairs to search for.
     * @param {object} options (Optional) Any FindOptions to modify the query.
     *
     * @returns {object} An array of documents matching the query.
     */
    getAllStudents: async function (query, options) {
        if (typeof options != "object") options = {};
        if (!Object.hasOwn(options, "limit")) options.limit = 50;

        let studentsCursor = await this.find(this.COLLECTIONS.STUDENTS, query, options);

        let results = [];
        for await (const doc of studentsCursor) {
            results.push(doc);
        }
        return results;
    },

    /**
     * Create a new document for a student account.
     *
     * @param {object} studentInfo An object of properties for the new student.
     *
     * @returns {boolean} Whether the student's document was successfully created.
     */
    newStudent: async function (studentInfo) {
        if (!studentInfo || !studentInfo.email) {
            console.error("DATABASE ERROR: Cannot create student without an email.");
        }
        let duplicate = await this.findOne(this.COLLECTIONS.STUDENTS, {
            email: studentInfo.email,
        });
        if (duplicate !== null) {
            console.error("DATABASE ERROR: Another student exists with same email.");
            return false;
        }

        let result =
            dataVersions.STUDENTS_VERSIONS[dataVersions.STUDENTS_VERSIONS.length - 1].create(
                studentInfo
            );
        if (result === null) {
            console.error("DATABASE ERROR: Failed to create new student.");
            return false;
        }

        result = await this.insertOne(this.COLLECTIONS.STUDENTS, result);
        if (result.acknowledged !== true) {
            console.error("DATABASE ERROR: Failed to save new student.");
            return false;
        }

        return true;
    },

    /**
     * Update the document for a student's account.
     *
     * @param {object} studentData An existing document for a student to update.
     *
     * @returns {boolean} Whether the student's document was updated.
     */
    setStudent: async function (studentData) {
        let result =
            dataVersions.STUDENTS_VERSIONS[dataVersions.STUDENTS_VERSIONS.length - 1].verify(
                studentData
            );
        if (!result) {
            console.error("DATABASE ERROR: Failed data verification test; cannot setStudent.");
            return false;
        }
        result = await this.replaceOne(
            this.COLLECTIONS.STUDENTS,
            { _id: studentData._id },
            studentData,
            { upsert: false }
        );
        return result.acknowledged && result.modifiedCount === 1;
    },

    /**
     * Delete the document for a student's account.
     *
     * @param {object} studentData An existing document for a student to delete.
     *
     * @returns {boolean} Whether the student's document was deleted.
     */
    deleteStudent: async function (studentData) {
        let result =
            dataVersions.STUDENTS_VERSIONS[dataVersions.STUDENTS_VERSIONS.length - 1].verify(
                studentData
            );
        if (!result) {
            console.error("DATABASE ERROR: Failed data verification test; cannot deleteStudent.");
            return false;
        }
        result = await this.deleteOne(this.COLLECTIONS.STUDENTS, { _id: studentData._id });
        return result.acknowledged && result.deletedCount === 1;
    },

    /**
     * Get a document for an organizations's account.
     *
     * @param {object} query An object containing the key/pair pairs to search for.
     *
     * @returns {object|null} The document that matches the query, or null if one is not found.
     */
    getOrg: async function (query) {
        let orgData = await this.findOne(this.COLLECTIONS.ORGANIZATIONS, query);
        if (!orgData) {
            return null;
        } else {
            while (orgData.DATA_VERSION < dataVersions.ORGANIZATIONS_VERSIONS.length - 1) {
                orgData =
                    dataVersions.ORGANIZATIONS_VERSIONS[orgData.DATA_VERSION + 1].upgrade(orgData);
            }
            await this.setOrg(orgData);
            return orgData;
        }
    },

    /**
     * Get all organization account documents.
     *
     * @param {object} query An object containing the key/value pairs to search for.
     * @param {object} options (Optional) Any FindOptions to modify the query.
     *
     * @returns {object} An array of documents matching the query.
     */
    getAllOrgs: async function (query, options) {
        if (typeof options != "object") options = {};
        if (!Object.hasOwn(options, "limit")) options.limit = 50;

        let orgsCursor = await this.find(this.COLLECTIONS.ORGANIZATIONS, query, options);

        let results = [];
        for await (const doc of orgsCursor) {
            results.push(doc);
        }
        return results;
    },

    /**
     * Create a new document for an organization account.
     *
     * @param {object} orgInfo An object of properties for the new organization.
     *
     * @returns {boolean} Whether the organization's document was successfully created.
     */
    newOrg: async function (orgInfo) {
        if (!orgInfo || !orgInfo.email) {
            console.error("DATABASE ERROR: Cannot create org without an email.");
        }
        let duplicate = await this.findOne(this.COLLECTIONS.ORGANIZATIONS, {
            email: orgInfo.email,
        });
        if (duplicate !== null) {
            console.error("DATABASE ERROR: Another org exists with same email.");
            return false;
        }

        let result =
            dataVersions.ORGANIZATIONS_VERSIONS[
                dataVersions.ORGANIZATIONS_VERSIONS.length - 1
            ].create(orgInfo);
        if (result === null) {
            console.error("DATABASE ERROR: Failed to create new org.");
            return false;
        }

        result = await this.insertOne(this.COLLECTIONS.ORGANIZATIONS, result);
        if (result.acknowledged !== true) {
            console.error("DATABASE ERROR: Failed to save new org.");
            return false;
        }

        return true;
    },

    /**
     * Update the document for an organization's account.
     *
     * @param {object} orgData An existing document for an organanization to update.
     *
     * @returns {boolean} Whether the organization's document was updated.
     */
    setOrg: async function (orgData) {
        let result =
            dataVersions.ORGANIZATIONS_VERSIONS[
                dataVersions.ORGANIZATIONS_VERSIONS.length - 1
            ].verify(orgData);
        if (!result) {
            console.error("DATABASE ERROR: Failed data verification test; cannot setOrg.");
            return false;
        }
        result = await this.replaceOne(
            this.COLLECTIONS.ORGANIZATIONS,
            { _id: orgData._id },
            orgData,
            { upsert: false }
        );
        return result.acknowledged && result.modifiedCount === 1;
    },

    /**
     * Delete the document for an organization's account.
     *
     * @param {object} orgData An existing document for a organization to delete.
     *
     * @returns {boolean} Whether the organizations's document was deleted.
     */
    deleteOrg: async function (orgData) {
        let result =
            dataVersions.ORGANIZATIONS_VERSIONS[
                dataVersions.ORGANIZATIONS_VERSIONS.length - 1
            ].verify(orgData);
        if (!result) {
            console.error("DATABASE ERROR: Failed data verification test; cannot deleteOrg.");
            return false;
        }
        result = await this.deleteOne(this.COLLECTIONS.ORGANIZATIONS, { _id: orgData._id });
        return result.acknowledged && result.deletedCount === 1;
    },

    /**
     * Get a document for a posting.
     *
     * @param {object} query An object containing the key/pair pairs to search for.
     *
     * @returns {object|null} The document that matches the query, or null if one is not found.
     */
    getPosting: async function (query) {
        let postingData = await this.findOne(this.COLLECTIONS.POSTINGS, query);
        if (!postingData) {
            return null;
        } else {
            while (postingData.DATA_VERSION < dataVersions.POSTINGS_VERSIONS.length - 1) {
                postingData =
                    dataVersions.POSTINGS_VERSIONS[postingData.DATA_VERSION + 1].upgrade(
                        postingData
                    );
            }
            await this.setPosting(postingData);
            return postingData;
        }
    },

    /**
     * Get all posting documents.
     *
     * @param {object} query An object containing the key/value pairs to search for.
     * @param {object} options (Optional) Any FindOptions to modify the query.
     *
     * @returns {object} An array of documents matching the query.
     */
    getAllPostings: async function (query, options) {
        if (typeof options != "object") options = {};
        if (!Object.hasOwn(options, "limit")) options.limit = 50;

        let postingsCursor = await this.find(this.COLLECTIONS.POSTINGS, query, options);

        let results = [];
        for await (const doc of postingsCursor) {
            results.push(doc);
        }
        return results;
    },

    /**
     * Create a new document for a posting.
     *
     * @param {object} postingInfo An object of properties for the new posting.
     *
     * @returns {boolean} Whether the posting's document was successfully created.
     */
    newPosting: async function (postingInfo) {
        let result =
            dataVersions.POSTINGS_VERSIONS[dataVersions.POSTINGS_VERSIONS.length - 1].create(
                postingInfo
            );
        if (result === null) {
            console.error("DATABASE ERROR: Failed to create new posting.");
            return false;
        }

        result = await this.insertOne(this.COLLECTIONS.POSTINGS, result);
        if (result.acknowledged !== true) {
            console.error("DATABASE ERROR: Failed to save new posting.");
            return false;
        }

        return true;
    },

    /**
     * Update the document for a posting.
     *
     * @param {object} postingData An existing document for an organanization to update.
     *
     * @returns {boolean} Whether the organization's document was updated.
     */
    setPosting: async function (postingData) {
        let result =
            dataVersions.POSTINGS_VERSIONS[dataVersions.POSTINGS_VERSIONS.length - 1].verify(
                postingData
            );
        if (!result) {
            console.error("DATABASE ERROR: Failed data verification test; cannot setPosting.");
            return false;
        }
        result = await this.replaceOne(
            this.COLLECTIONS.POSTINGS,
            { _id: postingData._id },
            postingData,
            { upsert: false }
        );
        return result.acknowledged && result.modifiedCount === 1;
    },

    /**
     * Delete the document for a posting.
     *
     * @param {object} postingData An existing document for a posting to delete.
     *
     * @returns {boolean} Whether the posting's document was deleted.
     */
    deletePosting: async function (postingData) {
        let result =
            dataVersions.POSTINGS_VERSIONS[dataVersions.POSTINGS_VERSIONS.length - 1].verify(
                postingData
            );
        if (!result) {
            console.error("DATABASE ERROR: Failed data verification test; cannot deletePosting.");
            return false;
        }
        result = await this.deleteOne(this.COLLECTIONS.POSTINGS, { _id: postingData._id });
        return result.acknowledged && result.deletedCount === 1;
    },

    /**
     * Get a document for an application.
     *
     * @param {object} query An object containing the key/pair pairs to search for.
     *
     * @returns {object|null} The document that matches the query, or null if one is not found.
     */
    getApplication: async function (query) {
        let applicationData = await this.findOne(this.COLLECTIONS.APPLICATIONS, query);
        if (!applicationData) {
            return null;
        } else {
            while (applicationData.DATA_VERSION < dataVersions.APPLICATIONS_VERSIONS.length - 1) {
                applicationData =
                    dataVersions.APPLICATIONS_VERSIONS[applicationData.DATA_VERSION + 1].upgrade(
                        applicationData
                    );
            }
            await this.setApplication(applicationData);
            return applicationData;
        }
    },

    /**
     * Get all application documents.
     *
     * @param {object} query An object containing the key/value pairs to search for.
     * @param {object} options (Optional) Any FindOptions to modify the query.
     *
     * @returns {object} An array of documents matching the query.
     */
    getAllApplications: async function (query, options) {
        if (typeof options != "object") options = {};
        if (!Object.hasOwn(options, "limit")) options.limit = 50;

        let applicationsCursor = await this.find(this.COLLECTIONS.APPLICATIONS, query, options);

        let results = [];
        for await (const doc of applicationsCursor) {
            results.push(doc);
        }
        return results;
    },

    /**
     * Create a new document for an application.
     *
     * @param {object} applicationInfo An object of properties for the new application.
     *
     * @returns {boolean} Whether the application's document was successfully created.
     */
    newApplication: async function (applicationInfo) {
        let result =
            dataVersions.APPLICATIONS_VERSIONS[
                dataVersions.APPLICATIONS_VERSIONS.length - 1
            ].create(applicationInfo);
        if (result === null) {
            console.error("DATABASE ERROR: Failed to create new application.");
            return false;
        }

        result = await this.insertOne(this.COLLECTIONS.APPLICATIONS, result);
        if (result.acknowledged !== true) {
            console.error("DATABASE ERROR: Failed to save new application.");
            return false;
        }

        return true;
    },

    /**
     * Update the document for an application.
     *
     * @param {object} applicationData An existing document for an application to update.
     *
     * @returns {boolean} Whether the application's document was updated.
     */
    setApplication: async function (applicationData) {
        let result =
            dataVersions.APPLICATIONS_VERSIONS[
                dataVersions.APPLICATIONS_VERSIONS.length - 1
            ].verify(applicationData);
        if (!result) {
            console.error("DATABASE ERROR: Failed data verification test; cannot setApplication.");
            return false;
        }
        result = await this.replaceOne(
            this.COLLECTIONS.APPLICATIONS,
            { _id: applicationData._id },
            applicationData,
            { upsert: false }
        );
        return result.acknowledged && result.modifiedCount === 1;
    },

    /**
     * Delete the document for a application.
     *
     * @param {object} applicationData An existing document for an application to delete.
     *
     * @returns {boolean} Whether the application's document was deleted.
     */
    deleteApplication: async function (applicationData) {
        let result =
            dataVersions.APPLICATIONS_VERSIONS[
                dataVersions.APPLICATIONS_VERSIONS.length - 1
            ].verify(applicationData);
        if (!result) {
            console.error(
                "DATABASE ERROR: Failed data verification test; cannot deleteApplication."
            );
            return false;
        }
        result = await this.deleteOne(this.COLLECTIONS.APPLICATIONS, { _id: applicationData._id });
        console.log(result);
        return result.acknowledged && result.deletedCount === 1;
    },

    /**
     * Get a document for a comment.
     *
     * @param {object} query An object containing the key/pair pairs to search for.
     *
     * @returns {object|null} The document that matches the query, or null if one is not found.
     */
    getComment: async function (query) {
        let commentData = await this.findOne(this.COLLECTIONS.COMMENTS, query);
        if (!commentData) {
            return null;
        } else {
            while (commentData.DATA_VERSION < dataVersions.COMMENTS_VERSIONS.length - 1) {
                commentData =
                    dataVersions.COMMENTS_VERSIONS[commentData.DATA_VERSION + 1].upgrade(
                        commentData
                    );
            }
            await this.setComment(commentData);
            return commentData;
        }
    },

    /**
     * Get all comment documents.
     *
     * @param {object} query An object containing the key/value pairs to search for.
     * @param {object} options (Optional) Any FindOptions to modify the query.
     *
     * @returns {object} An array of documents matching the query.
     */
    getAllComments: async function (query, options) {
        if (typeof options != "object") options = {};
        if (!Object.hasOwn(options, "limit")) options.limit = 50;

        let studentsCursor = await this.find(this.COLLECTIONS.COMMENTS, query, options);

        let results = [];
        for await (const doc of studentsCursor) {
            results.push(doc);
        }
        return results;
    },

    /**
     * Create a new document for a comment.
     *
     * @param {object} commentInfo An object of properties for the new comment.
     *
     * @returns {boolean} Whether the comment's document was successfully created.
     */
    newComment: async function (commentInfo) {
        let result =
            dataVersions.COMMENTS_VERSIONS[dataVersions.COMMENTS_VERSIONS.length - 1].create(
                commentInfo
            );
        if (result === null) {
            console.error("DATABASE ERROR: Failed to create new comment.");
            return false;
        }

        result = await this.insertOne(this.COLLECTIONS.COMMENTS, result);
        if (result.acknowledged !== true) {
            console.error("DATABASE ERROR: Failed to save new comment.");
            return false;
        }

        return true;
    },

    /**
     * Update the document for a comment.
     *
     * @param {object} commentData An existing document for a comment to update.
     *
     * @returns {boolean} Whether the comment's document was updated.
     */
    setComment: async function (commentData) {
        let result =
            dataVersions.COMMENTS_VERSIONS[dataVersions.COMMENTS_VERSIONS.length - 1].verify(
                commentData
            );
        if (!result) {
            console.error("DATABASE ERROR: Failed data verification test; cannot setComment.");
            return false;
        }
        result = await this.replaceOne(
            this.COLLECTIONS.COMMENTS,
            { _id: commentData._id },
            commentData,
            { upsert: false }
        );
        return result.acknowledged && result.modifiedCount === 1;
    },

    /**
     * Delete the document for a comment.
     *
     * @param {object} commentData An existing document for a comment to delete.
     *
     * @returns {boolean} Whether the comment's document was deleted.
     */
    deleteComment: async function (commentData) {
        let result =
            dataVersions.COMMENTS_VERSIONS[dataVersions.COMMENTS_VERSIONS.length - 1].verify(
                commentData
            );
        if (!result) {
            console.error("DATABASE ERROR: Failed data verification test; cannot deleteComment.");
            return false;
        }
        result = await this.deleteOne(this.COLLECTIONS.COMMENTS, { _id: commentData._id });
        return result.acknowledged && result.deletedCount === 1;
    },
};

module.exports = { Database };
