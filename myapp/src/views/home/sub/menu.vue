<template>
    <div>
        <transition name="slide-fade">
            <nav class="menu" v-show="menuShowState">
                <!-- 用户信息 -->
                <div class="user-msg">
                    {{username}}
                </div>
                <!-- 用户信息 -->
                <!-- 导航列表 -->
                <router-link v-for="(item, index) in navList" :key="index" :to="item.path">
                    <div class="menu-item">
                        <div class="title">{{item.name}}</div>
                        <div class="arrow"></div>
                    </div>
                </router-link>
                <!-- 导航列表 -->
                <div class="menu-bottom">
                    <p class="menu-btn-item">退出登录</p>
                </div>
            </nav>
        </transition>
        <transition name="hide-fade">
            <div class="bg-modal" @click="hideMenu" v-show="menuShowState"></div>
        </transition>
    </div>
</template>
<style scoped>
    .menu{
        font-size: 1rem;
        width: 70%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1001;
        display: flex;
        background: #fff;
        flex-direction: column;
        box-shadow: 0 0 4px #666;
    }
    .menu-item{
        font-size: 1rem;
        line-height: 2.5rem;
        display: flex;
        justify-content: space-between;
        padding: 0 0.5rem;
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
    .bg-modal{
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 1000;
        background: rgba(0, 0, 0, 0.4);
         opacity: 1; 
    }
    .user-msg{
        font-weight: bold;
        background: #efefef;
        height: 5rem;
        padding: 1rem 0.5rem 0;
        font-size: 1rem;
    }
    /* 滑动样式 */
    .slide-fade-enter-active {
        transition: transform .3s ease;
    }
    .slide-fade-leave-active {
        transition: transform .5s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(-100%);
    }
    .hide-fade-enter-active {
        transition: opacity .3s ease;
    }
    .hide-fade-leave-active {
        transition: opacity .5s ease;
    }
    .hide-fade-enter, .hide-fade-leave-to {
         opacity: 0; 
    }
    .menu-bottom{
        width: 100%;
        height: 3rem;
        position:absolute;
        bottom: 0;
        background: #efefef;
        display: flex;
    }
    .menu-btn-item{
        line-height: 3rem;
        flex: 1;
    }
</style>
<script>
    import {mapState, mapMutations} from 'vuex';
    export default {
        name: 'menu',
        components: {
        },
        props: {
        },
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
                ],
            };
        },
        computed: {
            ...mapState([
                'menuShowState'
            ]),
            username(){
                return sessionStorage.getItem('username');
            },
        },
        watch: {
        },
        methods: {
            ...mapMutations([
                'hideMenu'
            ]),
            logout(){
                
            }
        },
        created() {
        },
        destroyed() {
        },
        mounted() {
        }
    };
</script>