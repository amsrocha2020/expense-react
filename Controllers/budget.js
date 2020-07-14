const Budget = require('../Models/Budget');

// @desc Get all budgets
// @route /budgets
// @access Public
exports.getBudget = async (req, res, next) => {
    try{
        const mysort = { month: 1, year: 1 };
        const budget = await Budget.find().sort(mysort);

        return res.status(200).json({
            success: true,
            count: budget.length,
            data: budget
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

// @desc Add Budget
// @route /budget
// @access Public
exports.addBudget = async (req, res, next) => {
    try {
        const text = req.body;

        const budget = await Budget.create(req.body);

        return res.status(201).json({
            success: true,
            data: budget
        })
    } catch (err) {
        if(err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
}

// @desc Delete Budget
// @route /budget
// @access Public
exports.deleteBudget = async (req, res, next) => {
    const budget = Budget.findById(req.params.id);

    try {
        if(!Budget) {
            return res.status(404).json({
                success: false,
                error: 'No Budget found'
            });
        }
    
        await budget.remove();
    
        return res.status(200).json({
            success: true,
            data: {}
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Error Server'
        })

    }    
}