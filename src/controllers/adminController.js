
const fs = require('fs');
const Station = require('../models/stationModel');
const Trip = require('../models/tripModel');
const User = require('../models/userModel');


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
};
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

        const Stations = await Station.find({active:"1"})
        res.render('admin/Settings/addStation', { layout: '../layouts/adminHome_Layout', title: `Admin | MobiKarabuk`, description: ``, keywords: ``,Stations })


    } catch (err) {
        console.log(err);
    }
};
const addTrip = async (req, res, next) => {

    try {
        const Stations = await Station.find({active:"1"})

        res.render('admin/Settings/addTrip', { layout: '../layouts/adminHome_Layout', title: `Admin | MobiKarabuk`, description: ``, keywords: ``,Stations })


    } catch (err) {
        console.log(err);
    }
};
const addStationPost = async (req, res, next) => {

    try {
        const stationName = req.body.stationName
        const stationAddress= req.body.stationAddress
        const stationX = req.body.locationX
        const stationY= req.body.locationY
        const kaydedilecek = {
            stationName:stationName,
            stationAddress:stationAddress,
            location: {
                type: "Point",
                coordinates: [stationX, stationY]
            },
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
        const tripRoad= req.body.tripRoad
        var Road = []
        for(let i = 0;i<tripRoad.length;i++){
            const FindStation = await Station.findOne({stationName: tripRoad[i]})
            const added = {
                LocationX: FindStation.stationX,
                LocationY: FindStation.stationY,
                stationName: FindStation.stationName
            }

            Road.push(added)
            await Station.findByIdAndUpdate(FindStation._id,{ $push: { busesPassed: req.body.otobusAdi } })
        }
        const tripTime = req.body.tripTime       
        const seferBaslangic = req.body.seferBaslangic
        const seferBitis = req.body.seferBitis
        const otobusAdi = req.body.otobusAdi
        const seferBaslangicDurakAdi = req.body.seferBaslangicDurakAdi
        const seferBitisDurakAdi = req.body.seferBitisDurakAdi
        const kaydedilecek = {
            otobusAdi: otobusAdi,
            seferBaslangicDurakAdi:seferBaslangicDurakAdi,
            seferBitisDurakAdi:seferBitisDurakAdi,
            tripTime: tripTime,
            seferBaslangic: seferBaslangic,
            seferBitis: seferBitis,
            tripRoad: Road,
        }
        const newProduct = new Trip(kaydedilecek);
        await newProduct.save();
        res.redirect('../admin/addTrip');

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