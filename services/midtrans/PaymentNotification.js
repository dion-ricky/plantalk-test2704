
const admin = require('firebase-admin')

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://plantalk-test2704-default-rtdb.firebaseio.com"
});

const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()
const port = 8082

app.use(cors())

app.use(express.json())

app.post('/', (req, res) => {
    paymentNotificationHandler(req, res)
})

// app.listen(port,() => {
//     console.log('Payment notification started')
// })

exports.midtrans_paymentNotification = app

const paymentNotificationHandler = (req, res) => {
    const body = req.body
    
    let data = {
        signature_key: body.signature_key,
        transaction_status: body.transaction_status,
        fraud_status: body.fraud_status,
        order_id: body.order_id,
        status_code: body.status_code,
        gross_amount: body.gross_amount
    }

    let paymentVerifier = new PlantalkMidtransPaymentVerifier(data)
    let isVerified = paymentVerifier.verify()

    if (!isVerified) {
        console.error('Payment is not verified')
        res.sendStatus(200) // respond midtrans with success, but process the payment further
    }

    updateOrderPaymentStatus(req)

    updateUserOwnedPlants(req)

    // Respond with 200 OK
    res.sendStatus(200)
}

const updateOrderPaymentStatus = (req) => {
    const body = req.body

    let data = {
        transaction_status: body.transaction_status,
        order_id: body.order_id,
    }

    let uid = data.order_id.substring(0, data.order_id.indexOf('.'))
    let order_id = data.order_id.substring(data.order_id.indexOf('.')+1)

    const db = admin.database()
    db.ref('orders').child(uid).child(order_id)
        .update({
            paymentStatus: 1
        })
}

const updateUserOwnedPlants = (req) => {
    const data = req.body.order_id

    let uid = data.substring(0, data.indexOf('.'))
    let order_id = data.substring(data.indexOf('.')+1)

    const boughtPlants = getBoughtPlants(req)
    const previouslyOwnedPlants = getPreviouslyOwnedPlants(uid)

    Promise.all([boughtPlants, previouslyOwnedPlants])
        .then((values) => {
            let boughtPlants = values[0]
            let previouslyOwnedPlants = values[1]

            console.log(values)
            
            let ownedPlants = previouslyOwnedPlants ? previouslyOwnedPlants.concat(boughtPlants) : boughtPlants
        
            const db = admin.database()
            db.ref('users').child(uid)
                .update({
                    owned_plants: ownedPlants
                })
        })

}

const getPreviouslyOwnedPlants = (uid) => {
    const db = admin.database()

    return new Promise((res, rej) => {
        db.ref('users').child(uid).child('owned_plants')
            .once('value')
            .then((s) => {
                if (s.exists()) {
                    res(s.val())
                } else {
                    res(null)
                }
            })
            .catch((err) => {
                rej(err)
            })
    })
}

const getBoughtPlants = (req) => {
    const data = req.body.order_id

    let uid = data.substring(0, data.indexOf('.'))
    let order_id = data.substring(data.indexOf('.')+1)

    const db = admin.database()

    return new Promise((res, rej) => {
        db.ref('orders').child(uid).child(order_id)
            .once('value')
            .then((s) => {
                if (s.exists()) {
                    res(s.val().items)
                } else {
                    rej(null)
                }
            })
            .catch((err) => {
                rej(err)
            })
    })
}

class PlantalkMidtransPaymentVerifier {

    // data = {signature_key, transaction_status,
    // fraud_status, order_id, status_code, gross_amount}
    constructor(data) {
        this.config = {
            client_key: 'SB-Mid-client-Bwe9aXDFXbVs-ObB',
            server_key: 'SB-Mid-server-nsc7KrBdJkxog1VsP8_ygQ6m'
        }

        this.data = data
    }

    verify() {
        let crypto = require('crypto')
        let verified = []

        // Verify signature key
        let signatureData = this.data.order_id
                            + this.data.status_code
                            + this.data.gross_amount
                            + this.config.server_key

        let hash = crypto.createHash('sha512')
        let data = hash.update(signatureData)

        verified.push(
            data.digest('hex') === this.data.signature_key
        )

        // Verify payment status
        verified.push(
            this.data.transaction_status === 'capture' ||
            this.data.transaction_status === 'settlement'
        )

        // Verify fraud status
        verified.push(
            this.data.fraud_status === 'accept'
        )
        
        // Return false if any of those test above is false
        // else return true
        return verified.reduce((t,n) => n)
    }
}


