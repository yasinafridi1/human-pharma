const AuthenticityModel = require("../../../models/AuthentcityModel");
const ProductModel = require("../../../models/ProductModel");

function productcontroller() {
    return {
        addProduct: async (req, res) => {

            try {
                const { name, formula, description, potency, appearance, packing, dosage, strength, muscleGain, fatWaterLoss, sideEffect, keepGain, category } = req.body.product;
                const imageurl = req.body.url;

                if (!name || !imageurl || !formula || !potency || !appearance || !packing || !dosage || !strength || !muscleGain || !fatWaterLoss || !sideEffect || !keepGain || !category || !description) {
                    return res.status(422).json({ message: 'All fields are required' });
                }

                const newProduct = new ProductModel({
                    name,
                    image: imageurl,
                    formula,
                    category,
                    description,
                    potency,
                    appearance,
                    packing,
                    dosage,
                    strength,
                    muscleGain,
                    fatWaterLoss,
                    sideEffect,
                    keepGain
                })

                const result = await newProduct.save();
                if (!result) {
                    return res.status(500).json({ message: 'Product insertion failed due to unknown error' });
                }

                return res.status(200).json(result);

            } catch (error) {
                console.log(error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        },
        allProduct: async (req, res) => {
            try {
                const document = await ProductModel.find();
                if (document.length < 1) {
                    return res.status(403).json({ message: 'No product inserted yet' });
                }
                return res.status(201).json({ document });
            } catch (error) {
                return res.status(500).json({ message: 'Internal server error' });
            }
        },
        deleteProduct: async (req, res) => {
            console.log(req.body);
            try {
                const document = await ProductModel.findOneAndDelete({ _id: req.body._id });
                if (!document) {
                    return res.status(404).json({ message: 'Category not found' });
                }
                return res.json({ message: 'All ok' })
            } catch (error) {
                console.log(error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        },
        updateProduct: async (req, res) => {
            console.log(req.body);
            const { _id, name, formula, authenticity, description, potency, appearance, packing, dosage, strength, muscleGain, fatWaterLoss, sideEffect, keepGain, category, image } = req.body.product;
            try {
                const document = await ProductModel.findOneAndUpdate({ _id: _id }, {
                    // fields to be changed
                    name,
                    formula,
                    authenticity,
                    description,
                    potency,
                    appearance,
                    packing,
                    dosage,
                    strength,
                    muscleGain,
                    fatWaterLoss,
                    sideEffect,
                    keepGain,
                    category,
                    image: req.body.url ? req.body.url : image

                }, { new: true });
                if (document) {
                    return res.status(200).json({ document });
                }
            } catch (error) {
                return res.status(500).json({ message: 'internal server error' });
            }

        },
        singleProduct: async (req, res) => {
            // console.log(req.body);
            try {
                const document = await ProductModel.findOne({ _id: req.body._id });
                if (document.length < 1) {
                    return res.status(404).json({ message: 'Product not found' });
                }
                return res.status(200).json({ document });
            } catch (error) {
                return res.status(500).json({ message: 'Internal server error' });
            }
        },
        authenticityCheck: async (req, res) => {

            try {
                const document = await AuthenticityModel.findOne({ authenticity: req.body.code.toLowerCase() });
                if (!document) {
                    return res.status(404).json({ message: 'Product not found' });
                }
                return res.status(200).json(document);
            } catch (error) {
                console.log(error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        }
    }
}
module.exports = productcontroller;