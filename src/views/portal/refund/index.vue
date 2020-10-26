<template>
    <div v-loading="loading">
        <SearchBox :params="searchParams" @search="search"></SearchBox>
        <div class="wrap-tab p-0">
            <el-card class="box-card box-pane" shadow="never" :body-style="{ padding: '0px' }">
                <div class="row">
                <el-tabs class="col-6 mr-n3" v-model="paneName" type="border-card"
                         @tab-click="paneClick">
                    <el-tab-pane :label="$t('comm.all')" name="all"></el-tab-pane>
                    <el-tab-pane :label="$t('comm.refund_ing')" name="refund_ing"></el-tab-pane>
                    <el-tab-pane :label="$t('comm.success')" name="success"></el-tab-pane>
                    <el-tab-pane :label="$t('comm.cancel')" name="cancel"></el-tab-pane>
                    <el-tab-pane :label="$t('comm.fail')" name="fail"></el-tab-pane>
                </el-tabs>
                <div class="col-6 text-right " style="background-color: #F5F7FA">
                    <div class="mr-5 mt-1 mb-1">
                        <el-button icon="el-icon-download" size="mini"
                                   @click="downRefund" plain>{{ $t('comm.download') }}
                        </el-button>
                    </div>
                </div>
                </div>
                <el-table
                        :class="tabData.page.total ? '' : 'wpy-z-table'"
                        :data="tabData.list"
                        :header-row-style="{background:'#2C2E2F'}"
                        style="width: 100%">
                    <el-table-column
                            prop="trade_id"
                            :label="$t('comm.trade_id')" width="210px">
                        <template v-slot="scope">
                            <router-link :to="{name: 'order_detail',params:{id:scope.row.trade_id}}"
                                         class="btn-link">
                                {{scope.row.trade_id }}
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="merchant_order_no"
                            :show-overflow-tooltip="true"
                            :label="$t('comm.merchant_order_no')">
                    </el-table-column>
                    <el-table-column
                            prop="customer.email"
                            :show-overflow-tooltip="true"
                            :label="$t('comm.email')">
                    </el-table-column>
                    <el-table-column
                            prop="payment_time"
                            :label="$t('comm.payment_time')">
                        <template v-slot="scope">
                            {{scope.row.payment_time | toDay }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="order_amount,order_currency"
                            :label="$t('comm.order_amount')">
                        <template v-slot="scope">
                            {{scope.row.order_amount}} {{scope.row.order_currency}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="refund_amount,order_currency"
                            :label="$t('comm.refund_amount')">
                        <template v-slot="scope">
                            {{scope.row.refund_amount}} {{scope.row.order_currency}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="refund_status"
                            :show-overflow-tooltip="true"
                            :label="$t('comm.status')">
                        <template v-slot="scope">
                            {{scope.row.refund_status | refundStatus }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="apply_time"
                            :show-overflow-tooltip="true"
                            :label="$t('comm.apply_time')">
                        <template v-slot="scope">
                            {{scope.row.apply_time | toDay }}
                        </template>
                    </el-table-column>
                    <el-table-column width="50" fixed="right">
                        <template v-slot="scope">
                            <el-dropdown trigger="click"
                                         v-if="scope.row.refund_status === 'applyRefund' || scope.row.refund_status === 13"
                                         @command="handleCommand">
                                      <span class="el-dropdown-link">
                                          <i class="el-icon-more"></i>
                                      </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :command="commandVal('cancel', scope.row, scope.$index)">
                                        取消退款申请
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                    </el-table-column>
                </el-table>

                <Pagination :page="tabData.page" @change="pageChange"></Pagination>
            </el-card>
        </div>
    </div>
</template>

<script>
    import configs from '@/configs'
    import {cancelApply, refundSearch,refundDownload} from "@/service/refundSer";
    import SearchBox from "@/components/SearchBox";
    import Pagination from "@/components/Pagination";

    export default {
        name: "refund",
        components: {SearchBox, Pagination},
        computed: { //watch跟踪数据变化, 重点user, configs
            configs() {
                return configs;
            },
        },
        data() {
            return {
                loading: false,
                searchParams: {
                    title: 'nav.refund_select', page: 1,
                    trade_id: '', merchant_order_no: '', email: ''
                },
                tabData: {list: [], page: {count: 0, page_num: 0, total: 0}},
                paneName: 'all', //默认
                refund_params: {trade_id: '', merchant_order_no: '', email: ''},
            }
        },
        mounted() {
            this.searchParams.refund_status = this.paneName
            this.search();
        },
        methods: {
            paneClick(tab) {
                this.searchParams.page = 1;//重置页码
                this.paneName = tab.name
                this.searchParams.refund_status = tab.name //搜索对应status
                this.search()
            },
            pageChange(page) {
                this.searchParams.page = page.page_num
                this.search()
            },
            search() {
                this.loading = true
                refundSearch(this.searchParams).then(res => {
                    const {data} = res
                    this.$data.tabData = data
                }).finally(() => {
                    this.loading = false
                })
            },
            commandVal(action, row, index) {
                return {action: action, row: row, index: index}
            },
            handleCommand(command) {
                let row = command.row
                switch (command.action) {
                    case 'cancel':
                        this.loading = true
                        cancelApply(row).then(() => {
                            this.$message.success(this.$i18n.t('comm.success').toString())
                            this.search()
                        }).finally(() => {
                            this.loading = false
                        })
                        break;
                }
            },
            //下载退款记录
            downRefund(){
                //页面效果,正在加载中
                this.$data.loading = true
                refundDownload(this.refund_params).then(() => {
                    this.$message.success(this.$i18n.t('comm.success').toString())
                }).finally(() => {
                    this.$data.loading = false
                })
            }
        },
    }
</script>

<style scoped>

</style>
