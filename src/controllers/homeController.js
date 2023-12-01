const jwt = require('jsonwebtoken');

const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyBzU_tI_Y8m8KzwJP-wZcNqTTPogYtg2x4',
    Promise: Promise
  });



// GET

const homeShow = async (req, res, next) => {
    try {

        res.render('user/homePage', { layout: '../layouts/mainSecond_Layout', title: `IG Priv`, description: ``, keywords: `` })


    } catch (err) {
        console.log(err);
    }
};

const loginPageShow = async (req, res, next) => {

    try {

        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const token = req.cookies.access_token;
        const verified = jwt.verify(token, jwtSecretKey, async (e, decoded) => {
            if (decoded) {
                res.redirect('/accounts');
            } else {
                res.render('user/loginPage', { layout: '../layouts/mainHome_Layout', title: `Login | Instagram`, description: ``, keywords: `` })
            }
        })

    } catch (err) {
        console.log(err);
    }
};

const calculatePoint = async (req,res,next) => {
    try{
        const waypoints = [
            "41.220733, 32.648592", // Durak 1
            "41.218307, 32.653001", // Durak 2
            "41.205993, 32.658651" // Varış noktası
        ];
        
        const origins = ["41.220733, 32.648592"]; // Örnek bir başlangıç konumu
        const destinations = ["41.205993, 32.658651"]; // Örnek bir varış konumu
        
        // Durakları başlangıç ve varış noktaları arasında ekleyerek bir dizi oluşturun
        const combinedPoints = [ ...waypoints, ...destinations];
        
        const response = await new Promise((resolve, reject) => {
            googleMapsClient.distanceMatrix({
                origins: origins,
                destinations: combinedPoints,
                mode: 'driving',
                units: 'metric'
            }, function (err, response) {
                if (err) {
                    reject(err);
                } else {
                    resolve(response);
                }
            });
        });
        
        res.json(response);
        
        
    }
    catch(err){  
        console.log(err)
    }
}


// POST

module.exports = {
    homeShow,
    loginPageShow,
    calculatePoint,
}