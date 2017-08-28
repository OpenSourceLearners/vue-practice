<template>
    <article class="content-box" :style="{left: -index*100+'%'}">
        <section class="page-item">
            <my-chat></my-chat>
        </section>
        <section class="page-item">
            <my-friends></my-friends>
        </section>
        <section class="page-item">
            <my-info></my-info>
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
</style>
<script>
    import chat from './sub/chat';
    import friends from './sub/friends';
    import myInfo from './sub/myInfo';
    export default {
        name: 'content',
        components: {
            'my-chat': chat,
            'my-friends': friends,
            'my-info': myInfo,
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
                this.ws = new WebSocket('ws://101.132.40.213:1234');
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