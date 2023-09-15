// const IncomeSchema = require("../models/incomeModel");


// exports.addIncome = async (req,res) => {
//     const {title, amount, category, description, date} = req.body;

//     const income = new IncomeSchema({
//         title,
//         amount,
//         category,
//         description,
//         date
//     })

//     try {
//         // validations
//         if(!title || !category || !description || !date) {
//             return res.status(400).json({message: 'All fields are required'})
//         }
//         if(amount <= 0 || !amount === 'number') {
//             return res.status(400).json({message: 'Amount must be a positive number'})
//         }
//         await income.save();
//         res.status(200).json({message: 'Income saved successfully'})
//     } catch(error) {

//     }

//     console.log(income);
// }



// Import the IncomeSchema from the incomeModel module
const IncomeSchema = require("../models/incomeModel");

// Function to add an income
exports.addIncome = async (req, res) => {
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

        // Create a new income instance using the IncomeSchema model
        const income = new IncomeSchema({
            title,
            amount,
            category,
            description,
            date
        });

        // Save the income to the database
        await income.save();
        console.log(income);
        // Send a success response
        return res.status(200).json({ message: 'Income saved successfully' });
    } catch (error) {
        console.error('Error while adding income:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to get all incomes
exports.getIncomes = async (req, res) => {
    try {
        // Find all incomes in descending order of creation and store them in 'incomes'
        const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
        return res.status(200).json(incomes);
    } catch (error) {
        console.error('Error while getting incomes:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to delete an income by ID
exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    // Find and delete an income by its ID
    IncomeSchema.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({ message: 'Income deleted successfully' });
        })
        .catch((error) => {
            res.status(500).json({ message: 'Internal server error' });
        });
};
