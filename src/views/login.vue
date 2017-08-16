<template>
    <div>
        <!-- 标题 -->
        <h1 class="title">用户登录</h1>
        <!-- 标题 -->

        <!-- 表单域 -->
        <div class="form-area">
            <div class="form-box">
                <label class="form-key" for="username">用户名：</label>
                <input type="text" v-model="user.username" placeholder="请输入用户名" class="input-normal" id="username" autofocus="autofocus" />
            </div>
            <div class="form-box">
                <label class="form-key" for="password">密码：</label>
                <input type="password" v-model="user.password" placeholder="请输入密码" class="input-normal" id="password" />
            </div>
            <div class="form-box flex-center">
                <button class="bottom-normal" @click="login">登录</button>
            </div>
        </div>
        <!-- 表单域 -->

        <!-- 模态框 -->
        <my-modal :title="modal.title" :content="modal.content" :type="modal.type" v-model="modal.show"></my-modal>
        <!-- 模态框 -->
    </div>
</template>
<style scoped>
    .title{
        text-align: center;
        line-height: 4rem;
    }
    .form-area{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .form-box{
        width: 320px;
        padding: 0.5rem 0;
        display: flex;
    }
    .form-key{
        font-size: 0.6rem;
        width: 4rem;
        line-height: 2rem;
        text-align: right;
    }
    .input-normal{
        width: 14rem;
        line-height: 2rem;
        padding: 0px 0.5rem;
        border-radius: 2px;
        border: 1px solid #ccc;
    }
    .input-normal:focus{
        box-shadow: 0 0 2px #2088e4;
        border: 1px solid #2088e4;
        outline: none;
    }
    .bottom-normal{
        color: #fff;
        width: 14rem;
        height: 2rem;
        line-height: 2rem;
        border-radius: 2px;
        border: none;
        background: #2088e4;
    }
    .flex-center{
        justify-content: center;
    }
</style>
<script>
    import {checkLogin} from '../lib/loginValidate';
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
                checkLogin(this.user.username, this.user.password, (res, token) => {
                    if(res){
                        sessionStorage.setItem('username', this.user.username)
                        sessionStorage.setItem('accessToken', token);
                        this.$router.push({path: '/home'});
                    }
                    this.showModal({
                        title: '提示',
                        content: res ? '登录成功' : '登录失败',
                    });
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