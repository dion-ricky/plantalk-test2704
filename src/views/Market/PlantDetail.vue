<template>
    <back-nav />
    <div class="pd-head">
        <div class="header">
            <h1 class="name">Haworthia Fasciata</h1>
            <p class="category">Indoor Plant</p>
            <p>100xp</p>
            <span class="material-icons-outlined">favorite_border</span>
        </div>
        <div class="img">
            <img src="https://firebasestorage.googleapis.com/v0/b/plantalk-test2704.appspot.com/o/market%2Fplant1-ts.png?alt=media&token=78ca3148-4601-4152-a923-8547904b143c" alt="" srcset="">
        </div>
    </div>
    <div class="plant-care">
        <div class="pc-card">
            <shovel-icon />
            <p class="pc-category">Care</p>
            <p class="pc-label">Easy</p>
        </div>
        <div class="pc-card">
            <sun-icon />
            <p class="pc-category">Sun</p>
            <p class="pc-label">Part</p>
        </div>
        <div class="pc-card">
            <water-icon />
            <p class="pc-category">Water</p>
            <p class="pc-label">Every Week</p>
        </div>
    </div>
    <div class="pd-wrapper">

        <h2>Benefit</h2>
        <p class="pd-benefit">
            Haworthia Fasciata, being an indoor and an easy to maintain plant can be the best to have which will provide nourishment and relaxation to mental health and you will unconsciously be affected by it.
        </p>
    </div>
    <div class="pd-buy-wrapper">
        <Button text="Buy plant" variant="primary" @click="toHome" />
    </div>
</template>

<script>
import BackNav from "../../components/Navigation/BackNav"
import Button from "../../components/Button"

import ShovelIcon from "../../assets/plantalk/plant-detail/shovel"
import SunIcon from "../../assets/plantalk/plant-detail/sun"
import WaterIcon from "../../assets/plantalk/plant-detail/water"

export default {
    name: 'PlantDetail',
    components: {
        BackNav,
        Button,
        ShovelIcon,
        SunIcon,
        WaterIcon
    },
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