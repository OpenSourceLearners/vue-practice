<template>
    <div class="app-box">
        <transition :name="slideState" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<style scoped>
    .app-box{
        height: 100%;
        min-width: 320px;
    }
    .left-slide-fade-active, .left-slide-fade-leave-active{
        transition: transform .3s;
    }
    .left-slide-fade-enter, .left-slide-fade-leave-to{
        transform:translateX(-100%);
    }
    .right-slide-fade-active, .right-slide-fade-leave-active{
        transition: transform .3s;
    }
    .right-slide-fade-enter, .right-slide-fade-leave-to{
        transform:translateX(100%);
    }
</style>
<script>
    export default {
        name: 'App',
        components: {
        },
        props: {},
        data() {
            return {
                slideState: 'left-slide-fade'
            };
        },
        computed: {
        },
        watch: {
            '$route'(to, from){
                const toLen = to.path.split('/').length;
                const fromLen = from.path.split('/').length;
                this.slideState = toLen < fromLen ? 'right-slide-fade' : 'left-slide-fade';
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