<template>
<div>
    <span :class="'label ' + (isOnFocus ? 'focus' : '')"
    v-if="label !== '!nolabel'"
    >{{ label }}</span>
    <input type="email"
        :value="emailInput"
        :placeholder="placeholder"
        @input="$emit('update:emailInput', $event.target.value)"
        @focus="toggleFocus" @blur="toggleFocus">
</div>
</template>

<script>
export default {
    name: "EmailInput",
    data: () => ({
        isOnFocus: false
    }),
    props: {
        label: String,
        emailInput: String,
        placeholder: String
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

    input[type='email'] {
        background-image:none;
        background-color:white;
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