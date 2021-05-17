<template>
    <canvas ref="scannerCanvas"></canvas>
</template>

<script>
export default {
    name: "ScannerCanvas",
    props: {
        imageBitmap: Object
    },
    watch: {
        imageBitmap(n, o) {
            const canvas = this.$refs.scannerCanvas
            canvas.width = this.imageBitmap.width
            canvas.height = this.imageBitmap.height
            canvas.getContext('2d').drawImage(this.imageBitmap, 0, 0)
        }
    }
}
</script>

<style lang="scss" scoped>
    canvas {
        position: fixed;
        top: 0;
        width: 100vw;
        height: 100vh;
        z-index: 5;
        object-fit: cover;
    }
</style>