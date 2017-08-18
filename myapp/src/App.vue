<template>
    <div>
        <transition name="left-slide-fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>``
<style scoped>
    .left-slide-fade-active, .left-slide-fade-leave-active{
        transition: transform .3s;
    }
    .left-slide-fade-enter, .left-slide-fade-leave-to{
        transform:translateX(-100%);
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