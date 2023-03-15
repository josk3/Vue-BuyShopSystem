<template>
  <div v-loading="loading">
    <div class="content" id="app">
    <div class="col-12">
      <!-- 搜索栏 -->
      <el-card>
        <div> {{ $t('report.report_overview') }} </div>
<!--        <el-select v-model="range" :placeholder="$t('comm.please_select')" @change="getLoadEcharts" size="mini">-->
<!--          <el-option v-for="item in reportRange" :key="item.value" :label="item.label" :value="item.value">-->
<!--          </el-option>-->
<!--        </el-select>-->
        <el-row>
          <el-button round autofocus @click="getLoadEcharts('d_seven')">7{{ $t('label.day') }}</el-button>
          <el-button round @click="getLoadEcharts('d_thirty')">30{{ $t('label.day') }}</el-button>
          <el-button round @click="getLoadEcharts('d_ninety')">90{{ $t('label.day') }}</el-button>
        </el-row>
      </el-card>

      <div class="row">
        <!-- 成功交易统计 -->
        <div class="col-12 mb-3">
          <el-card class="box-card">
            <div class="chart-item">
              <div id="paidAmountReport" :style="paidStyle"></div>
            </div>
          </el-card>
        </div>
        <!-- 拒付统计-->
        <div class="col-12 mb-3">
          <el-card class="box-card">
            <div class="chart-item">
              <div id="declineReport"
                   style="width: 100%;height:400px"></div>
            </div>
          </el-card>
        </div>
        <!-- 退款统计 -->
        <div class="col-12 mb-3">
          <el-card class="box-card">
            <div class="chart-item">
              <div id="refundReport"
                   style="width: 100%;height:400px;"></div>
            </div>
          </el-card>
        </div>
        <!-- 交易量前十的网站-->
        <div class="col-12 mb-3">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <div class="mb-1 row">
                <span class="col-6" style="">{{ $t('report.top_10_sites_by_volume') }}</span>
                <small>{{ $t('report.ranking_of_the_last_30_days') }}</small>
              </div>
            </div>
            <div class="mb-1 row">
              <el-table
                  :data="webSiteList"
                  style="width: 100%">
                <el-table-column
                    prop="label"
                    :label="$t('report.ranking')">
                </el-table-column>
                <el-table-column
                    prop="value"
                    :label="$t('comm.site_url')">
                </el-table-column>
                <el-table-column
                    prop="count"
                    :label="$t('report.trading_volume')">
                </el-table-column>
                <el-table-column>
                  <template slot="header">
                    <el-popover placement="top-start" width="520" trigger="hover" :content="$t('report.country_remark')">
                      <span slot="reference">{{ $t('report.country') }} <i class="el-icon-warning-outline"></i></span>
                    </el-popover>
                  </template>
                  <template v-slot="scope">
                    <el-button size="mini" type="default"
                               @click="viewTheCountryBar(scope.$index, scope.row)">查看
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </div>
      </div>
      <el-dialog
          :title="$t('report.proportion_of_trading_countries')"
          :visible.sync="countryBarDialog"
          width="40%"
          center>
        <el-card class="box-card">
          <div class="chart-item">
            <div id="countryBar" :style="paidStyle"></div>
          </div>
        </el-card>
      </el-dialog>
      <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
  </div>
  </div>

</template>
<script>
import {paidReport, declineReport, refundReport, top10SiteReport, viewTheCountries} from "@/service/reportSer";
// import {isEmpty} from "@/utils/validate";
import {mapState} from "vuex";
import configs from "@/configs";
import {hasPermission} from "@/service/userSer";
export default {
  props: ['start_load_data'],
  computed: { //watch跟踪数据变化, 重点user, configs
    ...mapState({
      permissions: state => state.user.permissions,
      lang: state => state.app.lang,
    }),
    configs() {
      return configs;
    },
    paidStyle() {
      return {
        height: '450px',
        width: '100%',
        position: 'relative'
      }
    },
  },
  data() {
    return {
      loading: false,
      reportRange: [
        {
          value: 'd_seven',
          label: '7',
        },
        {
          value: 'd_thirty',
          label: '30',
        },
        {
          value: 'd_ninety',
          label: '90',
        },
      ],
      range: 'd_seven', //默认改为30d
      reportParams: {
        days: ""
      },
      webSiteList: [],
      countryBarDialog: false,
      lineOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '${value}'
          },
        },
        dataZoom: [
          {
            type: 'inside'
          },
          {
            type: 'slider'
          }
        ],
      },
      payChart: null,
      payOption: {},
      declineChart: null,
      declineOption: {},
      refundChart: null,
      refundOption: {},
      // top10SiteOption: {},
    }
  },
  //start_load_data不定义可正常使用

  // 页面初始化挂载dom
  mounted() {
    this.getLoadEcharts(this.range)
  },
  watch: {
    '$i18n.locale' () {
      // echarts切换语言需要重新setOption
      this.refreshEcharts()
    },
  },
  methods: {
    getLoadEcharts(data) {
      if (undefined === data) {
        data = 'd_seven';
      }
      this.range = data;
      this.reportParams.days = data;
      // 检测有无权限
      if (hasPermission(configs.perm.can_view_paid_report, this.permissions)) {
        this.getPaidReport();
      }
      if (hasPermission(configs.perm.can_view_decline_report, this.permissions)) {
        this.getDeclineReport();
      }
      if (hasPermission(configs.perm.can_view_refund_report, this.permissions)) {
        this.getRefundReport();
      }
      if (hasPermission(configs.perm.can_view_top10_site_report, this.permissions)) {
        this.getTop10SiteReport();
      }
    },
    // 成功支付
    getPaidReport() {
      // 销毁已渲染图表
      if (this.payChart != null && this.payChart !== "" && this.payChart !== undefined) {
        this.payChart.dispose()
      }
      // 初始化
      this.payChart = this.$echarts.init(
          document.getElementById("paidAmountReport"),
      );
      this.loading = true
      paidReport(this.reportParams).then(res => {
        const {data} = res;
        this.payOption = {
          ...this.lineOption,
          title: {
            text: this.$i18n.t('report.successful_payment'),
            subtext: this.$i18n.t('report.successful_payment_remark'),
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: data.labels,
          },
          series: [
            {
              name: this.$i18n.t('report.trading_total'),
              data: data.list,
              color: '#91cc75',
              type: 'line',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
            }
          ],
        };
        this.payChart.setOption(this.payOption);
      }).finally(() => {
        this.loading = false
      })
    },
    // 拒付率
    getDeclineReport() {
      // 销毁已渲染图表
      if (this.declineChart != null && this.declineChart !== "" && this.declineChart !== undefined) {
        this.declineChart.dispose();
      }
      // 初始化
      this.declineChart = this.$echarts.init(
          document.getElementById("declineReport")
      );
      this.loading = true
      declineReport(this.reportParams).then(res => {
        const {data} = res;
        this.declineOption = {
          ...this.lineOption,
          title: {
            text: this.$i18n.t('report.dishonor_rate'),
            subtext: this.$i18n.t('report.dishonor_rate_remark'),
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: data.labels,
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: this.$i18n.t('report.dishonor_rate'),
              data: data.list,
              color: '#ee6666',
              type: 'line',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
            }
          ]
        };
        this.declineChart.setOption(this.declineOption);
      }).finally(() => {
        this.loading = false
      })
    },
    // 退款
    getRefundReport() {
      // 销毁已渲染图表
      if (this.refundChart != null && this.refundChart !== "" && this.refundChart !== undefined) {
        this.refundChart.dispose();
      }
      // 初始化
      this.refundChart = this.$echarts.init(
          document.getElementById("refundReport")
      );
      this.loading = true
      refundReport(this.reportParams).then(res => {
        const {data} = res;

        this.refundOption = {
          ...this.lineOption,
          title: {
            text: this.$i18n.t('report.refund'),
            subtext: this.$i18n.t('report.refund_remark'),
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: data.labels,
          },
          series: [
            {
              name: this.$i18n.t('report.refund_amount'),
              data: data.list,
              type: 'line',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
            }
          ]
        };
        this.refundChart.setOption(this.refundOption);
      }).finally(() => {
        this.loading = false
      })
    },
    // top10网站
    getTop10SiteReport() {
      this.loading = true
      top10SiteReport().then(res => {
        const {data} = res
        this.webSiteList = data;
      }).finally(() => {
        this.loading = false
      })
    },
    // 交易国家占比详情
    viewTheCountryBar(index, row) {
      this.loading = true
      this.countryBarDialog = true;
      this.reportParams.website = row.value;
      viewTheCountries(this.reportParams).then(res => {
        const {data} = res;
        let bodyData = []
        let array = data.list;
        array.forEach(item => {
          bodyData.push({name: item.name, value: item.value});
        })
        let myChart = this.$echarts.init(
            document.getElementById("countryBar")
        );
        let option = {
          title: {
            text: this.$i18n.t('report.proportion_of_trading_countries'),
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: data.label
          },
          series: [
            {
              name: this.$i18n.t('report.proportion_of_trading_countries'),
              type: 'pie',
              radius: '50%',
                data: bodyData,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        myChart.setOption(option);
      }).finally(() => {
        this.loading = false
      })
    },
    refreshEcharts() {
      this.payOption.title.text = this.$i18n.t('report.successful_payment');
      this.payOption.title.subtext = this.$i18n.t('report.successful_payment_remark');
      this.payOption.series[0].name = this.$i18n.t('report.trading_total');
      this.payChart.setOption(this.payOption);

      this.declineOption.title.text = this.$i18n.t('report.dishonor_rate');
      this.declineOption.title.subtext = this.$i18n.t('report.dishonor_rate_remark');
      this.declineOption.series[0].name = this.$i18n.t('report.dishonor_rate');
      this.declineChart.setOption(this.declineOption);

      this.refundOption.title.text = this.$i18n.t('report.refund');
      this.refundOption.title.subtext = this.$i18n.t('report.refund_remark');
      this.refundOption.series[0].name = this.$i18n.t('report.refund_amount');
      this.refundChart.setOption(this.refundOption);

    },

  }
};
</script>
<style scoped>

</style>
