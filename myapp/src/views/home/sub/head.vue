<template>
    <header class="header">
        <div class="header-menu-btn" @click="showMenu">
            <p class="header-menu-btn-line"></p>
            <p class="header-menu-btn-line"></p>
            <p class="header-menu-btn-line"></p>
        </div>
    </header>
</template>
<style scoped>
    .header{
        height: 3rem;
        background: #2088e4;
        box-shadow: 0 0 4px #999;
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
    import {mapMutations} from 'vuex';
    export default {
        name: 'head',
        components: {
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
            ...mapMutations([
                'showMenu'
            ]),
        },
        created() {
        },
        destroyed() {
        },
        mounted() {
        }
    };
</script>