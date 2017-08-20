<template>
    <div>
        <input type="text" v-model="dateStr" @focus="datePicker.show = true" @blur="datePicker.show = false" />
        <date-picker :startDate="datePicker.start" :endDate="datePicker.end" :defaultDate="datePicker.date" :show="datePicker.show" @triggerUpdateDate="updateDate"></date-picker>
    </div>
</template>
<style>
</style>
<script>
    import datePicker from '../../components/datePicker/datePicker';
    import {dateFormat} from '../../lib/util';
    export default {
        name: 'datePickerTest',
        components: {
            'date-picker': datePicker
        },
        props: {},
        data() {
            return {
                datePicker:{
                    start: new Date(2017, 7, 1),
                    end: new Date(2017, 9, 21),
                    show: false,
                    date: new Date()
                },
                send: {
                    timestamp: new Date().getTime()
                }
            };
        },
        computed: {
            dateStr(){
                return dateFormat('yyyy-MM-dd hh:mm:ss',this.datePicker.date);
            }
        },
        watch: {
        },
        methods: {
            updateDate(date){
                this.datePicker.date = date;
                this.send.timestamp = date.getTime();
                this.datePicker.show = false;
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