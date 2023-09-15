// Import the mongoose library for working with MongoDB
const mongoose = require('mongoose');

// Create a new Mongoose schema for the 'Expense' collection
const ExpenseSchema = new mongoose.Schema({
    // Define the 'title' field with String type, required, trimmed, and max length of 50 characters
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },

    // Define the 'amount' field with Number type, required, and no maximum value
    amount: {
        type: Number,
        required: true,
        max: Number.MAX_VALUE,
        trim: true
    },

    // Define the 'type' field with String type, default value 'expense'
    type: {
        type: String,
        default: "expense"
    },

    // Define the 'date' field with Date type, required, and trimmed
    date: {
        type: Date,
        required: true,
        trim: true
    },

    // Define the 'category' field with String type, required, and trimmed
    category: {
        type: String,
        required: true,
        trim: true
    },

    // Define the 'description' field with String type, required, trimmed, and max length of 200 characters
    description: {
        type: String,
        required: true,
        maxlength: 200,
        trim: true
    },
}, {
    timestamps: true // Automatically add createdAt and updatedAt timestamps to documents
});

// Export the Mongoose model named 'Expense' with the defined schema
module.exports = mongoose.model('Expense', ExpenseSchema);
