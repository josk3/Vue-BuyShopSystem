<template>
  <div v-loading="loading">
    <div class="content" id="app">
    <div>
      <div style="margin-top: 15px">
        <div style="font-size: 20px; font-size: large; font-weight: bold">
          {{ $t('nav.data_statistics') }}
          <el-link icon="el-icon-edit" type="primary" @click="showMyCards">{{ $t('comm.edit') }}</el-link>
        </div>
      </div>
      <div class="row" style="margin-top: 10px">
        <!-- 成功交易统计 -->
        <div class="col-xl-auto mb-3" v-show="perm_can_view_paid_report" v-loading="paidLoading">
          <el-card class="box-card">
            <div class="header">
              <SearchBox class="search-box" ref="searchForm" :params="paidParams" @search="getPaidReport" ></SearchBox>
            </div>
            <div class="chart-item">
              <div id="paidAmountReport" ref="paidAmountReport" :style="paidStyle"></div>
            </div>
          </el-card>
        </div>
        <!-- 退款统计 -->
        <div class="col-xl-auto mb-3" v-show="perm_can_view_refund_report" v-loading="refundLoading">
          <el-card class="box-card">
            <div class="header">
              <SearchBox class="search-box" :params="refundParams" @search="getRefundReport"></SearchBox>
            </div>
            <div class="chart-item">
              <div id="refundReport" ref="refundReport" :style="paidStyle"></div>
            </div>
          </el-card>
        </div>
        <!-- 拒付统计-->
        <div class="col-xl-6 mb-3" v-show="perm_can_view_decline_report" v-loading="declinedLoading">
          <el-card class="box-card">
            <div class="chart-item">
              <div id="declineReport" ref="declineReport" :style="declineStyle"></div>
            </div>
          </el-card>
        </div>
        <!-- 交易量前十的网站-->
        <div class="col-xl-6 mb-3" v-show="perm_can_view_top10_site_report" v-loading="top10SitesLoading">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <div class="mb-1 row">
                <div class="col-12" style="font-weight: bold; font-size: 18px; color: #464646">{{ $t('report.top_10_sites_by_volume') }}</div>
                <small class="col-12" style="font-size: 6px; color: #6e7079">{{ $t('report.ranking_of_the_last_30_days') }}</small>
              </div>
            </div>
            <div class="mb-1 row">
              <el-table
                  :data="webSiteList"
                  style="width: 100%">
                <el-table-column
                    prop="label"
                    :label="$t('report.ranking')"
                    cell-style="center"
                    width="80px">
                </el-table-column>
                <el-table-column
                    prop="value"
                    :label="$t('comm.site_url')">
                </el-table-column>
                <el-table-column
                    prop="count"
                    :label="$t('report.trading_volume')">
                </el-table-column>
                <el-table-column width="85px">
                  <template slot="header">
                    <el-popover placement="top-start" width="520" trigger="hover" :content="$t('report.country_remark')">
                      <span slot="reference">{{ $t('report.country') }} <i class="el-icon-warning-outline"></i></span>
                    </el-popover>
                  </template>
                  <template v-slot="scope">
                    <el-button size="mini" type="default"
                               @click="viewTheCountryBar(scope.$index, scope.row)">{{ $t('comm.view') }}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </div>
      </div>
      <el-dialog
          :title="dialogTitle"
          :visible.sync="countryBarDialog"
          width="40%"
          center>
        <el-card class="box-card" v-loading="countriesLoading">
          <div class="chart-item">
            <div id="countryBar" :style="paidStyle"></div>
          </div>
        </el-card>
      </el-dialog>
      <el-dialog
          :title="this.$i18n.t('nav.data_statistics')"
          :visible.sync="myCardsDialog"
          width="30%">
        <div>
          <el-form ref="reportParams" :model="reportParams">
            <template>
              <el-card class="el-col-24 mb-3">
                <div slot="header" class="clearfix">
                  <span>{{ $t('report.select_cards_to_display') }}</span>
                </div>
                <el-form-item  prop="role_perm">
                  <el-checkbox-group v-model="reportCards" size="mini">
                    <div class="el-col-10" v-for="card in allCards" :key="card.index" >
                      <el-checkbox :label="card.name" :value="card.value" name="card">
                        <div shadow="always">
                          {{ $t('nav.' + card.name) }}
                        </div>
                      </el-checkbox>
                    </div>
                  </el-checkbox-group>
                </el-form-item>
              </el-card>
            </template>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer" v-loading="loading">
          <el-button size="mini" @click="closeMyCards()">{{$t('comm.cancel')}}</el-button>
          <el-button size="mini" type="primary" @click="submitMyCards()" class="ml-3">
            {{$t('comm.sure')}}
          </el-button>
        </div>
      </el-dialog>
      <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
  </div>
  </div>

</template>
<script>
import {
  paidReport,
  declineReport,
  refundReport,
  top10SiteReport,
  viewTheCountries,
  makeMyReportCards,
  searchMyCards
} from "@/service/reportSer";
// import {isEmpty} from "@/utils/validate";
import {mapState} from "vuex";
import configs from "@/configs";
import SearchBox from "@/components/SearchBox";
import {parseTime} from "@/utils";
import echarts from "@/echarts.min";
import {isArray, isEmpty} from "@/utils/validate";
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
        height: '350px',
        width: '455px',
        position: 'relative'
      }
    },
    declineStyle() {
      return {
        height: '413px',
        width: '455px',
        position: 'relative'
      }
    },
  },
  data() {
    return {
      loading: false,
      paidLoading: false,
      refundLoading: false,
      declinedLoading: false,
      top10SitesLoading: false,
      countriesLoading: false,
      colors:  ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de','#3ba272', '#fc8452', '#9a60b4','#ea7ccc'],
      reportParams: {
        days: "",
      },
      reportCards: [],
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
      dialogTitle: "",
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
      myCardsDialog: false,
      allCards: [],
      myCards: [],
    }
  },
  //start_load_data不定义可正常使用
  // 页面初始化挂载dom
  mounted() {
    // 设置默认搜索时间
    const currentTime = new Date().getTime()
    let defaultSearchDate = [parseTime(currentTime - 3600 * 1000 * 24 * 31,
        '{y}-{m}-{d}'), parseTime(currentTime, '{y}-{m}-{d}')]
    this.paidParams.search_date = defaultSearchDate
    this.refundParams.search_date = defaultSearchDate
    // 获取数据报表
    this.getMyCards();
  },
  watch: {
    '$i18n.locale' () {
      // echarts切换语言需要重新setOption
      this.refreshEcharts()
    },
  },
  methods: {
    // 获取我的卡组
    getMyCards() {
      searchMyCards().then(res => {
        const {data} = res
        if (data === undefined || data === '' || data === null) {
          new Error('401')
        } else {
          // 有数据 则根据获取得到的列表展示相应卡片
          this.myCards = data.myCards;
          this.reportCards = data.myCards;
          this.allCards = data.allCards;
          if (!isEmpty(this.myCards) && isArray(this.myCards)) {
            this.getLoadEcharts();
          }
        }
      })
    },
    // 自定义卡组
    submitMyCards() {
      if (isEmpty(this.reportCards) || this.reportCards.length <= 0) {
        this.$message.warning(this.$i18n.t('report.please_select_cards').toString())
      } else {
        makeMyReportCards({'cards': this.reportCards}).then(res => {
          this.$message.success(this.$i18n.t('comm.success').toString());
          this.closeMyCards();
          this.getMyCards();
        }).catch((e) => {
          this.$data.errorMsg = e.message
        })
      }
    },
    // 根据卡组判定卡片是否展示
    getLoadEcharts() {
      this.loading = true;
      if (this.myCards.includes(configs.reportCards.paid_report)) {
        this.perm_can_view_paid_report = true;
        this.getPaidReport();
      } else {
        this.perm_can_view_paid_report = false;
      }
      if (this.myCards.includes(configs.reportCards.refund_report)) {
        this.perm_can_view_refund_report = true;
        this.getRefundReport();
      } else {
        this.perm_can_view_refund_report = false;
      }
      if (this.myCards.includes(configs.reportCards.decline_report)) {
        this.perm_can_view_decline_report = true;
        this.getDeclineReport();
      } else {
        this.perm_can_view_decline_report = false;
      }
      if (this.myCards.includes(configs.reportCards.top10_site_report)) {
        this.perm_can_view_top10_site_report = true;
        this.getTop10SiteReport();
      } else {
        this.perm_can_view_top10_site_report = false;
      }
      this.loading = false;
    },
    // 成功支付
    getPaidReport() {
      this.paidLoading = true;
      // 销毁已渲染图表
      if (this.payChart != null && this.payChart !== "" && this.payChart !== undefined) {
        this.payChart.dispose();
      }
      // 初始化
      this.payChart = echarts.init(this.$refs.paidAmountReport);
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
        this.paidLoading = false;
      })
    },
    // 拒付率
    getDeclineReport() {
      this.declinedLoading = true;
      // 销毁已渲染图表
      if (this.declineChart != null && this.declineChart !== "" && this.declineChart !== undefined) {
        this.declineChart.dispose();
      }
      // 初始化
      this.declineChart = echarts.init(this.$refs.declineReport);
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
                    + item.marker + this.$i18n.t('report.dishonor_rate') + ': ' + this.rateText(item.value) + '<br>'
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
        this.declinedLoading = false;
      })
    },
    // 退款
    getRefundReport() {
      this.refundLoading = true;
      // 销毁已渲染图表
      if (this.refundChart != null && this.refundChart !== "" && this.refundChart !== undefined) {
        this.refundChart.dispose();
      }
      // 初始化
      this.refundChart = echarts.init(this.$refs.refundReport);
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
        this.refundLoading = false;
      })
    },
    // top10网站
    getTop10SiteReport() {
      this.top10SitesLoading = true
      top10SiteReport().then(res => {
        const {data} = res
        this.webSiteList = data;
      }).finally(() => {
        this.top10SitesLoading = false
      })
    },
    // 交易国家占比详情
    viewTheCountryBar(index, row) {
      this.countryBarDialog = true;
      this.dialogTitle = row.value;
      this.countriesLoading = true
      this.reportParams.days = "d_thirty";
      this.reportParams.website = row.value;
      viewTheCountries(this.reportParams).then(res => {
        const {data} = res;
        let bodyData = []
        let array = data.list;
        array.forEach(item => {
          bodyData.push({name: item.name, value: item.value});
        })
        let myChart = echarts.init(
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
            left: 'right',
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
        this.countriesLoading = false
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

      this.$i18n.t('report.select_cards_to_display');
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
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
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
    },
    // 展示卡片弹窗
    showMyCards() {
      this.myCardsDialog = true;
    },
    // 关闭弹窗
    closeMyCards() {
      this.myCardsDialog = false;
    },
    rateText(value) {
      if (value === "0") {
        return value + '%';
      }
      return (value * 1).toFixed(4) + '%';
    },
  },
};
</script>
<style scoped>
::v-deep .p-3 {
  padding: 0.4rem!important;
}
::v-deep .col-xl-auto , .el-main {
  width: 527px;
}
</style>
