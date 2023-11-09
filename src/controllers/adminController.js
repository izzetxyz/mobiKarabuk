
const fs = require('fs');
const Station = require('../models/stationModel');
const Trip = require('../models/tripModel');
const User = require('../models/userModel');

const { name } = require('ejs');
const showHomePage = async (req, res, next) => {

    try {


        res.render('admin/homePage', { layout: '../layouts/adminHome_Layout', title: `Admin | MobiKarabuk`, description: ``, keywords: `` })


    } catch (err) {
        console.log(err);
    }
};
const addUser = async (req,res,next) => {
    try{
        res.render('admin/Settings/addUser', { layout: '../layouts/adminHome_Layout', title: `Admin | MobiKarabuk`, description: ``, keywords: `` })
    }
    catch (err){
        console.log(err)
    }
}
const addUserPost = async (req, res, next) => {

    try {
        const Username = req.body.username
        const Password = req.body.password
        const PasswordAgain = req.body.passwordAgain
        if(Password == PasswordAgain){
            const kaydedilecek = {
                Username:Username,
                Password:await bcrypt.hash(Password, 8),
            }
            const newProduct = new User(kaydedilecek);
            await newProduct.save();
        }
        
        
        res.redirect('../admin');


    } catch (err) {
        console.log(err);
    }
};
const addStation = async (req, res, next) => {

    try {


        res.render('admin/Settings/addStation', { layout: '../layouts/adminHome_Layout', title: `Admin | MobiKarabuk`, description: ``, keywords: `` })


    } catch (err) {
        console.log(err);
    }
};
const addTrip = async (req, res, next) => {

    try {


        res.render('admin/Settings/addTrip', { layout: '../layouts/adminHome_Layout', title: `Admin | MobiKarabuk`, description: ``, keywords: `` })


    } catch (err) {
        console.log(err);
    }
};
const addStationPost = async (req, res, next) => {

    try {
        const stationName = req.body.stationName
        const stationAddress= req.body.stationAddress
        const stationX = req.body.stationX
        const stationY= req.body.stationY
        const stationIlce = req.body.stationIlce
        
        const kaydedilecek = {
            stationName:stationName,
            stationAddress:stationAddress,
            stationIlce:stationIlce,
            stationX:stationX,
            stationY:stationY,
        }
        const newProduct = new Station(kaydedilecek);
        await newProduct.save();
        res.redirect('../admin');


    } catch (err) {
        console.log(err);
    }
};
const addTripPost = async (req, res, next) => {

    try {
        const tripTime = req.body.tripTime
        const tripRoad= req.body.tripRoad
        
        
        const kaydedilecek = {
            tripTime: tripTime,
            tripRoad: tripRoad,
        }
        const newProduct = new Trip(kaydedilecek);
        await newProduct.save();
        res.redirect('../admin');


    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    showHomePage,
    addUser,
    addUserPost,
    addStation,
    addStationPost,
    addTrip,
    addTripPost

}