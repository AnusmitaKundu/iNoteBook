const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://15anusmitak:R2ZFg1WjJM3w3do8@cluster2.rlsspee.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, console.log("Connected to MongoDB Successfully"));
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectToMongo;
//cluster password: R2ZFg1WjJM3w3do8