<template>
    <div class="header">
        <div class="header-wrapper">
            <div class="logo-title">
                <img src="../assets/plantalk/plantalk-logo.png" alt="" srcset="">
                <h2>{{ title }}</h2>
            </div>
            <div class="ornament">
                <img src="../assets/plantalk/plantalk-bg-ornament.png" alt="" srcset="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PlantalkAuthHeader",
    props: {
        title: String
    }
}
</script>

<style lang="scss" scoped>
    @import "../assets/theme.scss";

    .header {
        background-color: $main-bg-color;
        padding: 3rem 0 1.5rem 0;

        &-wrapper {
            display: flex;
            justify-content: space-between;
            margin-left: 2rem;
        }
    }

    .ornament {
        display: flex;
        align-items: center;

        img {
            width: min(35vw, 113px);
        }
    }

    .logo-title {
        img {
            width: 60px;
        }

        h2 {
            font-family: $title-font-stack;
            font-weight: bold;
            color: $primary;
            font-size: 2rem;
            margin: 16px 0 0 0;
            width: min(50%, 150px);
        }
    }
</style>