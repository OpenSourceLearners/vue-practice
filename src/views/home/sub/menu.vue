<template>
    <div>
        <transition name="slide-fade">
            <nav class="menu" v-show="show">
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
            </nav>
        </transition>
        <div class="bg-modal" @click="show = !show" v-show="show"></div>
    </div>
</template>
<style scoped>
    .menu{
        width: 70%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1001;
        display: flex;
        background: #fff;
        flex-direction: column;
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
        background: rgba(0, 0, 0, 0.4)
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
        transition: transform .8s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
        transform: translateX(-100%);
    }
</style>
<script>
    export default {
        name: 'menu',
        components: {
        },
        props: {
            value: {
                type: Boolean,
                default: false,
            }
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
                show: this.value,
            };
        },
        computed: {
            username(){
                return sessionStorage.getItem('username');
            }
        },
        watch: {
            show(newVal, oldVal){
                this.$emit('input', newVal);
            },
            value(newVal, oldVal){
                this.show = this.value;
            }
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