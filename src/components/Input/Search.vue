<template>
    <div class="search-wrapper">
        <div class="search-icon">
            <span class="material-icons-outlined">search</span>
        </div>
        <input class="search-input" type="text"
            :value="searchInput"
            @input="$emit('update:searchInput', $event.target.value)"
            :placeholder="placeholder"
            >
    </div>
</template>

<script>
export default {
    name: "Search",
    props: {
        searchInput: String,
        placeholder: String
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/theme.scss";

    .search-wrapper {
        background-color: #F8F8F8;
        color: #A3A3A3;
        border-radius: 10px;

        display: flex;

        .search-icon {
            padding: .5rem;
        }
    }

    .material-icons-outlined {
        display: block;
    }

    .search-input {
        flex-grow: 1;
    }

    input[type='text'] {
        background-image:none;
        background-color:transparent;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        outline-width: 0;

        padding: 6px 8px;
        font-family: $body-font-stack;
        font-weight: 500;
        font-size: 14px;
        color: #A3A3A3;
        width: 100%;

        // border-color: rgba(0,0,0,.12);
        // border-width: 2px;
        border-width: 0;
        border-radius: 12px;
        // border-style: solid;

        transition: border-color .2s ease;

        &:focus {
            border-color: $input-focus-border;
            color: #212121;
        }
    }
</style>