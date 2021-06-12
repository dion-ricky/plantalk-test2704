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
    // console.log(Buffer.from(req.body.image, "base64").toString("base64"))
    const vision = new AutoMLPrediction(req, res);
    vision.predict();
})

app.listen(port,() => {
    console.log('Vision prediction started', port)
})

exports.visionLabeling = app

class AutoMLPrediction {
    
    constructor(req, res) {
        this.req = req;

        this.predictCallback = (prediction) => {
            res.status(200).send(prediction)
        }

        this.errorCallback = (error) => {
            res.status(500).send(error)
        }
    }

    predict() {
        const C = {
            project_id: 'plantalk-test2704',
            location: 'us-central1',
            modelId: 'ICN718365922007449600'
        }

        const base64Image = this.req.body.image.replace(/^data:image\/(png|gif|jpeg);base64,/,'');
        const {PredictionServiceClient} = require('@google-cloud/automl').v1;
        
        const client = new PredictionServiceClient();
        
        const buffer = Buffer.from(base64Image, "base64");

        const request = {
            name: client.modelPath(C.project_id, C.location, C.modelId),
            payload: {
                image: {
                    imageBytes: buffer
                }
            },
            params: {
                score_threshold: '0.5'
            }
        }

        client.predict(request).then((response) => {
            this.predictCallback(response);
        })
        .catch((err) => {
            console.error(err);
            this.errorCallback(err);
        })
    }
}
