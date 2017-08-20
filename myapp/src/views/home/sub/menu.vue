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
                    <p class="menu-btn-item" @click="logout">退出登录</p>
                </div>
            </nav>
        </transition>
        <transition name="hide-fade">
            <div class="bg-modal" @click="hideMenu" v-show="menuShowState"></div>
        </transition>
        <!-- 模态框 -->
        <my-modal :title="modal.title" :content="modal.content" :type="modal.type" v-model="modal.show"></my-modal>
        <!-- 模态框 -->
    </div>
</template>
<style scoped>
    .menu{
        color: #fff;
        font-size: 1rem;
        width: 70%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1001;
        display: flex;
        background: #3c3c94;
        flex-direction: column;
        box-shadow: 0 0 4px #666;
    }
    .menu-item{
        color: #fff;
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
        border-color: #fff;
        border-style: solid;
        transform: rotate(45deg);
    }
    .bg-modal{
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 1000;
        opacity: 1; 
    }
    .user-msg{
        font-weight: bold;
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
        box-sizing:border-box;
        display: flex;
        justify-content: flex-end;
    }
    .menu-btn-item{
        width: 50%;
        text-align: center;
        line-height: 3rem;
    }
</style>
<script>
    import {mapState, mapMutations} from 'vuex';
    import {logout} from '../../../lib/user';
    import '../../../assets/css/home/menu.css';
    import myModal from '../../../components/myModal';
    export default {
        name: 'menu',
        components: {
            'my-modal': myModal,
        },
        props: {
        },
        data() {
            return {
                //菜单列表
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
                //移动属性
                move: {
                    startX: 0,
                    lastX: 0,
                    left: 0,
                },
                // 模态框信息
                modal: {
                    title: '',
                    content: '',
                    type: 1,
                    show: false,
                },
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
                'hideMenu',
                'showMenu'
            ]),
            logout(){
                logout();
                this.hideMenu();
                this.$router.push({
                    path: '/login',
                });
            },
            //显示模态框
            showModal(config){
                for(let i in config){
                    if(this.modal[i] != undefined){
                        this.modal[i] = config[i];
                    }
                }
                this.modal.show = true;
            },
        },
        created() {
        },
        destroyed() {
        },
        mounted() {
        }
    };
</script>