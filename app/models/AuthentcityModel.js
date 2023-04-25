const mongoose = require('mongoose');
const AuthenticitySchema = new mongoose.Schema({
    authenticity: {
        type: String,
        required: true
    }
}, { timestamps: true });

const AuthenticityModel = mongoose.model('authenticity', AuthenticitySchema);

module.exports = AuthenticityModel;