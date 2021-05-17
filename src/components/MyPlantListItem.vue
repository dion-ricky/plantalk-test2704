<template>
    <div class="myplantlistitem-wrapper">
        <img :src="imgSrc" alt="" class="plant-img">
        <div class="plant-details">
            <h3>{{ title }}</h3>
            <p class="planted-at">Planted - {{ plantedAt }}</p>
            <p>{{ category }}</p>
            <p class="next-watering">Next Watering {{ nextWatering }}</p>
        </div>
    </div>
</template>

<script>

export default {
    name: "MyPlantListItem",
    props: {
        imgSrc: String,
        title: String,
        plantedAt: String,
        category: String,
        nextWatering: String,
        needFertilizer: String
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/theme.scss";

    .myplantlistitem-wrapper {
        display: flex;
    }

    .plant-img {
        width: min(200px, 30%);
        object-fit: cover;
    }

    .plant-details {
        flex-grow: 1;
        font-family: $body-font-stack;
        margin-left: 1rem;

        .planted-at {
            color: #9CB98C;
        }

        .next-watering {
            font-size: 12px;
            color: #A9A9A9;
        }

        h3 {
            margin: 0;
            color: $primary;
        }

        p {
            margin: 0;
            color: #4A4A4A;
        }
    }
</style>