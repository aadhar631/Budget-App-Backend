// Import the ExpenseSchema from the expenseModel module
const ExpenseSchema = require("../models/expenseModel");

// Function to add an expense
exports.addExpense = async (req, res) => {
    // Destructure data from the request body
    const { title, amount, category, description, date } = req.body;

    try {
        // Validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ message: 'Amount must be a positive number' });
        }

        // Create a new expense instance using the ExpenseSchema model
        const expense = new ExpenseSchema({
            title,
            amount,
            category,
            description,
            date
        });

        // Save the expense to the database
        await expense.save();
        console.log(expense);
        // Send a success response
        return res.status(200).json({ message: 'Expense saved successfully' });
    } catch (error) {
        console.error('Error while adding expense:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to get all expenses
exports.getExpenses = async (req, res) => {
    try {
        // Find all expenses in descending order of creation and store them in 'incomes'
        const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
        return res.status(200).json(expenses);
    } catch (error) {
        console.error('Error while getting expenses:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to delete an expense by ID
exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    // Find and delete an expense by its ID
    ExpenseSchema.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({ message: 'Expense deleted successfully' });
        })
        .catch((error) => {
            res.status(500).json({ message: 'Internal server error' });
        });
};
