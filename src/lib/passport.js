const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const pool = require('../../database')
const helpers = require('../lib/helpers')
const md5 = require('md5')
const validator = require('validator')


//Log In for the user
// params: 
//      email
//      password
passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    password: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {
    if (!validator.isEmail(email)) {
        return done(null, false, { message: "El correo no es válido" })
    }
    const rows = await pool.query('SELECT * FROM _user WHERE user_id = ?', [md5(email)])
    if (rows.length > 0) {
        const user = rows[0]
        const validPassword = await helpers.matchPassword(password, user.password)
        if (validPassword) {
            return done(null, { email, token: "" })
        } else {
            return done(null, false, { message: "La contraseña no es válida" })
        }
    } else {
        return done(null, false, { message: "El usuario no se encuentra registrado" })
    }
}))

//Register a new user
// params: 
//      email
//      password
//      name
//      lastname
//      birth_date
passport.use('local.register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {
    if (!validator.isEmail(email)) {
        return done(null, false, { message: "El correo no es válido" })
    }
    const { name, lastname, birth_date } = req.body
    const newUser = {
        user_id: md5(email),
        email,
        name,
        lastname,
        birth_date
    }
    newUser.password = await helpers.encryptPassword(password)
    const row = await pool.query('SELECT * FROM _user WHERE user_id = ?', [newUser.user_id])
    if (row[0]) {
        return done(null, false, { message: "El usuario ya se encuentra registrado" })
    }
    const result = await pool.query('INSERT INTO _user SET ?', [newUser])
    return done(null, newUser)
}))



passport.serializeUser((user, done) => {
    done(null, user.user_id)
})

passport.deserializeUser(async(id, done) => {
    const rows = await pool.query('SELECT * FROM _user WHERE user_id = ?', [user_id])
    done(null, rows[0])
})