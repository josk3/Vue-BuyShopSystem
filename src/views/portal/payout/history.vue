<template>
    <div v-loading="loading">
        <SearchBox :params="searchParams" @search="search"></SearchBox>
        <div class="wrap-tab p-0">
            <el-card class="box-card box-pane" shadow="never" :body-style="{ padding: '0px' }">
                <el-tabs v-model="paneName" type="border-card"
                         @tab-click="paneClick">
                    <el-tab-pane :label="$t('comm.submitted')" name="submitted"></el-tab-pane>
                    <el-tab-pane :label="$t('payout.delivery_reject')" name="reject"></el-tab-pane>
                </el-tabs>
                <el-table
                        :class="tabData.list.length ? '' : 'wpy-z-table'"
                        :data="tabData.list"
                        :header-row-style="{background:'#2C2E2F'}"
                        style="width: 100%">
                    <el-table-column
                            prop="trade_id"
                            :label="$t('comm.trade_id')" width="210px">
                    </el-table-column>
                    <el-table-column
                            prop="merchant_order_no"
                            :show-overflow-tooltip="true"
                            :label="$t('comm.merchant_order_no')">
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
                            prop="pay_status"
                            width="90px"
                            :label="$t('comm.status')">
                        <template v-slot="scope">
                            <span class="pay-status" :class="['ps-' + scope.row.pay_status]">
                                {{scope.row.pay_status | payStatus }}
                            </span>
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
                    <el-table-column
                            prop="track_number"
                            :show-overflow-tooltip="true"
                            :label="$t('comm.track_number')">
                        <template v-slot="scope">
                            {{scope.row.track_number }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="shipment_reason"
                            :show-overflow-tooltip="true"
                            :label="$t('comm.remark')">
                        <template v-slot="scope">
                            {{scope.row.shipment_reason}}
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
    import {payoutSearch} from "@/service/payoutSer";

    export default {
        name: "payout_history",
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
                    title: 'nav.payout_history', page: 1,
                    trade_id: '', merchant_order_no: '', email: ''
                },
                tabData: {list: [], page: {count: 0, page_num: 0, total: 0}},
                paneName: 'submitted', //默认
            }
        },
        mounted() {
            this.searchParams.payout_status = this.paneName
            this.search();
        },
        methods: {
            paneClick(tab) {
                this.searchParams.page = 1;//重置页码
                this.paneName = tab.name
                this.searchParams.payout_status = tab.name //搜索对应status
                this.search()
            },
            pageChange(page) {
                this.searchParams.page = page.page_num
                this.search()
            },
            search() {
                this.loading = true
                payoutSearch(this.searchParams).then(res => {
                    const {data} = res
                    this.$data.tabData = data
                }).finally(() => {
                    this.loading = false
                })
            }
        },
    }
</script>

<style scoped>

</style>
