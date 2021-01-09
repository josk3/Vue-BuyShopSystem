<template>
    <div v-loading="loading">
        <div class="d-block">
            <el-select v-model="range" :placeholder="$t('comm.please_select')" @change="rangeChange" size="mini">
                <el-option
                        v-for="item in reportRange"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </div>
        <line-chart :styles="chartStyle" :options="options" :chartData="datacollection"></line-chart>
        <div v-if="limit_permission" class="col-12 mt-2">
            <small class="pl-3" style="font-size: 9px;color:#dcdcdc">管理员配置您权限仅能查看部分数据</small>
        </div>
    </div>
</template>

<script>
    import LineChart from "@/service/chart/LineChart"
    import {last24Hours, last30Days, last90Days} from "@/service/reportSer";
    import {isEmpty} from "@/utils/validate";
    import {mapState} from "vuex";
    import configs from "@/configs";
    import {hasPermission} from "@/service/userSer";

    //图表
    export default {
        components: {
            LineChart
        },
        //start_load_data不定义可正常使用
        props: ['start_load_data'],
        computed: { //watch跟踪数据变化, 重点user, configs
            ...mapState({
                permissions: state => state.user.permissions,
                lang: state => state.app.lang,
            }),
            configs() {
                return configs;
            },
            chartStyle() {
                return {
                    height: '350px',
                    width: '100%',
                    position: 'relative'
                }
            },
        },
        watch: {
            start_load_data(val){
                if (isEmpty(val) || val === true) {
                    this.fillData()
                }
            },
        },
        mounted() {
            if (isEmpty(this.start_load_data) || this.start_load_data === true) {
                this.fillData()
            }
        },
        data() {
            return {
                loading: false,
                limit_permission: false,
                reportRange: [
                    {value: 'last24Hours', label: this.$i18n.t('label.last24Hours')},
                    {value: 'last30Days', label: this.$i18n.t('label.last30Days')},
                    {value: 'last90Days', label: this.$i18n.t('label.last90Days')},
                ],
                range: 'last24Hours',//默认
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: false,
                    },
                    tooltips: {//竖轴触发气泡 https://www.chartjs.org/docs/latest/configuration/tooltip.html
                        mode: 'index',
                        intersect: false,
                        enabled: true,//关闭或打开气泡
                        yPadding: 15,
                        xPadding: 15,
                        callbacks: {
                            label: function (tooltipItem) {
                                return ' $' + tooltipItem.yLabel;
                            },
                        },
                    },
                    scales: {
                        yAxes: [{
                            display: true,
                            position: 'right',
                            ticks: {
                                display: true,
                                callback: function (value, index, values) {
                                    if (index === 0 || index + 1 === values.length) {
                                        return '$' + value;
                                    } else {
                                        return ''
                                    }
                                },
                            },
                            gridLines: {
                                // display: false,
                                borderDash: [3, 2],//虚线的长度与离距
                                drawBorder: false,//线不要在边缘绘制边框!
                                tickMarkLength: 0,//绘制的线条离label-ticks文字的距离!
                                //标线在label文字中间 offsetGridLines: true,
                                color: 'rgba(0, 0, 0, 0.1)',
                                lineWidth: 0,
                                zeroLineWidth: 1,
                                zeroLineColor: 'rgba(0, 0, 0, 0.5)',
                                beginAtZero: true,
                            }
                        }],
                        xAxes: [{
                            display: true,
                            ticks: {//https://www.chartjs.org/docs/latest/axes/styling.html#tick-configuration
                                //display: false,
                                padding: 10, //(文字与线的距离)结合tickMarkLength使用
                                callback: function (value, index, values) {
                                    if (index === 0 || index + 1 === values.length || index === ( values.length / 2)) {
                                        return value;
                                    } else {
                                        return ''
                                    }
                                },
                                //https://www.chartjs.org/docs/latest/axes/cartesian/#tick-configuration
                                autoSkip: false, //底部文字不自动旋转角度
                                maxRotation: 0,//底部文字不自动旋转角度
                                minRotation: 0,
                            },
                            gridLines: {//https://www.chartjs.org/docs/latest/axes/styling.html#grid-line-configuration
                                display: true,
                                borderDash: [3, 2],//虚线的长度与离距
                                drawBorder: false,//线不要在边缘绘制边框!
                                tickMarkLength: 0,//绘制的线条离label-ticks文字的距离!
                                //标线在label文字中间 offsetGridLines: true,
                                color: 'rgba(191,188,188,0.2)',
                                lineWidth: 1,
                                zeroLineWidth: 1,//左边第一条线
                                zeroLineBorderDash: [3, 2],//虚线的长度与离距
                                zeroLineColor: 'rgba(191,188,188,0.2)',
                            }
                        }],
                    },
                },
                datacollection: null,
                dataLabels: [],
                dataList: [],
            }
        },
        methods: {
            rangeChange() {
                this.fillData()
            },
            getRangLabel() {
                return this.$i18n.t('label.' + this.range).toString;
            },
            chartRender(data) {
                this.limit_permission = data.limit_permission
                this.dataLabels = data.labels
                if (isEmpty(data.list[0])) data.list[0] = 0
                this.dataList = data.list
                this.datacollection = {
                    labels: this.$data.dataLabels,
                    datasets: [
                        {
                            label: this.getRangLabel(),
                            data: this.$data.dataList,
                            backgroundColor: 'rgba(60,141,188,0.2)',
                            borderColor: 'rgba(60,141,188,0.9)',
                            fill: 'start',//背景
                            // fill: false,
                            // "borderColor": "rgb(75, 192, 192)",
                            borderWidth: 2,
                            lineTension: 0,
                            pointBorderWidth: '0px',                       //点边框大小
                            pointRadius: '0',                              //点的半径
                            pointStyle: 'circle',                         //点样式
                        },
                    ]
                }
            },
            fillData() {
                if (!hasPermission(configs.perm.home_trade_report, this.permissions)) return
                if (this.range === 'last24Hours') {
                    this.loading = true
                    last24Hours().then(res => {
                        const {data} = res
                        this.chartRender(data)
                    }).finally(() => {
                        this.loading = false
                    })
                } else if (this.range === 'last30Days') {
                    this.loading = true
                    last30Days().then(res => {
                        const {data} = res
                        this.chartRender(data)
                    }).finally(() => {
                        this.loading = false
                    })
                } else if (this.range === 'last90Days') {
                    this.loading = true
                    last90Days().then(res => {
                        const {data} = res
                        this.chartRender(data)
                    }).finally(() => {
                        this.loading = false
                    })
                }
            },
        }
    }
</script>

<style>
</style>
