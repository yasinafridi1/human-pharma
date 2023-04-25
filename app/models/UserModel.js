const mongoose = require('mongoose');
const AdminSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});

const UserModel = mongoose.model('user', AdminSchema);

module.exports = UserModel;