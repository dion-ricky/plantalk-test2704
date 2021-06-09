<template>
    <div class="points-wrapper">
        <div>
            <points-icon />
            <p>
                Points
            </p>
            <p class="points">
                450xp
            </p>
        </div>
        <span class="material-icons-outlined">chevron_right</span>
    </div>
</template>

<script>
import PointsIcon from "../../assets/plantalk/point/points_icon"

export default {
    name: "Point",
    components: {
        PointsIcon
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/theme.scss";

    .points-wrapper {
        display: flex;
        align-items: center;

        padding: 1rem .5rem;
        margin: 1.5rem 0;

        border-radius: .5rem;

        background-color: white;
        box-shadow: 0px 16px 50px 0px rgba(0, 0, 0, 0.05);
        -webkit-box-shadow: 0px 16px 50px 0px rgba(0, 0, 0, 0.05);
        -moz-box-shadow: 0px 16px 50px 0px rgba(0, 0, 0, 0.05);

        font-family: $body-font-stack;

        & > div:first-child {
            flex-grow: 1;

            display: flex;
            align-items: center;

            & > p:last-child {
                font-weight: 600;
                color: $primary;
            }

            & > * {
                margin: 0 .5rem;
            }
        }
    }

    span.material-icons-outlined {
        color: rgba(0,0,0,.54);
    }

</style>