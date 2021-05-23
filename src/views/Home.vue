<template>
  <div class="home-wrapper">
      <div class="home-header">
          <h1>Welcome, {{ user.name }}</h1>
      </div>
      <div class="home-plants">
            <h5>Recommended</h5>

            <div class="home-market-grid" v-if="plants.length !== 0">
                <plant-card v-for="plant in plants" :key="plant[0]" :title="plant[1].name"
                    :price="plant[1].price+'xp'" :smallTxt="plant[1].category"
                    :imgSrc="plant[1].thumbnail" @click="plantDetail(plant[0])"/>
            </div>
      </div>
  </div>
  <!-- Welcome -->

  <!-- Search + notif icon -->
  <!-- PlantPoints -->
  <!-- Slides -->
  <!-- Plants reccomendation -->
      <!-- Plant card -->
</template>

<script>
import SearchScan from "../components/Input/SearchScan"
import PlantCard from "../components/PlantCard"

import PlantalkFirebase from "../firebase"

export default {
    name: "Home",
    components: {
        SearchScan,
        PlantCard
    },
    data: () => ({
        plants: [],
        user: {
            name: 'Guest'
        }
    }),
    methods: {
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
        
        const auth = PlantalkFirebase.getAuth().auth
        auth.onAuthStateChanged((user) => {
            db.ref('users').child(user.uid).once('value')
                .then((s) => {
                    if(s.exists()) {
                        this.user = s.val()
                    }
                })
        })
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/theme.scss";

    .home-wrapper{
        margin: 0 20px;
    }

    .home-market-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        row-gap: 2rem;
        column-gap: 1rem;

        margin-top: 1rem;
    }

    .home-plants {
        margin-top: 1.5rem;
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