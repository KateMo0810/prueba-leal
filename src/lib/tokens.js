var jwt = require('jsonwebtoken')

module.exports = {
    generateToken(req, res, next) {
        const { user_id, email } = req.body
        var u = {
            user_id,
            email
        }
        return token = jwt.sign(u, 'password', {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
        })
    },
    verifyToken(req, res, next) {
        var token = req.headers['authorization']
        if (!token) {
            res.status(401).send({
                ok: false,
                message: 'Token inválido'
            })
        }
        token = token.replace('Bearer ', '')
        jwt.verify(token, 'password', function(err, token) {
            if (err) {
                return res.status(401).send({
                    ok: false,
                    message: 'Token inválido'
                });
            } else {
                req.token = token
                next()
            }
        })
    }

}