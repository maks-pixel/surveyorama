const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const { User } = require('../models');


//     router.post('/login', (req, res) => {
//         passport.authenticate('local', function (req, done) {
//             User.findOne({
//                 where: {
//                     email: req.body.email
//                 }
//             }).then(dbUserData => {
//                 if (!dbUserData) {
//                     return done(null, false, { message: 'this email is not registered dummy' });
//                 }

//                 const validPassword = dbUserData.checkPassword(req.body.password);
//                 if (!validPassword) {
//                     return done(null, false, { message: 'Incorrect password dummy!' });
//                 }

//                 return done(null, dbUserData, { message: 'You are now logged in!' });
//             });
//         }

//     })

//     passport.serializeUser((user, done) => { })
//     passport.deserializeUser((id, done) => { })

const withAuth = (req, res, next)=>{
if(!req.session.loggedIn){
    passport.authenticate('local', {failureRedirect: '/login'})
}else{
    next()
}
}


module.exports = withAuth;