const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: { 
        type: String,
        require: true,
        unique: true 
    },
    password: { 
        type: String,
        require: true 
    },
    ativo: {
        type: Boolean,
        default: false
    },
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    }]
});
const User = mongoose.model('User', userSchema);

module.exports = User;