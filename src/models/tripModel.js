const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    otobusAdi: {
        type: String,
        trim: true
    },
    tripTime: {
        type: String,
        trim: true
    },
    seferBaslangic: {
        type: String,
        trim: true
    },
    seferBitis: {
        type: String,
        trim: true
    },
    tripRoad:{
        type: Array,
        trim: true
    }
    

}, { collection: 'Trip', timestamps: true });

const Admin = mongoose.model('Trip', UserSchema);

module.exports = Admin;