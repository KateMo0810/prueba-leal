module.exports = {
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        return res.status(404).send({ error: 'No esta logeado!' });
    },

    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next()
        }
        return res.status(404).send({ error: 'Esta logeado!' });
    }
}