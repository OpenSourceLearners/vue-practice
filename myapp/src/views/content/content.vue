<template>
    <article class="hide-box">
        <div class="content-box" :style="{left: -index*100+'%'}">
            <section class="page-item">
                <slot slot="page1">1</slot>
            </section>
            <section class="page-item">
                <slot slot="pagw2">2</slot>
            </section>
            <section class="page-item">
                <slot slot="page3">3</slot>
            </section>
        </div>
    </article>
</template>
<style>
    .hide-box{
        overflow: hidden;
    }
    .content-box{
        width: 300%;
        display: flex;
        position: relative;
    }
    .page-item{
        width: 100%;
        height: 100%;
        overflow: hidden;
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
                index: this.value
            };
        },
        computed: {
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
        },
        created() {
        },
        destroyed() {
        },
        mounted() {
        }
    };
</script>