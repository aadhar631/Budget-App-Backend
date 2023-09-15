// Import required modules and libraries
const express = require('express'); // Express.js framework
const cors = require('cors'); // Middleware for handling CORS
const { db } = require('./db/db'); // Function for database connection
const { readdirSync } = require('fs'); // File system module for reading directory contents

const app = express(); // Create an Express application

require('dotenv').config(); // Load environment variables from a .env file

const PORT = process.env.PORT; // Get the port number from environment variables

// Middlewares
app.use(express.json()); // Parse JSON request bodies
app.use(cors({
    origin: ["http://localhost:5000", "https://budget-app-dwyo.onrender.com"]
})); // Enable Cross-Origin Resource Sharing (CORS)

// Load routes dynamically from the 'routes' directory
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));

// Define a basic route for the root endpoint
app.get("/", (req, res) => {
    res.send("Hello, world!"); // Send a simple "Hello, world!" response
});

// Function to start the server
const server = () => {
    db(); // Connect to the database using the 'db' function
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`); // Start the server and log the port it's running on
    });
}

server(); // Start the server by calling the 'server' function
