const functions = require('firebase-functions')

const requestPaymentUrl = require('./doku/PaymentUrlRequest')
const paymentNotification = require('./doku/PaymentNotification')

exports.jokulRequestPaymentUrl = functions.https.onRequest(requestPaymentUrl)
exports.jokulPaymentNotification = functions.https.onRequest(paymentNotification)