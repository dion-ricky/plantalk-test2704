<template>
    <div class="wrapper">
        <PlantalkAuthHeader title="Create Account" />
        <div class="auth-form">
            <div class="auth-form-wrapper">
                <TextInput label="Name" v-model:textInput="name" />
                <TextInput label="Email" v-model:textInput="email" />
                <PasswordInput label="Password" v-model:passwordInput="password" />
                <Button text="Create Account" variant="primary" />
                <p class="muted">Already have an account?<br><a @click="$router.push('/login')" class="a-ca">Log in</a></p>
            </div>
        </div>
    </div>
</template>

<script>
    import PlantalkAuthHeader from "../../components/Plantalk/AuthHeader";
    import TextInput from "../../components/Plantalk/TextInput";
    import PasswordInput from "../../components/Plantalk/PasswordInput";
    import Button from "../../components/Plantalk/Button";

    export default {
        name: "Signup",
        components: {
            PlantalkAuthHeader,
            TextInput,
            PasswordInput,
            Button
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