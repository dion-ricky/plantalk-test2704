<template>
    <div class="wrapper">
        <PlantalkAuthHeader title="Create Account" />
        <div class="auth-form">
            <div class="auth-form-wrapper">
                <TextInput label="Name" v-model:textInput="name" />
                <TextInput label="Email" v-model:textInput="email" />
                <PasswordInput label="Password" v-model:passwordInput="password" />
                <Button text="Create Account" variant="primary" @click="createAccount" />
                <p class="muted">Already have an account?<br><a @click="$router.push('/login')" class="a-ca">Log in</a></p>
            </div>
        </div>
    </div>
</template>

<script>
    import PlantalkAuthHeader from "../../components/AuthHeader";
    import TextInput from "../../components/Input/TextInput";
    import PasswordInput from "../../components/Input/PasswordInput";
    import Button from "../../components/Button";

    import PlantalkFirebase from "../../firebase";

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
        }),
        methods: {
            createAccount(e) {
                PlantalkFirebase.getAuth()
                    .createUser(this.email, this.password)
                    .then((userCredential) => {
                        this.userCreatedFlow(userCredential)
                    })
                    .catch((err) => {
                        console.log(err.code, err.message)
                    })
            },

            userCreatedFlow(uc) {
                // create user in rtdb
                this.insertUser(uc)

                // redirect to home
                this.$router.push({name: 'home'})
            },

            insertUser(uc) {
                if (!uc) {
                    return;
                }

                let db = PlantalkFirebase.getDb()
                
                let data = {
                    name: this.name,
                    room: {
                        community: [],
                        consultation: []
                    }
                }

                db.ref('users/' + uc.user.uid).set(data)
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