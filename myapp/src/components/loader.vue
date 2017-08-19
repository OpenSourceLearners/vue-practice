<template>
    <div v-if="show">
        <div class="loader">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
        <div class="modal-bg"></div>
    </div>
</template>
<style scoped>
    .loader{
        width: 6rem;
        height: 1.5rem;
        position: fixed;
        z-index: 1000;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: auto;
        display: flex;
        justify-content: space-around;
    }
    .loader > div{
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 1rem;
        background: #3c3c94;
        animation: zooming 1.4s infinite ;
    }
    .loader > div:nth-child(1){
        animation-delay: -0.32s; 
    }
    .loader > div:nth-child(2){
        animation-delay: -0.16s;
    }
    @-webkit-keyframes zooming{
        0%, 80%, 100%{
            -webkit-transform: scale(0.0);
        }
        40%{
            -webkit-transform: scale(1.0);
        }
    }
    @keyframes zooming{
        0%, 80%, 100%{
            -webkit-transform: scale(0.0);
            transform: scale(0.0);
        }
        40%{
            -webkit-transform: scale(1.0);
            transform: scale(1.0);
        }
    }
    .modal-bg{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(255, 255, 255, 0.4);
    }
</style>
<script>
    export default {
        name: 'loader',
        components: {
        },
        props: {
            value: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                show: this.value,
            };
        },
        computed: {
        },
        watch: {
            value(newVal, oldVal){
                this.show = newVal;
            },
            show(newVal, oldVal){
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