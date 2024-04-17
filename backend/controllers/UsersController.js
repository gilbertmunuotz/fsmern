var Joi = require('joi');
var bcrypt = require("bcrypt")
var token = require('../jwtToken.js');
var userModel = require('../models/UserModel');


//(DESC) A sample to test the routes & connections
async function getSignal(req, res, next) {
    try {
        res.send('Welcome Back')
    } catch (error) {
        console.error("Error Getting Data", error);
        res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    }
}

//(DESC) Registering Users
async function registerController(req, res, next) {
    const { username, email, password } = req.body; // Destructure request body

    try {

        const registerSchema = Joi.object().keys({
            username: Joi.string().min(3).max(20).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).max(20).required(),
        }).options({ abortEarly: false }) //This property allows all errors to be thrown to the console and track

        const { error } = registerSchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({ errors: error.details.map(detail => detail.message) });
        }

        // Check for existing user using usermodel (Mongoose model)
        const isExisting = await userModel.findOne({ email })
        if (isExisting) {
            return res.status(400).send({ error: 'An account with such email Already exists.Please Try a new one!' });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create a new user with the hashed password using create()
        const newUser = await userModel.create({ username, email, password: hashedPassword });

        // Access _id from the saved user document
        const userId = newUser._id;

        // Generate JWT token after successful Registration & Bind it To The User
        const payload = { userId };  // Assuming you have user id

        const Token = token.generateToken(res, payload);

        // Respond with the saved user data
        res.json({ newCreatedUser: newUser, message: "Registration successful", Token: Token });

        //Catch Existing Errors
    } catch (error) {
        console.error('Error during registration', error);
        res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    }
}

//(DESC) Logining Users
async function loginController(req, res, next) {
    const { username, password } = req.body; // Destructure request body

    try {
        const loginSchema = Joi.object().keys({
            username: Joi.string().min(3).max(20).required(),
            password: Joi.string().min(8).max(20).required(),
        }).options({ abortEarly: false }); //This property allows all errors to be thrown to the console and track

        const { error } = loginSchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({ errors: error.details.map(detail => detail.message) });
        }

        // Check for existing user using usermodel (Mongoose model)
        const user = await userModel.findOne({ username });

        if (!user) {
            return res.status(400).send({ error: 'User Doesnot Exist' });
        }

        // Compare hashed passwords using bcrypt
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).send({ error: 'Wrong Credentials' });
        }

        // Generate JWT token after successful login & Bind it To The User
        const payload = { userId: user._id };  // Assuming you have user id
        const Token = token.generateToken(res, payload);

        // Respond with the saved user data
        res.json({ user, message: "Login successful", Token: Token });  // Respond with the saved(loged-in) user data


    } catch (error) {
        console.error('Error during login', error);
        res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    }
}



module.exports = { getSignal, registerController, loginController }