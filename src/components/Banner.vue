<template>
    <div class="wrapper">
        <img :src="imgSrc">
    </div>
</template>

<script>

export default {
    name: "Banner",
    props: {
        imgSrc: String
    }
}
</script>

<style lang="scss" scoped>
    .wrapper {
        border-radius: 12px;
        cursor: pointer;

        width: min(640px, 100%);

        background-color: white;
        box-shadow: 0px 16px 50px 0px rgba(0, 0, 0, 0.05);
        -webkit-box-shadow: 0px 16px 50px 0px rgba(0, 0, 0, 0.05);
        -moz-box-shadow: 0px 16px 50px 0px rgba(0, 0, 0, 0.05);

        img {
            width: 100%;
            max-width: 100vw;
            display: block;
        }
    }
</style>