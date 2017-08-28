<template>
    <div class="home-box">
        <my-menu class="menu-box"></my-menu>
        <article class="main">
            <my-head class="head"></my-head>
            <router-view class="content" v-model="page"></router-view>
            <my-footer class="footer" v-model="page"></my-footer>
        </article>
    </div>
</template>
<style scoped>
    .home-box{
        height: 100%;
    }
    .main{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
    }
    .content{
        flex: 1;
        overflow: hidden;
    }
</style>
<script>
    import menu from './sub/menu';
    import head from './sub/head';
    import footer from './sub/footer';
    export default {
        name: 'home',
        components: {
            'my-menu': menu,
            'my-head': head,
            'my-footer': footer
        },
        props: {
            
        },
        data() {
            return {
                page: 0,
                ws:undefined,
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