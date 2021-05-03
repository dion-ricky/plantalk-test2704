<template>
    <div class="wrapper">

        <Reticle width="250px" height="250px" :state="state" />
        <div>
            <button @click="state = 'sensing'">Sensing</button>
            <button @click="state = 'error'">Error</button>
            <button @click="state = 'loading'">Loading</button>
            <button @click="state = 'move-closer'">Move Closer</button>
        </div>
    </div>
</template>

<script>
import Reticle from "../assets/plantalk/scanner/reticle"

export default {
    name: "Playground",
    components: {
        Reticle
    },
    data: () => ({
        state: 'sensing'
    }),
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>
    .wrapper {
        width: 100vw;
        height: 100vh;
        background-color: black;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
</style>