<template>
    <div class="tabnav-wrapper">
        <div class="tabnav-item" v-for="tab in tabs" :key="tab" @click="navItemClicked(tab)">
            <div :class="'tabnav-item-wrapper' + (active === tab ? ' active' : '')">
                {{ tab }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TabNav",
    props: {
        tabs: Array,
        propsActive: String
    },
    data: () => ({
        active: ''
    }),
    methods: {
        navItemClicked(e) {
            this.active = e;
            this.$emit('tabnav:clicked', e);
        }
    },
    created() {
        this.active = this.propsActive ? this.propsActive : this.tabs[0];
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/theme.scss';

    .tabnav-wrapper {
        display: flex;
        justify-content: space-around;

        background-color: #ececec;
        border-radius: 12px;
        color: rgba(0,0,0,.6);
        padding: 8px;
        width: 100%;

        font-family: $body-font-stack;
        font-size: .875rem;

        .tabnav-item {
            flex-grow: 1;
            text-align: center;

            min-height: 36px;

            .tabnav-item-wrapper {
                display: flex;
                height: 100%;
                justify-content: center;
                align-items: center;

                border-radius: 12px;

                cursor: pointer;

                &.active {
                    background-color: #9CB98C;
                    color: white;
                }
            }
        }
    }
</style>