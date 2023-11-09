const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    kullaniciAdi: {
        type: String,
        required: [true, "id alanı boş olamaz."],
        trim: true,
        minlength: 1,
        maxlength: 15
    },
    User_ID:{
        type: String,
    },
    sifre: {
        type: String,
        required: true,
    },
    is_Active: {
        type : Number,
        trim : true,
        default : true
    },
  
   
    Email:{
        type:String
    },
    nameSurname:{
        type:String
    }

    

   
}, { collection: 'Users', timestamps: true });

const Admin = mongoose.model('Users', UserSchema);

module.exports = Admin;