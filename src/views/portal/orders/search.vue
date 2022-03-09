<template>
  <div>
    <SearchBox :params="searchParams" @search="search"></SearchBox>
    <div class="wrap-tab p-0">
      <el-skeleton :rows="15" animated :loading="loading">
        <template>
          <el-card class="box-card box-pane" shadow="never" :body-style="{ padding: '0px' }">
            <div class="row">
              <el-tabs class="col-6 mr-n3" v-model="paneName" type="border-card"
                       @tab-click="paneClick">
                <el-tab-pane :label="$t('comm.all')" name="all"></el-tab-pane>
                <el-tab-pane :label="$t('status.paid')" name="paid"></el-tab-pane>
                <el-tab-pane :label="$t('status.pending')" name="pending"></el-tab-pane>
                <el-tab-pane :label="$t('status.failed')" name="failed"></el-tab-pane>
                <el-tab-pane :label="$t('status.canceled')" name="canceled"></el-tab-pane>
              </el-tabs>
              <div class="col-6 text-right " style="background-color: #F5F7FA">
                <div class="mr-5 mt-1 mb-1">
                  <el-button icon="el-icon-download" size="mini"
                             @click="downOrders" plain>{{ $t('comm.download') }}
                  </el-button>
                </div>
              </div>
            </div>
            <el-table
                :class="tabData.list.length ? '' : 'wpy-z-table'"
                :data="tabData.list"
                :header-row-style="{background:'#2C2E2F'}"
                style="width: 100%">
              <el-table-column
                  prop="trade_id,merchant_order_no"
                  :label="$t('order.trade_id_and_order_no')" width="210px">
                <template v-slot="scope">
                  <router-link :to="{name: 'order_detail',params:{id:scope.row.trade_id}}"
                               class="btn-link">
                    {{ scope.row.trade_id }}
                  </router-link>
                  <br/>
                  {{ scope.row.merchant_order_no }}
                </template>
              </el-table-column>
              <el-table-column
                  :show-overflow-tooltip="true"
                  width="160"
                  :label="$t('order.card_and_email')">
                <template v-slot="scope">
                            <span v-if="scope.row.last4">
                                •••• {{ scope.row.last4 }}<br/>
                            </span>
                  <span v-else> -- <br/></span>
                  <el-popover
                      placement="top"
                      width="260"
                      title="Email"
                      trigger="hover"
                      :content="scope.row.email">
                    <span slot="reference">
                         {{ scope.row.email }}
                    </span>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                  :label="$t('order.order_amount_settle_amount')">
                <template v-slot="scope">
                  {{ scope.row.order_amount }} {{ scope.row.order_currency }}<br/>
                  {{ scope.row.settle_amount }} {{ scope.row.settle_currency }}
                </template>
              </el-table-column>
              <el-table-column
                  :label="$t('order.card_brand')" width="60px">
                <template v-slot="scope">
                   <span v-if="scope.row.card_brand"
                         class="card-brand"
                         :class="['cb-' + scope.row.card_brand]"></span>
                  <span v-else> -- </span>
                </template>
              </el-table-column>
              <el-table-column
                  prop="pay_status"
                  width="90px"
                  :label="$t('comm.status')">
                <template v-slot="scope">
                  <span v-if="scope.row.pay_status === 'failed'" class="pay-status pay-status-help"
                        :class="['ps-' + scope.row.pay_status]">
                      <el-popover
                          placement="top"
                          width="400"
                          :title="scope.row.merchant_order_no"
                          trigger="hover"
                          :content="scope.row.fail_message">
                          <span slot="reference">
                              {{ scope.row.pay_status | payStatus }}
                          </span>
                      </el-popover>
                  </span>
                  <span v-else-if="scope.row.pay_status === 'unpaid' && scope.row.wtp3d == 1"
                        class="pay-status"
                        :class="['ps-' + scope.row.pay_status]">
                    {{ $t('status.3DPay') }}
                  </span>
                  <span v-else-if="scope.row.pay_status === 'canceled'"
                        class="pay-status pay-status-help"
                        :class="['ps-' + scope.row.pay_status]">
                        <el-popover
                            placement="top"
                            width="400"
                            :title="scope.row.merchant_order_no"
                            trigger="hover"
                            :content="scope.row.order_reason">
                            <span slot="reference">
                                {{ scope.row.pay_status | payStatus }}
                            </span>
                        </el-popover>
                  </span>
                  <span v-else class="pay-status" :class="['ps-' + scope.row.pay_status]">
                    {{ scope.row.pay_status | payStatus }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                  prop="pay_status"
                  :width="lang === 'zh' ? '50px' : 'auto'"
                  :label="$t('kind.chargeback')">
                <template v-slot="scope">
                  <span :class="'declined-' + scope.row.declined">{{ scope.row.declined | yesOrNo }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  prop="site_url,ip"
                  :show-overflow-tooltip="true"
                  :label="$t('order.url_and_ip')">
                <template v-slot="scope">
                  {{ scope.row.site_url }}<br/>
                  {{ scope.row.ip }}
                </template>
              </el-table-column>
              <el-table-column
                  :label="$t('order.create_time_payment_time')">
                <template v-slot="scope">
                  {{ scope.row.created_time | toDayTime }}<br/>
                  {{ scope.row.payment_time | toDayTime }}
                </template>
              </el-table-column>
              <el-table-column width="50" fixed="right">
                <template v-slot="scope">
                  <el-dropdown trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        <i class="el-icon-more"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-if="scope.row.refunded !== 1 && scope.row.pay_status === 'paid'"
                                        :command="commandVal('refund', scope.row, scope.$index)">
                        {{ $t('kind.refund') }}
                      </el-dropdown-item>
                      <el-dropdown-item :command="commandVal('detail', scope.row, scope.$index)">
                        {{ $t('comm.view_detail') }}
                      </el-dropdown-item>
                      <el-dropdown-item v-if="scope.row.pay_status === 'pending'"
                                        :command="commandVal('cancel_pending', scope.row)">
                        {{ $t('order.cancel_pending') }}
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>

            <Pagination :page="tabData.page" @change="pageChange"></Pagination>
          </el-card>
        </template>
      </el-skeleton>

      <!--    d    -->
      <RefundDialog ref="refund_dialog"></RefundDialog>
      <CancelPendingDialog ref="cancel_pending_dialog"></CancelPendingDialog>
    </div>
  </div>
</template>

<script>
import configs from '@/configs'
import SearchBox from "@/components/SearchBox";
import RefundDialog from "@/components/RefundDialog";
import Pagination from "@/components/Pagination";
import {ordersDownload, ordersSearch} from "@/service/orderSer";
import {mapState} from "vuex";
import CancelPendingDialog from "@/components/CancelPendingDialog";
import {isEmpty} from "@/utils/validate";
import {parseTime} from "@/utils";

export default {
  name: "trade_manage",
  components: {CancelPendingDialog, SearchBox, Pagination, RefundDialog},
  computed: { //watch跟踪数据变化, 重点user, configs
    ...mapState({
      lang: state => state.app.lang,//多语言
    }),
    configs() {
      return configs;
    },
  },
  data() {
    return {
      loading: false,
      searchParams: {
        title: 'nav.trade_manage',
        page: 1,
        trade_id: '',
        merchant_order_no: '',
        pay_status: '',
        search_date: '',
        email: '',
        site_url: '',
        ip: '',
        card_brand: ''
      },
      tabData: {list: [], page: {count: 0, page_num: 0, total: 0}},
      paneName: 'paid', //默认 从all改为paid(应需求)
    }
  },
  mounted() {
    this.searchParams.pay_status = this.paneName
    //默认页面搜索近三个月数据
    const currentTime = new Date().getTime()
    this.searchParams.search_date = [parseTime(currentTime - 3600 * 1000 * 24 * 90, '{y}-{m}-{d}')
      , parseTime(currentTime, '{y}-{m}-{d}')]
    this.search();
  },
  methods: {
    paneClick(tab) {
      this.searchParams.page = 1;//重置页码
      //清trade_id,merchant_order_no 搜索条件
      if (this.paneName !== 'all') {
        this.searchParams.trade_id = ''
        this.searchParams.merchant_order_no = ''
      }
      this.paneName = tab.name
      this.searchParams.pay_status = tab.name //搜索对应status
      this.search()
    },
    pageChange(page) {
      if (this.searchParams.pay_status === '' || this.searchParams.pay_status === null) {
        this.searchParams.pay_status = this.paneName;
      }
      this.search(page.page_num)
    },
    search(pageNum) {
      if (this.searchParams.pay_status === '' || this.searchParams.pay_status === null) {
        this.paneName = 'all'
      }
      if (pageNum === undefined || isEmpty(pageNum)) {
        pageNum = 1
      } else if (!isEmpty(pageNum) && pageNum === 'keep') {
        //keep 可能只是重载数据页面
        pageNum = this.searchParams.page
      }
      this.searchParams.page = pageNum
      this.loading = true
      if (!isEmpty(this.searchParams.pay_status)) {
        this.paneName = this.searchParams.pay_status
      }
      ordersSearch(this.searchParams).then(res => {
        const {data} = res
        this.$data.tabData = data
        this.searchParams.pay_status = '';  //每次查询后搜索栏状态重置,适应商户习惯
      }).finally(() => {
        this.loading = false
      })
    },
    openRefundDialog(row) {
      this.$refs.refund_dialog.show(row)
    },
    openCancelPendingDialog(row) {
      this.$refs.cancel_pending_dialog.show(row, this.search)
    },
    commandVal(action, row, index) {
      return {action: action, row: row, index: index}
    },
    handleCommand(command) {
      let row = command.row
      switch (command.action) {
        case 'refund':
          this.openRefundDialog(row)
          break;
        case 'detail':
          this.$router.push({name: 'order_detail', params: {id: row.trade_id}})
          break;
        case 'cancel_pending':
          this.openCancelPendingDialog(row)
          break;
      }
    },
    downOrders() {
      //页面效果,正在加载中
      this.$data.loading = true
      //搜索栏状态重置,判断
      if (this.searchParams.pay_status === '' || this.searchParams.pay_status === null) {
        this.searchParams.pay_status = this.paneName;
      }
      ordersDownload(this.searchParams).then(() => {
        this.$message.success(this.$i18n.t('comm.success').toString())
        this.search();
      }).finally(() => {
        this.$data.loading = false
      })
    },
  },
}
</script>

<style scoped>

</style>
