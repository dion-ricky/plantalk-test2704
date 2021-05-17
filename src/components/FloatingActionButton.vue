<template>
    <div class="fab-wrapper">
        <div class="fab">
            <span class="material-icons-outlined">{{ iconType }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "FloatingActionButton",
    props: {
        iconType: String
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/theme.scss";

    .fab-wrapper {
        position: fixed;
        right: 2rem;
        bottom: 7.5rem;
        z-index: 10;

        cursor: pointer;
    }

    .fab {
        border-radius: 20px;
        background-color: $primary;
        padding: 0.75rem;
        box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.25);
        -webkit-box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.25);
        -moz-box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.25);
    }

    span {
        display: block;
        font-size: 2rem;
        color: white;
    }
</style>