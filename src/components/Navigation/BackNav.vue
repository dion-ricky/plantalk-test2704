<template>
    <div class="backnav-wrapper">
        <span class="material-icons-outlined" @click="goBack">chevron_left</span>
    </div>
</template>

<script>
export default {
    name: "BackNav",
    methods: {
        goBack() {
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
    .backnav-wrapper {
        position: fixed;
        z-index: 10;
        top: 0;
        width: 100%;

        padding: .5rem 1rem;
        background-color: #ffffff;
        opacity: 0.85;
    }

    span {
        font-size: 3rem;
        cursor: pointer;
    }
</style>