import PlantalkFirebase from "../../firebase"
import axios from "axios"

function createOrder(uid, item_id, price) {
    let data = {
        items: [item_id],
        totalAmount: price,
        paymentStatus: -1
    }

    const db = PlantalkFirebase.getDb()

    let insert = db.ref('orders/' + uid).push(data)
    return {data, key: insert.key}
}

function getPaymentUrl(total_amount, order_id) {
    let midtrans_transactionRequest = 'https://us-central1-plantalk-test2704.cloudfunctions.net/midtrans_transaction_request'

    return new Promise((res, rej) => {
        axios({
            method: 'post',
            url: midtrans_transactionRequest,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: JSON.stringify({
                order_id: order_id,
                gross_amount: total_amount
            })
        })
        .then((resp) => {
            res(resp.data)
        })
        .catch((err) => {
            rej(err)
        })
    })
}

export default {
    createOrder,
    getPaymentUrl
}