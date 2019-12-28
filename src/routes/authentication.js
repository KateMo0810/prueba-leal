const express = require('express')
const router = express.Router()
const passport = require('passport')
const { generateToken, verifyToken } = require('../lib/tokens')

router.post('/register', (req, res, next) => {
    passport.authenticate('local.register', (err, user, info) => {
        if (!user) { return res.json({ message: "El usuario ya existe" }) }
        res.json(user);
    })(req, res, next);
});


router.post('/login', generateToken, (req, res, next) => {
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