<template>
    <div class="expert-card-wrapper">
        <img src="https://source.unsplash.com/oumE4KeypcM/640x960" alt="" srcset="">
        <p>Mr. Junaidi</p>
    </div>
</template>

<script>
export default {
    name: "ExpertChatCard",

}
</script>

<style lang="scss" scoped>
    .expert-card-wrapper {
        height: 10rem;
        display: flex;
        flex-direction: column;

        align-items: center;

        border: 1px solid #F3F3F3;
        border-radius: 12px;

        cursor: pointer;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;

            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
        }

        p {
            margin: .25rem;
        }
    }
</style>