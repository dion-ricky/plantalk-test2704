const express = require('express')
const cors = require('cors')
const app = express()
const port = 8083

app.use(cors())

app.use(express.json({limit: '2mb'}))

app.post('/', (req, res) => {
    // console.log('oh hey');
    // console.log(Buffer.from(req.body.image, "base64"))
    // res.sendStatus(200);
    const vision = new VisionLabeling(req, res);
    vision.predict();
})

// app.listen(port,() => {
//     console.log('Vision prediction started', port)
// })

exports.visionLabeling = app

class VisionLabeling {
    
    constructor(req, res) {
        this.req = req;

        this.predictCallback = (prediction) => {
            res.status(200).send(prediction)
        }
    }

    predict() {
        const base64Image = this.req.body.image
        const vision = require('@google-cloud/vision');
        
        const client = new vision.ImageAnnotatorClient();
        
        const buffer = Buffer.from(base64Image, "base64");
        
        client.labelDetection({
            image: {
                content: buffer
            }
        }).then((response) => {
            this.predictCallback(response);
        })
        .catch((err) => {
            console.error(err);
        })
    }
}
