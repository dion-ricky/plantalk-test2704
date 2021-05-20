<template>
    <div class="chat-room-wrapper">
        <div class="chat-room-header">
            <div class="crh-nav-back">
                <span class="material-icons-outlined"
                @click="goBack"
                >
                    chevron_left
                </span>
            </div>
            <div class="crh-header">
                <h2>Mrs. Alexandria</h2>
                <p>Agriculture Lecturer</p>
            </div>
        </div>
        <div class="chat-room-content">
            <div class="crc-message">
                <chat-bubble message="Hello, I'm Alexandria, I'm an Agriculture Lecturer. What can I help you?"
                    time="15.32 PM"
                    :isOut="false" />
                <chat-bubble message="Hello, I'm Alexandria, I'm an Agriculture Lecturer. What can I help you?"
                    time="15.34 PM"
                    :isOut="true" />
                <chat-bubble message="Hello, I'm Alexandria, I'm an Agriculture Lecturer. What can I help you?"
                    time="15.34 PM"
                    :isOut="true" />
                <chat-bubble message="Hello, I'm Alexandria, I'm an Agriculture Lecturer. What can I help you?"
                    time="15.34 PM"
                    :isOut="false" />
                <chat-bubble message="Hello, I'm Alexandria, I'm an Agriculture Lecturer. What can I help you?"
                    time="15.34 PM"
                    :isOut="false" />
            </div>
        </div>
        <div class="chat-room-control">
            <text-input v-model:textInput="newMsgText" label="!nolabel" placeholder="Type a message"/>
            <span class="material-icons-outlined">image</span>
        </div>
    </div>
</template>

<script>
import TextInput from "../../components/Input/TextInput"
import ChatBubble from "../../components/Chat/ChatBubble"

export default {
    name: "ChatRoom",
    components: {
        TextInput,
        ChatBubble
    },
    data: () => ({
        newMsgText: ''
    }),
    methods: {
        goBack() {
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/theme.scss";

    h2, p {
        margin: 0;
    }

    .chat-room-wrapper {
        display: flex;
        flex-direction: column;

        height: 100%;

        font-family: $body-font-stack;

        .chat-room-content {
            flex-grow: 1;
            overflow-y: scroll;
        }
    }

    .chat-room-header, .chat-room-content, .chat-room-control {
        padding: 0 2rem;
    }

    .chat-room-header, .chat-room-control {
        background-color: #FAFAFA;
    }

    .chat-room-header {
        display: flex;
        align-items: center;

        padding-top: 2rem;
        padding-bottom: 1rem;

        .crh-nav-back {
            span {
                display: block;
                cursor: pointer;
                font-size: 2.5rem;
            }
        }

        .crh-header {
            flex-grow: 1;
            text-align: center;

            h2 {
                font-weight: 600;
                font-size: 1.25rem;
                color: $primary;
            }

            p {
                font-size: .875rem;
                color: #9CB98C;
            }
        }
    }

    .chat-room-content {
        background-image: url("data:image/svg+xml,%3Csvg width='66' height='40' viewBox='0 0 66 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40C0.00757058 37.3757 0.532575 34.7787 1.54497 32.3575C2.55736 29.9363 4.03727 27.7386 5.9 25.89C8.40152 23.3973 11.5137 21.605 14.9252 20.6925C18.3367 19.7799 21.928 19.7791 25.34 20.69C26.2516 24.0767 26.2566 27.6437 25.3544 31.0329C24.4523 34.4222 22.6747 37.5146 20.2 40H0ZM65.32 0.75C66.2275 4.14395 66.226 7.71696 65.3155 11.1101C64.405 14.5033 62.6176 17.5971 60.1329 20.0808C57.6482 22.5645 54.5536 24.3506 51.1601 25.2597C47.7666 26.1688 44.1936 26.1689 40.8 25.26C39.8947 21.8667 39.8979 18.295 40.8094 14.9033C41.7209 11.5116 43.5085 8.41944 45.9929 5.9371C48.4772 3.45476 51.5709 1.66964 54.9633 0.760924C58.3557 -0.147787 61.9274 -0.148106 65.32 0.76V0.75ZM0.07 0H20.17L20.09 0.07C17.6047 2.55504 14.509 4.34203 11.1141 5.25132C7.71914 6.16061 4.14468 6.16015 0.75 5.25C0.292632 3.53768 0.063979 1.77234 0.07 0ZM2.01 40H4.54L8.8 35.76V25.98C6.68642 27.6562 4.97758 29.787 3.80036 32.2141C2.62314 34.6413 2.00779 37.3024 2 40H2.01ZM7.39 40H17.19C19.6253 38.0723 21.5198 35.5465 22.6887 32.6689C23.8576 29.7913 24.2612 26.66 23.86 23.58L7.4 40H7.39ZM10.82 24.58V33.75L22.44 22.16C18.47 21.66 14.36 22.46 10.82 24.58ZM43.68 23.8C46.413 24.1552 49.1911 23.8782 51.8001 22.9901C54.4091 22.1021 56.7793 20.6269 58.7281 18.6781C60.6769 16.7293 62.1521 14.3591 63.0401 11.7501C63.9282 9.14107 64.2052 6.36299 63.85 3.63L43.68 23.8ZM50.88 4.63V13.78L62.43 2.22C58.47 1.72 54.38 2.52 50.86 4.62L50.88 4.63ZM47.39 7.35C43.29 11.45 41.58 17.04 42.26 22.38L48.87 15.78V6.02C48.36 6.43 47.87 6.87 47.39 7.35ZM17.18 0H7.42L3.64 3.78C6.03506 4.09051 8.46811 3.91586 10.7943 3.26646C13.1204 2.61706 15.2921 1.50619 17.18 0ZM2.08 0C2.07 0.8 2.12 1.58 2.22 2.37L4.59 0H2.07H2.08Z' fill='%23CED6AF' fill-opacity='0.1'/%3E%3C/svg%3E");
        background-repeat: space;

        .crc-message {
            display: grid;
            grid-template-columns: 1fr;
        }
    }

    .chat-room-control {
        padding-top: 2rem;
        padding-bottom: 2rem;

        display: flex;

        align-items: center;

        & > div:first-child {
            // chat text input
            flex-grow: 1;
        }

        span.material-icons-outlined {
            display: block;
            font-size: 2rem;
            color: #A3A3A3;

            cursor: pointer;

            margin-left: 1rem;
        }
    }

</style>