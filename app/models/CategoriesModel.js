const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: true
    }
}, { timestamps: true });

const CategoriesModel = mongoose.model('category', CategorySchema);

module.exports = CategoriesModel;