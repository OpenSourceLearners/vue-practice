<template>
    <transition name="top-slide-fade">
        <div class="message-box" v-show="show">
            <slot>
                {{message}}
            </slot>
        </div>
    </transition>
</template>
<style scoped>
    .message-box{
        font-size: 1rem;
        color: #fff;
        line-height: 1.5rem;
        max-width: 24rem;
        width: 96%;
        height: 5.5rem;
        box-sizing: border-box;
        position: fixed;
        top: 0.4rem;
        left: 0;
        right: 0;
        margin: auto;
        border: 1rem solid rgba(0, 0, 0, 0);
        border-top-width: 0.5rem;
        border-bottom-width: 0.5rem;
        border-radius: 4px;
        background: rgba(0, 0, 0, 0.4);
        overflow: hidden;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
    }
    .top-slide-fade-enter-active{
        transition: top .3s ease;
    }
    .top-slide-fade-leave-active{
        transition: top .6s ease;
    }
    .top-slide-fade-enter, .top-slide-fade-leave-to{
        top: -5.5rem;
    }
</style>
<script>
    export default {
        name: 'message',
        components: {
        },
        props: {
            message: {
                type: String,
                default: '',
            }
        },
        data() {
            return {
                show: false,
            };
        },
        computed: {
        },
        watch: {
        },
        methods: {
            showMessage(){
                this.show = true;
                setTimeout(() => {
                    this.show = false;
                }, 4000);
            }
        },
        created() {
        },
        destroyed() {
        },
        mounted() {
        }
    };
</script>