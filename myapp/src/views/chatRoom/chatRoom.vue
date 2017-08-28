<template>
    <main class="room-box">
        <header class="room-head">
            <p class="arrow-box"><span class="arrow"></span></p>
            <p class="friend-name">{{friendName}}</p>
            <p class="others"></p>
        </header>
        <article class="room-content">
            <dl v-for="(item, index) in chatRecordList" :key="index" class="chat-record">
                <template v-if="item.sender == Uid">
                    <dt class="chat-message-box">
                        <p class="chat-message">{{item.message}}</p>
                    </dt>
                    <dd class="head-portrait" :style="{'background': senderColor}"></dd>
                </template>
                <template v-else>
                    <dt class="head-portrait" :style="{'background': recipientColor}"></dt>
                    <dt class="chat-message-box-2">
                        <p class="chat-message chat-message-2">{{item.message}}</p>
                    </dt>
                </template>
            </dl>
        </article>
        <footer class="room-footer">
            <input type="text" value="" class="msg-input" />
            <button class="send-btn">发送</button>
        </footer>
    </main>
</template>
<style scoped>
    .room-box{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .room-head{
        height: 2.6rem;
        display: flex;
        flex-direction: row;
    }
    .room-content{
        flex: 1;
        border-top: 1px solid #efefef;
        border-bottom: 1px solid #efefef;
        background: #fafafa;
    }
    .room-footer{
        height: 2.6rem;
        display: flex;
        flex-direction: row;
    }
    .arrow-box{
        flex: 1;
        display: flex;
        align-items: center;
    }
    .arrow{
        margin-top: 0.4rem;
        margin-left: 1rem;
    }
    .arrow:after {
        content: " ";
        display: inline-block;
        height: 0.6rem;
        width: 0.6rem;
        border-width: 2px 0 0 2px;
        border-color: #3c3c94;
        border-style: solid;
        transform: rotate(-45deg);
    }
    .friend-name{
        flex: 1;
        line-height: 2.6rem;
        text-align: center;
        font-weight: bold;
        font-size: 1rem;
    }
    .others{
        flex: 1;
    }

    .chat-record{
        display: flex;
        min-height: 3rem;
    }
    .head-portrait{
        width: 2.6rem;
        height: 2.6rem;
        border-radius: 1.3rem;
        margin: 0.5rem 0.5rem 0;
    }
    .chat-message-box{
        flex: 1;
        margin: 0.5rem 0 0;
        padding-left: 3.1rem;
        text-align: right;
    }
    .chat-message-box-2{
        flex: 1;
        margin: 0.5rem 0.5rem 0;
        padding-right: 3.1rem;
        text-align: left;
    }
    .chat-message{
        padding: 0.6rem 0.8rem;
        margin-top: 0.1rem;
        border-radius: 0.5rem 0 0.5rem 0.5rem;
        font-size: 0.8rem;
        line-height: 1rem;
        display: inline-block;
        background: #80f8ff;
        border: 1px solid #efefef;
        display: inline-block;
        text-align: left;
    }
    .chat-message-2{
        border-radius: 0 0.5rem 0.5rem 0.5rem;
        background: #fff;
        border: 1px solid #efefef;
    }

    .msg-input{
        font-size: 1rem;
        padding: 0 0.5rem;
        flex: 1;
        border: none;
    }
    .send-btn{
        color: #333;
        font-weight: bold;
        width: 4rem;
        border: none;
    }
</style>
<script>
    export default {
        name: 'chatRoom',
        components: {
        },
        props: {},
        data() {
            return {
                Uid: 1,
                friendName: '张三',
                senderColor: '#efefef',
                recipientColor: '#26ebec',
                chatRecordList: [
                    {
                        sender: 1,
                        recipient: 2,
                        date: '22:40',
                        message: '哈啊哈哈啊哈哈啊哈啊哈',
                        readStatus: false,
                    },
                    {
                        sender: 2,
                        recipient: 1,
                        date: '22:40',
                        message: '哈啊哈',
                        readStatus: false,
                    },
                    {
                        sender: 1,
                        recipient: 2,
                        date: '22:40',
                        message: '哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈哈啊哈啊哈',
                        readStatus: false,
                    },
                    {
                        sender: 2,
                        recipient: 1,
                        date: '22:40',
                        message: '哈啊哈',
                        readStatus: false,
                    },
                    {
                        sender: 1,
                        recipient: 2,
                        date: '22:40',
                        message: '哈啊哈哈啊哈哈啊哈哈啊哈啊哈',
                        readStatus: false,
                    },
                    {
                        sender: 2,
                        recipient: 1,
                        date: '22:40',
                        message: '哈啊哈',
                        readStatus: false,
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