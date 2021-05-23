const { b64encode } = require('./util')

const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()
const port = 8082

app.use(cors())

app.use(express.json())

app.post('/', (req, res) => {

    if (!req.body || Object.keys(req.body).length === 0) {
        res.sendStatus(400);
        return;
    }

    // Request params validator
    let validReqParams = [
        !!req.body.order_id,
        req.body.order_id !== '',
        !!req.body.gross_amount,
        typeof req.body.gross_amount === 'number',
        req.body.gross_amount !== 0
    ].reduce((t,n) => n)

    if (!validReqParams) {
        res.sendStatus(400);
        return;
    }

    let order_id = req.body.order_id
    let gross_amount = req.body.gross_amount

    new PlantalkMidtransTransaction(order_id, gross_amount)
        .requestUrl()
        .then((resp) => {
            // console.log(resp)
            res.send(resp.data)
        })
        .catch((err) => {
            console.log(err)
            res.sendStatus(500)
        })
    // console.log(req.body)
    // res.sendStatus(200)
})

// app.listen(port, () => {
//     console.log('Midtrans service started')
// })

exports.midtrans_transactionRequest = app

class PlantalkMidtransTransaction {
    constructor(order_id, gross_amount) {
        this.config = {
            trx_endpoint: 'https://app.sandbox.midtrans.com/snap/v1/transactions',
            client_key: 'SB-Mid-client-Bwe9aXDFXbVs-ObB',
            server_key: 'SB-Mid-server-nsc7KrBdJkxog1VsP8_ygQ6m'
        }

        this.header = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Basic ' + b64encode(this.config.server_key+':')
        }

        this.body = {
            transaction_details: {
                'order_id': order_id,
                'gross_amount': gross_amount
            }
        }
    }

    requestUrl() {
        return new Promise((res, rej) => {
            axios({
                method: 'post',
                url: this.config.trx_endpoint,
                headers: this.header,
                data: JSON.stringify(this.body)
            })
            // Resolve on response
            .then((resp) => {
                res(resp)
            })
            // Reject on error
            .catch((err) => {
                rej(err)
            })
        })
    }
}