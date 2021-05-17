<template>
    <!-- Add scanner UI here and set higher z-index -->
    <ScannerUI @capture:click="capture" />
    <!-- <ScannerCanvas :imageBitmap="imageBitmap" /> -->
    <canvas ref="scannerCanvas"></canvas>
    <video ref="player" :srcObject="stream" autoplay></video>
</template>

<script>
import PlantalkCamera from '../camera'
import ScannerUI from "./ScannerUI"
import ScannerCanvas from "./ScannerCanvas"

export default {
    name: "LiveCamera",
    components: {
        ScannerUI,
        ScannerCanvas
    },
    data: () => ({
        camera: PlantalkCamera,
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
            const video = this.$refs.player
            const imageWidth = video.videoWidth
            const imageHeight = video.videoHeight

            this.canvas.width = imageWidth
            this.canvas.height = imageHeight
            this.canvasCtx.drawImage(video, 0, 0, imageWidth, imageHeight)
        },
        capturev2() {
            const t0 = performance.now()
            const video = this.$refs.player
            const imageWidth = video.videoWidth
            const imageHeight = video.videoHeight

            this.canvas.width = imageWidth
            this.canvas.height = imageHeight
            this.canvasCtx.drawImage(video, 0, 0, imageWidth, imageHeight)

            const data = this.canvasCtx.getImageData(0, 0, imageWidth, imageHeight).data
            const t1 = performance.now()
            console.log("taking picture took: " + (t1 - t0) + " ms")
        }
    },
    beforeUnmount() {
        this.camera.stopVideo(this.stream);
    },
    created() {
        const camera = new PlantalkCamera();
        this.camera = camera;

        camera.getUserMediaStream()
            .then((mediaStream) => {
                this.stream = mediaStream
        });
    },
    mounted() {
        this.$nextTick(() => {
            const canvas = this.$refs.scannerCanvas
            console.log(canvas)
            const canvasCtx = canvas.getContext('2d')
            this.canvas = canvas
            this.canvasCtx = canvasCtx
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