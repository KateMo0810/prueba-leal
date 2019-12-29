const express = require('express')
const router = express.Router()
const pool = require('../../database')
const { verifyToken } = require('../lib/tokens')
const md5 = require('md5')
const ExcelJS = require('exceljs');

router.get('/getTransactionHistory', verifyToken, async(req, res) => {
    if (req.token) {
        const id = md5(req.token.email)
        const links = await pool.query('SELECT * FROM _transaction WHERE user_id= ? ORDER BY created_date DESC', [id])
        res.json(links)
    }

})

router.get('/getPoints', verifyToken, async(req, res) => {
    if (req.token) {
        const id = md5(req.token.email)
        const links = await pool.query('SELECT sum(points) FROM _transaction WHERE user_id= ?AND status=1 ORDER BY created_date DESC', [id])
        res.json(links)
    }
})

router.get('/exportTransactionsToExcel', (req, res) => {
    var Excel = require('exceljs');
    var workbook = new Excel.Workbook();
    var worksheet = workbook.addWorksheet('My Sheet');
    worksheet.columns = [
        { header: 'Id', key: 'id', width: 10 },
        { header: 'Name', key: 'name', width: 32 },
        { header: 'D.O.B.', key: 'DOB', width: 10 }
    ];
    worksheet.addRow({ id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) });
    worksheet.addRow({ id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7) });

    workbook.xlsx.writeFile('./temp.xlsx').then(function() {
        // done
        console.log('file is written');
    });
})






module.exports = router