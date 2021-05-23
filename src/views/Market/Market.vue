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

            <div class="market-grid" v-if="plants.length !== 0">
                <plant-card v-for="plant in plants" :key="plant[0]" :title="plant[1].name"
                    :price="plant[1].price+'xp'" :smallTxt="plant[1].category"
                    :imgSrc="plant[1].thumbnail" @click="plantDetail(plant[0])"/>
            </div>
        </div>
    </div>
</template>

<script>
import SearchScan from "../../components/Input/SearchScan"
import Banner from "../../components/Banner"
import TabNav from "../../components/Navigation/TabNav"
import PlantCard from "../../components/PlantCard"

import PlantalkFirebase from "../../firebase"

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
        plants: [],
        
    }),
    methods: {
        tabnavClicked(e) {
            console.log(e);
        },
        plantDetail(e) {
            this.$router.push({name: 'plantdetail', params: {id: e}})
        }
    },
    created() {
        const db = PlantalkFirebase.getDb()

        db.ref('plants').get()
            .then((s) => {
                if (s.exists()) {
                    let tempPlants = Object.entries(s.val())
                    tempPlants = tempPlants
                    this.plants = tempPlants
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/theme.scss";

    .market-wrapper {
        margin: 0 20px;
    }

    .market-content {
        margin-top: 1.5rem;
        padding-bottom: 110px;
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