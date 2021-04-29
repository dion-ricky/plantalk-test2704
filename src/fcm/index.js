
class PlantalkMessaging {

    constructor(firebase) {
        const messaging = this.newMessaging(firebase);

        messaging.getToken({vapidKey: "BI1GvM4YM4Ytm5fDqaYudjOFSTobsB_HDb5MJV2jLROljOLC8tcq0BuJURYrpQNBhd_oJ5lFFkfQL9PdiEWyHdU"})
        .then((currentToken) => {
            if (currentToken) {
                this.handleToken(currentToken)
            } else {
                console.log('No registration token available. Request permission to generate one.');
            }
        })
        .catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
        })
    }

    newMessaging(firebase) {
        this.messaging = firebase.messaging();
        return this.messaging;
    }

    setOnMessageHandler(fn) {
        this.messaging.onMessage(fn)
    }

    handleToken(token) {
        // Send token to server
        // process it further on server
        // maybe force it to subscribe to a topic
        // https://firebase.google.com/docs/cloud-messaging/js/send-multiple
        console.log(token)
    }

    requestNotification() {
        return new Promise((res, rej) => {
            Notification.requestPermission()
            .then(() => {
                return this.messaging.getToken()
            })
            .then(res)
            .catch(rej)
        });
    }

}

export default PlantalkMessaging