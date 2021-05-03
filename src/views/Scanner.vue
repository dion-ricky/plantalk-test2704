<template>
    <!-- Add scanner UI here and set higher z-index -->
    <ScannerUI @capture:click="capture" />
    <ScannerCanvas :imageBitmap="imageBitmap" />
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
        imageBitmap: null
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
            const mediaStreamTrack = this.stream.getVideoTracks()[0];
            const imageCapture = new ImageCapture(mediaStreamTrack)

            imageCapture.grabFrame()
                .then(imageBitmap => {
                    this.imageBitmap = imageBitmap
                })
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
</style>