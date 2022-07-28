<template>
	<div :loading="loading">
		<div class="d-block">
			<el-select v-model="range" :placeholder="$t('comm.please_select')" @change="rangeChange" size="mini">
				<el-option v-for="item in reportRange" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
		</div>
		<ChartLine :styles="chartStyle" :chart-options="options" :chart-data="datacollection" />
		<div v-if="limit_permission" class="col-12 mt-2">
			<small class="pl-3" style="font-size: 9px;color:#dcdcdc">管理员配置您权限仅能查看部分数据</small>
		</div>
	</div>
</template>

<script>
	import {
		last24Hours,
		last30Days,
		last90Days
	} from "@/service/reportSer";
	import {
		isEmpty
	} from "@/utils/validate";
	import {
		mapState
	} from "vuex";
	import configs from "@/configs";
	import {
		hasPermission
	} from "@/service/userSer";
	// import 'chart.js/auto';
	import {
		Line
	} from "vue-chartjs";
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale,
		Plugin,
		Filler
	} from "chart.js";
	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale, Filler);

	//图表
	export default {
		components: {
			'ChartLine': Line
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
			start_load_data(val) {
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
				reportRange: [{
						value: 'last24Hours',
						label: this.$i18n.t('label.last24Hours')
					},
					{
						value: 'last30Days',
						label: this.$i18n.t('label.last30Days')
					},
					{
						value: 'last90Days',
						label: this.$i18n.t('label.last90Days')
					},
				],
				range: 'last30Days', //默认改为30d
				options: {
					responsive: true,
					maintainAspectRatio: false,
					legend: {
						display: false,
					},
					plugins: {
						tooltip: {
							mode: 'index',
							intersect: false,
							enabled: true, //关闭或打开气泡
							padding: {
								x: 15,
								y: 15
							},
							callbacks: {
								label: function(tooltipItem) {

									return ' $' + tooltipItem.formattedValue;
								},
							},
						},
						legend: {
							display: false,
						}
					},
					scales: {
						y: {
							display: true,
							position: 'right',
							ticks: {
								display: true,
								callback: function(value, index, values) {
									if (index === 0 || index + 1 === values.length) {
										return '$' + value;
									} else {
										return ''
									}
								},
							},
							grid: {
								// display: false,
								borderDash: [3, 2], //虚线的长度与离距
								drawBorder: false, //线不要在边缘绘制边框!
								tickLength: 0, //绘制的线条离label-ticks文字的距离!
								//标线在label文字中间 offsetGridLines: true,
								color: 'rgba(0, 0, 0, 0.1)',
								lineWidth: 0,
								zeroLineWidth: 1,
								zeroLineColor: 'rgba(0, 0, 0, 0.5)',
								beginAtZero: true,
							}
						},
						x: {
							display: true,
							position: 'bottom',
							ticks: { //https://www.chartjs.org/docs/latest/axes/styling.html#tick-configuration

								padding: 10, //(文字与线的距离)结合tickMarkLength使用
								callback: function(value, index, values) {
									if (index === 0 || index + 1 === values.length || index === (values
											.length / 2)) {
										//axis是折线图和条形图的默认x轴 它使用索引作为内部数据格式。要访问标签，请使用this.getLabelForValue(value)。API: getLabelForValue
										return this.getLabelForValue(value);
									} else {
										return ''
									}
								},
								//https://www.chartjs.org/docs/latest/axes/cartesian/#tick-configuration
								autoSkip: false, //底部文字不自动旋转角度
								maxRotation: 0, //底部文字不自动旋转角度
								minRotation: 0,
							},
							grid: { //https://www.chartjs.org/docs/latest/axes/styling.html#grid-line-configuration
								display: true,
								borderDash: [3, 2], //虚线的长度与离距
								drawBorder: false, //线不要在边缘绘制边框!
								tickLength: 0, //绘制的线条离label-ticks文字的距离!
								//标线在label文字中间 offsetGridLines: true,
								color: 'rgba(191,188,188,0.2)',
								lineWidth: 1,
								zeroLineWidth: 1, //左边第一条线
								zeroLineBorderDash: [3, 2], //虚线的长度与离距
								zeroLineColor: 'rgba(191,188,188,0.2)',

							}
						}

					}
				},
				datacollection: {},
				dataLabels: [],
				dataList: [],
			}
		},
		methods: {
			rangeChange() {
				this.fillData()
			},
			getRangLabel() {
				return this.$i18n.t('label.' + this.range);
			},
			chartRender(data) {
				this.limit_permission = data.limit_permission
				this.dataLabels = data.labels
				if (isEmpty(data.list[0])) data.list[0] = 0

				this.dataList = data.list
				this.datacollection = {
					labels: this.$data.dataLabels,
					datasets: [{
						label: this.getRangLabel(),
						data: this.$data.dataList,
						borderColor: 'rgba(60,141,188,0.9)',
						backgroundColor: 'rgba(60,141,188,0.2)',
						borderWidth: 2,
						lineTension: 0,
						fill: 'start',
						pointStyle: 'circle',
						pointRadius: '0', //点的半径
					}]
				}

			},
			fillData() {
				if (!hasPermission(configs.perm.home_trade_report, this.permissions)) return
				if (this.range === 'last24Hours') {
					this.loading = true
					last24Hours().then(res => {
						const {
							data
						} = res
						this.chartRender(data)
					}).finally(() => {
						this.loading = false
					})
				} else if (this.range === 'last30Days') {
					this.loading = true
					last30Days().then(res => {
						const {
							data
						} = res
						this.chartRender(data)
					}).finally(() => {
						this.loading = false
					})
				} else if (this.range === 'last90Days') {
					this.loading = true
					last90Days().then(res => {
						const {
							data
						} = res
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
