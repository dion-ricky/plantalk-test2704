<template>
    <!-- Add scanner UI here and set higher z-index -->
    <ScannerUI @capture:click="capture" @close:click="exitScanner" />
    <!-- <ScannerCanvas :imageBitmap="imageBitmap" /> -->
    <canvas ref="scannerCanvas"></canvas>
    <video ref="player" :srcObject="stream" autoplay></video>
</template>

<script>
import PlantalkCamera from '../../camera'
import ScannerUI from "./ScannerUI"
import ScannerCanvas from "./ScannerCanvas"

import SalientObjectDetection from "../../salient"

export default {
    name: "Scanner",
    components: {
        ScannerUI,
        ScannerCanvas
    },
    data: () => ({
        camera: PlantalkCamera,
        sod: SalientObjectDetection,
        stream: null,
        isTorchOn: false,
        imageBitmap: null,
        canvas: null,
        canvasCtx: null
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
            let frameData = sod.getFrame()

            this.canvas.width = frameData.imageWidth
            this.canvas.height = frameData.imageHeight
            this.canvasCtx.putImageData(new ImageData(frameData.frameData, frameData.imageWidth), 0, 0)
        },
        exitScanner() {
            this.$router.go(-1)
        },
        onReticleXYCallback(reticleXYPos) {
            // console.log(reticleXYPos)
        },
        
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
            const worker = new Worker("/imageBinarizer.js");

            this.binarizerWorker = worker;
        }
    },
    mounted() {
        this.$nextTick(() => {
            const canvas = this.$refs.scannerCanvas
            // console.log(canvas)
            const canvasCtx = canvas.getContext('2d')
            this.canvas = canvas
            this.canvasCtx = canvasCtx

            this.sod = new SalientObjectDetection({
                videoRef            : this.$refs.player,
                onReticleXYCallback : this.onReticleXYCallback,
                workerInstance      : this.binarizerWorker,
                emptyCanvas         : document.createElement('canvas')
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
</style>