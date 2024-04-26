const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');
const UserSchema = new Schema({
    otobusAdi: {
        type: String,
        trim: true
    },
    tripTimes: {
        type: Array,
    },

    seferBaslangicDurakAdi: {
        type: String,
        trim: true
    },
    seferYonu: {
        type: String,
        trim: true
    },
    seferBitisDurakAdi: {
        type: String,
        trim: true
    },
    tripRoad:{
        type: Array,
        trim: true
    },
    tripID: {
        type: String,
        default: uuidv4()
    },
    active: {
        type: String,
        default: "1"
    }

}, { collection: 'Trip', timestamps: true });

const Admin = mongoose.model('Trip', UserSchema);

module.exports = Admin;