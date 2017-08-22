<template>
    <article class="content-box" :style="{left: -index*100+'%'}">
        <section class="page-item">
            <div class="chat-list">
                <section v-for="(item, index) in chatList" :key="index" class="chat-list-item-box">
                    <div class="chat-hide-box">
                        <div class="chat-list-item">
                            <p class="head-portrait" :style="{'background': item.color}"></p>
                            <p class="description">
                                <span class="name">{{item.name}}</span>
                                <span class="message">{{item.message}}</span>
                                <span class="date">{{item.date}}</span>
                            </p>
                            <div class="delete-box">
                                <div class="delete-btn" @click="deleteItem(index)">
                                    <span class="delete-line-1"></span>
                                    <span class="delete-line-2"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </section>
        <section class="page-item">
        </section>
        <section class="page-item">
            <div class="my-information">
                <p class="my-head-portrait"></p>
                <p class="my-username">{{username}}</p>
            </div>
        </section>
    </article>
</template>
<style scoped>
    .content-box{
        /* overflow: hidden; */
        border-top: 1px solid #efefef;
        border-bottom: 1px solid #efefef;
        width: 300%;
        height: 100%;
        display: flex;
        position: relative;
    }
    .page-item{
        overflow: hidden;
        width: 100%;
        height: 100%;
    }
    .chat-list{
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        padding-right: 16px;
    }
    .chat-list-item-box{
        width: 100%;
        height: 4rem;
        border-bottom: 1px solid #efefef;
    }
    .chat-list-item{
        width: 100%;
        display: flex;
        height: 4rem;
        padding-bottom: 16px;
        overflow-y:hidden;
        overflow-y:hidden;
        overflow-x:scroll;
    }
    .chat-hide-box{
        height: 4rem;
        overflow: hidden;
    }
    .chat-list-item-box:last-child{
        border-bottom: none;
    }
    .delete-box{
        width: 4rem;
        margin-right: -4.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .delete-btn{
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 1rem;
        background: #ddd;
        position: relative;
    }
    .head-portrait{
        width: 3rem;
        height: 3rem;
        margin: 0.5rem;
        -moz-border-radius: 2rem;
        -webkit-border-radius: 2rem;
        border-radius: 2rem;
    }
    .description{
        flex: 1;
        display: flex;
        padding: 0.5rem;
        flex-direction: column;
        position: relative;
    }
    .description .name{
        color: #333;
        font-weight: bold;
        font-size: 1rem;
        font-weight: 1rem;
    }
    .description .message{
        flex: 1;
        color: #999;
        font-size: 0.6rem;
        line-height: 1.5rem;
    }
    .description .date{
        position: absolute;
        right: 1rem;
        top: 0.8rem;
    }
    .my-information{
        display: flex;
        flex-direction: column;
    }
    .my-head-portrait{
        width: 5rem;
        height: 5rem;-moz-border-radius: 5rem;
        -webkit-border-radius: 5rem;
        border-radius: 5rem;
        background: #000;
        margin: 2rem auto; 
    }
    .my-username{
        text-align: center;
        font-size: 1.5rem;
        font-weight: bold;
    }
    .delete-line-1{
        display: block;
        width: 1.0rem;
        height: 0.2rem;
        background: #fff;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        transform:rotate(45deg);
    }
    .delete-line-2{
        display: block;
        width: 1.0rem;
        height: 0.2rem;
        background: #fff;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        transform:rotate(-45deg);
    }
</style>
<script>
    export default {
        name: 'content',
        components: {
        },
        props: {
            value: {
                type: Number,
                default: 0,
            }
        },
        data() {
            return {
                index: this.value,
                chatList: [
                    {
                        name: '张三',
                        message: '你好！',
                        color: 'rgba(0, 255, 139, 0.73)',
                        date: '21:44',
                        left: 0,
                    },
                    {
                        name: '李四',
                        message: '快下来！！！',
                        color: '#36e2cc',
                        date: '21:35',
                        left: 0,
                    },
                    {
                        name: '王五',
                        message: '在干嘛呢',
                        color: 'rgba(0, 0, 0, 0.73)',
                        date: '21:19',
                        left: 0,
                    },
                    {
                        name: '王五',
                        message: '在干嘛呢',
                        color: 'rgba(0, 0, 0, 0.73)',
                        date: '21:19',
                        left: 0,
                    },
                    {
                        name: '张三',
                        message: '你好！',
                        color: 'rgba(0, 255, 139, 0.73)',
                        date: '21:44',
                        left: 0,
                    },{
                        name: '张三',
                        message: '你好！',
                        color: 'rgba(0, 255, 139, 0.73)',
                        date: '21:44',
                        left: 0,
                    },
                    {
                        name: '李四',
                        message: '快下来！！！',
                        color: '#36e2cc',
                        date: '21:35',
                        left: 0,
                    },
                    {
                        name: '王五',
                        message: '在干嘛呢',
                        color: 'rgba(0, 0, 0, 0.73)',
                        date: '21:19',
                        left: 0,
                    },
                    {
                        name: '王五',
                        message: '在干嘛呢',
                        color: 'rgba(0, 0, 0, 0.73)',
                        date: '21:19',
                        left: 0,
                    },
                    {
                        name: '张三',
                        message: '你好！',
                        color: 'rgba(0, 255, 139, 0.73)',
                        date: '21:44',
                        left: 0,
                    },{
                        name: '张三',
                        message: '你好！',
                        color: 'rgba(0, 255, 139, 0.73)',
                        date: '21:44',
                        left: 0,
                    },
                    {
                        name: '李四',
                        message: '快下来！！！',
                        color: '#36e2cc',
                        date: '21:35',
                        left: 0,
                    },
                    {
                        name: '王五',
                        message: '在干嘛呢',
                        color: 'rgba(0, 0, 0, 0.73)',
                        date: '21:19',
                        left: 0,
                    },
                    {
                        name: '王五',
                        message: '在干嘛呢',
                        color: 'rgba(0, 0, 0, 0.73)',
                        date: '21:19',
                        left: 0,
                    },
                    {
                        name: '张三',
                        message: '你好！',
                        color: 'rgba(0, 255, 139, 0.73)',
                        date: '21:44',
                        left: 0,
                    },
                ],
                startX: 0,
            };
        },
        computed: {
            username(){
                return sessionStorage.getItem('username');
            },
        },
        watch: {
            value(newVal, oldVal){
                this.index = newVal
            },
            index(newVal, oldVal){
                this.$emit('input', newVal);
            }
        },
        methods: {
            //删除聊天记录项
            deleteItem(index){
                this.chatList.splice(index, 1);
            },
            slideStart(event, index){
                console.log(event);
                console.log(index);
            },
            slideMove(event, index){

            },
            slideEnd(event){

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