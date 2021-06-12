import axios from "axios"

function sendImageToVision(image) {
    let visionapi = 'https://us-central1-plantalk-test2704.cloudfunctions.net/visionLabeling';

    return new Promise((res, rej) => {
        axios({
            method: 'POST',
            url: visionapi,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: JSON.stringify({
                image: image
            })
        })
        .then((resp) => {
            res(resp)
        })
        .catch((err) => {
            rej(err)
        })
    })
}

export default {
    sendImageToVision
}