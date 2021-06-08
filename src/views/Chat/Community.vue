<template>
    <search v-model:searchInput="searchInput" placeholder="Find Topic or Community" />

    <div class="joined-wrapper" v-if="myCommunity.length !== 0">
        <h3>Your Community</h3>
        <div class="community-chat-list">
            <community-chat-list-item
                v-for="community in myCommunity"
                :key="community.roomId"
                :room="community"
                @click="goToCommunityRoom(community.roomId)" />
        </div>
    </div>

    <div class="explore-wrapper" v-if="availableCommunity.length !== 0">
        <h3>Explore Communities</h3>
        <div class="community-chat-list">
            <community-chat-list-item
                v-for="community in availableCommunity"
                :key="community[0]"
                :room="community[1]"
                @click="joinRoom(community[0])" />
        </div>
    </div>
</template>

<script>
import Search from "../../components/Input/Search"
import CommunityChatListItem from "../../components/Chat/CommunityChatListItem"

import PlantalkFirebase from "../../firebase"

export default {
    name: "CommunityChat",
    data: () => ({
        user: null,
        searchInput: '',
        myCommunity: [],
        availableCommunity: []
    }),
    components: {
        Search,
        CommunityChatListItem
    },
    methods: {
        goToCommunityRoom(id) {
            this.$router.push({name: 'chat.community.room', params: {id: id}})
        },
        joinRoom(roomId) {
            this.$router.push({name: 'chatjoin', params: {id: roomId, type: 'community'}})
        },
        getAvailableCommunity(db) {
            db.ref('community').once('value')
            .then((s) => {
                if (s.exists()) {
                    this.availableCommunity = Object.entries(s.val())
                }
            })
            .catch((err) => {
                console.log(err)
            })
        },
        getMyCommunity(db) {
            // Get my community

            if (this.user === null) {
                setTimeout(() => {this.getMyCommunity(db)}, 250);
                return;
            }

            db.ref('users').child(this.user.uid).child('room/community')
            .once('value').then((s) => {
                if (s.exists()) {
                    Object.entries(s.val()).forEach((v, i) => {
                        this.getRoomMeta('community', v[1].roomId)
                            .then((data) => {
                                data.roomId = v[1].roomId
                                this.myCommunity.push(data)
                            })
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            })
        },
        getRoomMeta(roomType, roomId) {
            const db = PlantalkFirebase.getDb();

            return new Promise((res, rej) => {
                db.ref(roomType).child(roomId).once('value')
                .then((s) => {
                    if (s.exists()) {
                        res(s.val());
                    } else {
                        rej(new Error('Reference does not exists'));
                    }
                })
                .catch((err) => {
                    rej(err)
                })
            })
        }
    },
    created() {
        const auth = PlantalkFirebase.getAuth().auth;
        const db = PlantalkFirebase.getDb();

        auth.onAuthStateChanged((user) => {
            this.user = user;
        });

        this.getMyCommunity(db);
        this.getAvailableCommunity(db);
    }
}
</script>

<style lang="scss" scoped>
    @import "../../assets/theme.scss";

    .explore-wrapper {
        margin-top: 2rem;
    }

    .community-chat-list > div {
        margin-top: 1rem;
    }

    * {
        font-family: $body-font-stack;
    }

    h3 {
        font-weight: 600;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }
</style>