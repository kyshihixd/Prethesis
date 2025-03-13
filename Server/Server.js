
const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");
const uri =
    "mongodb+srv://kyshihixd:Ohmygod1@cluster0.i64bh.mongodb.net/testing?retryWrites=true&w=majority&appName=Cluster0";




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

