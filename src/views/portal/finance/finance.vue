<template>
    <div v-loading="loading">
        <SearchBox :params="searchParams" @search="search"></SearchBox>
        <div class="wrap-tab p-0">
            <el-card class="box-card box-pane" shadow="never" :body-style="{ padding: '0px' }">
                <div class="row">
                    <div class="col-8 pr-0">
                        <el-tabs v-model="paneName" type="border-card"
                                 @tab-click="paneClick">
                            <el-tab-pane label="余额" name="all"></el-tab-pane>
                            <el-tab-pane label="收款" name="sale"></el-tab-pane>
                            <el-tab-pane label="提现" name="settle"></el-tab-pane>
                            <el-tab-pane label="退款" name="refund"></el-tab-pane>
                            <el-tab-pane label="保证金返还" name="depositSettle"></el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="col-4 text-right p-0" style="background-color: #F5F7FA">
                        <div class="mr-5 mt-1">
                            <el-button icon="el-icon-download" size="mini"
                                       @click="downFinance" plain>下载
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
                            prop="trade_id"
                            :label="$t('comm.trade_id')" width="210px">
                        <template v-slot="scope">
                            <span v-if="paneName === 'settle' || paneName === 'depositSettle'">{{scope.row.batch_id}}</span>
                            <span v-else >{{scope.row.trade_id}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="merchant_order_no"
                            :show-overflow-tooltip="true"
                            :label="$t('comm.merchant_order_no')">
                        <template v-slot="scope">
                            {{scope.row.merchant_order_no | nullToLine}}
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
                            prop="kind"
                            label="类型">
                        <template v-slot="scope">
                            {{scope.row.kind | chargeKind }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="charge_time"
                            :show-overflow-tooltip="true"
                            label="支付时间">
                        <template v-slot="scope">
                            {{scope.row.charge_time | toDay }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="fees"
                            label="手续费">
                        <template v-slot="scope">
                            {{scope.row.fees | nullToLine}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="charge"
                            label="余额变动">
                        <template v-slot="scope">
                            {{scope.row.charge | nullToLine}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="deposit_charge"
                            label="保证金变动">
                        <template v-slot="scope">
                            {{scope.row.deposit_charge | nullToLine}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="surplus"
                            label="余额">
                        <template v-slot="scope">
                            {{scope.row.surplus}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="deposit_surplus"
                            label="保证金余额">
                        <template v-slot="scope">
                            {{scope.row.deposit_surplus}}
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
    import SearchBox from "@/components/SearchBox";
    import Pagination from "@/components/Pagination";
    import {financeSearch} from "@/service/financeSer";

    export default {
        name: "finance",
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
                    title: 'nav.finance_search', page: 1,
                    batch_id: '', trade_id: '', merchant_order_no: ''
                },
                tabData: {list: [], page: {count: 0, page_num: 0, total: 0}},
                paneName: 'all', //默认
            }
        },
        mounted() {
            this.searchParams.finance_status = this.paneName
            this.search();
        },
        methods: {
            paneClick(tab) {
                this.searchParams.page = 1;//重置页码
                this.paneName = tab.name
                this.searchParams.finance_status = tab.name //搜索对应status
                this.search()
            },
            pageChange(page) {
                this.searchParams.page = page.page_num
                this.search()
            },
            search() {
                this.loading = true
                financeSearch(this.searchParams).then(res => {
                    const {data} = res
                    this.$data.tabData = data
                }).finally(() => {
                    this.loading = false
                })
            },
            downFinance() {

            },
        },
    }
</script>

<style scoped>

</style>
