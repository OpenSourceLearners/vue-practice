<template>
    <header class="header">
        <div class="header-menu-btn" @click="showMenu">
            <p class="header-menu-btn-line"></p>
            <p class="header-menu-btn-line"></p>
            <p class="header-menu-btn-line"></p>
        </div>
        <div class="arrow"></div>
    </header>
</template>
<style scoped>
    .header{
        width: 100%;
        height: 2.6rem;
        background: #fff;
        display: flex;
        justify-content: space-between;
    }
    .header-menu-btn{
        width: 3rem;
        height: 1.6rem;
        padding: 0.5rem 0;
        display: flex;
        flex-direction: column;
        justify-content:space-around;
        align-items: center;
    }
    .header-menu-btn-line{
        width: 50%;
        height: 0.2rem;
        background: #3c3c94;
    }
    .arrow{
        padding-top: 1rem;
        padding-right: 1rem;
    }
    .arrow:after {
        content: " ";
        display: inline-block;
        height: 0.6rem;
        width: 0.6rem;
        border-width: 2px 2px 0 0;
        border-color: #3c3c94;
        border-style: solid;
        transform: rotate(45deg);
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