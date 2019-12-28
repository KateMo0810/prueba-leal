const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')
const passport = require('passport')
const { database, port } = require('./keys')

//Inizializations
const app = express()
require('./src/lib/passport')

//Settings
app.set('port', process.env.PORT || port)

//Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false })) //NO
app.use(express.json()) //SI
app.use(passport.initialize())
app.use(passport.session())

//Global variables
app.use((req, res, next) => {
    app.locals.user = req.user
    next()
})

//Routes
app.use(require('./src/routes/'))
app.use(require('./src/routes/authentication'))
    //app.use('/transactions', require('./src/routes/transactions'))
    //app.use('/user', require('./src/routes/users'))

app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'))
})