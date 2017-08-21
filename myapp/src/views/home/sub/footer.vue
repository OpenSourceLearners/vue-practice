<template>
    <footer class="footer-box">
        <p class="footer-menu-item" :class="{'footer-menu-item-selected': index == 0}" @click="index = 0">Chat</p>
        <p class="footer-menu-item" :class="{'footer-menu-item-selected': index == 1}" @click="index = 1">Friends</p>
        <p class="footer-menu-item" :class="{'footer-menu-item-selected': index == 2}" @click="index = 2">My</p>
    </footer>
</template>
<style>
    .footer-box{
        height: 2.6rem;
        display: flex;
    }
    .footer-menu-item{
        flex: 1;
        font-size: 1rem;
        font-weight: bold;
        text-align: center;
        color: rgba(60, 60, 148, 0.4);
        line-height: 2.6rem;
        cursor: pointer;
    }
    .footer-menu-item-selected{
        color: rgba(60, 60, 148, 1);
    }
</style>
<script>
    export default {
        name: 'footer',
        components: {
        },
        props: {
            value: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                index: this.value,
            };
        },
        computed: {
        },
        watch: {
            value(newVal, oldVal){
                this.index = newVal;
            },
            index(newVal, oldVal){
                this.$emit('input', newVal);
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