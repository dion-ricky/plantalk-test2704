<template>
    <search v-model:searchInput="searchInput" placeholder="Find Topic or Expert" />

    <h3>Recently Consulted</h3>
    <div class="recent-grid">
        <expert-chat-card />
        <expert-chat-card />
    </div>

    <h3>Experts for You</h3>
    <div class="experts-list">
        <expert-chat-list-item />
        <expert-chat-list-item />
        <expert-chat-list-item />
    </div>

</template>

<script>
import Search from "../../components/Input/Search"

import ExpertChatCard from "../../components/Chat/ExpertChatCard"
import ExpertChatListItem from "../../components/Chat/ExpertChatListItem"

export default {
    name: "ExpertChat",
    data: () => ({
        searchInput: ''
    }),
    components: {
        Search,
        ExpertChatCard,
        ExpertChatListItem
    }

}
</script>

<style lang="scss" scoped>
    @import "../../assets/theme.scss";

    .recent-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        row-gap: 1rem;
        column-gap: 1rem;

        margin-bottom: 2rem;
    }

    .experts-list {
        display: grid;
        grid-template-columns: 1fr;
        row-gap: 1.25rem;
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