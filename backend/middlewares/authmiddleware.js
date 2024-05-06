var jwt = require('jsonwebtoken');
var mymodel = require('../models/UserModel');

async function protect(req, res, next) {

    // Access cookie named 'jwttoken'
    const token = req.cookies.jwttoken;

    // Check if Token cookie Exists
    if (token) {
        try {
            // Verify the Token if exists
            const verified = jwt.verify(token, process.env.JWT_SECRET);

            // Get user Info from The token(user._id property)
            req.user = await mymodel.findById(verified.userId).select('-password');

            next();
        } catch (error) {
            console.error("Not Authorized", error);
            res.status(401).send({ status: 'error', message: "Not Authorized. Invalid Token" });
        }
    } else {
        // No token in cookie, send error response
        res.status(401).send({ status: 'error', message: "Not Authorized. Please Login" });
    }
}

module.exports = { protect };