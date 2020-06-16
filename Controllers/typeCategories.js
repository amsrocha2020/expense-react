const TypeCategory = require('../Models/TypeCategory');

// @desc Get all Type Categories
// @route /typecategory
// @access Public
exports.getTypeCategories = async (req, res, next) => {
    try{
        const typeCategories = await TypeCategory.find();

        return res.status(200).json({
            success: true,
            count: typeCategories.length,
            data: typeCategories
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
exports.addTypeCategories = async (req, res, next) => {
    try {
        const text = req.body;

        const typeCategory = await TypeCategory.create(req.body);

        return res.status(201).json({
            success: true,
            data: typeCategory
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
exports.deleteTypeCategory = async (req, res, next) => {
    const typeCategory = TypeCategory.findById(req.params.id);

    try {
        if(!TypeCategory) {
            return res.status(404).json({
                success: false,
                error: 'No Category found'
            });
        }
    
        await typeCategory.remove();
    
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