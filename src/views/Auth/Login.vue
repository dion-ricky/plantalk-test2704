<template>
    <div class="wrapper">
        <PlantalkAuthHeader title="Welcome Back" />
        <div class="auth-form">
            <div class="auth-form-wrapper">
                <EmailInput label="Email" v-model:emailInput="email" />
                <PasswordInput label="Password" v-model:passwordInput="password" />
                <div>
                    <a href="" class="a-fp">Forgot Password?</a>
                </div>
                <Button text="Log in" variant="primary" @click="login" />
                <p class="muted">Doesn't have an account? <a @click="$router.push('/signup')" class="a-ca">Create account</a></p>
            </div>
        </div>
    </div>
</template>

<script>
    import PlantalkAuthHeader from "../../components/AuthHeader";
    import EmailInput from "../../components/Input/EmailInput";
    import PasswordInput from "../../components/Input/PasswordInput";
    import Button from "../../components/Button";
    
    import PlantalkFirebase from "../../firebase"

    export default {
        name: "Login",
        components: {
            PlantalkAuthHeader,
            EmailInput,
            PasswordInput,
            Button
        },
        data: () => ({
            email: '',
            password: ''
        }),
        methods: {
            login(e) {
                PlantalkFirebase.getAuth()
                    .signIn(this.email, this.password)
                    .then((userCredential) => {
                        this.$router.push({name: 'home'})
                    })
                    .catch((err) => {
                        console.log(err.code, err.message)
                    })
            }
        }
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