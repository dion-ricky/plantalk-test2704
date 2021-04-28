<template>
    <video ref="player" autoplay></video>
    <button @click="openCamera">Open</button>
    <button @click="closeCamera">Close</button>
</template>

<script>
    export default {
        name: "LiveCamera",
        methods: {
            openCamera() {
                const player = this.$refs.player;

                console.log(player);
                const constraints = {
                    video: {
                        facingMode: "environment"
                    }
                    // configure video dimensions here as well
                    // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
                }

                navigator.mediaDevices.getUserMedia(constraints)
                .then((stream) => {
                    player.srcObject = stream;
                })
            },
            closeCamera() {
                this.$refs.player.srcObject.getVideoTracks()
                .forEach(track => track.stop())
            }
        }
    }
</script>
