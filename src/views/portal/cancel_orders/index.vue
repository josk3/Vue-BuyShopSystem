<template>
  <div v-loading="loading">
    <div class="cancel_orders">
      <SearchBox :params="searchParams" @search="search"></SearchBox>
      <div class="wrap-tab p-0">
        <!--                -->
        <el-card class="box-card box-pane" shadow="never" :body-style="{ padding: '0px' }">
          <div class="row">
            <div class="col-6 pr-0" style="background-color: #F5F7FA">
              <el-tabs type="border-card">
              </el-tabs>
            </div>
          </div>
          <el-table
              :class="tabData.list.length ? '' : 'wpy-z-table'"
              :data="tabData.list"
              size="mini"
              :header-row-style="{background:'#2C2E2F'}"
              style="width: 100%">
            <el-table-column :label="$t('comm.merchant_order_no')" width="180">
              <template v-slot="scope">
                <span>
                  {{ scope.row.merchant_order_no }}
                </span>
                <small v-if="scope.row.trade_id">
                  <br/>{{ scope.row.trade_id }}
                </small>
              </template>
            </el-table-column>
            <el-table-column
                width="190"
                :label="$t('shop.domain') + '/' + $t('comm.email')">
              <template v-slot="scope">
                {{ scope.row.referer_url }}
                <br/>
                <small style="color: #cbcbcb">{{ scope.row.bill_address.email }}</small>
              </template>
            </el-table-column>
            <el-table-column :label="$t('comm.reason')">
              <template v-slot="scope">
                {{ scope.row.reason }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.reason_code')" width="90">
              <template v-slot="scope">
                {{ scope.row.reason_code }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.order_trade_amount')" width="120">
              <template v-slot="scope">
                {{ scope.row.pay_base_info.amount }}
                {{ scope.row.pay_base_info.currency }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('comm.created')" width="120">
              <template v-slot="scope">
                {{ scope.row.created|toDayTime }}
              </template>
            </el-table-column>
          </el-table>

          <Pagination :page="tabData.page" @change="pageChange"></Pagination>
        </el-card>

        <!--                -->
      </div>
    </div>
  </div>
</template>

<script>
import configs from '@/configs'
import SearchBox from "@/components/SearchBox";
import Pagination from "@/components/Pagination";
import {mapState} from "vuex";
import {cancelOrdersSearch} from "@/service/cancelOrdersSer";
import {isEmpty} from "@/utils/validate";

export default {
  name: "cancel_orders",
  components: {SearchBox, Pagination},
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
      errorMsg: '',
      searchParams: {
        title: 'nav.cancel_orders', page: 1, merchant_order_no: '', search_date: ''
      },
      tabData: {list: [], page: {count: 0, page_num: 0, total: 0}},
      //
    }
  },
  mounted() {
    this.search();
  },
  methods: {
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
      cancelOrdersSearch(this.searchParams).then(res => {
        const {data} = res
        this.$data.tabData = data
      }).finally(() => {
        this.loading = false
      })

    },

  },
}
</script>

<style>
</style>
