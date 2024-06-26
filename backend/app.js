//Import NPM Packages
var cors = require('cors');
var express = require('express');
var mongoose = require('mongoose');
var port = process.env.PORT || 4000;
var dotenv = require('dotenv').config();
var cookieparser = require('cookie-parser');
var userRoutes = require('./routes/usersRoutes');


async function connectToMongo() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {})
    console.log("MongoDb connected Succesfully...")
  } catch (error) {
    console.error("Error Connecting To MongoDB", error);
  }
}
connectToMongo()


// Initiate Express
var app = express();


// Add your Express middleware,and other logic here
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend origin
  methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  credentials: true, // Allow cookies for authenticated requests 
}));


app.use(userRoutes);


//Listen Response From Server
app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
})


module.exports = app;