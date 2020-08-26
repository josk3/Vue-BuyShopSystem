<template>
    <div>
        <SearchBox :params="searchParams" @search="search"></SearchBox>
        <div class="wrap-tab p-0">
            <el-card class="box-card box-pane" shadow="never" :body-style="{ padding: '0px' }">
                <el-tabs v-model="paneName" type="border-card"
                         @tab-click="paneClick">
                    <el-tab-pane :label="$t('comm.all')" name="all"></el-tab-pane>
                    <el-tab-pane :label="$t('comm.success')" name="success"></el-tab-pane>
                    <el-tab-pane :label="$t('comm.fail')" name="fail"></el-tab-pane>
                    <el-tab-pane :label="$t('comm.refund_ing')" name="refund_ing"></el-tab-pane>
                </el-tabs>
                <el-table
                        :data="tabData.list"
                        v-loading="loading"
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
                            prop="email"
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
                            prop="order_amount,currency"
                            :label="$t('comm.order_amount')">
                        <template v-slot="scope">
                            {{scope.row.order_amount}} {{scope.row.currency}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="refund_amount,currency"
                            :label="$t('comm.refund_amount')">
                        <template v-slot="scope">
                            {{scope.row.refund_amount}} {{scope.row.currency}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="is_refund"
                            :show-overflow-tooltip="true"
                            :label="$t('comm.status')">
                        <template v-slot="scope">
                            {{scope.row.is_refund | refundStatus }}
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
                    <el-table-column id='' prop="" label="" width="50" fixed="right">
                        <template v-slot="scope">
                            <el-dropdown trigger="click">
                            <span class="el-dropdown-link btn-tool"
                                  data-toggle="dropdown">
                                <i class="el-icon-more"></i>
                            </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>{{ scope.row.trade_id }}</el-dropdown-item>
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
    import {refundSearch} from "@/service/refundSer";
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
            }
        },
    }
</script>

<style scoped>

</style>
