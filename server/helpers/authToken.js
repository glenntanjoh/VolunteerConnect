const { Database: DB } = require("../database/db");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
// import { UserContext } from '../../context/userContext';
const { ObjectId } = require("mongodb");

const getIdFromToken = (token) => {
    return new Promise((resolve, reject) => {
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    const userID = user;
                    resolve(userID);
                }
            });
        } else {
            resolve(null);
        }
    });
};

const getEmailFromToken = async (token) => {
    return new Promise((resolve, reject) => {
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    const email = user.email;
                    resolve(email);
                }
            });
        } else {
            resolve(null);
        }
    });
}

module.exports = {
    getIdFromToken,
    getEmailFromToken
};