<template>
    <div class="chat-wrapper">
        <div class="chat-header">
            <h1>Chat</h1>
            <tab-nav
                class="tabnav-chat"
                :tabs="chatTabNav"
                :propsActive="chatTabActive"
                @tabnav:clicked="tabnavClicked"/>

        </div>
        <div class="chat-content">
            <router-view/>
        </div>
    </div>
</template>

<script>
import TabNav from "../../components/Navigation/TabNav"

export default {
    name: "Chat",
    data: () => ({
        chatTabNav: ['Community', 'Expert'],
        chatTabActive: 'Community'
    }),
    components: {
        TabNav
    },
    methods: {
        tabnavClicked(e) {
            switch (e.toLowerCase()) {
                case 'community':
                    this.$router.push({
                        name: 'chat.community'
                    })
                    break;
                
                case 'expert':
                    this.$router.push({
                        name: 'chat.expert'
                    })
            }
        }
    },
    created() {
        let currentPath = this.$route.path
        let currentRoute = this.$router.getRoutes().filter(route => route.path === currentPath)[0]
        
        if (currentRoute.name === 'chat') {
            this.$router.push({name: 'communitychat'})
            this.chatTabActive = 'Community'
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/theme.scss";

    .chat-wrapper {
        margin: 0 20px;
        margin-bottom: 110px;
    }

    .chat-content {
        margin-top: 1.5rem;
    }

    h1 {
        font-family: $body-font-stack;
        font-size: 1.6rem;
        color: $primary;
        margin: 0;
        margin-top: 22px;
    }

    .tabnav-chat {
        margin-top: 1rem;
    }
</style>