<template>
    <loading-screen v-if="userPlants.length === 0" />
    <div class="myplant-wrapper" v-if="userPlants.length !== 0">
        <div class="myplant-header">
            <h1>My Plants</h1>
            <search-scan v-model:searchInput="searchInput" placeholder="Find Plant" />
        </div>
        <div class="myplant-content">
            <my-plant-list-item
                v-for="(plant, index) in userPlants"
                :key="index"
                :imgSrc="plant.thumbnail"
                :title="plant.name"
                plantedAt="2 May"
                :category="plant.category"
                nextWatering="20 May"
                needFertilizer="Fertilizer"
                @click="$router.push({name: 'myplantdetail'})"
                />
        </div>
        <floating-action-button iconType="add" />
    </div>
</template>

<script>
import SearchScan from "../../components/Input/SearchScan"
import MyPlantListItem from "../../components/MyPlantListItem"
import FloatingActionButton from "../../components/FloatingActionButton";
import LoadingScreen from "../../components/State/LoadingScreen"

import PlantalkFirebase from "../../firebase"

export default {
    name: "MyPlant",
    components: {
        SearchScan,
        MyPlantListItem,
        FloatingActionButton,
        LoadingScreen
    },
    data: () => ({
        userPlants: [],
        searchInput: ''
    }),
    methods: {
        getUserPlantsInfo(plants) {
            const db = PlantalkFirebase.getDb()

            plants.forEach((v, i) => {
                this.getPlantInfo(v).then((plantInfo) => {
                    this.userPlants.push(plantInfo)
                })
            })
        },
        getPlantInfo(plantid) {
            const db = PlantalkFirebase.getDb()

            return new Promise((res, rej) => {
                db.ref('plants').child(plantid).once('value')
                    .then((s) => {
                        if (s.exists()) {
                            res(s.val())
                        } else {
                            rej(new Error("Reference not exists"))
                        }
                    })
                    .catch((err) => {
                        rej(err)
                    })
            })
        }
    },
    created() {
        const db = PlantalkFirebase.getDb()
        const auth = PlantalkFirebase.getAuth().auth

        let getOwnedPlant = (uid) => {
            db.ref('users').child(uid).child('owned_plants').once('value')
                .then((s) => {
                    if (s.exists()) {
                        this.getUserPlantsInfo(s.val())
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        auth.onAuthStateChanged((user) => {
            getOwnedPlant(user.uid)   
        })

    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/theme.scss";

    .myplant-wrapper {
        margin: 0 20px;
        margin-bottom: 110px;
    }

    .myplant-content {
        margin-top: 1.5rem;

        &>* {
            margin-top: 1rem;
        }
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