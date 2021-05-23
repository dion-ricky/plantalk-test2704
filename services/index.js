const functions = require('firebase-functions')

const {requestPaymentUrl} = require('./doku/PaymentUrlRequest')
const {paymentNotification} = require('./doku/PaymentNotification')

exports.request_payment_url = functions.https.onRequest(requestPaymentUrl)
exports.payment_notification = functions.https.onRequest(paymentNotification)