<template>
    <div class="chat-list-item-wrapper">
        <img src="https://source.unsplash.com/_H4iwsvqKMI/640x442" alt="" class="chat-img">
        <div class="chat-details">
            <h3>Mrs. Alexandria</h3>
            <p>Agriculture Lecturer</p>
            <div class="status">
                <div class="rating">
                    <span class="material-icons-outlined">thumb_up</span>
                    95.0%
                </div>
                <div class="experience">
                    <span class="material-icons-outlined">work</span>
                    1 years
                </div>
            </div>
            <p class="price">
                10 xp
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "ExpertChatListItem"
}
</script>

<style lang="scss" scoped>
@import "../../assets/theme.scss";

    .chat-list-item-wrapper {
        display: grid;
        grid-template-columns: 100px 1fr;
        column-gap: .75rem;

        font-family: $body-font-stack;

        cursor: pointer;

        .status {
            display: grid;
            grid-template-columns: max-content max-content;
            column-gap: 1rem;

            font-size: .9rem;
            color: #B9B9B9;

            span {
                font-size: 1.2rem;
            }
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            
            border-radius: 12px;
        }

        h3 {
            font-weight: 600;
            margin: 0;
        }
        
        p {
            color: #9CB98C;
            margin: 0;
        }

        .price {
            color: $primary;
            font-size: 1.3rem;
            font-weight: 600;
        }
        
    }


</style>