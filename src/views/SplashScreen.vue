<template>
    <div class="container">
        <div class="splash-screen">
            <div class="center">
                <img src="../assets/plantalk/plantalk-logo.png" class="plantalk-logo" alt="" srcset="">
                <h1>PlanTalk</h1>
                <h2 style="margin-top: 2rem">Let's garden and take care of your mental health</h2>
                <PlantalkButton text="Mulai" variant="primary" style="width: min(300px, 80%); margin-top: 3rem"/>
            </div>
            <div class="center pbush-wrapper">
                <img src="../assets/plantalk/plantalk-bushes.png" class="plantalk-bushes">
            </div>
        </div>
    </div>
</template>

<script>
import PlantalkButton from "../components/Plantalk/Button"

export default {
    name: "SplashScreen",
    components: {
        PlantalkButton
    }
}
</script>

<style lang="scss" scoped>
    @import "../assets/theme.scss";

    div {
        .container {
            width: 100%;
            height: 100%;
            background-color: $main-bg-color;
        }

        .splash-screen {
            margin: 0 1rem 0 1rem;
            height: 100%;
            display: flex;
            flex-direction: column;
        }

        .center {
            display: flex;
            align-items: center;
            flex-direction: column;
        }
    }

    .pbush-wrapper {
        height: 100%;
        justify-content: flex-end;
    }

    .plantalk-logo {
        width: 5rem;
        margin-top: max(105px, 10vh);
    }

    .plantalk-bushes {
        width: min(270px, 80%);
    }

    h1 {
        font-family: $title-font-stack;
        color: $main-fg-color;
        font-size: 3rem;
        margin: 0;
    }

    h2 {
        font-family: $body-accent-font-stack;
        color: $primary-variant;
        font-size: 1.25rem;
        text-align: center;
    }
</style>