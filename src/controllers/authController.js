const { validationResult } = require('express-validator');
//const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const passport = require('passport');
require('../config/passportLocal')(passport);
const User = require('../models/userModel');


/*

 async function asyncCall() {

    const newUser = new User({
        kullaniciAdi: 'admin',
        isim: 'admin',
        sifre: await bcrypt.hash('admin', 8),
        isAdmin: '9'
    });
    await newUser.save();
    // expected output: "resolved"
  }

  asyncCall(); 
  
ad
*/
// AUTH CONTROLLER
const showLoginForm = (req, res, next) => {
    try {
        res.render('admin/login', { layout: '../layouts/adminLogin_Layout', title: `Giriş`, description: ``, keywords: `` })
    } catch (err) {
        console.log(err);
    }
};


const login = async (req, res, next) => {
  const hatalar = validationResult(req);
  console.log(req.body)
  //console.log(hatalar);
  if (!hatalar.isEmpty()) {

      console.log(hatalar.array());
      req.flash('kullaniciAdi', req.body.kullaniciAdi);
      req.flash('validation_error', hatalar.array());
      res.redirect('/login');


  } else {
      try{
          const Username = await User.findOne({kullaniciAdi : req.body.kullaniciAdi});
          console.log(Username)
          res.clearCookie('loggedUser');  
          res.cookie('loggedUser', Username.User_ID, { expires: new Date(Date.now() + 900000000) });
      }
      catch{
          console.log('User Not Found')
      }
      passport.authenticate('local', {
          successRedirect: '/',
          failureRedirect: '/login',
          failureFlash: true
      })(req, res, next);
  }

  //res.render('login', { layout: './layout/auth_layout' })
};



const logout = (req, res, next) => {

    req.session.destroy((error) => {
        res.clearCookie('connect.sid');
        res.clearCookie('loggedUser')
        res.redirect('/login')
        //res.redirect('/yonetim/login');
    });
};

module.exports = {
    showLoginForm,
    login,
    logout,
}