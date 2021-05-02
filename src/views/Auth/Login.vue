<template>
    <div class="wrapper">
        <PlantalkAuthHeader title="Welcome Back" />
        <div class="auth-form">
            <div class="auth-form-wrapper">
                <PlantalkTextInput label="Email" v-model:textInput="email" />
                <PlantalkPasswordInput label="Password" v-model:passwordInput="password" />
                <div>
                    <a href="" class="a-fp">Forgot Password?</a>
                </div>
                <PlantalkButton text="Log in" variant="primary" />
                <p class="muted">Doesn't have an account? <a @click="$router.push('/signup')" class="a-ca">Create account</a></p>
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
        name: "Login",
        components: {
            PlantalkAuthHeader,
            PlantalkTextInput,
            PlantalkPasswordInput,
            PlantalkButton
        },
        data: () => ({
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