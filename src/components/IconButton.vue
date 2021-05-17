<template>
    <div class="wrapper" @click="clicked">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "IconButton",
    methods: {
        clicked(e) {
            this.$emit("iconbtn:click", e);
        }
    }
}
</script>

<style lang="scss" scoped>
    .wrapper {
        padding: 1rem;
        display: inline-block;

        cursor: pointer;

        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .wrapper > * {
        display: block;
    }
</style>