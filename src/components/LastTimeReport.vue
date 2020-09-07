<template>
    <div class="small">
        <line-chart :styles="chartStyle" :options="options" :chartData="datacollection"></line-chart>
    </div>
</template>

<script>
    import LineChart from "@/service/chart/LineChart"

    export default {
        components: {
            LineChart
        },
        data() {
            return {
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
                            }
                        }],
                        xAxes: [{
                            display: true,
                            ticks: {//https://www.chartjs.org/docs/latest/axes/styling.html#tick-configuration
                                //display: false,
                                padding: 10, //(文字与线的距离)结合tickMarkLength使用
                                callback: function (value, index, values) {
                                    if (index === 0 || index + 1 === values.length) {
                                        return value;
                                    } else {
                                        return ''
                                    }
                                },
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
                datacollection: null
            }
        },
        mounted() {
            this.fillData()
        },
        computed: { //watch跟踪数据变化, 重点user, configs
            chartStyle() {
                return {
                    height: '350px',
                    width: '100%',
                    position: 'relative'
                }
            }
        },
        methods: {
            fillData() {
                this.datacollection = {
                    labels: ["2020-01-01:00", "2020-01-01:01", "2020-01-01:02", "2020-01-01:03", "2020-01-01:04", "June", "2020-01-01:09"],
                    datasets: [
                        {
                            label: "Last 24 hours",
                            data: [this.getRandomInt(), this.getRandomInt(),
                                88, 45, 34,
                                this.getRandomInt(), this.getRandomInt()],
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
            getRandomInt() {
                return Math.floor(Math.random() * (50 - 5 + 1)) + 5
            }
        }
    }
</script>

<style>
</style>
