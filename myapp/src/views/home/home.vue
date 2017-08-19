<template>
    <div class="home-box">
        <my-menu class="menu-box"></my-menu>
        <article class="main">
            <my-head></my-head>
        </article>
        <!-- <my-main></my-main> -->
    </div>
</template>
<style scoped>
</style>
<script>
    import menu from './sub/menu';
    import head from './sub/head';
    export default {
        name: 'home',
        components: {
            'my-menu': menu,
            'my-head': head,
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
            // setTimeos
        },
        destroyed() {
        },
        mounted() {
        }
    };
</script>