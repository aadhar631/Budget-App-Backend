// Import the controller functions for handling expenses and incomes
const { addExpense, getExpenses, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');

// Import the Express Router
const router = require('express').Router();

// Define the routes for handling income and expense operations
router
    .post('/add-income', addIncome) // Route for adding income
    .get('/get-incomes', getIncomes) // Route for getting all incomes
    .delete('/delete-income/:id', deleteIncome) // Route for deleting income by ID
    .post('/add-expense', addExpense) // Route for adding expense
    .get('/get-expenses', getExpenses) // Route for getting all expenses
    .delete('/delete-expense/:id', deleteExpense); // Route for deleting expense by ID

// Export the router for use in other parts of the application
module.exports = router;
