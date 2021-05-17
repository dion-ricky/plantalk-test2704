<template>
    <div class="myplant-wrapper">
        <div class="myplant-header">
            <h1>My Plants</h1>
            <search-scan v-model:searchInput="searchInput" placeholder="Find Plant" />
        </div>
        <div class="myplant-content">
            <my-plant-list-item
                imgSrc="https://firebasestorage.googleapis.com/v0/b/plantalk-test2704.appspot.com/o/market%2Fmarket-plant1.png?alt=media&token=6a5194a4-5175-4556-8be6-12668019cef8"
                title="Haworthia Fasciata"
                plantedAt="2 May"
                category="Indoor Plant"
                nextWatering="20 May"
                needFertilizer="Fertilizer"
                />
        </div>
        <floating-action-button iconType="add" />
    </div>
</template>

<script>
import SearchScan from "../components/Input/SearchScan"
import MyPlantListItem from "../components/MyPlantListItem"
import FloatingActionButton from "../components/FloatingActionButton";

export default {
    name: "MyPlant",
    components: {
        SearchScan,
        MyPlantListItem,
        FloatingActionButton
    },
    data: () => ({
        searchInput: ''
    }),
}
</script>

<style lang="scss" scoped>
@import "../assets/theme.scss";

    .myplant-wrapper {
        margin: 0 20px;
        margin-bottom: 110px;
    }

    .myplant-content {
        margin-top: 1.5rem;
    }

    h1 {
        font-family: $body-font-stack;
        font-size: 1.6rem;
        color: $primary;
        margin: 0;
        margin-top: 22px;
    }

    .search-wrapper {
        margin-top: 1rem;
    }
</style>