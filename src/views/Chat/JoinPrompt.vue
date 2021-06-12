<template>
    <loading-screen v-if="room === null" />
    <div class="join-prompt-wrapper" v-if="room !== null">
        <div class="top-gradient"></div>
        <div class="nav-back">
            <span class="material-icons-round"
            @click="goBack"
            >
                chevron_left
            </span>
        </div>
        <!-- photo -->
        <img :src="room.roomCoverImg" alt="" class="chat-img">

        <!-- name + desc -->
        <div class="details-wrapper">
            <h1 class="chat-name">{{ room.roomName }}</h1>
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
import LoadingScreen from "../../components/State/LoadingScreen"

import PlantalkFirebase from "../../firebase"

export default {
    name: "JoinPrompt",
    components: {
        Button,
        LoadingScreen
    },
    data: () => ({
        room: null,
        roomType: null,
        roomId: null,
        user: null,
    }),
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        join() {
            const db = PlantalkFirebase.getDb();
            const userUid = this.user.uid
            const roomType = this.roomType
            const roomId = this.roomId

            const data = {
                roomId: roomId
            }

            db.ref('users').child(userUid).child('room').child(roomType)
            .push(data, (err) => {
                if (err === null) {
                    this.$router.push({name: 'chat'})
                } else {
                    console.log(err)
                }
            })
        }
    },
    created() {
        const db = PlantalkFirebase.getDb();
        const auth = PlantalkFirebase.getAuth();
        this.user = auth.getCurrentUser();

        const roomType = this.$route.params.type;
        const roomId = this.$route.params.id;

        this.roomType = roomType
        this.roomId = roomId

        if (!['community', 'expert'].includes(roomType)) {
            this.$router.push({name: 'home'})
        }

        db.ref(roomType).child(roomId).once('value')
        .then((s) => {
            if (s.exists()) {
                this.room = s.val()

            } else {
                this.$router.push({name: 'home'})
            }
        })
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