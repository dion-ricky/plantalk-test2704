<template>
    <!-- Add scanner UI here and set higher z-index -->
    <ScannerUI
        :predicted="predicted"
        @capture:click="capture"
        @close:click="exitScanner"
        @retry:click="rescan"
        @ui:mounted="scannerUIMounted"
        @click="userAssist" />
    <div class="reticle-container">
        <Reticle width="250px" height="250px" ref="reticle" class="reticle" :state="reticle.state" />
    </div>
    <video ref="player" :srcObject="stream" autoplay></video>
</template>

<script>
import PlantalkCamera from '../../camera'
import ScannerUI from "./ScannerUI"
import ScannerCanvas from "./ScannerCanvas"
import Reticle from "../../components/Scanner/Reticle"

import SalientObjectDetection from "../../salient"
import ScannerUtil from "./util"

import ScannerController from "../../controller/scanner"

export default {
    name: "Scanner",
    components: {
        ScannerUI,
        ScannerCanvas,
        Reticle
    },
    data: () => ({
        camera: PlantalkCamera,
        sod: SalientObjectDetection,
        thumbCanvasRef: null,
        toggleThumbCanvas: Object,
        togglePredicted: Object,
        stream: null,
        isTorchOn: false,
        predicted: {
            class: '',
            plant_id: '',
            isError: false
        },
        classPlantPair: {
            'aglaonema': '-MbnoBuePrOqNlkdw8QO',
            'aloe vera': '-MbnoBuhLL9gvdj48GzM',
            'burros tail': '-MbnoBui5DCaoGMPewa3',
            'snake plant': '-MbnoBujrQHHOWVOtR2Q'
        },
        reticle: {
            state: 'sensing',
            lastPos: {x: 0, y: 0},
            notMoving: 0
        }
    }),
    methods: {
        openCamera() {
            this.camera.getUserMediaStream()
            .then((mediaStream) => {
                this.stream = mediaStream
            });
        },
        closeCamera() {
            this.$refs.player.srcObject.getVideoTracks()
            .forEach(track => track.stop())
            // this.camera.stopVideo();
        },
        toggleTorch() {
            let toggle = !this.isTorchOn;
            console.log(toggle)
            this.camera.toggleTorch(toggle);
            this.isTorchOn = toggle;
        },
        openCameraEnv() {
            this.camera.getUserMediaStream({
                video: {
                    facingMode: "environment"
                }
            })
            .then((mediaStream) => {
                this.stream = mediaStream
            });
        },
        openCameraUser() {
            this.camera.getUserMediaStream({
                video: {
                    facingMode: "user"
                }
            })
            .then((mediaStream) => {
                this.stream = mediaStream
            });
            // TODO: Flip the video element
            // because it is weird
        },
        getCap() {
            this.$refs.player.srcObject.getVideoTracks()
            .forEach((track) => {
                this.$refs.dev.innerText = JSON.stringify(track.getCapabilities())
            })
        },
        capture() {
            // let frameData = sod.getFrame()

            // this.canvas.width = frameData.imageWidth
            // this.canvas.height = frameData.imageHeight
            // this.canvasCtx.putImageData(new ImageData(frameData.frameData, frameData.imageWidth), 0, 0)
        },
        exitScanner() {
            this.$router.go(-1)
        },
        userAssist(e) {
            this.sod.userAssist(e);
        },
        onReticleXYCallback(reticleXYPos) {
            // console.log(reticleXYPos)
            this.moveReticle(reticleXYPos.salientXY)
        },
        moveReticle(pos) {
            const reticle = this.reticleElement.$el;

            if (reticle.style.opacity == 0) {
                reticle.style.opacity = 100;
            }

            const x = pos.x - 125;
            const y = pos.y - 125;

            // check if reticle position has changed
            // if not changed, send image to vision API
            if (ScannerUtil.isReticleNotMoving(this.reticle.lastPos, {x, y})) {
                this.reticle.notMoving += 1

                if (this.reticle.notMoving < 6) {
                    return;
                }

                this.reticle.notMoving = 0;
                this.predictingUI();

                // stop getting new reticle position
                this.sod.stopFlag = true;

                // capture image and prepare to send to vision api
                this.toggleThumbCanvas(true);
                this.classify(pos)
            } else {
                this.reticle.notMoving = 0;
                this.scanningUI();
            }

            this.reticle.lastPos.x = x;
            this.reticle.lastPos.y = y;

            let transform = `translate(${x}px, ${y}px)`
            reticle.style.transform = transform;
        },
        classify(currentXY) {
            // capture image and prepare to send to vision api
            const viewport = ScannerUtil.getViewport();
            const imageWidth = Math.floor((0.4 * viewport[0]))
            const imageHeight = imageWidth
            const thumbCanvas = this.thumbCanvasRef
            thumbCanvas.width = imageWidth
            thumbCanvas.height = imageHeight

            const video = this.$refs.player
            const cw = video.videoWidth
            const ch = video.videoHeight
            const sw = viewport[0]
            const sh = viewport[1]

            const wi = cw>sw ? (cw-sw)/2 : 0
            const hi = ch>sh ? (ch-sh)/2 : 0

            const wratio = cw/sw
            const hratio = ch/sh

            const xmapInv = (x) => {
                return ch<sh ? x+wi : x*wratio;
            }
            const ymapInv = (y) => {
                return ch<sh ? y*hratio : y+hi;
            }

            const x = Math.floor(xmapInv(currentXY.x - (0.5 * imageWidth)))
            const y = Math.floor(ymapInv(currentXY.y - (0.5 * imageHeight)))

            let imageData = this.sod.getFrame(imageWidth, imageHeight, x, y); // capture from canvas
            imageData = new ImageData(imageData.frameData, imageData.imageWidth)

            // console.log(imageFrame)
            thumbCanvas.getContext('2d').putImageData(imageData, 0, 0)
            this.classifyImage();
            // console.log(thumbCanvas.toDataURL('image/png'))
        },
        classifyImage() {
            let base64Image = this.thumbCanvasRef.toDataURL('image/png')

            const toTitleCase = (str) => {
                return str.replace(
                    /\w\S*/g,
                    function(txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                    }
                );
            }

            // send to vision API
            ScannerController.sendImageToVision(base64Image)
            .then((response) => {
                const data = response.data[0]

                console.log(data)

                if (data.payload === null || data.payload.length === 0) {
                    throw new Error('Image prediction error');
                }

                let prediction = data.payload[0]
                
                this.predicted = {
                    class: toTitleCase(prediction.displayName),
                    plant_id: this.classPlantPair[prediction.displayName]
                }
                this.predictedUI();
            })
            .catch((err) => {
                console.error(err)
                this.errorUI();
            })
        },
        scannerUIMounted(data) {
            this.thumbCanvasRef = data.thumbCanvasRef;
            this.toggleThumbCanvas = data.toggleThumbCanvas;
            this.togglePredicted = data.togglePredicted;
        },
        rescan() {
            this.predicted.class = '';
            this.predicted.isError = false;
            this.reticle.state = 'sensing';

            this.sod.stopFlag = false;
            this.sod.init();
        },
        scanningUI() {
            this.toggleThumbCanvas(false);
            this.togglePredicted(false);
        },
        predictingUI() {
            this.reticle.state = 'loading';
        },
        predictedUI() {
            const reticle = this.reticleElement.$el;
            reticle.style.opacity = 0;
            this.togglePredicted(true);
        },
        errorUI() {
            this.reticle.state = 'error';
            this.predicted.class = "Can't classify image, please try again"
            this.predicted.isError = true;
            this.togglePredicted(true);
        }
    },
    beforeUnmount() {
        this.sod.stopFlag = true
        this.camera.stopVideo(this.stream);
    },
    created() {
        const camera = new PlantalkCamera();
        this.camera = camera;

        camera.getUserMediaStream()
            .then((mediaStream) => {
                this.stream = mediaStream
        });

        if (window.Worker) {
            const worker = new Worker("/ScannerReticle.js");

            this.binarizerWorker = worker;
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.reticleElement = this.$refs.reticle

            this.sod = new SalientObjectDetection({
                videoRef            : this.$refs.player,
                onReticleXYCallback : this.onReticleXYCallback,
                workerInstance      : this.binarizerWorker,
                emptyCanvas         : document.createElement('canvas'),
                viewport            : ScannerUtil.getViewport()
            }, window.performance)

            this.binarizerWorker.onmessage = (e) => {
                this.sod.workerMsgHandler(e)
            }

            this.sod.init()
        });
    }
}
</script>

<style lang="scss" scoped>
video {
    width: 100vw;
    height: 100vh;
    display: block;
    object-fit: cover;
}

canvas {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 5;
    object-fit: cover;
}

.reticle-container {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 5;
}

.reticle {
    opacity: 0;
    transition: opacity ease-out .5s;
}

</style>