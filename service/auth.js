const secret = "1bfhkj@dfksd"; // Secret key for JWT
const jwt = require("jsonwebtoken");

// Function to create JWT token from user data
function setUser(user) {
    return jwt.sign({
        _id:user._id,
        email:user.email,
    }, secret);
}

// Function to verify and decode JWT token
function getUser(token) {
    if (!token) {
        return null; // Corrected 'NULL' to 'null'
    }
    try {
        return jwt.verify(token, secret); // Decodes the token
    } catch (error) {
        // Handle any errors that might occur during verification
        console.error('Error verifying token:', error);
        return null; // Return null if token is invalid or verification fails
    }
}

module.exports = {
    setUser,
    getUser,
};
