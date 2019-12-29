const express = require('express')
const router = express.Router()
const pool = require('../../database')
const { verifyToken } = require('../lib/tokens')
const md5 = require('md5')
const ExcelJS = require('exceljs');
const path = require('path')

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

router.get('/exportTransactionsToExcel', verifyToken, async(req, res) => {
    if (req.token) {
        const id = md5(req.token.email)
        const { email } = req.token
        const links = await pool.query('SELECT * FROM _transaction WHERE user_id= ? ORDER BY created_date DESC', [id])

        var Excel = require('exceljs');
        var workbook = new Excel.Workbook();
        var worksheet = workbook.addWorksheet('Transacciones');
        worksheet.columns = [
            { header: 'Transaction_Id', key: 'transaction_id', width: 20, style: { font: { name: 'Calibri', size: 14 } } },
            { header: 'Created_Date', key: 'created_date', width: 22, style: { numFmt: 'dd/mm/yyyy hh-mm-ss', font: { name: 'Calibri', size: 14 } } },
            { header: 'Value', key: 'value', width: 20, style: { font: { name: 'Calibri', size: 14 } } },
            { header: 'Points', key: 'points', width: 20, style: { font: { name: 'Calibri', size: 14 } } },
            { header: 'User_Id', key: 'user_id', width: 39, style: { font: { name: 'Calibri', size: 14 } } }
        ];

        worksheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'cccccc' }
        }
        links.forEach(element => {
            worksheet.addRow({ transaction_id: element.transaction_id, created_date: element.created_date, value: element.value, points: element.points, user_id: element.user_id });
        });
        workbook.xlsx.writeFile('../../transactions_' + email + '.xlsx').then(function() {
            res.status(200).send({
                ok: true,
                message: 'Documento creado en: ' + path.join(__dirname, '../../transactions_' + email + '.xlsx')
            })
        });
    }
})






module.exports = router