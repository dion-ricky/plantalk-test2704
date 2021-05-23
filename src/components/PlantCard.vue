<template>
    <div class="card-wrapper">
        <img class="card-img" :src="imgSrc" alt="">
        <div class="card-content-wrapper">
            <div class="card-content">
                <div class="small">
                    {{smallTxt}}
                </div>
                <div class="title">
                    <span>
                        {{ title }}
                    </span>
                    <span>
                        {{ price }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PlantCard",
    props: {
        imgSrc: String,
        smallTxt: String,
        title: String,
        price: String
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/theme.scss";

    .card-wrapper {
        border-radius: 12px;
        border: solid 1px #F8F8F8;

        cursor: pointer;
    }

    .card-img {
        width: 100%;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
    }

    .card-content-wrapper {
        padding: 1rem;
    }

    .card-content {
        font-family: $body-font-stack;
    }

    .small {
        font-size: 14px;
        font-weight: 600;
        color: #9CB98C;
    }

    .title, .price {
        font-size: 14px;
        font-weight: 600;
        color: $primary;
    }

    .title {
        display: flex;
        align-items: flex-end;

        justify-content: space-between;
    }

</style>