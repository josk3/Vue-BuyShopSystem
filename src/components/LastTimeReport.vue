<template>
    <div class="small">
        <line-chart :styles="myStyles" :options="options" :chart-data="datacollection"></line-chart>
        <button @click="fillData()">Randomize</button>
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
                    scales: {
                        xAxes: [{
                            display: true,
                            ticks: {
                                // Include a dollar sign in the ticks
                                callback: function(value, index, values) {
                                    if (index === 0 || index+1 === values.length) {
                                        return value;
                                    }else {
                                        return ''
                                    }
                                }
                            }
                        }],
                        yAxes: [{
                            display: false,
                        }]
                    },
                },
                datacollection: null
            }
        },
        mounted() {
            this.fillData()
        },
        computed: { //watch跟踪数据变化, 重点user, configs
            myStyles() {
                return {
                    height: '300px',
                    width: '500px',
                    position: 'relative'
                }
            }
        },
        methods: {
            fillData() {
                this.datacollection = {
                    labels: ['wef', 'cc' , '4r', 'ef', 'ef3'],
                    datasets: [
                        {
                            label: '',
                            backgroundColor: 'rgba(255,255,255,0)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            fill: false,
                            borderWidth: 1,
                            data: [this.getRandomInt(), this.getRandomInt(),
                                88,45,34,
                                this.getRandomInt(), this.getRandomInt()]
                        }
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
