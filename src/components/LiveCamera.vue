<template>
    <video ref="player" controls autoplay></video>    
</template>

<script>
    export default {
        name: "LiveCamera",
        created() {
            const player = this.$refs.player;

            const constraints = {
                video: true
            }

            navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                player.srcObject = stream;
            })
        }
    }
</script>
