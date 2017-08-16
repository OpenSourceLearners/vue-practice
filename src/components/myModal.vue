<template>
    <div v-if="show">
        <div class="modal-box">
            <div class="modal-title">{{title}}</div>
            <div class="modal-content">{{content}}</div>
            <div class="btn-group">
                <template v-if="type == 1">
                    <div class="modal-btn" @click="inform">确定</div>
                </template>
                <template v-else-if="type == 2">
                    <div class="modal-btn" @click="inform(false)">取消</div>
                    <div class="modal-btn" @click="inform(true)">确定</div>
                </template>
            </div>
        </div>
        <div class="modal-bg"></div>
    </div>
</template>
<style>
    .modal-bg{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        background: #000;
        opacity: 0.4;
    }
    .modal-box{
        width: 14rem;
        position: fixed;
        left: 50%;
        top: 25%;
        margin-left: -7rem;
        z-index: 1001;
        border-radius: 0.3rem;
        background: #fff;
    }
    .modal-title{
        line-height: 0.8rem;
        height: 0.8rem;
        padding: 1rem 0 0.5rem 0;
        font-size: 0.8rem;
        font-weight: bold;
        text-align: center;
    }
    .modal-content{
        font-size: 0.8rem;
        line-height: 1.6rem;
        min-height: 2rem;
        padding: 0 1rem 0.5rem 1rem;
        border-bottom: 1px solid #ccc;
        text-align: center;
    }
    .btn-group{
        height: 2.5rem;
        display: flex;
    }
    .modal-btn{
        font-size: 0.8rem;
        text-align: center;
        height: 2.5rem;
        line-height: 2.5rem;
        flex: 1;
        border-right: 1px solid #ccc;
    }
    .btn-group .modal-btn:last-child{
         border-right: none;
    }
</style>
<script>
    export default {
        name: 'myModal',
        components: {
        },
        props: {
            title: {
                type: String,
                default: '通知',
            },
            content: {
                type: String,
                default: '',
            },
            type: {
                type: Number,
                default: 1,
            },
            value: {
                type: Boolean,
                default: false,
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
                this.show = this.value;
            },
            show(newVal, oldVal){
                this.$emit('input', newVal);
            }
        },
        methods: {
            inform(status){
                this.show = false;
                if(this.type == 2){
                    //通知父组件
                    this.$emit('results', status);
                }
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