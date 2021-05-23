const { getTimestampforDoku, generateDigest, generateSignature } = require('./util.js');

const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()
const port = 8082

app.use(cors())

app.get('/', (req, res) => {
    // res.send(getTimestampforDoku())
    new PlantalkRequestPaymentUrlDoku(200000, "INV-ALO-19009112")
        .requestPaymentUrl()
        .then((resp) => {
            res.send(resp)
        })
        .catch((err) => {
            if (err.response) {
                console.log("Doku error")
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
                res.send(err)
            } else if(err.request) {
                console.log("No response error")
                console.log(err.request)
                res.send(err)
            } else {
                res.send(err)
            }
        })
})

app.listen(port, () => {
    console.log("Server started")
})

exports.doku_requestPaymentUrl = app

class PlantalkRequestPaymentUrlDoku {
    constructor(amount, invoice_number) {
        this.reqBody =
        {
            "order": {
                "amount": amount,
                "invoice_number": invoice_number
            },
            "payment": {
                "payment_due_date": 30,
                "payment_method_types": [
                    "VIRTUAL_ACCOUNT_BANK_MANDIRI",
                ]
            }
        }

        this.config = {
            "virtual_account": {
                "client_id": "MCH-0121-2713099287665",
                "secret_key": "SK-AhCDyXIAjjGMGN26VBaq"
            }
        }
    }

    requestPaymentUrl() {
        let api_endpoint = 'https://api-sandbox.doku.com/checkout/v1/payment'
        let client_id = this.config.virtual_account.client_id
        let request_id = Math.floor(Math.random()*10) + ''
        let timestamp = getTimestampforDoku()
        let req_target = '/checkout/v1/payment'
        let digest = generateDigest(JSON.stringify(this.reqBody))
        let secret_key = this.config.virtual_account.secret_key

        let signature = generateSignature(
            client_id,
            request_id,
            timestamp,
            req_target,
            digest,
            secret_key
        )

        return new Promise((res, rej) => {
            axios({
                method: 'post',
                url: api_endpoint,
                headers: {
                    'Content-Type': 'application/json',
                    'Client-Id': client_id,
                    'Request-Id': request_id,
                    'Request-Timestamp': timestamp,
                    'Signature': signature,
                },
                data: JSON.stringify(this.reqBody)
            }).then((resp) => {
                res(resp)
            }).catch((err) => {
                rej(err)
            })
        })
    }
}


