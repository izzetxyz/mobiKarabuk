const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    tripTime: {
        type: String,

        trim: true,

    },
    tripRoad:{
        type: String,
    },
    

}, { collection: 'Trip', timestamps: true });

const Admin = mongoose.model('Trip', UserSchema);

module.exports = Admin;