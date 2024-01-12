// Module used to hash the password
const bcrypt = require("bcrypt");

// Function to hash the password
const hashPassword = (password) => {
    // Promise is used to handle the asynchronous nature of bcrypt's functions.
    return new Promise((resolve, reject) => {
        //A salt is a random value that is combined with the plaintext password before hashing.
        //The 12 in the function call is the cost factor, which determines how computationally expensive the hashing process will be.
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                // If err, then reject the promise
                reject(err);
            }
            // Else, hash the password with the salt
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
};

const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed);
};

module.exports = {
    hashPassword,
    comparePassword,
};
