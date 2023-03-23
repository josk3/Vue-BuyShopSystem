<template>
  <div v-loading="loading">
    <div class="content" id="app">
    <div class="col-12">
      <!-- 搜索栏 -->
      <el-card>
        <div> {{ $t('report.report_overview') }} </div>
      </el-card>

      <div class="row">
        <!-- 成功交易统计 -->
        <div class="col-12 mb-3" v-if="perm_can_view_paid_report">
          <el-card class="box-card">
            <div class="header">
              <SearchBox ref="searchForm" :params="paidParams" @search="getPaidReport" ></SearchBox>
            </div>
            <div class="chart-item">
              <div id="paidAmountReport" ref="paidAmountReport" :style="paidStyle"></div>
            </div>
          </el-card>
        </div>
        <!-- 拒付统计-->
        <div class="col-12 mb-3">
          <el-card class="box-card">
            <div class="chart-item">
              <div id="declineReport" ref="declineReport"
                   style="width: 100%;height:400px"></div>
            </div>
          </el-card>
        </div>
        <!-- 退款统计 -->
        <div class="col-12 mb-3">
          <el-card class="box-card">
            <div class="header">
              <SearchBox :params="refundParams" @search="getRefundReport"></SearchBox>
            </div>
            <div class="chart-item">
              <div id="refundReport" ref="refundReport"
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
import SearchBox from "@/components/SearchBox";
import {parseTime} from "@/utils";
export default {
  components: {SearchBox},
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
      colors:  ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de','#3ba272', '#fc8452', '#9a60b4','#ea7ccc'],
      reportParams: {
        days: ""
      },
      paidParams: {
        search_date: '', reset_show: false, title: false,
      },
      declineParams: {
        search_date: '', reset_show: false, title: false,
      },
      refundParams: {
        search_date: '', reset_show: false, title: false,
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
          containLabel: true,
        },
        yAxis: {
          type: 'value',
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
      perm_can_view_paid_report: false,
      perm_can_view_decline_report: false,
      perm_can_view_refund_report: false,
      perm_can_view_top10_site_report: false,
      // top10SiteOption: {},
    }
  },
  //start_load_data不定义可正常使用

  created() {
    // 检测有无权限
    if (hasPermission(configs.perm.can_view_paid_report, this.permissions)) {
      this.perm_can_view_paid_report = true;
    }
    if (hasPermission(configs.perm.can_view_decline_report, this.permissions)) {
      this.perm_can_view_decline_report = true;
    }
    if (hasPermission(configs.perm.can_view_refund_report, this.permissions)) {
      this.perm_can_view_refund_report = true;
    }
    if (hasPermission(configs.perm.can_view_top10_site_report, this.permissions)) {
      this.perm_can_view_top10_site_report = true;
    }
  },
  // 页面初始化挂载dom
  mounted() {
    // 设置默认搜索时间
    const currentTime = new Date().getTime()
    let defaultSearchDate = [parseTime(currentTime - 3600 * 1000 * 24 * 31,
        '{y}-{m}-{d}'), parseTime(currentTime, '{y}-{m}-{d}')]
    this.paidParams.search_date = defaultSearchDate
    this.refundParams.search_date = defaultSearchDate
    // 获取数据并渲染
    this.getLoadEcharts();
  },
  watch: {
    '$i18n.locale' () {
      // echarts切换语言需要重新setOption
      this.refreshEcharts()
    },
  },
  methods: {
    getLoadEcharts() {
      // 根据权限调用接口
      if (this.perm_can_view_paid_report) {
        this.getPaidReport();
      }
      if (this.perm_can_view_decline_report) {
        this.getDeclineReport();
      }
      if (this.perm_can_view_refund_report) {
        this.getRefundReport();
      }
      if (this.perm_can_view_top10_site_report) {
        this.getTop10SiteReport();
      }
    },
    // 成功支付
    getPaidReport() {
      // 销毁已渲染图表
      if (this.payChart != null && this.payChart !== "" && this.payChart !== undefined) {
        this.payChart.dispose();
      }
      // 初始化
      this.payChart = this.$echarts.init(this.$refs.paidAmountReport);
      this.loading = true
      paidReport(this.paidParams).then(res => {
        const {data} = res;
        // 整理数据
        let arr = this.dataCleansing(data);
        // 设置option
        this.payOption = {
          ...this.lineOption,
          title: {
            text: this.$i18n.t('report.successful_payment'),
            subtext: this.$i18n.t('report.successful_payment_remark'),
          },
          tooltip: {
            trigger: 'axis',
            formatter: (params) => {
              let str = '';
              params.forEach((item) => {
                str = item.name + '<br>'
                for (let i = 0; i < params.length; i++) {
                  str += params[i].marker + this.$i18n.t('report.trading_total') + ': ' + params[i].value + ' ' + params[i].seriesName + '<br>'
                      + params[i].marker + this.$i18n.t('report.total_paid') + ': ' + data.list[i].totalList[item.dataIndex] + '<br>'
                }
              })
              return str;
            },
            axisPointer: {
              animation: false
            },
          },
          axisPointer: {
            link: [
              {
                xAxisIndex: 'all'
              }
            ]
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: data.labels,
          },
          legend: {
            data: data.tags,
          },
          series: arr,
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
      this.declineChart = this.$echarts.init(this.$refs.declineReport);
      this.loading = true
      declineReport(this.declineParams).then(res => {
        const {data} = res;
        // 设置option
        this.declineOption = {
          ...this.lineOption,
          title: {
            text: this.$i18n.t('report.dishonor_rate'),
            subtext: this.$i18n.t('report.dishonor_rate_remark'),
          },
          tooltip: {
            trigger: 'axis',
            formatter: (params) => {
              let str = '';
              params.forEach((item) => {
                str = item.name + '<br>'
                    + item.marker + this.$i18n.t('report.dishonor_rate') + ': ' + item.value + '%'  + '<br>'
                    + item.marker + this.$i18n.t('report.total_declined') + ': ' + data.reserve[item.dataIndex] + '<br>'
                    + item.marker + this.$i18n.t('report.total_paid') + ': ' + data.totals[item.dataIndex];

              })
              return str;
            },
            axisPointer: {
              animation: false
            },
          },
          dataZoom: false,
          visualMap: {
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 1.5,
            color: ['#d94e5d', '#eac736', '#1cad18']
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: data.labels,
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}%'
            }
          },
          series: [
            {
              name: this.$i18n.t('report.dishonor_rate'),
              data: data.list,
              type: 'line',
              showSymbol: false,
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
      this.refundChart = this.$echarts.init(this.$refs.refundReport);
      this.loading = true
      // 获取数据
      refundReport(this.refundParams).then(res => {
        const {data} = res;
        let arr = this.dataCleansing(data);
        // 设置option
        this.refundOption = {
          ...this.lineOption,
          title: {
            text: this.$i18n.t('report.refund'),
            subtext: this.$i18n.t('report.refund_remark'),
          },
          tooltip: {
            trigger: 'axis',
            formatter: (params) => {
              let str = '';
              params.forEach((item) => {
                str = item.name + '<br>'
                for (let i = 0; i < params.length; i++) {
                  str += params[i].marker + this.$i18n.t('report.refund_amount') + ': ' + params[i].value + ' ' + params[i].seriesName + '<br>'
                      + params[i].marker + this.$i18n.t('report.total_refund') + ': ' + data.list[i].totalList[item.dataIndex] + '<br>'
                }
              })
              return str;
            },
            axisPointer: {
              animation: false
            },
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: data.labels,
          },
          legend: {
            data: data.tags,
          },
          series: arr,
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
      this.reportParams.days = "d_thirty";
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
    // 切换语言时再次渲染
    refreshEcharts() {
      this.payOption.title.text = this.$i18n.t('report.successful_payment');
      this.payOption.title.subtext = this.$i18n.t('report.successful_payment_remark');
      this.payChart.setOption(this.payOption);

      this.declineOption.title.text = this.$i18n.t('report.dishonor_rate');
      this.declineOption.title.subtext = this.$i18n.t('report.dishonor_rate_remark');
      this.declineChart.setOption(this.declineOption);

      this.refundOption.title.text = this.$i18n.t('report.refund');
      this.refundOption.title.subtext = this.$i18n.t('report.refund_remark');
      this.refundChart.setOption(this.refundOption);

    },
    // 整理数据
    dataCleansing(data) {
      let arr = [];
      data.list.forEach(item => {
        let sere = {};
        let da = [];
        item.dataList.forEach(d => {
          da.push(d);
        })
        sere.name = item.name,
            sere.data = da,
            sere.areaStyle = {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: this.colors[data.list.indexOf(item)]
                },
                {
                  offset: 1,
                  color: 'rgb(255, 255, 255)'
                }
              ])
            },
            sere.type = 'line',
            sere.showSymbol = false,
            arr.push(sere);
      });
      return arr;
    }

  }
};
</script>
<style scoped>

</style>
