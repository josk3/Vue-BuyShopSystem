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
                                           @click="downSettle" plain>下载
                                </el-button>
                            </div>
                        </div>
                    </div>
                    <el-table
                            :class="tabData.list ? '' : 'wpy-z-table'"
                            :data="tabData.list"
                            :header-row-style="{background:'#2C2E2F'}"
                            style="width: 100%">
                        <el-table-column
                                prop="batch_id"
                                label="批次号" width="180px">
                            <template v-slot="scope">
                                <el-button type="text" @click="openSummaryDialog(scope.row.batch_id)">
                                    {{scope.row.batch_id}}
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="kind"
                                :show-overflow-tooltip="true"
                                label="类型">
                            <template v-slot="scope">
                                {{scope.row.kind | payoutKind }}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="created"
                                :show-overflow-tooltip="true"
                                label="生成时间">
                            <template v-slot="scope">
                                {{scope.row.created | toDay }}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="currency"
                                label="币种">
                            <template v-slot="scope">
                                {{scope.row.currency}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="fee_amount"
                                label="手续费">
                            <template v-slot="scope">
                                {{scope.row.fee_amount}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="net_amount"
                                label="净结算">
                            <template v-slot="scope">
                                {{scope.row.net_amount}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="status"
                                label="状态">
                            <template v-slot="scope">
                                {{scope.row.status | payoutStatus }}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="payout_time"
                                :show-overflow-tooltip="true"
                                label="划款时间">
                            <template v-slot="scope">
                                {{scope.row.payout_time | nullToLine }}
                            </template>
                        </el-table-column>
                    </el-table>

                    <Pagination :page="tabData.page" @change="pageChange"></Pagination>
                </el-card>
            </div>
            <el-dialog custom-class="wpy-dialog" @open="getPayoutSummary"
                       :show-close="false" :close-on-click-modal="false"
                       title="结算摘要"
                       top="5vh"
                       :visible.sync="payoutSummaryDialog">
                <div v-loading="loading">
                    <h4>{{summaryBatchId}}</h4>
                    <el-table
                              :class="summaryData ? '' : 'wpy-z-table'"
                              :data="summaryData">
                        <el-table-column property="batch_id" label="批次号"></el-table-column>
                    </el-table>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="payoutSummaryDialog = false">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div v-else class="payout-detail">

        </div>
    </div>
</template>

<script>
    import configs from '@/configs'
    import SearchBox from "@/components/SearchBox";
    import Pagination from "@/components/Pagination";
    import {settleSearch, settleSummary} from "@/service/financeSer";

    /** 当前vue 要实现结算列表和结算详情明细 */
    export default {
        name: "settle",
        components: {SearchBox, Pagination},
        computed: { //watch跟踪数据变化, 重点user, configs
            configs() {
                return configs;
            },
        },
        data() {
            return {
                loading: false,
                isPayoutList: true,
                payoutSummaryDialog: false,
                summaryBatchId: '',
                summaryData: [],
                searchParams: {
                    title: 'nav.settle_search', page: 1,
                    batch_id: ''
                },
                tabData: {list: [], page: {count: 0, page_num: 0, total: 0}},
                paneName: 'all', //默认
            }
        },
        mounted() {
            this.searchParams.settle_status = this.paneName
            this.search();
        },
        methods: {
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
                    this.$data.tabData = data
                }).finally(() => {
                    this.loading = false
                })
            },
            downSettle() {

            },
        },
    }
</script>

<style scoped>

</style>
