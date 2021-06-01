<template>
    <div class="avatar" :style="{backgroundColor: bgColor, color: textColor}">
        {{ text }}
    </div>
</template>

<script>
export default {
    name: "Avatar",
    props: {
        bgColor: String,
        text: String,
        textColor: String
    }
}
</script>

<style lang="scss" scoped>
    .avatar {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 3rem;
        height: 3rem;
        
        border-radius: 0.75rem;

        font-size: 1.5rem;
        font-weight: bold;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    }
</style>