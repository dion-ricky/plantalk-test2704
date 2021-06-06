<template>
    <div class="join-prompt-wrapper">
        <div class="top-gradient"></div>
        <div class="nav-back">
            <span class="material-icons-round"
            @click="goBack"
            >
                chevron_left
            </span>
        </div>
        <!-- photo -->
        <img src="https://source.unsplash.com/1qfy-jDc_jo/640x405" alt="" class="chat-img">

        <!-- name + desc -->
        <div class="details-wrapper">
            <h1 class="chat-name">Sukulen Sidoarjo</h1>
            <h5 class="member-count">150 Members</h5>
            <p class="desc">
                Welcome!!!
                <br><br>
                This is a community of people from Sidoarjo who love succulents! Please share your garden, experiences, questions, and ideas!
                <br><br>
                Let's help each other grow healthy, with beautiful succulents!
                <br><br>
                Rules:
                <ul>
                    <li>New users are under Mods radar for the first 1x24 hour</li>
                    <li>Messages are heavily filtered, so if you found any mistake please contact Mods</li>
                    <li>Remember, you join this community to share and help others so please always be kind.</li>
                    <li>Have fun! Thanks 😊</li>
                </ul>
            </p>
        </div>

        <!-- @FIXED CTA -> Join Community -->
        <div class="cta-wrapper">
            <Button text="Join Community" variant="primary" @click="join" />
        </div>
    </div>
</template>

<script>
import Button from "../../components/Button"

export default {
    name: "JoinPrompt",
    components: {
        Button
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons+Round');
@import "../../assets/theme.scss";

.join-prompt-wrapper {
    padding-bottom: 9rem;
    font-family: $body-font-stack;
}

.chat-img {
    width: 100%;
    height: calc((1/2) * 100vh);
    object-fit: cover;
}

.details-wrapper {
    margin: 1.5rem;
}

.cta-wrapper {
    position: fixed;
    width: 100%;
    bottom: 0;
    padding: 1.5rem;
    padding-bottom: 1rem;

    background-color: white;
    box-shadow: 0px 0px 50px 5px rgba(0, 0, 0, 0.08);
    -webkit-box-shadow: 0px 0px 50px 5px rgba(0, 0, 0, 0.08);
    -moz-box-shadow: 0px 0px 50px 5px rgba(0, 0, 0, 0.08);
}

.nav-back {
    position: fixed;
    z-index: 10;
    color: white;

    margin: 1rem 0 0 .75rem;

    cursor: pointer;

    span {
        display: block;
        font-size: 3rem;
    }
}

.top-gradient {
    width: 100%;
    height: min(100px, 20vh);
    position: fixed;
    top: 0;
    z-index: 9;

    background: rgb(0,0,0);
    background: linear-gradient(180deg, rgba(0,0,0,1) -30%, rgba(0,0,0,0) 100%);
}

h1 {
    color: $primary;
    margin-bottom: .5rem;
}

h5 {
    color: #9CB98C;
    margin-top: 0;
}

</style>