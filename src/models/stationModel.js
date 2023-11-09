const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    stationName: {
        type: String,

        trim: true,

    },
    stationIlce:{
        type: String,
    },
    stationAddress:{
        type: String,
    },
    stationX: {
        type: String,

    },
    stationY: {
        type : String,
        trim : true,
    },
  
   
  


    

   
}, { collection: 'Station', timestamps: true });

const Admin = mongoose.model('Station', UserSchema);

module.exports = Admin;