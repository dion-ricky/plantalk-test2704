<template>
    <search v-model:searchInput="searchInput" placeholder="Find Topic or Community" />

    <div class="community-chat-list">
        <community-chat-list-item @click="goToChatRoom" />
    </div>
</template>

<script>
import Search from "../../components/Input/Search"
import CommunityChatListItem from "../../components/Chat/CommunityChatListItem"

export default {
    name: "CommunityChat",
    data: () => ({
        searchInput: ''
    }),
    components: {
        Search,
        CommunityChatListItem
    },
    methods: {
        goToChatRoom() {
            this.$router.push({name: 'chatroom'})
        }
    }
}
</script>

<style lang="scss" scoped>
    .community-chat-list {
        margin-top: 1rem;
    }
</style>