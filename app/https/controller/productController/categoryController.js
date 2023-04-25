const CategoriesModel = require("../../../models/CategoriesModel");

function categoryController() {
    return {
        addCategory: async (req, res) => {
            try {
                const document = await CategoriesModel.exists({ name: req.body.categoryInput });
                if (document) {
                    return res.status(409).json({ message: 'Category already exist' })
                }

                const newCategory = new CategoriesModel({
                    name: req.body.categoryInput
                })

                const result = await newCategory.save();
                if (!result) {
                    return res.status(500).json({ message: 'Category insertion failed due to unknown error' });
                }

                return res.status(200).json({ message: 'Category added successfully' });

            } catch (error) {
                return res.status(500).json({ message: 'Internal server error' });
            }
        },
        deletecategory: async (req, res) => {
            try {
                const document = await CategoriesModel.findOneAndDelete({ _id: req.body._id });
                if (!document) {
                    return res.status(404).json({ message: 'Category not found' });
                }
                return res.json({ message: 'All ok' })
            } catch (error) {
                console.log(error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        },
        allCategories: async (req, res) => {
            try {
                const document = await CategoriesModel.find();
                if (!document) {
                    return res.status(404).json({ message: 'No category is added yet' });
                }
                return res.status(200).json({ document });
            } catch (error) {
                console.log(error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        }
    }
};

module.exports = categoryController;