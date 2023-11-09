const jwt = require('jsonwebtoken');





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




// POST

module.exports = {
    homeShow,
    loginPageShow,
}