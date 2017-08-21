<template>
    <div class="home-box">
        <my-menu class="menu-box"></my-menu>
        <article class="main">
            <my-head class="head"></my-head>
            <router-view class="content" v-model="page"></router-view>
            <my-footer class="footer" v-model="page"></my-footer>
        </article>
    </div>
</template>
<style scoped>
    .main{
        position: fixed;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .content{
        flex: 1;
        overflow: hidden;
    }
</style>
<script>
    import menu from './sub/menu';
    import head from './sub/head';
    import footer from './sub/footer';
    export default {
        name: 'home',
        components: {
            'my-menu': menu,
            'my-head': head,
            'my-footer': footer
        },
        props: {
            
        },
        data() {
            return {
                page: 0,
                ws:undefined,
            };
        },
        computed: {
        },
        watch: {
        },
        methods: {
        },
        created() {
            // if(WebSocket){
            //     this.ws = new WebSocket('ws://127.0.0.1:1234');
            //     this.ws.onopen = () => {
            //         alert("连接成功");
            //         // this.ws.send('tom');
            //         // alert("给服务端发送一个字符串：tom");
            //     };
            //     this.ws.onmessage = function(e) {
            //         alert("收到服务端的消息：" + e.data);
            //     };
            // }else{
            //     alert('您得浏览器不支持WebSocket');
            // }
            // setTimeos
            // ws = new WebSocket("ws://127.0.0.1:1234");
            // ws.onopen = function() {
            //     alert("连接成功");
            //     ws.send('tom');
            //     alert("给服务端发送一个字符串：tom");
            // };
            // ws.onmessage = function(e) {
            //     alert("收到服务端的消息：" + e.data);
            // };
        },
        destroyed() {
        },
        mounted() {
        }
    };
</script>