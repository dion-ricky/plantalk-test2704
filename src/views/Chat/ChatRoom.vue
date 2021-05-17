<template>
    <div class="chat-room-wrapper">
        <div class="chat-room-header">
            <h2>Mrs. Alexandria</h2>
            <p>Agriculture Lecturer</p>
        </div>
        <div class="chat-room-content">
            content
        </div>
        <div class="chat-room-control">
            <text-input v-model:textInput="newMsgText" label="!nolabel" placeholder="Type a message"/>
            <span class="material-icons-outlined">image</span>
        </div>
    </div>
</template>

<script>
import TextInput from "../../components/Input/TextInput"

export default {
    name: "ChatRoom",
    components: {
        TextInput
    },
    data: () => ({
        newMsgText: ''
    }),
}
</script>

<style lang="scss" scoped>
@import "../../assets/theme.scss";

    .chat-room-wrapper {
        display: flex;
        flex-direction: column;

        height: 100%;

        font-family: $body-font-stack;

        .chat-room-content {
            flex-grow: 1;
        }
    }

    .chat-room-header, .chat-room-content, .chat-room-control {
        padding: 0 2rem;
    }

    .chat-room-header, .chat-room-control {
        background-color: #FAFAFA;
    }

    .chat-room-control {
        padding-top: .5rem;
        padding-bottom: 1rem;

        display: flex;

        align-items: center;

        span.material-icons-outlined {
            display: block;
            font-size: 2rem;
            color: #A3A3A3;

            cursor: pointer;

            margin-left: 1rem;
        }
    }

</style>