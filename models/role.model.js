const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    name: {
        type: String,
        require: true
    }
});

module.exports = model('Role', RoleSchema);