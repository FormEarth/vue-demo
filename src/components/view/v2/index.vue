<template>
    <card-list></card-list>
    <!-- <card-list-mg></card-list-mg> -->
    
</template>

<script>
    import CardList from './card_list'
    import CardListMg from './card_list_mg'

    export default {
        name: "index_v2",
        data() {
            return {
            }
        },
        components: {
            CardList,
            CardListMg,
        },
        mounted() {
        },
        methods: {
        },
    }
</script>

<style scoped>
</style>