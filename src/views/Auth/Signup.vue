<template>
    <div class="wrapper">
        <PlantalkAuthHeader title="Create Account" />
        <div class="auth-form">
            <div class="auth-form-wrapper">
                <PlantalkTextInput label="Name" v-model:textInput="name" />
                <PlantalkTextInput label="Email" v-model:textInput="email" />
                <PlantalkPasswordInput label="Password" v-model:passwordInput="password" />
                <PlantalkButton text="Create Account" variant="primary" />
                <p class="muted">Already have an account? <a @click="$router.push('/login')" class="a-ca">Log in</a></p>
            </div>
        </div>
    </div>
</template>

<script>
    import PlantalkAuthHeader from "../../components/Plantalk/AuthHeader";
    import PlantalkTextInput from "../../components/Plantalk/TextInput";
    import PlantalkPasswordInput from "../../components/Plantalk/PasswordInput";
    import PlantalkButton from "../../components/Plantalk/Button";

    export default {
        name: "Signup",
        components: {
            PlantalkAuthHeader,
            PlantalkTextInput,
            PlantalkPasswordInput,
            PlantalkButton
        },
        data: () => ({
            name: '',
            email: '',
            password: ''
        })
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/theme.scss";

    * {
        font-family: $body-font-stack;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
    }

    .auth-form {
        &-wrapper {
            width: min(80%, 360px);
            margin: 0 auto;

            & > * {
                margin-top: 1rem;
            }
        }
    }

    a {
        text-decoration: none;
        font-weight: 500;

        &.a-fp {
            color: $input-focus;
        }

        &.a-ca {
            color: $primary;
            display: inline-block;
        }
    }

    p.muted {
        color: $onsurface-low;
        text-align: center;
    }
</style>