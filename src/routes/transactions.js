const express = require('express')
const router = express.Router()
const pool = require('../../database')
const { verifyToken } = require('../lib/tokens')

//Transaction creation
//params:
//      token in header['authorization']
//      value
//      points
router.post('/createTransaction', verifyToken, async(req, res) =>  {
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

//Inactivate a transaction
//params:
//      token in header['authorization']
router.put('/inactivateTransaction', verifyToken, async(req, res) => {
    const { transaction_id } = req.body
    const transaction = await pool.query('SELECT * FROM _transaction WHERE transaction_id = ?', [transaction_id])
    if (!transaction[0]) {
        return res.status(400).send({
            ok: false,
            message: 'La transacción no existe'
        });
    }
    await pool.query('UPDATE _transaction SET status=0 WHERE transaction_id = ?', [transaction_id])
    res.status(200).send({
        ok: true,
        message: 'Transacción inactiva'
    });
})

module.exports = router