<template>
  <div :class="'button ' + variant">
    <span class="button-text">
        {{ text }}
    </span>
  </div>
</template>

<script>
export default {
    name: "PlantalkButton",
    props: {
        text: String,
        variant: String
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/theme.scss';

    div {
        .button {
            display: flex;
            padding: 10px 16px 10px 16px;
            justify-content: center;
            align-items: center;
            border-radius: 12px;
            transition: filter .25s ease;

            cursor: pointer;
            
            &:hover {
                filter: brightness(125%);
            }

            &:active {
                filter: brightness(95%);
            }

            .button-text {
                font-family: $body-font-stack;
                font-weight: bold;
            }
        }

        .primary {
            background-color: $primary;
            color: #ffffff;
        }

        .text-info {
            color: $primary;
        }
    }
</style>