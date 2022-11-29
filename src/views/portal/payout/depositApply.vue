<template>
  <div v-loading="loading">

    <div class="wrap-tab p-0">

      <el-tabs v-model="paneName" type="border-card" class="mt-2"
               @tab-click="paneClick">
        <el-tab-pane :label="$t('payout.deposit_apply')" name="apply">
          <h6>
            {{ $t("account.settle_cycle") }}: {{ previewData.settle_day }}
          </h6>
          <el-row v-if="previewData.list.length > 0" :gutter="20">
            <el-col :span="18">
              <el-card v-for="summaryData in previewData.list" shadow="never"
                       :key="summaryData.currency"
                       class="search-box wpy-card box-card mb-2" style="background-color: rgb(233, 239, 244)">
                <div slot="header" class="clearfix">
                  <span>{{ summaryData.currency }}</span>
                </div>
                <div>
                  <el-table v-if="summaryData.groups"
                            :class="summaryData.groups ? '' : 'wpy-z-table'"
                            :data="summaryData.groups">
                    <el-table-column property="kind" :show-overflow-tooltip="true" :label="$t('comm.type')">
                      <template v-slot="scope">
                        {{ scope.row.kind | payoutKind }}
                      </template>
                    </el-table-column>
                    <el-table-column property="currency" :label="$t('comm.currency')"></el-table-column>
                    <el-table-column property="deposit_charge"
                                     :label="$t('comm.deposit_balance')"></el-table-column>
                  </el-table>

                  <div v-if="summaryData.payout" class="box-white">
                    <ul class="table-billing-total">
                      <li>
                        <span>
                          <strong>{{ $t('comm.summary_total') }}</strong>
                            <small>({{ $t('payout.settle_table_item_list_total') }})</small>
                        </span>
                        <span class="bill-amount">
                          {{ summaryData.payout.total|numberToLocalStr }} {{ summaryData.currency|currencySymbol }}
                        </span>
                      </li>
                      <li v-if="!checkIsEmpty(summaryData.payout.debt_amount)">
                        <span>
                          <strong>{{ $t('settle.debt_amount') }}</strong>
                        </span>
                        <span class="bill-amount">
                          <span>
                            {{ summaryData.payout.debt_amount|numberToLocalStr }}
                             {{ summaryData.currency|currencySymbol }}
                          </span>
                        </span>
                      </li>
                      <li>
                        <span>
                          <strong>{{ $t('settle.payout_fees') }}</strong>
                        </span>
                        <span class="bill-amount">
                          <span>
                            {{ summaryData.payout.fees|numberToLocalStr }} {{ summaryData.currency|currencySymbol }}
                          </span>
                        </span>
                      </li>
                      <li>
                        <hr class="pt-1 pb-1">
                        <span>
                          <strong>{{ $t('payout.predict_net_amount') }}:</strong>
                        </span>
                        <span class="bill-amount" style="font-size: 21px; color: rgb(0, 0, 0);">
                          {{ summaryData.payout.net_amount|numberToLocalStr }} {{ summaryData.currency|currencySymbol }}
                          <small>{{ summaryData.currency }}</small>
                        </span>
                      </li>
                    </ul>
                    <p class="text-center">
                      <el-button v-if="summaryData.payout.fees === 0"
                                 @click="submitApply(summaryData.currency)"
                                 type="primary" size="small">
                        {{ $t('payout.submit_apply') }}
                      </el-button>
                      <el-popconfirm v-else
                                     @confirm="submitApply(summaryData.currency)"
                                     :title="$t('settle.payout_fees') + ' : ' + summaryData.payout.fees + ' '+summaryData.currency">
                        <el-button type="primary" size="small" slot="reference">
                          {{ $t('payout.submit_apply') }}
                          ({{ $t('settle.payout_fees') }}
                          {{ summaryData.payout.fees }}{{ summaryData.currency|currencySymbol }})
                        </el-button>
                      </el-popconfirm>
                    </p>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <div class="p-0" style="height: 200px;">
                <el-steps :active="1" direction="vertical">
                  <el-step>
                    <div slot="title">
                      <small style="font-size: 10px">{{ $t('comm.submit') }}{{ $t('payout.deposit_apply') }}</small>
                    </div>
                  </el-step>
                  <el-step>
                    <div slot="title">
                      <small style="font-size: 10px">{{ $t('comm.generate_settle_batch') }}</small>
                    </div>
                  </el-step>
                  <el-step>
                    <div slot="title">
                      <small style="font-size: 10px">{{ $t('comm.payout') }}</small>
                    </div>
                  </el-step>
                </el-steps>
              </div>
            </el-col>
          </el-row>
          <el-result v-if="previewData.list.length === 0" icon="info"
                     :title="$t('comm.not_find_record')" :subTitle="$t('payout.has_apply_or_nothing_deposit')">
            <template slot="extra">
              <el-button type="primary" size="small" @click="paneClickHistory()">
                {{ $t('comm.view') }}{{ $t('payout.deposit_apply_history') }}
              </el-button>
            </template>
          </el-result>
        </el-tab-pane>
        <el-tab-pane name="history">
          <span slot="label"><i class="el-icon-tickets"></i> {{ $t('payout.deposit_apply_history') }}</span>
          <el-table
              :class="tabData.list.length ? '' : 'wpy-z-table'"
              :data="tabData.list"
              :header-row-style="{background:'#2C2E2F'}"
              style="width: 100%">
            <el-table-column
                prop="mer_no" width="80"
                :label="$t('user.mer_no')">
            </el-table-column>
            <el-table-column
                prop="currency" width="80"
                :label="$t('comm.currency')">
            </el-table-column>
            <el-table-column
                prop="settle_day" width="120"
                :label="$t('comm.settle_day')">
            </el-table-column>
            <el-table-column
                prop="net_amount"
                :label="$t('settle.net_amount')">
              <template v-slot="scope">
                <span v-if="scope.row.batch_id">
                  {{ $t('comm.batch_id') }} : <br/><b>{{ scope.row.batch_id }}</b>
                </span>
                <span v-else>{{ scope.row.net_amount }}</span>
              </template>
            </el-table-column>
            <el-table-column
                prop="settle_fee" width="80"
                :label="$t('comm.fees')">
              <template v-slot="scope">
                <span v-if="scope.row.settle_fee !== 0">
                  {{ scope.row.settle_fee }}
                </span>
                <span v-else> -- </span>
              </template>
            </el-table-column>
            <el-table-column
                prop="created"
                :label="$t('comm.apply_time')">
              <template v-slot="scope">
                {{ scope.row.created | toMinuteTime }}
              </template>
            </el-table-column>
            <el-table-column
                prop="review_status"
                :label="$t('comm.status')">
              <template v-slot="scope">
                <i v-if="'deposit_apply_pass' === scope.row.review_status"
                   class="el-icon-success text-green"></i>
                {{ scope.row.review_status|depositApplyStatus }}
                <span v-if="scope.row.reject_reason">
                  {{ $t('comm.reason') }} : {{ scope.row.reject_reason }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
                prop="mer_username"
                :label="$t('comm.operator')">
              <template v-slot="scope">
                {{ scope.row.mer_username }}
              </template>
            </el-table-column>
          </el-table>
          <Pagination :page="tabData.page" @change="pageChange"></Pagination>
        </el-tab-pane>
      </el-tabs>

    </div>
  </div>
</template>

<script>
import configs from '@/configs'
import Pagination from "@/components/Pagination";
import {depositApplyHistory, depositApplyPreview, depositApplySubmit} from "@/service/payoutSer";
import {isEmpty} from "@/utils/validate";
import user from "@/store/modules/user";

export default {
  name: "deposit_apply",
  components: {Pagination},
  computed: { //watch跟踪数据变化, 重点user, configs
    configs() {
      return configs;
    },
    user() {
      return user.state.user;
    },
  },
  data() {
    return {
      loading: false,
      paneName: 'apply',
      searchParams: {
        title: 'nav.deposit_apply', page: 1,
        trade_id: '', merchant_order_no: '', email: ''
      },
      tabData: {list: [], page: {count: 0, page_num: 0, total: 0}},
      previewData: {list: [], currency_list: [], settle_day: ''},
    }
  },
  mounted() {
    this.applyPreview();
  },
  methods: {
    paneClick(tab) {
      if ('history' === tab.name) {
        this.searchParams.page = 1;//重置页码
        this.paneName = tab.name
        this.search();
      } else {
        this.applyPreview();
      }
    },
    paneClickHistory() {
      this.paneClick({name: 'history'})
    },
    submitApply(currency) {
      this.$data.loading = true
      depositApplySubmit({'currency': currency}).then(() => {
        this.$message.success(this.$i18n.t('comm.success').toString())
        this.paneClickHistory()
      }).finally(() => {
        this.$data.loading = false
      })
    },
    pageChange(page) {
      this.searchParams.page = page.page_num
      this.search()
    },
    checkIsEmpty(val) {
      return isEmpty(val);
    },
    search() {
      this.loading = true
      depositApplyHistory(this.searchParams).then(res => {
        const {data} = res
        this.$data.tabData = data
      }).finally(() => {
        this.$data.loading = false
      })
    },
    applyPreview() {
      this.loading = true
      depositApplyPreview('').then(res => {
        const {data} = res
        this.$data.previewData = data
      }).finally(() => {
        this.$data.loading = false
      })
    }
  },
}
</script>

<style scoped>
.box-white {
  padding: 8px;
  background-color: #fff;
  border-radius: 6px;
  margin-bottom: 9px;
}

.table-billing-total {
  margin: 0;
  padding: 10px 35px;
  font-size: 13px;
}

.table-billing-total li {
  list-style: none;
  margin-bottom: 10px;
}

.table-billing-total li span small {
  color: #999999;
}

.table-billing-total .bill-amount {
  float: right;
  font-weight: 600;
  color: #5c5c5c;
}
</style>