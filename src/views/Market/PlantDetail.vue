<template>
    <back-nav />
    <loading-screen v-if="data === null" />
    <div class="pd-wrapper-condition" v-if="data !== null">
        <div class="pd-head">
            <div class="header">
                <h1 class="name">{{ data.name }}</h1>
                <p class="category">{{ data.category }}</p>
                <p>{{ data.price }}xp</p>
                <span class="material-icons-outlined">favorite_border</span>
            </div>
            <div class="img">
                <img :src="data.thumbnail" alt="" srcset="">
            </div>
        </div>
        <div class="plant-care">
            <div class="pc-card">
                <shovel-icon />
                <p class="pc-category">Care</p>
                <p class="pc-label">{{ data.maintenance.care }}</p>
            </div>
            <div class="pc-card">
                <sun-icon />
                <p class="pc-category">Sun</p>
                <p class="pc-label">{{ data.maintenance.sun }}</p>
            </div>
            <div class="pc-card">
                <water-icon />
                <p class="pc-category">Water</p>
                <p class="pc-label">{{ data.maintenance.water }}</p>
            </div>
        </div>
        <div class="pd-wrapper">

            <h2>Benefit</h2>
            <p class="pd-benefit">
                {{ data.description }}
            </p>
        </div>
        <div class="pd-buy-wrapper">
            <Button text="Buy plant" variant="primary" @click="buyPlant" />
        </div>
    </div>
</template>

<script>
import BackNav from "../../components/Navigation/BackNav"
import Button from "../../components/Button"
import LoadingScreen from "../../components/State/LoadingScreen"

import ShovelIcon from "../../assets/plantalk/plant-detail/shovel"
import SunIcon from "../../assets/plantalk/plant-detail/sun"
import WaterIcon from "../../assets/plantalk/plant-detail/water"

import PlantalkFirebase from "../../firebase"
import MarketController from "../../controller/market"

export default {
    name: 'PlantDetail',
    components: {
        BackNav,
        Button,
        LoadingScreen,
        ShovelIcon,
        SunIcon,
        WaterIcon
    },
    data: () => ({
        data: null
    }),
    methods: {
        buyPlant() {
            const uid = PlantalkFirebase.getAuth().getCurrentUser().uid

            let itemId = this.data.key
            let price = this.data.price * 1000

            const { data, key } = this.createOrder(uid, itemId, price)
            this.getPaymentUrl(data.totalAmount, uid+'.'+key)
                .then((resp) => {
                    // redirect to 
                    window.location.href = resp.redirect_url
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        createOrder(uid, itemId, price) {
            return MarketController.createOrder(uid, itemId, price)
        },
        getPaymentUrl(ga, id) {
            return MarketController.getPaymentUrl(ga, id)
        }
    },
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
                    // redirect back to market
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

    .pd-head {
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

        .category {
            font-size: 1.2rem;
            color: #4a4a4a;
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

    .pd-wrapper {
        font-family: $body-font-stack;
        margin: 1rem 30px;
        margin-bottom: 8rem;

        h2 {
            font-size: 1rem;
        }

        p.pd-benefit {
            color: #838383;
        }
    }

    .plant-care {
        display: flex;
        justify-content: space-around;
        margin-top: 2rem;

        font-family: $body-font-stack;

        .pc-card {
            display: flex;
            flex-direction: column;
            align-items: center;

            padding: .6rem;

            border: 2px solid #F8F8F8;
            border-radius: 12px;
            width: min(120px, 30%);

            p {
                margin: .5rem 0;
            }

            .pc-category {
                font-weight: 600;
                color: $primary;
            }

            .pc-label {
                font-weight: 500;
                font-size: .8rem;

                background-color: #97D77420;
                color: #7F9C70;

                padding: .2rem;
                border-radius: 5px;
            }
        }
    }

    .pd-buy-wrapper {
        position: fixed;
        bottom: 0;
        width: 100%;

        background-color: #ffffff;
        background-color: white;
        box-shadow: 0px 0px 50px 5px rgba(0, 0, 0, 0.08);
        -webkit-box-shadow: 0px 0px 50px 5px rgba(0, 0, 0, 0.08);
        -moz-box-shadow: 0px 0px 50px 5px rgba(0, 0, 0, 0.08);

        padding: 1rem 1.75rem;
    }

    span.material-icons-outlined {
        display: block;

        color: #858585;
    }
</style>