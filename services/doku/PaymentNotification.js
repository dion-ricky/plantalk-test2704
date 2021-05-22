const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
const port = 8082

app.post('/payments/notifications', (req, res) => {
    // verify signature from req header
    res.sendStatus(200);
})

app.listen(port, () => {
    console.log("Notification server started")
});

exports.paymentNotification = app