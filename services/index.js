const functions = require('firebase-functions')

const {doku_requestPaymentUrl} = require('./doku/PaymentUrlRequest')
const {doku_paymentNotification} = require('./doku/PaymentNotification')

const {midtrans_transactionRequest} = require('./midtrans/RequestPaymentUrl')
const {midtrans_paymentNotification} = require('./midtrans/PaymentNotification')

exports.doku_request_payment_url = functions.https.onRequest(doku_requestPaymentUrl)
exports.doku_payment_notification = functions.https.onRequest(doku_paymentNotification)

exports.midtrans_transaction_request = functions.https.onRequest(midtrans_transactionRequest)
exports.midtrans_payment_notification = functions.https.onRequest(midtrans_paymentNotification)