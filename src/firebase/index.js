import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/messaging'
import PlantalkMessaging from './fcm'

class PlantalkFirebase {
    // set this class to singleton
    // this class contains all firebase functionality
    // such as FCM, Analytics, Auth

    constructor() {
        firebase.initializeApp({
            apiKey: "AIzaSyDrJgW6fmPInCTGKhKVZuEZbqn2k0Mmz3s",
            authDomain: "plantalk-test2704.firebaseapp.com",
            projectId: "plantalk-test2704",
            storageBucket: "plantalk-test2704.appspot.com",
            messagingSenderId: "179398843604",
            appId: "1:179398843604:web:a37a1da6ce25c4dbbfaf41",
            measurementId: "G-K9N15WE0GH"
          });
        firebase.analytics();
    }

    getMessaging() {
        return this.messaging ? this.messaging : this.newMessaging()
    }

    newMessaging() {
        this.messaging = new PlantalkMessaging(firebase)
        return this.messaging
    }

}

export default new PlantalkFirebase();