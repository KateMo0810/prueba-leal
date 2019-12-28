const express = require('express')
const router = express.Router()
const pool = require('../../database')
const { verifyToken } = require('../lib/tokens')

router.post('/createTransaction', async(req, res) =>  {
    console.log(req.user)
    const { value, points, user_id } = req.body
    const newTransaction = {
        value,
        points,
        user_id
    }
    const valTransaction = await pool.query('INSERT INTO _transaction set ?', [newTransaction])
    newTransaction.transaction_id = valTransaction.insertId
    res.json(newTransaction)

})

// router.put('/inactiveTransaction', (req, res) => {
//     const {}
// })

// router.post('/add', isLoggedIn, async(req, res) => {
//     console.log(req)
//     const { title, url, description } = req.body
//     const newLink = {
//         title,
//         url,
//         description,
//         user_id: req.user.id
//     }
//     await pool.query('INSERT INTO links set ?', [newLink])
//     req.flash('success', 'Link seved successfully')
//     res.send('Yeees')
// })




module.exports = router