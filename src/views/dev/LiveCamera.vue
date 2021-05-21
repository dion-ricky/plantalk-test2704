<template>
    <video ref="player" :srcObject="stream" autoplay></video>
    <button @click="openCamera">Open</button>
    <button @click="closeCamera">Close</button>
    <button @click="toggleTorch">Torch</button>
    <button @click="getCap">Get Capabilities</button>
    <button @click="openCameraEnv">Open Environment</button>
    <button @click="openCameraUser">Open User</button>
    <p ref="dev"></p>
</template>

<script>
import PlantalkCamera from '../../camera'

export default {
    name: "LiveCamera",
    data: () => ({
        camera: PlantalkCamera,
        stream: null,
        isTorchOn: false
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
        }
    },
    created() {
        const camera = new PlantalkCamera();
        this.camera = camera;
    }
}
</script>
