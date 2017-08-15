<template>
    <nav class="nav">
        <router-link v-for="(item, index) in navList" :key="index" :to="item.path">
            <div class="nav-item">
                <div class="title">{{item.name}}</div>
                <div class="arrow"></div>
            </div>
        </router-link>
    </nav>
</template>
<style scoped>
    .nav{
        display: flex;
        flex-direction: column;
    }
    .nav-item{
        font-size: 1rem;
        line-height: 2.5rem;
        padding: 0 0.5rem;
        display: flex;
        justify-content: space-between;
    }
    .arrow{
        padding-right: 0.5rem;
    }
    .arrow:after {
        content: " ";
        display: inline-block;
        height: 6px;
        width: 6px;
        border-width: 2px 2px 0 0;
        border-color: #999;
        border-style: solid;
        transform: rotate(45deg);
    }
</style>
<script>
    export default {
        name: 'nav',
        components: {
        },
        props: {},
        data() {
            return {
                navList: [
                    {
                        name: '首页',
                        path: '/home',
                    },
                    {
                        name: '主页',
                        path: '',
                    },
                    {
                        name: '主页',
                        path: '',
                    },
                    {
                        name: '我的信息',
                        path: '',
                    },
                ]
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