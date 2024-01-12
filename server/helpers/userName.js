const { Database: DB } = require("../database/db");
const { ObjectId } = require("mongodb");

/* Get matching user, either a student or organization */
const getUser = async (query) => {
    let match = await DB.getOrg(query);
    if (match) {
        return ["org", match];
    }
    match = await DB.getStudent(query);
    if (match) {
        return ["student", match];
    }
    return null;
};

const getUserNamefromID = async (userID) => {
    try {
        let data = await getUser({ _id: new ObjectId(userID) });
        if (!data) {
            return null;
        } else if (data[0] == "student") {
            return data[1].profileInfo.name;
        } else if (data[0] == "org") {
            return data[1].profileInfo.orgName;
        }
    } catch (error) {
        return error;
    }
};

module.exports = { getUserNamefromID };
