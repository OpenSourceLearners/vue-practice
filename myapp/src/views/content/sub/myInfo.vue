<template>
    <div class="my-information">
        <p class="my-head-portrait"></p>
        <p class="my-username">{{username}}</p>
    </div>
</template>
<style scoped>
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
        name: 'myInfo',
        components: {
        },
        props: {},
        data() {
            return {
            };
        },
        computed: {
            username(){
                return sessionStorage.getItem('username');
            }
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