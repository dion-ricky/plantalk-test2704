
class PlantalkAuth {

    constructor(firebase) {
        this.auth = firebase.auth()
    }
    
    createUser(e, p) {
        return new Promise((res, rej) => {
            this.auth.createUserWithEmailAndPassword(e, p)
                .then((userCredential) => {
                    res(userCredential);
                })
                .catch((err) => {
                    rej(err);
                })
        });
    }

    signIn(e,p) {
        return new Promise((res, rej) => {
            this.auth.signInWithEmailAndPassword(e,p)
                .then((userCredential) => {
                    res(userCredential);
                })
                .catch((err) => {
                    rej(err);
                })
        });
    }

    signOut() {
        return new Promise((res, rej) => {
            this.auth.signOut().then(() => {
                res();
            }).catch((err) => {
                rej(err);
            })
        })
    }

    getCurrentUser() {
        return this.auth.currentUser;
    }
}

export default PlantalkAuth