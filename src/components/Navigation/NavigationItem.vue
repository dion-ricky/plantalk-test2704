<template>
    <div class="navitem" @click="clicked">
        <div class="default" v-if="currentActive !== navId">
            <slot name="nav-default"></slot>
        </div>
        <div class="active" v-if="currentActive === navId">
            <slot name="nav-active"></slot>
        </div>
    </div>
</template>

<script>

export default {
    name: "NavigationItem",
    props: {
        navId: String,
        currentActive: String
    },
    methods: {
        clicked(e) {
            this.$emit("navitem:click", this.navId, e)
        }
    }
}
</script>

<style lang="scss" scoped>
    .navitem {
        display: inline-block;
        padding: 16px;
        cursor: pointer;

        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>