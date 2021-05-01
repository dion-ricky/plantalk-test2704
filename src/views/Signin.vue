<template>
    <div class="wrapper">
        <div class="header">
            <div class="header-wrapper">
                <div class="logo-title">
                    <img src="../assets/plantalk/plantalk-logo.png" alt="" srcset="">
                    <h2>Welcome<br>Back</h2>
                </div>
                <div class="ornament">
                    <img src="../assets/plantalk/plantalk-bg-ornament.png" alt="" srcset="">
                </div>
            </div>
        </div>
        <div class="signin">
            <div class="center">
                <PlantalkTextInput label="Email" v-model:textInput="email" />
                <PlantalkTextInput label="Password" v-model:textInput="password" />
            </div>
        </div>
    </div>
</template>

<script>
    import PlantalkTextInput from "../components/Plantalk/TextInput";

    export default {
        name: "Signin",
        components: {
            PlantalkTextInput
        },
        data: () => ({
            email: '',
            password: ''
        })
    }
</script>

<style lang="scss" scoped>
    @import "../assets/theme.scss";

    .wrapper {
        display: flex;
        flex-direction: column;

        .header {
            background-color: $main-bg-color;
            padding: 3rem 0 1.5rem 0;

            &-wrapper {
                display: flex;
                justify-content: space-between;
                margin-left: 2rem;
            }
        }
    }

    .signin {
        .center {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }

    .ornament {
        display: flex;
        align-items: center;

        img {
            width: min(35vw, 113px);
        }
    }

    .logo-title {
        img {
            width: 60px;
        }

        h2 {
            font-family: $title-font-stack;
            font-weight: bold;
            color: $primary;
            font-size: 2rem;
            margin: 16px 0 0 0;
        }
    }


</style>