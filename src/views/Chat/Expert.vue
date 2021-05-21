<template>
    <search v-model:searchInput="searchInput" placeholder="Find Topic or Expert" />
</template>

<script>
import Search from "../../components/Input/Search"

export default {
    name: "ExpertChat",
    data: () => ({
        searchInput: ''
    }),
    components: {
        Search
    }

}
</script>

<style lang="scss" scoped>

</style>s