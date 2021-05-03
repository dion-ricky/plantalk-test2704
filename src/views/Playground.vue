<template>
    <h3>Playground</h3>
    <PlantalkTextInput label="Email" v-model:textInput="email"  />
    <p>{{ email }}</p>
    <PlantalkPasswordInput label="Password" v-model:passwordInput="password" />
    <p>{{ password }}</p>

    <ActionToast message="New version is available" action="Update" @toast:action-clicked="log" />
</template>

<script>
import PlantalkTextInput from "../components/Plantalk/TextInput"
import PlantalkPasswordInput from "../components/Plantalk/PasswordInput";
import ActionToast from "../components/Plantalk/ActionToast";

export default {
    name: "Playground",
    components: {
        PlantalkTextInput,
        PlantalkPasswordInput,
        ActionToast
    },
    methods: {
        log(v) {``
            console.log(v);
        }
    },
    data: () => ({
        email: '',
        password: ''
    })
}
</script>

<style>

</style>