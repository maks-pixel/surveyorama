const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail){
    const authenticateUser = (email, password, done) => {
        const user = getUserByEmail(email)
        if(user == null){
            return done(null, false, { message: 'this is not a registered email' })
        } try {
            if (await bcrypt.compareSync(password, user.password)){
                return done(null, user)
            } else{
                return done(null, false, { message: 'Wrong password dummy'})
            }
        } catch (err) {
            return done (err)
        }
    }

    passport.use(new LocalStrategy({usernameField: 'email' }),
    authenticateUser)
    passport.serializeUser((user, done) => { })
    passport.deserializeUser((id, done) => { })
}

module.exports = initialize