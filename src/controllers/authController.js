const { validationResult } = require('express-validator');
const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const passport = require('passport');


/*
 async function asyncCall() {

    const newUser = new Admin({
        kullaniciAdi: 'admin',
        isim: 'admin',
        sifre: await bcrypt.hash('admin', 8),
        isAdmin: '9'
    });
    await newUser.save();
    // expected output: "resolved"
  }

  asyncCall(); 


  */
/*
/// Generate Pass
        async function generatePass(){
          const sifre = await bcrypt.hash('cancan', 8)
          console.log(sifre);
      }
  generatePass() 
*/
/////////


// AUTH CONTROLLER
const showLoginForm = (req, res, next) => {

    try {
        res.render('admin/login', { layout: '../layouts/adminLogin_Layout', title: `test`, description: ``, keywords: `` })
    } catch (err) {
        console.log(err);
    }
};






module.exports = {
    showLoginForm,
}