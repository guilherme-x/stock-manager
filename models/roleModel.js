const mongoose = require('mongoose');
const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});
const Role = mongoose.model('Role', RoleSchema);
module.exports = Role;