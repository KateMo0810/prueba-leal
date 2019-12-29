var jwt = require('jsonwebtoken')

module.exports = {
    //Token generation
    generateToken(req) {
        const { email } = req
        var u = {
            email
        }
        return token = jwt.sign(u, 'passwordSecret', {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
        })
    },
    //Token verification
    verifyToken(req, res, next) {
        var token1 = ""
        var token = req.headers['authorization']
        if (!token) {
            return res.status(401).send({
                ok: false,
                message: 'Token inválido'
            })
        }
        token = token.replace('Bearer ', '')
        jwt.verify(token, 'passwordSecret', function(err, token) {
            if (err) {
                res.status(401).send({
                    ok: false,
                    message: 'Token inválido'
                });
            } else {
                req.token = token
                token1 = token
            }
        })
        if (token !== "") {
            next()
        }

    }

}