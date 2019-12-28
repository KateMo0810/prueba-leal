const express = require('express')
const router = express.Router()
const passport = require('passport')
const { generateToken, verifyToken } = require('./src/lib/tokens')

router.post('/signup', verifyToken, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRdirect: '/signup',
    failureFlash: true
}))

router.post('/signin', generateToken, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: res.status(401).send({
            ok: false,
            message: 'Token inválido'
        }),
        failureRdirect: res.status(401).send({
            ok: false,
            message: 'Token inválido'
        }),
        failureFlash: true
    })(req, res, next)
})

router.get('/logout', verifyToken, (req, res) => {
    req.logOut()
    res.status(401).send({
        ok: false,
        message: 'Token inválido'
    });
})

module.exports = router