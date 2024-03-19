const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');
const UserSchema = new Schema({
    otobusAdi: {
        type: String,
        trim: true
    },
    otobusKalkisSaatlari: {
        type: Array
    },
    otobusRotasi:{
        type: Array,
        trim: true
    },
    active: {
        type: String,
        default: "1"
    }

}, { collection: 'Buses', timestamps: true });

const Admin = mongoose.model('Buses', UserSchema);

module.exports = Admin;