<template>
  <div>
    <SearchBox :params="searchParams" :date_clearable="false" @search="search"></SearchBox>
    <div class="wrap-tab p-0">
      <el-skeleton :rows="15" animated :loading="loading">
        <template>
          <el-card class="box-card box-pane" shadow="never" :body-style="{ padding: '0px' }">
            <div class="row">
              <div class="col-8 pr-0">
                <el-tabs v-model="paneName" type="border-card"
                         @tab-click="paneClick">
                  <el-tab-pane :label="$t('comm.all')" name="all"></el-tab-pane>
                  <el-tab-pane :label="$t('kind.sale')" name="sale"></el-tab-pane>
                  <el-tab-pane :label="$t('kind.settle')" name="settle"></el-tab-pane>
                  <el-tab-pane :label="$t('kind.refund')" name="refund"></el-tab-pane>
                  <el-tab-pane :label="$t('kind.chargeback')" name="chargeback"></el-tab-pane>
                  <el-tab-pane :label="$t('kind.deposit')" name="depositSettle"></el-tab-pane>
                  <el-tab-pane :label="$t('kind.declineEarlyWarning')" name="declineEarlyWarning"></el-tab-pane>
                </el-tabs>
              </div>
              <div class="col-4 text-right p-0" style="background-color: #F5F7FA">
                <div class="mr-5 mt-1">
                  <el-button icon="el-icon-download" size="mini"
                             @click="downFinance" plain>{{ $t('comm.download') }}
                  </el-button>
                </div>
              </div>
            </div>
            <FinanceTable :tab_data="tabData" :search_date="searchParams.search_date" @page_change="pageChange($event)" page_kind="finance"></FinanceTable>
          </el-card>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script>
import configs from '@/configs'
import SearchBox from "@/components/SearchBox";
import {financeDownload, financeSearch} from "@/service/financeSer";
import {isEmpty} from "@/utils/validate";
import FinanceTable from "@/components/FinanceTable";
import {parseTime} from "@/utils";

export default {
  name: "finance",
  components: {FinanceTable, SearchBox},
  computed: { //watch跟踪数据变化, 重点user, configs
    configs() {
      return configs;
    },
  },
  data() {
    return {
      loading: false,
      searchParams: {
        title: 'nav.finance_search', page: 1,
        trade_id: '', merchant_order_no: '', search_date: '',
        trade_batch_id: '', deposit_batch_id: '', trade_settled: '', deposit_settled: '', site_url: '',
      },
      tabData: {list: [], page: {count: 0, page_num: 0, total: 0}},
      paneName: 'all', //默认
    }
  },
  beforeRouteLeave: function (to, from, next) {
    // 离开当前路由 或 详细界面时候 清空bus值
    if (to.name !== 'order_detail' && to.name !== 'finance_search') {
      const currentTime = new Date().getTime()
      this.$bus.search_date = [parseTime(currentTime - 3600 * 1000 * 24 * 31, '{y}-{m}-{d}')
        , parseTime(currentTime, '{y}-{m}-{d}')]
    }
    next() 
  },
  mounted() {
    if (!isEmpty(this.$route.params)) {
      if (!isEmpty(this.$route.params.batch_id)) {
        this.searchParams.batch_id = this.$route.params.batch_id
      }
    }
    this.searchParams.finance_status = this.paneName

    // 默认页面搜索近1个月数据, 如果存在bus事件则优先取bus
    const currentTime = new Date().getTime()
    this.searchParams.search_date = [parseTime(currentTime - 3600 * 1000 * 24 * 31, '{y}-{m}-{d}')
      , parseTime(currentTime, '{y}-{m}-{d}')]
    if (this.$bus.search_date) this.searchParams.search_date = this.$bus.search_date
    this.search()
  },
  beforeCreate() {
    this.$bus.$on('search_date', function (date) {
      this.$bus.search_date = date
    })
  },
  methods: {
    paneClick(tab) {
      this.searchParams.page = 1;//重置页码
      this.paneName = tab.name
      this.searchParams.finance_status = tab.name //搜索对应status
      this.search()
    },
    pageChange(page) {
      this.search(page.page_num)
    },
    search(pageNum) {
      if (pageNum === undefined || isEmpty(pageNum)) {
        pageNum = 1
      } else if (!isEmpty(pageNum) && pageNum === 'keep') {
        //keep 可能只是重载数据页面
        pageNum = this.searchParams.page
      }
      this.searchParams.page = pageNum
      this.loading = true
      financeSearch(this.searchParams).then(res => {
        const {data} = res
        this.$data.tabData = data
      }).finally(() => {
        this.loading = false
      })
    },
    downFinance() {
      this.loading = true
      financeDownload(this.searchParams).then(() => {
        this.$message.success(this.$i18n.t('comm.success').toString())
      }).catch((res) => {
        if (!isEmpty(res.response) && !isEmpty(res.response.headers['x-error-msg'])) {
          this.$message.error((decodeURIComponent(res.response.headers['x-error-msg'])))
        }
      }).finally(() => {
        this.loading = false
      })
    },
  },
}
</script>

<style scoped>

</style>
