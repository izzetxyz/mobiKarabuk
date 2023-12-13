const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');
const UserSchema = new Schema({
    stationName: {
        type: String,
        trim: true,
    },
    stationX: {
        type: String,

    },
    stationY: {
        type : String,
        trim : true,
    },
    location: {
        type: Object,
    },
    busesPassed: {
        type: Array,
    },
    stationAddress :{
        type: String
    },
    stationID: {
        type: String,
        default: uuidv4()
    },
    active: {
        type:String,
        default: "1"
    }

}, { collection: 'Station', timestamps: true });

const Admin = mongoose.model('Station', UserSchema);

module.exports = Admin;