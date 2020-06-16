const Category = require('../Models/Category');

// @desc Get all categories
// @route /categories
// @access Public
exports.getCategory = async (req, res, next) => {
    try{
        const categories = await Category.find();

        return res.status(200).json({
            success: true,
            count: categories.length,
            data: categories
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

// @desc Add Category
// @route /categories
// @access Public
exports.addCategory = async (req, res, next) => {
    try {
        const text = req.body;

        const category = await Category.create(req.body);

        return res.status(201).json({
            success: true,
            data: category
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

// @desc Delete Category
// @route /categories
// @access Public
exports.deleteCategory = async (req, res, next) => {
    const category = Category.findById(req.params.id);

    try {
        if(!Category) {
            return res.status(404).json({
                success: false,
                error: 'No Category found'
            });
        }
    
        await category.remove();
    
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