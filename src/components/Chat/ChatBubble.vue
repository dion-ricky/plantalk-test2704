<template>
    <div v-if="!isOut" class="bubble-in">
        <div class="cb-avatar">
            <img src="https://source.unsplash.com/rDEOVtE7vOs/640x426" alt="">
        </div>
        
        <div class="cb-msg-wrapper">
            <div class="bubble-msg">
                {{message}}
            </div>
            <div class="msg-time">
                {{time}}
            </div>
        </div>
        
    </div>
    <div v-if="isOut" class="bubble-out">
        <div class="cb-msg-wrapper">
            <div class="bubble-msg">
                {{message}}
            </div>
            <div class="msg-time">
                {{time}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ChatBubble",
    props: {
        isOut: Boolean,
        message: String,
        time: String,
    }
}
</script>

<style lang="scss" scoped>

    .bubble-in, .bubble-out {
        display: flex;
        margin-top: 1.5rem;
    }

    .bubble-out {
        justify-content: flex-end;
    }

    .bubble-in {
        .cb-avatar {
            align-self: flex-end;
            margin-right: 1rem;

            img {
                width: 35px;
                height: 35px;
                object-fit: cover;

                border-radius: 12px;
            }
        }

    }

    .cb-msg-wrapper {
        width: max(40%, 230px)
    }

    .bubble-msg {
        font-size: 0.9rem;
        color: #4A4A4A;
        padding: 0.5rem;
        padding-left: 1rem;
        border-radius: 20px;
    }

    .bubble-in {
        .bubble-msg {
            background-color: #F8F8F8;
            border-bottom-left-radius: 0px;
        }
    }

    .bubble-out {
        .bubble-msg {
            background-color: #CEE1C4;
            border-bottom-right-radius: 0px;
        }
    }

    .bubble-out {
        .msg-time {
            display: flex;
            justify-content: flex-end;
        }
    }

    .msg-time {
        font-size: 0.8rem;
        color: #A3A3A3;
    }

</style>