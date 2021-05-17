<template>
    <div class="backnav-wrapper">
        <span class="material-icons-outlined">chevron_left</span>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .backnav-wrapper {
        position: fixed;
        z-index: 10;
        top: 0;
        width: 100%;

        padding: .5rem 1rem;
    }

    span {
        font-size: 3rem;
        cursor: pointer;
    }
</style>