<template>
    <div class="chat-list-item-wrapper">
        <img :src="room.roomCoverImg" alt="" class="chat-img">
        <div class="chat-details">
            <h3>{{ room.roomName }}</h3>
            <p>50 Members</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "CommunityChatListItem",
    props: {
        room: Object
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/theme.scss";

    .chat-list-item-wrapper {
        display: grid;
        grid-template-columns: 75px 1fr;
        grid-template-rows: repeat(auto-fit, 75px);
        column-gap: .5rem;

        font-family: $body-font-stack;

        cursor: pointer;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            
            border-radius: 12px;
        }

        h3 {
            font-weight: 600;
            margin-top: 0rem;
            margin-bottom: 0.5rem;
        }
        
        p {
            color: #a8a8a8;
            margin: 0;
        }
    }

</style>