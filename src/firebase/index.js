import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/messaging'
import 'firebase/auth'
import 'firebase/database'
import PlantalkMessaging from './fcm'
import PlantalkAuth from './auth'

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
        this.messaging = this.messaging ? this.messaging
                         : new PlantalkMessaging(firebase)
        return this.messaging
    }

    getAuth() {
        this.auth = this.auth ? this.auth
                    : new PlantalkAuth(firebase)
        return  this.auth
    }

    getDb() {
        this.db = this.db ? this.db : firebase.database()
        return this.db
    }
}

export default new PlantalkFirebase();