<template>
    <div v-loading="loading">
        <div v-if="isPayoutList" class="payout-list">
            <SearchBox :params="searchParams" @search="search"></SearchBox>
            <div class="wrap-tab p-0">
                <el-card class="box-card box-pane" shadow="never" :body-style="{ padding: '0px' }">
                    <div class="row">
                        <div class="col-8 pr-0" style="background-color: #F5F7FA">
                            <el-tabs type="border-card">
                            </el-tabs>
                        </div>
                        <div class="col-4 text-right p-0" style="background-color: #F5F7FA">
                            <div class="mr-5 mt-1">
                                <el-button icon="el-icon-download" size="mini"
                                           @click="downSettle" plain>{{ $t('comm.download') }}
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
                                prop="batch_id"
                                :label="$t('comm.batch_id')" width="180px">
                            <template v-slot="scope">
                                <el-button type="text" @click="openSummaryDialog(scope.row.batch_id)">
                                    {{scope.row.batch_id}}
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="kind"
                                :show-overflow-tooltip="true"
                                :label="$t('comm.type')">
                            <template v-slot="scope">
                                {{scope.row.kind | payoutKind }}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="created"
                                :show-overflow-tooltip="true"
                                :label="$t('settle.create_time')">
                            <template v-slot="scope">
                                {{scope.row.created | toDay }}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="currency"
                                :label="$t('comm.currency')">
                            <template v-slot="scope">
                                {{scope.row.currency}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="fee_amount"
                                width="70px"
                                :label="$t('comm.fees')">
                            <template v-slot="scope">
                                {{scope.row.fee_amount}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="net_amount"
                                :label="$t('settle.net_amount')">
                            <template v-slot="scope">
                                {{scope.row.net_amount}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="status"
                                :label="$t('comm.status')">
                            <template v-slot="scope">
                                {{scope.row.status | payoutStatus }}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="payout_time"
                                :show-overflow-tooltip="true"
                                :label="$t('settle.settle_time')">
                            <template v-slot="scope">
                                {{scope.row.payout_time | toDay }}
                            </template>
                        </el-table-column>
                    </el-table>

                    <Pagination :page="tabData.page" @change="pageChange"></Pagination>
                </el-card>
            </div>
            <el-dialog custom-class="wpy-dialog" @open="getPayoutSummary"
                       :close-on-click-modal="false"
                       :title="$t('settle.settle_summary')"
                       top="3vh"
                       :visible.sync="payoutSummaryDialog">
                <div v-loading="loading">
                    <h6>{{$t('comm.batch_id')}}:<span class="tr-id btn clipboard-btn" :data-clipboard-text="summaryBatchId"
                                  @click="copy">{{ summaryBatchId }} <font-awesome-icon
                            :icon="['far', 'clipboard']"/></span>
                    </h6>
                    <el-table v-if="summaryData.groups"
                              :class="summaryData.groups ? '' : 'wpy-z-table'"
                              :data="summaryData.groups">
                        <el-table-column property="kind" :show-overflow-tooltip="true" :label="$t('comm.type')">
                            <template v-slot="scope">
                                {{scope.row.kind | payoutKind }}
                            </template>
                        </el-table-column>
                        <el-table-column property="currency" :label="$t('comm.currency')"></el-table-column>
                        <el-table-column property="order_settle" :label="$t('settle.order_settle')"></el-table-column>
                        <el-table-column property="fees" :label="$t('comm.fees')"></el-table-column>
                        <el-table-column property="fixed_fees" :label="$t('comm.processing_fees')"></el-table-column>
                        <el-table-column property="deposit_charge" :label="$t('comm.deposit_balance')"></el-table-column>
                        <el-table-column property="charge" :label="$t('comm.summary_total')"></el-table-column>
                    </el-table>
                    <div class="row" v-if="summaryData.payout">
                        <div class="col-4"></div>
                        <div class="col-8 text-right pr-4">
                            <p class="p-0">{{$t('settle.payout_fees')}}: {{summaryData.payout.fees}}</p>
                            <p class="p-0">{{$t('settle.payout_total')}}: <strong>{{summaryData.payout.total}}</strong></p>
                        </div>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button size="small" @click="viewDetail(summaryBatchId)" class="float-left">{{$t('settle.batch_id_detail')}}</el-button>
                    <el-button type="primary" @click="payoutSummaryDialog = false">{{$t('settle.sure')}}</el-button>
                </div>
            </el-dialog>
        </div>
        <div v-else class="payout-detail">
            <div class="row">
                <div class="col-12 mb-2">
                    <el-card shadow="always" class="box-card p-3"
                             :body-style="{ padding: '0px' }">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item>
                                <i class="el-icon-arrow-left text-blue"></i> <strong class="pointer" @click="toPayoutList">{{$t('nav.settle_search')}}</strong>
                            </el-breadcrumb-item>
                            <el-breadcrumb-item>{{$t('comm.batch_id')}} {{searchViewDetail.batch_id}}</el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-card>
                </div>
            </div>
            <el-card class="box-card pb-3" shadow="never" :body-style="{ padding: '0px' }">
                <FinanceTable :tab_data="viewDetailData" @page_change="viewPageChange($event)"></FinanceTable>
            </el-card>
        </div>
    </div>
</template>

<script>
    import configs from '@/configs'
    import SearchBox from "@/components/SearchBox";
    import Pagination from "@/components/Pagination";
    import {settleDownload, settleSearch, settleSummary, settleViewDetail} from "@/service/financeSer";
    import newClipboard from "@/utils/clipboard";
    import {isEmpty} from "@/utils/validate";
    import FinanceTable from "@/components/FinanceTable";

    /** 当前vue 要实现结算列表和结算详情明细 */
    export default {
        name: "settle",
        components: {FinanceTable, SearchBox, Pagination},
        computed: { //watch跟踪数据变化, 重点user, configs
            configs() {
                return configs;
            },
        },
        data() {
            return {
                loading: false,
                payoutSummaryDialog: false,
                summaryBatchId: '',
                summaryData: [],
                searchParams: {
                    title: 'nav.settle_search', page: 1,
                    batch_id: ''
                },
                tabData: {list: [], page: {count: 0, page_num: 0, total: 0}},
                paneName: 'all', //默认
                //
                isPayoutList: true,
                viewDetailData: '',
                searchViewDetail: {page: 1, batch_id: ''}

            }
        },
        mounted() {
            this.searchParams.settle_status = this.paneName
            this.search();
        },
        methods: {
            copy() {
                newClipboard('.clipboard-btn')
            },
            paneClick(tab) {
                this.searchParams.page = 1;//重置页码
                this.paneName = tab.name
                this.searchParams.settle_status = tab.name //搜索对应status
                this.search()
            },
            pageChange(page) {
                this.searchParams.page = page.page_num
                this.search()
            },
            search() {
                this.loading = true
                settleSearch(this.searchParams).then(res => {
                    const {data} = res
                    this.$data.tabData = data
                }).finally(() => {
                    this.loading = false
                })
            },
            openSummaryDialog(batchId) {
                this.summaryBatchId = batchId
                this.payoutSummaryDialog = true
            },
            getPayoutSummary() {
                this.loading = true
                settleSummary({batch_id: this.summaryBatchId}).then(res => {
                    const {data} = res
                    this.$data.summaryData = data
                }).finally(() => {
                    this.loading = false
                })
            },
            downSettle() {
                this.loading = true
                settleDownload(this.searchParams).then(() => {
                    this.$message.success(this.$i18n.t('comm.success').toString())
                }).finally(() => {
                    this.loading = false
                })
            },
            viewDetail(batchId) {
                this.loading = true
                if (!isEmpty(batchId)) this.searchViewDetail.batch_id = batchId
                settleViewDetail(this.searchViewDetail).then((res) => {
                    const {data} = res
                    this.$data.viewDetailData = data
                    this.$data.isPayoutList = false
                    this.$data.payoutSummaryDialog = false
                }).finally(() => {
                    this.loading = false
                })
            },
            viewPageChange(page) {
                this.searchViewDetail.page = page.page_num
                this.viewDetail()
            },
            toPayoutList() {
                console.log("toList")
                this.isPayoutList = true
            },

        },
    }
</script>

<style scoped>

</style>
