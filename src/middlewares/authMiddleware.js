const oturumAcilmis = function (req, res, next) {
    if (req.isAuthenticated()) {
        //console.log('AUTH MIDDLEWARE GİRİŞ YAPILMIŞ');
        return next();
    } else {
        req.flash('error', ['Lütfen önce otorum açın'])
        res.redirect('/cycode/login');
    }
}

const oturumAcilmamis = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/cycode');
    }
}




module.exports = {
    oturumAcilmis,
    oturumAcilmamis
}