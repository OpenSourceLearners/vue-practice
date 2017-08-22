<template>
    <article class="content-box" :style="{left: -index*100+'%'}">
        <section class="page-item">
            <div class="chat-list">
                <!-- <section v-for="(item, index) in chatList" :key="index" class="chat-list-item-box">
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
                </section> -->
                <div>
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
    </article>
</template>
<style scoped>
    .chat-record {
        border: 1px solid #000;
        padding: 0;
        height: 80%;
    }
    .chat-record li{
        list-style: none;
        /* padding: 0.5rem; */
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
    }

    

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
                userList: [],
                chatRecord: [
                ],
                send:{
                    Uid: 0,
                    message: '',
                },
                user:{
                    Uid: undefined,
                    name: undefined,
                }
            };
        },
        computed: {
            username(){
                return sessionStorage.getItem('username');
            },
            onLineUserList(){
                for(let i in this.userList){
                    if(i == this.user.Uid){
                        console.log(this.userList);
                        delete this.userList[i];
                        break;
                    }
                }
                return this.userList;
            }
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
            // slideStart(event, index){
            // },
            // slideMove(event, index){

            // },
            // slideEnd(event){

            // },
            //发送信息
            sendMsg(){
                if(this.send.message == ''){
                    alert('信息不能为空');
                    return ;
                }
                this.ws.send(JSON.stringify({
                    method: 'sendMsg',
                    data: this.send
                }));
                this.chatRecord.push({
                    user: this.user.name,
                    message: this.send.message,
                });
                this.send.message = '';
            }
        },
        created() {
            if(WebSocket){
                this.ws = new WebSocket('ws://127.0.0.1:1234');
                this.ws.onopen = () => {
                    // alert("连接成功");
                    // this.ws.send('tom');
                    // alert("给服务端发送一个字符串：tom");
                };
                this.ws.onmessage = (e) => {
                    // alert("收到服务端的消息：" + e.data);
                    var data = JSON.parse(e.data);
                    switch(data.trigger){
                        case 'updateUserList':
                            this.userList = data.data;
                        break;
                        case 'acceptMsg':
                            data = data.data;
                            this.chatRecord.push({
                                user: data.sendUser,
                                message: data.message,
                                date: data.date
                            });
                        break;
                        case 'setUid':
                            this.user.Uid = data.data.Uid;
                            this.user.name = data.data.name;
                        break;
                        case 'Error':
                            alert(data.message);
                        break;
                    }
                };
            }else{
                alert('您得浏览器不支持WebSocket');
            }
        },
        destroyed() {
        },
        mounted() {
        }
    };
</script>