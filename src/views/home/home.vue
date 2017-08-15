<template>
    <div>
        <my-nav></my-nav>
    </div>
</template>
<style>
</style>
<script>
    import nav from './sub/nav';
    export default {
        name: 'home',
        components: {
            'my-nav': nav,
        },
        props: {},
        data() {
            return {
            };
        },
        computed: {
        },
        watch: {
        },
        methods: {
        },
        created() {
        },
        destroyed() {
        },
        mounted() {
        }
    };
</script>