<template>
    <h3>Playground</h3>
    <PlantalkTextInput label="Email" v-model:textInput="email"  />
    <p>{{ email }}</p>
    <PlantalkPasswordInput label="Password" v-model:passwordInput="password" />
    <p>{{ password }}</p>
</template>

<script>
import PlantalkTextInput from "../components/Plantalk/TextInput"
import PlantalkPasswordInput from "../components/Plantalk/PasswordInput";

export default {
    name: "Playground",
    components: {
        PlantalkTextInput,
        PlantalkPasswordInput
    },
    data: () => ({
        email: '',
        password: ''
    })
}
</script>

<style>

</style>