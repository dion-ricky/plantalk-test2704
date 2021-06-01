<template>
  <div class="home-wrapper">
      <div class="home-header">
            <div class="home-user-profile">
                <div>
                    <p class="salutation">Good Morning</p>
                    <p class="name">{{ user.name }}</p>
                </div>
                <avatar :bgColor="avatar.bgColor" :text="avatar.text" :text-color="avatar.textColor" />
            </div>
            <search-scan placeholder="Find Plant" />
            <points />
            <banner class="promotional-banner" imgSrc="https://firebasestorage.googleapis.com/v0/b/plantalk-test2704.appspot.com/o/promotional%2Fbanner%2Fbnr_anti-stress-tips.png?alt=media&token=0eb7bad3-89ba-414b-8370-c8ac6ed07508" />
      </div>
      <div class="home-task">
            <h5>Today's Tasks</h5>
            <banner class="promotional-banner" imgSrc="https://firebasestorage.googleapis.com/v0/b/plantalk-test2704.appspot.com/o/promotional%2Fbanner%2Fhome_task_done.png?alt=media&token=b11ba2c8-ff48-4999-91db-a2ced24532ce" />
      </div>
      <div class="home-plants">
            <h5>Popular Plant</h5>

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
import Banner from "../components/Banner"
import Avatar from "../components/Avatar"
import Points from "../components/Home/Points"

import PlantalkFirebase from "../firebase"

export default {
    name: "Home",
    components: {
        SearchScan,
        PlantCard,
        Banner,
        Avatar,
        Points
    },
    data: () => ({
        plants: [],
        user: {
            name: 'Guest'
        },
        avatar: {
            bgColor: "#009578",
            text: "GS",
            textColor: "white"
        }
    }),
    methods: {
        plantDetail(e) {
            this.$router.push({name: 'plantdetail', params: {id: e}})
        },
        userLoggedIn(user, uid) {
            this.avatar.text = user.name.substr(0,2).toUpperCase()

            let colors = [
                // "#E81123",
                // "#D83B01",
                "#FFB900",
                "#B4009E",
                "#5C2D91",
                "#B50E0E",
                "#0078D7",
                "#107C10",
                "#008272",
                "#00B4FF",
            ];

            let calculateColor = (uid) => {
                var sum = 0;
                for (let index in uid) {
                    sum += uid.charCodeAt(index);
                }
                return sum % colors.length;
            }

            this.avatar.bgColor = colors[calculateColor(uid)]
        }
    },
    created() {
        const db = PlantalkFirebase.getDb()

        db.ref('plants').once('value')
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
                        this.userLoggedIn(s.val(), user.uid)
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
        padding-bottom: 110px;
    }

    .home-user-profile {
        display: flex;
        align-items: center;

        margin: 1.5rem 0;
        
        &>div:first-child {
            flex-grow: 1;
        }
    }

    .salutation, .name {
        font-family: $body-font-stack;
        color: $primary;
        margin: 0;
    }

    .name {
        font-weight: 600;
        font-size: 1.4rem;
    }

    .home-market-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        row-gap: 2rem;
        column-gap: 1rem;

        margin-top: 1rem;
    }
    
    .home-task {
        margin-top: 1.5rem;
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
        color: #4A4A4A;
    }

    .search-wrapper {
        margin-top: 1rem;
    }

    .promotional-banner {
        margin-top: 1rem;
    }

</style>