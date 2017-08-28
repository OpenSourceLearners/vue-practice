<template>
    <div class="chat-list">
        <section v-for="(item, index) in chatList" :key="index" class="chat-list-item-box">
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
        </section>
        <!-- <div>
            请选择和谁聊天
            <select v-model="send.Uid">
                <option v-for="(item, index) in onLineUserList" :key="index" :value="index">{{item}}</option>
            </select>
        </div>
        <ul class="chat-record">
            <li v-for="(item, index) in chatRecord" :key="index">
                <span class="send-user">{{item.user}}:</span>
                <p class="chat-message">{{item.message}}</p>
            </li>
        </ul>
        <div>
            <textarea v-model="send.message"></textarea>
            <input type="button" value="发送" @click="sendMsg" />
        </div> -->
    </div>
</template>
<style scoped>
    /* .chat-record {
        border: 1px solid #000;
        padding: 0;
        height: 80%;
    }
    .chat-record li{
        list-style: none;
        padding: 0.5rem;
        min-height: 2rem;
        display: flex;
    }
    .send-user{
        font-size: 1rem;
        font-weight: bold;
        height: 2rem;
        line-height: 2rem;
        display: inline-block;
        padding: 0 1rem;
    }
    .chat-message{
        font-size: 0.6rem;
        line-height: 1.2rem;
        display: inline-block;
        padding: 0.5rem;
    } */

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
        overflow: hidden;
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
    .chat-list-item:last-child{
        border-bottom: none;
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
        line-height: 2rem;
    }
    .description .message{
        flex: 1;
        color: #999;
        font-size: 0.6rem;
        line-height: 0.6em;
    }
    .description .date{
        position: absolute;
        right: 1rem;
        top: 0.8rem;
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