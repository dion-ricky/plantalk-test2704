<template>
    <back-nav />
    <loading-screen v-if="data === null" />
    <div v-if="data !== null">
        <div class="mpd-head">
            <div class="header">
                <h1 class="name">{{ data.name }}</h1>
                <p class="planted-at">Planted - 2 May</p>
                <p class="category">{{ data.category }}</p>
                <p class="next-watering">Water Every Week</p>
            </div>
            <div class="img">
                <img :src="data.thumbnail" alt="" srcset="">
            </div>
        </div>
        <div class="myplant-detail-wrapper">
            <h3>Schedule</h3>
            <weekly-calendar />
            <monthly-calendar />
            <div class="legend-wrapper">
                <div class="lg lg-planted">
                    <div class="cl"></div>
                    <p>Planted</p>
                </div>
                <div class="lg lg-watered">
                    <div class="cl"></div>
                    <p>Watered</p>
                </div>
                <div class="lg lg-fertilized">
                    <div class="cl"></div>
                    <p>Fertilized</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BackNav from "../../components/Navigation/BackNav"
import WeeklyCalendar from "../../components/Calendar/WeeklyCalendar"
import MonthlyCalendar from "../../components/Calendar/MonthlyCalendar"
import LoadingScreen from "../../components/State/LoadingScreen"

import PlantalkFirebase from "../../firebase"

export default {
    name: "MyPlantDetail",
    components: {
        BackNav,
        WeeklyCalendar,
        MonthlyCalendar,
        LoadingScreen
    },
    data: () => ({
        data: null
    }),
    created() {
        // get plant data from db
        const db = PlantalkFirebase.getDb()

        let plantId = this.$route.params.id

        db.ref('plants').child(plantId).get()
            .then((s) => {
                if (s.exists()) {
                    this.data = s.val()
                    this.data.key = s.key
                } else {
                    // no data returned
                    // go back
                    this.$router.go(-1)
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

    .myplant-detail-wrapper {
        margin: 0 30px;
        margin-bottom: 3rem;
    }

    .mpd-head {
        display: flex;
    }

    .header {
        margin-left: 30px;
        margin-top: 4rem;

        font-family: $body-font-stack;
        
        .name {
            margin: 0;
            font-size: 1.65rem;
            color: $primary;
        }

        .planted-at {
            font-size: 1.2rem;
            color: #9CB98C;
        }

        .category {
            font-size: 1.2rem;
            color: #4a4a4a;
        }

        .next-watering {
            font-size: .9rem;
            color: #A9A9A9;
        }
    }

    .img {
        background-color: #fafafa;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        padding: 2rem;
        margin-top: 3rem;

        width: 60%;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .legend-wrapper {
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;

        font-family: $body-font-stack;

        .cl {
            width: 1rem;
            height: 1rem;
            border-radius: 5px;
        }

        .lg {
            display: flex;
            align-items: center;

            p {
                margin: 0;
                margin-left: .5rem;
            }
        }

        .lg-planted {
            .cl {
                background-color: #FCD46D;
            }
        }

        .lg-watered {
            .cl {
                background-color: #6A7EE9;
            }
        }

        .lg-fertilized {
            .cl {
                background-color: #F66161;
            }
        }
    }

    h3 {
        color: #4A4A4A;
        font-family: $body-font-stack;
    }

    .monthly-calendar-wrapper {
        margin-top: 1rem;
    }
</style>