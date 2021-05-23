<template>
    <div class="chat-list-item-wrapper">
        <img src="https://source.unsplash.com/1qfy-jDc_jo/640x405" alt="" class="chat-img">
        <div class="chat-details">
            <h3>Sukulen Sidoarjo</h3>
            <p>50 Members</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "ChatListItem"
}
</script>

<style lang="scss" scoped>
@import "../../assets/theme.scss";

    .chat-list-item-wrapper {
        display: grid;
        grid-template-columns: 75px 1fr;
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
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
        }
        
        p {
            color: #a8a8a8;
            margin: 0;
        }
    }

</style>