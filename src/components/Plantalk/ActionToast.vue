<template>
    <div class="fixed">
        <div class="toast-wrapper">
            <div class="message-wrapper">
                <p>
                    {{ message }}
                </p>
            </div>
            <div class="action-wrapper">
                <PlantalkButton @click="emit" :text="action" variant="text-info" />
            </div>
        </div>
    </div>
</template>

<script>
import PlantalkButton from "./Button"

export default {
    name: "ActionToast",
    components: {
        PlantalkButton
    },
    methods: {
        emit(e) {
            this.$emit('toast:action-clicked', e);
        }
    },
    props: {
        message: String,
        action: String
    }
}
</script>

<style lang="scss" scoped>
    @import "../../assets/theme.scss";
    
    .fixed {
        z-index: 100;
        position: fixed;
        bottom: 0;
        width: 100%;
    }

    .toast-wrapper {
        width: min(300px, 85%);
        margin: 0 auto 1rem auto;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        background-color: white;

        box-shadow: 0px -1px 10px 2px rgba(0,0,0,0.15);
        -webkit-box-shadow: 0px -1px 10px 2px rgba(0,0,0,0.15);
        -moz-box-shadow: 0px -1px 10px 2px rgba(0,0,0,0.15);
    }

    .message-wrapper {
        color: $onsurface-medium;
    }
</style>