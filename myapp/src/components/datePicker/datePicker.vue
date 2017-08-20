<template>
    <transition name="bottom-slide">
        <div class="app" v-show="show">
            <header class="head">
                <input type="button" value="确定" class="determine" @click="determine">
            </header>
            <div class="content">
                <div class="scroll-box">
                    <template v-if="dateType == 1">
                        <scroll-bar :title="'年'" :data="yearData" :defaultIndex="yearIndex" v-model="yearIndex"></scroll-bar>
                        <scroll-bar :title="'月'" :data="monthData" :defaultIndex="monthIndex" v-model="monthIndex"></scroll-bar>
                        <scroll-bar :title="'日'" :data="dayData" :defaultIndex="dayIndex" v-model="dayIndex"></scroll-bar>
                    </template>
                    <template v-else-if="dateType == 2">
                        <scroll-bar :title="'月'" :data="monthData" :defaultIndex="monthIndex" v-model="monthIndex"></scroll-bar>
                        <scroll-bar :title="'日'" :data="dayData" :defaultIndex="dayIndex" v-model="dayIndex"></scroll-bar>
                        <scroll-bar :title="'时'" :data="hoursData" :defaultIndex="hoursIndex" v-model="hoursIndex"></scroll-bar>
                        <scroll-bar :title="'分'" :data="minutesData" :defaultIndex="minutesIndex" v-model="minutesIndex"></scroll-bar>
                    </template>
                    <template v-else-if="dateType == 3">
                        <scroll-bar :title="'时'" :data="hoursData" :defaultIndex="hoursIndex" v-model="hoursIndex"></scroll-bar>
                        <scroll-bar :title="'分'" :data="minutesData" :defaultIndex="minutesIndex" v-model="minutesIndex"></scroll-bar>
                    </template>
                </div>
                <div class="doubel-line">
                </div>
            </div>
        </div>
    </transition>
</template>
<style scoped>
    .app {
        min-width: 320px;
        display: flex;
        flex-direction: column;
        position: fixed;
        bottom: 0;
        left:0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
    }

    .head {
        height: 40px;
        background: #fff;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        border-top: 0.5px solid #eee;
    }

    .head .determine {
        font-size: 14px;
        color: #18a2ea;
        margin-right: 20px;
        background: transparent;
        border: none;
    }

    .app .content {
        height: 197px;
        background: #f7f7f7;
    }

    .app .content .scroll-box {
        display: flex;
        justify-content: center;
        position: relative;
        z-index: 2;
    }

    .app .doubel-line {
        width: 100%;
        height: 33px;
        border-top: 0.5px solid #99a9c0;
        border-bottom: 0.5px solid #99a9c0;
        background: transparent;
        position: absolute;
        top: 139px;
        z-index: 1;
    }
    .bottom-slide-enter-active, .bottom-slide-leave-active{
        transition: transform .5s
    }
    .bottom-slide-enter, .bottom-slide-leave-to{
        transform: translateY(100%);
    }
</style>
<script>
import scrollBar from './scrollBar';
export default {
    name: 'datePicker',
    components: {
        // 滚动条组件
        'scroll-bar': scrollBar,
    },
    props: {
        //开始时间的日期对象
        startDate: {
            type: Date,
            require: true
        },
        //结束的时间日期对象
        endDate: {
            type: Date,
            require: true
        },
        //默认的时间对象
        defaultDate: {
            type: Date,
            // require: true,
            default: () => new Date()
        },
        //日期类型
        dateType: {
            type: Number,
            default: 1
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            //年的范围数组
            yearData: this.createScopeArray(this.startDate.getFullYear(), this.endDate.getFullYear()),
            //默认年索引
            yearIndex: this.defaultDate.getFullYear() - this.startDate.getFullYear(),
            //月的范围数组
            monthData: this.createScopeArray(1, 12),
            //默认月索引
            monthIndex: this.defaultDate.getMonth(),
            //默认日的索引
            dayIndex: this.defaultDate.getDate() - 1,
            //小时的范围数组
            hoursData: this.createScopeArray(0, 23),
            //默认小时索引
            hoursIndex: this.defaultDate.getHours(),
            //分钟的范围数组
            minutesData: this.createScopeArray(0, 59),
            //默认分钟索引
            minutesIndex: this.defaultDate.getMinutes(),
        };
    },
    computed: {
        dayData() {
            var date = new Date(this.yearData[this.yearIndex], this.monthData[this.monthIndex], 1);
            var time = date.getTime() - (24 * 60 * 60 * 1000);
            var length = new Date(time).getDate();
            return this.createScopeArray(1, length);
        }
    },
    watch: {
    },
    methods: {
        // 创建一个数组范围数组
        createScopeArray(start, end) {
            var array = new Array();
            for (; start <= end; start++) {
                array[array.length] = start;
            }
            return array;
        },
        //双向绑定年
        // chengeYear(index) {
        //     this.yearIndex = index;
        // },
        // //双向绑定月
        // chengeMonth(index) {
        //     this.monthIndex = index;
        // },
        // //双向绑定日
        // chengeDay(index) {
        //     this.dayIndex = index;
        // },
        // //双向绑定时
        // chengeHours(index) {
        //     this.hoursIndex = index;
        // },
        // //双向绑定分
        // chengeMinutes(index) {
        //     this.minutesIndex = index
        // },
        //确定事件
        determine() {
            var data = new Date(this.yearData[this.yearIndex], this.monthData[this.monthIndex] - 1, this.dayData[this.dayIndex], this.hoursData[this.hoursIndex], this.minutesData[this.minutesIndex]);
            this.$emit('triggerUpdateDate', data);
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