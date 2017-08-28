<template>
    <div class="scrollBar">
        <!--滚动条标题-->
        <div class="scroll-bar-title">
            {{title}}
        </div>
        <!--滚动条-->
        <div class="scroll-bar-box" @touchstart="start" @touchmove="move" @touchend="end" @touchcancel="cancel">
            <div class="scroll-bar" :style="{
                                top:-getSelectLocation + 'px',
                                transition: 'top '+ tiansitionTime +'s ease'
                            }">
                <div v-for="(item, index) in data" :key="index" class="option" :class="{
                                'selected-option': (selectIndex >= (index - 0.5) && selectIndex < (index + 0.5))
                            }">
                    {{item}}
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    html,
    body {
        height: 100%;
    }

    .scrollBar {
        width: 80px;
        height: 197px;
        display: flex;
        flex-direction: column;
        background: transparent;
    }

    .scrollBar .scroll-bar-title {
        font-size: 12px;
        color: #666;
        line-height: 1em;
        text-align: center;
        padding: 20px 0 8px 0;
    }

    .scrollBar .scroll-bar-box {
        height: 197px;
        overflow: hidden;
        position: relative;
    }

    .scrollBar .scroll-bar-box .scroll-bar {
        width: 80px;
        position: absolute;
        padding-bottom: 60px;
    }

    .scrollBar .scroll-bar-box .scroll-bar .scroll-bar-tiansition {
        transition: top 0s;
    }

    .scrollBar .scroll-bar-box .scroll-bar .option {
        width: 80px;
        font-size: 14px;
        color: #99a9c0;
        line-height: 1em;
        text-align: center;
        padding: 8px 0;
    }

    .scrollBar .scroll-bar-box .scroll-bar .selected-option {
        font-size: 16px;
        color: #18a2ea;
    }
</style>
<script>
    export default {
        name: 'scrollBar',
        components: {
        },
        props: {
            //滚动条标题
            title: {
                type: String,
                default: '日期',
                require: true,
            },
            //选择的数据
            data: {
                type: Array,
                default: [],
                require: true,
            },
            //默认索引值
            // defaultIndex: {
            //     type: Number,
            //     default: 0,
            // }
            value: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                //选中的索引
                selectIndex: this.value,
                //开始触摸的Y轴位置
                startY: 0,
                //上一次事件的Y轴位置
                lastY: 0,
                //最后一次的Y轴位置
                endY: 0,
                //滑动开始的时间戳
                startTime: 0,
                //是否要开启动画
                switchTiansition: false,
                //过渡动画时间
                tiansitionTime: 0.5,
            };
        },
        computed: {
            //获取选中的位置值
            getSelectLocation() {
                return (this.selectIndex - 2) * 30;
            }
        },
        watch: {
            //更新位置
            data(newVal, oldVal) {
                this.selectIndex = this.checkOutScope(this.selectIndex);
            },
            value(newVal, oldVal){
                this.selectIndex = newVal;
            },
            // selectIndex(newVal, oldVal){
            //     this.$emit('input', newVal);
            // }
        },
        methods: {
            //触摸开始事件
            start(event) {
                //阻止默认事件
                event.preventDefault();
                this.tiansitionTime = 0;
                //关闭过渡动画
                this.switchTiansition = false;
                //存储事件开始事件
                this.startTime = new Date().getTime();
                //存开始的Y轴位置
                this.startY = event.touches[0].clientY;
                //存最后一次的Y轴位置
                this.lastY = this.startY;
                this.endY = this.lastY;
            },
            //触摸滑动事件
            move(event) {
                //阻止默认事件
                event.preventDefault();
                //存储最后一次Y轴位置
                this.endY = event.touches[0].clientY;
                //获取滑动距离
                var distance = this.lastY - this.endY;
                //重新定位选中的日期位置
                this.selectIndex = this.checkOutScope(this.selectIndex + (distance / 30));
                //将最后一次Y轴距离赋值给上一次滑动距离
                this.lastY = this.endY;
            },
            //触摸结束事件
            end(event) {
                //将位置四舍五入，选中日期
                //设置过渡动画时间
                //获取开始到结束的滑动距离
                var distance = this.endY - this.startY;
                //获取开始到结束的所用时间
                var time = new Date().getTime() - this.startTime;
                //计算滑动的速度
                var speed = distance / time;
                //判断速度是否到达要求进行快速滑动
                speed *= 1.2;
                if (Math.abs(distance) > 15 && Math.abs(speed) > 0.5) {
                    //过渡长度
                    var tiansitionLength = speed * 15;
                    //开启过渡
                    this.tiansitionTime = 1 / Math.abs(speed);
                    //重新定位选中的日期位置
                    this.selectIndex = this.checkOutScope(Math.round(this.selectIndex - tiansitionLength));
                } else {
                    //锁定定位
                    this.tiansitionTime = 0.1;
                    this.selectIndex = Math.round(this.selectIndex);
                }
                this.chenge();
            },
            cancel(event) {
                end(event);
            },
            //检查是否超出范围
            checkOutScope(selectIndex) {
                if (selectIndex < 0) {
                    return 0;
                } else if (selectIndex >= (this.data.length - 1)) {
                    return this.data.length - 1;
                } else {
                    return selectIndex;
                }
            },
            //触发改变位置
            chenge() {
                this.$emit('input', this.selectIndex);
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