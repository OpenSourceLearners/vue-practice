<template>
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
</template>
<style scoped>
    .chat-list{
        height: 100%;
        padding: 0.5rem 0.5rem;
        overflow: scroll;
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
</style>
<script>
    export default {
        name: 'chat',
        components: {
        },
        props: {},
        data() {
            return {
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
                    },
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