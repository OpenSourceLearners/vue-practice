<template>
    <div>
        <my-menu></my-menu>
        <my-head></my-head>
        <!-- <my-main></my-main> -->
    </div>
</template>
<style scoped>
    .header{
        height: 3rem;
        background: #2088e4;
    }
    .header-menu-btn{
        width: 3rem;
        height: 2rem;
        padding: 0.5rem 0;
        display: flex;
        flex-direction: column;
        justify-content:space-around;
        align-items: center;
    }
    .header-menu-btn-line{
        width: 50%;
        height: 0.2rem;
        background: #fff;
    }
</style>
<script>
    import menu from './sub/menu';
    import head from './sub/head';
    export default {
        name: 'home',
        components: {
            'my-menu': menu,
            'my-head': head
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