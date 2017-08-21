<template>
    <article class="hide-box">
        <div class="content-box" :style="{left: -index*100+'%'}">
            <section class="page-item">
                <div class="chat-list">
                    <div v-for="(item, index) in chatList" :key="index" class="chat-list-item">
                        <p class="head-portrait" :style="{'background': item.color}"></p>
                        <p class="description">
                            <span class="name">{{item.name}}</span>
                            <span class="message">{{item.message}}</span>
                            <span class="date">{{item.date}}</span>
                        </p>
                    </div>
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
        </div>
    </article>
</template>
<style scoped>
    .hide-box{
        overflow: hidden;
        border-top: 1px solid #efefef;
        border-bottom: 1px solid #efefef;
    }
    .content-box{
        width: 300%;
        display: flex;
        position: relative;
    }
    .page-item{
        width: 100%;
        height: 100%;
    }
    .chat-list{
        padding: 0.5rem 0.5rem;
    }
    .chat-list-item{
        border-bottom: 1px solid #efefef;
        display: flex;
        height: 3rem;
        padding: 0.5rem;
    }
    .chat-list-item:last-child{
        border-bottom: none;
    }
    .head-portrait{
        width: 3rem;
        height: 3rem;
        -moz-border-radius: 2rem;
        -webkit-border-radius: 2rem;
        border-radius: 2rem;
    }
    .description{
        flex: 1;
        display: flex;
        padding-left: 1rem;
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
        right: 0;
        top: 0.3rem;
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
                        
                    },
                    {
                        name: '李四',
                        message: '快下来！！！',
                        color: '#36e2cc',
                        date: '21:35',
                    },
                    {
                        name: '王五',
                        message: '在干嘛呢',
                        color: 'rgba(0, 0, 0, 0.73)',
                        date: '21:19',
                    },
                    {
                        name: '王五',
                        message: '在干嘛呢',
                        color: 'rgba(0, 0, 0, 0.73)',
                        date: '21:19',
                    }
                ]
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
        },
        created() {
        },
        destroyed() {
        },
        mounted() {
        }
    };
</script>