
const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");
require('dotenv').config();
const uri = process.env.SERVER_URI;




async function connectDB() {
    try {
        mongoose.connection.on('connected', () => console.log('MongoDB connected'));
        mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err));
        
        await mongoose.connect(uri);

    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
    }
}


module.exports = connectDB;

