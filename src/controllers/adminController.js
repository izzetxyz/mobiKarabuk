
const fs = require('fs');

const showHomePage = async (req, res, next) => {

    try {


        res.render('admin/homePage', { layout: '../layouts/adminHome_Layout', title: `Admin | IG Priv`, description: ``, keywords: `` })


    } catch (err) {
        console.log(err);
    }
};



module.exports = {
    showHomePage,


}