<template>
    <div class="login-box">
        <div class="head-area">
            <!-- 标题 -->
            <!-- <h1 class="title">Login</h1> -->
            <!-- 标题 -->
            <div class="head-portrait"></div>
        </div>

        <!-- 表单域 -->
        <div class="form-area">
            <!-- <div class="sliding-block">
                <p class="block-item" @click="isLogin = true">登录</p>
                <p class="block-item" @click="isLogin = false">注册</p>
                <div class="block-bg" :style="{
                    'left': isLogin ? '0.2rem' : '6.8rem',
                }"></div>
            </div> -->
            <div class="form-box flex-center">
                <input type="text" v-model="user.username" placeholder="请输入用户名" class="input-normal" id="username" />
            </div>
            <div class="form-box flex-center">
                <input type="password" v-model="user.password" placeholder="请输入密码" class="input-normal" id="password" />
            </div>
            <div class="form-box flex-center">
                <button class="bottom-normal" @click="login">登录</button>
            </div>
            <div class="register">
                <button class="clear-btn" @click="toRegister">
                    <span class="register-btn">Sign in</span>
                    <span class="arrow"></span>
                </button>
            </div>
        </div>
        <!-- 表单域 -->
        <!-- 模态框 -->
        <my-modal :title="modal.title" :content="modal.content" :type="modal.type" v-model="modal.show"></my-modal>
        <!-- 模态框 -->
    </div>
</template>
<style scoped>
    .login-box{
        position: fixed;
        width: 100%;
        height: 100%;
        background: #efefef;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .head-area{
        flex: 3;
        height: 60%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .head-portrait{
        width: 5rem;
        height: 5rem;
        border: 4px solid #3c3c94;
        box-sizing: border-box;
        border-radius: 2.5rem;
    }
    /* .title{
    } */
    .form-area{
        flex: 5;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .form-box{
        width: 320px;
        padding: 0.5rem 0;
        display: flex;
    }
    .input-normal{
        width: 13rem;
        line-height: 2rem;
        padding: 0px 0.5rem;
        border: none;
        border-bottom: 2px solid #3c3c94;
        background: transparent;
        display: inline-flex;
        float:left;
    }
    .bottom-normal{
        color: #fff;
        width: 14rem;
        height: 2rem;
        line-height: 2rem;
        border: none;
        background: #3c3c94;
    }
    .flex-center{
        justify-content: center;
    }
    .btn-group{
        display: block;
        padding: 0;
        width: 14rem;
        height: 2rem;
        border: 1px solid #3c3c94;
        overflow: hidden;
        margin-top: 1rem;
    }
    .btn-box{
        width: 29rem;
    }
    .register{
        width: 14rem;
        height: 2rem;
        margin-top: 1rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .register-btn{
        font-size: 1rem;
        line-height: 1rem;
        display: inline-block;
        color: #3c3c94;
    }
    .arrow{
        padding-left: 0.5rem;
    }
    .arrow:after {
        content: " ";
        display: inline-block;
        height: 0.4rem;
        width: 0.4rem;
        border-width: 2px 2px 0 0;
        border-color: #3c3c94;
        border-style: solid;
        transform: rotate(45deg);
    }
    .clear-btn{
        background: transparent;
        border: none;
        height: 1rem;
        display: flex;
    }
    input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #efefef inset !important;
        -webkit-text-fill-color: none!important;
    }
</style>
<script>
    import {checkLogin} from '../lib/user';
    import myModal from '../components/myModal';
    export default {
        name: 'login',
        components: {
            'my-modal': myModal,
        },
        props: {},
        data() {
            return {
                //用户信息
                user: {
                    username: '',
                    password: '',
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
        },
        watch: {
        },
        methods: {
            //登录
            login(){
                if(this.user.username == '' || this.user.password == ''){
                    this.showModal({
                        title: '提示',
                        content: '用户名和密码不能为空',
                    });
                    return ;
                }
                // checkLogin(this.user.username, this.user.password, (res) => {
                //     if(res){
                //         this.$router.push({path: '/home'});
                //     }else{
                //         this.showModal({
                //             title: '提示',
                //             content: '登录失败',
                //         });
                //     }
                // });
                checkLogin(this.user)
                .then(() => {
                    this.$router.push({path: '/home'});
                }).
                catch((error) => {
                    this.showModal({
                        title: '提示',
                        content: error.msg,
                    });
                });
            },
            //注册
            register(){

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
            toRegister(){
                this.$router.push({
                    path: '/register'
                });
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