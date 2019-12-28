//CONNECT TO THE DATABASE
const mysql = require('mysql')
const promisify = require('util.promisify')
const { database } = require('./keys')

const pool = mysql.createPool(database);

pool.getConnection((error, connection) => {
    if (error) {
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('Database connection was closed')
        }
        if (error.code === 'ER_CON_COUNT_ERROR') {
            console.log('Database has too many connections')
        }
        if (error.code === 'ERCONREFUSED') {
            console.log('Database connection was refused')
        }
    }

    if (connection) connection.release()
    console.log('DB is connected')
    return
})

// PROMISIFY pool querys
pool.query = promisify(pool.query)

module.exports = pool