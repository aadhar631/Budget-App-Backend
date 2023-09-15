// Import the mongoose library for working with MongoDB
const mongoose = require('mongoose');

// Create an asynchronous function to establish a database connection
const db = async () => {
    try {
        // Set the 'strictQuery' option to 'false' to allow for flexible querying
        mongoose.set('strictQuery', false);

        // Connect to the MongoDB database using the provided MONGO_URL from environment variables
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true, // Use the new URL parser
            useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
            // useCreateIndex: true // Optional: Enable index creation
        });

        // Log a message indicating a successful database connection
        console.log("DB Connection Established");
            
    } catch (error) {
        // Log an error message if there is a problem with the database connection
        console.log("DB Connection error", error);   
    }
}

// Export the 'db' function to be used in other parts of the application
module.exports = { db };
