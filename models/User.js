const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    email: { 
        type: String,
        require: true,
        unique: true 
    },
    senha: { 
        type: String,
        require: true 
    },
    ativo: {
        type: Boolean,
        default: false
    }
});
const User = mongoose.model('User', userSchema);

module.exports = User;