// Student Account Data Specifications
const STUDENTS_VERSION0 = {
    BASE_STRUCTURE: {
        DATA_VERSION: 0,
        email: "",
        password: "",
        applications: [],
        profileInfo: {
            name: "",
            phoneNumber: "",
            bio: "",
            skills_interests: "",
            experience: "",
        },
    },

    create: function (newStudentInfo) {
        let studentData = structuredClone(this.BASE_STRUCTURE);
        for (const property in newStudentInfo) {
            if (studentData[property] === undefined) {
                return console.error(
                    `DATABASE ERROR: Attempt to assign invalid property '${property}' of student.`
                );
            }
            studentData[property] = newStudentInfo[property];
        }
        return studentData;
    },

    upgrade: function (version0Data) {
        console.warn("Cannot upgrade base version of data.");
        return version0Data;
    },

    verify: function (studentData) {
        for (const property in studentData) {
            if (property === "_id") continue;
            if (this.BASE_STRUCTURE[property] === undefined) {
                return console.error(`DATABASE ERROR: Invalid property ${property} of student.`);
            }
        }
        return true;
    },
};

const STUDENTS_VERSIONS = [STUDENTS_VERSION0];

// Organization Account Data Specifications
const ORGANIZATIONS_VERSION0 = {
    BASE_STRUCTURE: {
        DATA_VERSION: 0,
        email: "",
        password: "",
        postings: [],
        profileInfo: {
            orgName: "",
            contactName: "",
            contactEmail: "",
            contactPhoneNumber: "",
            description: "",
            more: "",
        },
    },

    create: function (newOrgInfo) {
        let orgData = structuredClone(this.BASE_STRUCTURE);
        for (const property in newOrgInfo) {
            if (orgData[property] === undefined) {
                return console.error(
                    `DATABASE ERROR: Attempt to assign invalid property '${property}' of org.`
                );
            }
            orgData[property] = newOrgInfo[property];
        }
        return orgData;
    },

    upgrade: function (version0Data) {
        console.warn("Cannot upgrade base version of data.");
        return version0Data;
    },

    verify: function (orgData) {
        for (const property in orgData) {
            if (property === "_id") continue;
            if (this.BASE_STRUCTURE[property] === undefined) {
                return console.error(`DATABASE ERROR: Invalid property ${property} of org.`);
            }
        }
        return true;
    },
};

const ORGANIZATIONS_VERSIONS = [ORGANIZATIONS_VERSION0];

// Posting Data Specifications
const POSTINGS_VERSION0 = {
    BASE_STRUCTURE: {
        DATA_VERSION: 0,
        author: null,
        title: "",
        date: "",
        description: "",
        duties: "",
        benefits: "",
        tags: [],
        applications: [],
    },

    create: function (newPostingInfo) {
        let postingData = structuredClone(this.BASE_STRUCTURE);
        for (const property in newPostingInfo) {
            if (postingData[property] === undefined) {
                return console.error(
                    `DATABASE ERROR: Attempt to assign invalid property '${property}' of posting.`
                );
            }
            postingData[property] = newPostingInfo[property];
        }
        return postingData;
    },

    upgrade: function (version0Data) {
        console.warn("Cannot upgrade base version of data.");
        return version0Data;
    },

    verify: function (postingData) {
        for (const property in postingData) {
            if (property === "_id") continue;
            if (this.BASE_STRUCTURE[property] === undefined) {
                return console.error(`DATABASE ERROR: Invalid property ${property} of posting.`);
            }
        }
        return true;
    },
};

const POSTINGS_VERSIONS = [POSTINGS_VERSION0];

// Application Data Specifications
const APPLICATIONS_VERSION0 = {
    BASE_STRUCTURE: {
        DATA_VERSION: 0,
        posting_id: null,
        author: null,
        name: "",
        nsid: "",
        experience: "",
        email: "",
        major: "",
        message: "",
    },

    create: function (newApplicationInfo) {
        let applicationData = structuredClone(this.BASE_STRUCTURE);
        for (const property in newApplicationInfo) {
            if (applicationData[property] === undefined) {
                return console.error(
                    `DATABASE ERROR: Attempt to assign invalid property '${property}' of application.`
                );
            }
            applicationData[property] = newApplicationInfo[property];
        }
        return applicationData;
    },

    upgrade: function (version0Data) {
        console.warn("Cannot upgrade base version of data.");
        return version0Data;
    },

    verify: function (applicationData) {
        for (const property in applicationData) {
            if (property === "_id") continue;
            if (this.BASE_STRUCTURE[property] === undefined) {
                return console.error(
                    `DATABASE ERROR: Invalid property ${property} of application.`
                );
            }
        }
        return true;
    },
};

const APPLICATIONS_VERSIONS = [APPLICATIONS_VERSION0];

// Comment Data Specifications
const COMMENTS_VERSION0 = {
    BASE_STRUCTURE: {
        DATA_VERSION: 0,
        profileID: null,
        userID: null,
        userName: "",
        commentText: "",
        timestamp: "",
    },

    create: function (newCommentInfo) {
        let commentData = structuredClone(this.BASE_STRUCTURE);
        for (const property in newCommentInfo) {
            if (commentData[property] === undefined) {
                return console.error(
                    `DATABASE ERROR: Attempt to assign invalid property '${property}' of comment.`
                );
            }
            commentData[property] = newCommentInfo[property];
        }
        return commentData;
    },

    upgrade: function (version0Data) {
        console.warn("Cannot upgrade base version of data.");
        return version0Data;
    },

    verify: function (commentData) {
        for (const property in commentData) {
            if (property === "_id") continue;
            if (this.BASE_STRUCTURE[property] === undefined) {
                return console.error(`DATABASE ERROR: Invalid property ${property} of comment.`);
            }
        }
        return true;
    },
};

const COMMENTS_VERSIONS = [COMMENTS_VERSION0];

// Export arrays of all collection version specifications
module.exports = {
    STUDENTS_VERSIONS,
    ORGANIZATIONS_VERSIONS,
    POSTINGS_VERSIONS,
    APPLICATIONS_VERSIONS,
    COMMENTS_VERSIONS,
};
