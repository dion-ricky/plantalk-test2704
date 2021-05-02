<template>
<div>
    <span :class="'label ' + (isOnFocus ? 'focus' : '')">{{ label }}</span>
    <input type="text"
        :value="textInput"
        @input="$emit('update:textInput', $event.target.value)"
        @focus="toggleFocus" @blur="toggleFocus">
</div>
</template>

<script>
export default {
    name: "PlantalkTextInput",
    data: () => ({
        isOnFocus: false
    }),
    props: {
        label: String,
        textInput: String
    },
    methods: {
        toggleFocus() {
            this.isOnFocus = !this.isOnFocus;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/theme.scss";

    span.label {
        font-family: $body-font-stack;
        font-weight: 500;
        display: block;
        transition: color .2s ease;
        margin-bottom: .5rem;
        color: $onsurface-medium;

        &.focus {
            color: $input-focus;
        }
    }

    input[type='text'] {
        background-image:none;
        background-color:transparent;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        outline-width: 0;

        padding: 12px 16px;
        font-family: $body-font-stack;
        font-weight: 500;
        font-size: 14px;
        width: 100%;

        border-color: rgba(0,0,0,.12);
        border-width: 2px;
        border-radius: 12px;
        border-style: solid;

        transition: border-color .2s ease;

        &:focus {
            border-color: $input-focus-border;
        }
    }
</style>