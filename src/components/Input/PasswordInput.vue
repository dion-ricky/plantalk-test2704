<template>
<div>
    <span :class="'label' + (isOnFocus ? ' focus' : '')">{{ label }}</span>
    <div class="pass-wrapper">
        <input :type="inputType"
            :value="passwordInput"
            @input="$emit('update:passwordInput', $event.target.value)"
            @focus="toggleFocus" @blur="toggleFocus">
        <span @click="toggleVisibility"
            :class="'material-icons-outlined pass-visibility' +
                (isOnFocus ? ' focus' : '')">{{ iconType }}</span>
    </div>
</div>
</template>

<script>
export default {
    name: "PasswordInput",
    data: () => ({
        isOnFocus: false,
        isVisible: false,
        inputType: 'password',
        iconType: 'visibility'
    }),
    props: {
        label: String,
        passwordInput: String
    },
    methods: {
        toggleFocus() {
            this.isOnFocus = !this.isOnFocus;
        },
        toggleVisibility(e) {
            e.preventDefault();
            this.isVisible = !this.isVisible;
            this.inputType = this.isVisible ? 'text' : 'password';
            this.iconType = this.isVisible ? 'visibility_off' : 'visibility';
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/theme.scss";

    .label {
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

    input {
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

    .pass-wrapper {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .pass-visibility {
            transform: translateX(-70%);
            transition: color .2s ease;
            color: $onsurface-medium;
            position: absolute;
            cursor: default;
        
            &.focus {
                color: $input-focus;
            }
        }
    }
    
</style>