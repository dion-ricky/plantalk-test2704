<template>
    <h3>Playground</h3>
    <PlantalkTextInput label="Email" v-model:textInput="email"  />
    <p>{{ email }}</p>
</template>

<script>
import PlantalkTextInput from "../components/Plantalk/TextInput"

export default {
    name: "Playground",
    components: {
        PlantalkTextInput
    },
    data: () => ({
        email: ''
    })
}
</script>

<style>

</style>