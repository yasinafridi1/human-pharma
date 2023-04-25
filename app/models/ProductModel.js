const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    formula: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    potency: {
        type: String,
        required: true
    },
    appearance: {
        type: String,
        required: true
    },
    packing: {
        type: String,
        required: true
    },
    dosage: {
        type: String,
        required: true
    },
    strength: {
        type: String,
        required: true
    },
    muscleGain: {
        type: String,
        required: true
    },
    fatWaterLoss: {
        type: String,
        required: true
    },
    sideEffect: {
        type: String,
        required: true
    },
    keepGain: {
        type: String,
        required: true
    }


}, { timestamps: true });

const ProductModel = mongoose.model('product', ProductSchema);

module.exports = ProductModel;