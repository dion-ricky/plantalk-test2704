const functions = require('firebase-functions')

const {midtrans_transactionRequest} = require('./midtrans/RequestPaymentUrl')
const {midtrans_paymentNotification} = require('./midtrans/PaymentNotification')

exports.midtrans_transaction_request = functions.https.onRequest(midtrans_transactionRequest)
exports.midtrans_payment_notification = functions.https.onRequest(midtrans_paymentNotification)