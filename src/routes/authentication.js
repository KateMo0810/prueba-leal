const express = require('express')
const router = express.Router()
const passport = require('passport')
const { generateToken, verifyToken } = require('../lib/tokens')

//Register a new user
router.post('/register', (req, res, next) => {
    passport.authenticate('local.register', (err, user, info) => {
        if (!user) { return res.json({ message: info.message }) }
        res.json(user);
    })(req, res, next);
});

//Log In for the user
router.post('/login', (req, res, next) => {
    passport.authenticate('local.login', (err, user, info) => {
        if (!user) { return res.json({ message: info.message }) }
        user.token = generateToken(user)
        res.json(user);
    })(req, res, next)
})


module.exports = router