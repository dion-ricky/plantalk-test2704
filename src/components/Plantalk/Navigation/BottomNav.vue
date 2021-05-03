<template>
    <div class="fixed">
        <div class="navigation">
            <slot></slot>
        </div>
    </div>
</template>

<script>

// Component ini sebagai wrapper utk NavigationItem
export default {
    name: "BottomNav",

}
</script>

<style lang="scss" scoped>
@import "../../../assets/theme.scss";

.fixed {
    position: fixed;
    bottom: 0;
    width: 100vw;
    z-index: 10;
}

.navigation {
    display: flex;
    justify-content: space-around;
    align-items: center;

    background-color: white;
    box-shadow: 0px 0px 50px 5px rgba(0, 0, 0, 0.08);
    -webkit-box-shadow: 0px 0px 50px 5px rgba(0, 0, 0, 0.08);
    -moz-box-shadow: 0px 0px 50px 5px rgba(0, 0, 0, 0.08);
}

</style>