<template>
    <div>
        <h1 class="title">用户登录</h1>
        <div class="form-box">
            <label class="form-key">用户名：</label>
            <input type="text" v-model="user.username" placeholder="请输入用户名" class="input-normal" />
        </div>
        <div class="form-box">
            <label class="form-key">密码：</label>
            <input type="password" v-model="user.password" placeholder="请输入密码" class="input-normal" />
        </div>
        <div class="form-box flex-center">
            <button class="bottom-normal" @click="login">登录</button>
        </div>
    </div>
</template>
<style scoped>
    .title{
        text-align: center;
        line-height: 3rem;
    }
    .form-box{
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
    export default {
        name: 'login',
        components: {
        },
        props: {},
        data() {
            return {
                user: {
                    username: '',
                    password: '',
                }
            };
        },
        computed: {
        },
        watch: {
        },
        methods: {
            login(){
                if(this.user.username == '' || this.user.password == ''){
                    alert('用户名或密码不能为空！');
                    return ;
                }
                
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