<template>
    <div>
        <my-menu v-model="showMenu"></my-menu>
        <header class="header">
            <div class="header-menu-btn" @click="showMenu = !showMenu">
                <p class="header-menu-btn-line"></p>
                <p class="header-menu-btn-line"></p>
                <p class="header-menu-btn-line"></p>
            </div>
        </header>
        <!-- <my-main></my-main> -->
    </div>
</template>
<style scoped>
    .header{
        height: 4rem;
        background: #2088e4;
    }
    .header-menu-btn{
        width: 4rem;
        height: 2rem;
        padding: 1rem 0;
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
    export default {
        name: 'home',
        components: {
            'my-menu': menu,
        },
        props: {},
        data() {
            return {
                showMenu: false,
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