<template>
    <div class="market-wrapper">
        <div class="market-header">
            <h1>Buy Plant</h1>
            <search-scan v-model:searchInput="searchInput" placeholder="Find Plant" />
        </div>

        <banner class="gacha-banner" imgSrc="https://firebasestorage.googleapis.com/v0/b/plantalk-test2704.appspot.com/o/promotional%2Fbanner%2Fbnr-gacha.png?alt=media&token=1bb4ed9d-d0d9-4438-a7f6-4374bf8f6882" />

        <div class="market-content">
            <h5>Popular</h5>

            <tab-nav class="tabnav-market" :tabs="marketPopularFilter" @tabnav:clicked="tabnavClicked"/>

            <div class="market-grid">
                <plant-card  v-for="plant in plants" :key="plant.key" :title="plant.title" :price="plant.price" :smallTxt="plant.category" :imgSrc="plant.img" />
            </div>
        </div>
    </div>
</template>

<script>
import SearchScan from "../components/Input/SearchScan"
import Banner from "../components/Banner"
import TabNav from "../components/Navigation/TabNav"
import PlantCard from "../components/PlantCard"

export default {
    name: "Market",
    components: {
        SearchScan,
        Banner,
        TabNav,
        PlantCard
    },
    data: () => ({
        marketPopularFilter: ['All', 'Indoor', 'Outdoor'],
        searchInput: '',
        plants: [{
            key: 1,
            title: "Haworthia Fasciata",
            price: "120xp",
            category: "Indoor Plant",
            img: "https://firebasestorage.googleapis.com/v0/b/plantalk-test2704.appspot.com/o/market%2Fmarket-plant1.png?alt=media&token=6a5194a4-5175-4556-8be6-12668019cef8"
        },
        {
            key: 2,
            title: "Cactus San Pedro",
            price: "130xp",
            category: "Outdoor Plant",
            img: "https://firebasestorage.googleapis.com/v0/b/plantalk-test2704.appspot.com/o/market%2Fmarket-plant2.png?alt=media&token=6a5194a4-5175-4556-8be6-12668019cef8"
        },
        {
            key: 3,
            title: "Asplenium Antiquum",
            price: "100xp",
            category: "Outdoor Plant",
            img: "https://firebasestorage.googleapis.com/v0/b/plantalk-test2704.appspot.com/o/market%2Fmarket-plant3.png?alt=media&token=6a5194a4-5175-4556-8be6-12668019cef8"
        },
        {
            key: 4,
            title: "Lidah Mertua",
            price: "80xp",
            category: "Outdoor Plant",
            img: "https://firebasestorage.googleapis.com/v0/b/plantalk-test2704.appspot.com/o/market%2Fmarket-plant4.png?alt=media&token=6a5194a4-5175-4556-8be6-12668019cef8"
        }]
    }),
    methods: {
        tabnavClicked(e) {
            console.log(e);
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/theme.scss";

    .market-wrapper {
        margin: 0 20px;
        margin-bottom: 110px;
    }

    .market-content {
        margin-top: 1.5rem;
    }

    .market-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        row-gap: 2rem;
        column-gap: 1rem;

        margin-top: 1rem;
    }

    .gacha-banner {
        margin-top: 1rem;
    }
    
    .tabnav-market {
        margin-top: 1rem;
    }

    h1 {
        font-family: $body-font-stack;
        font-size: 1.6rem;
        color: $primary;
        margin: 0;
        margin-top: 22px;
    }

    h5 {
        margin: 0;
        font-family: $body-font-stack;
        font-size: 1.125rem;
        font-weight: 600;
        color: #212121;
    }

    .search-wrapper {
        margin-top: 1rem;
    }
</style>