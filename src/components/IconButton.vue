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
    }

    .wrapper > * {
        display: block;
    }
</style>