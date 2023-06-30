<template>
    <div v-loading="loading">
        <SearchBox :params="searchParams" @search="search"></SearchBox>
        <div class="wrap-tab p-0">
            <el-card class="box-card box-pane" shadow="never" :body-style="{ padding: '0px' }">
                <div class="row">
                    <div class="col-8 pr-0">
                        <el-tabs v-model="paneName" type="border-card"
                                 @tab-click="paneClick">
                            <el-tab-pane :label="$t('comm.all')" name="all"></el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="col-4 text-right p-0" style="background-color: #F5F7FA">
                        <div class="mr-5 mt-1">
                            <el-button icon="el-icon-download" size="mini"
                                       @click="downDecline" plain>{{ $t('comm.download') }}
                            </el-button>
                        </div>
                    </div>
                </div>
                <div class="row text-left" v-if="searchDeclineTimeTip">
                    <div class="col-12">
                        <small class="ml-2">{{ searchDeclineTimeTip }} : {{ searchParams.search_date[0] }} ~ {{
                            searchParams.search_date[1] }}</small>
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
                            <router-link :to="{name: 'order_detail',params:{id:scope.row.trade_id}}"
                                         class="btn-link">
                                {{scope.row.trade_id }}
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="merchant_order_no"
                            :label="$t('comm.merchant_order_no')">
                    </el-table-column>
                    <el-table-column
                        prop="site_url"
                        :label="$t('comm.site_url')">
                    </el-table-column>
                    <el-table-column
                            prop="payment_time"
                            width="100"
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
                            prop="declined"
                            :show-overflow-tooltip="true"
                            :label="$t('comm.type')">
                        <template v-slot="scope">
                            {{scope.row.chargeback.decline_type | declineType}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="pay_status"
                            width="140px"
                            :label="$t('kind.chargeback')">
                        <template v-slot="scope">
                            <span :class="'declined-' + scope.row.declined">{{ scope.row.declined | declinedStatus }}</span>
                            <span style="color:green" v-if="scope.row.chargeback_cancel && scope.row.chargeback_cancel === 1"> {{ $t('status.declined_cancel') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="settled"
                            :show-overflow-tooltip="true"
                            :label="$t('kind.settle')">
                        <template v-slot="scope">
                            {{scope.row.settled | settleStatus }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="chargeback.reason"
                            :show-overflow-tooltip="true"
                            :label="$t('comm.reason')">
                        <template v-slot="scope">
                            {{scope.row.chargeback.reason}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="chargeback.chargeback_time"
                            width="100"
                            :label="$t('comm.declineTime')">
                        <template v-slot="scope">
                            {{scope.row.chargeback.chargeback_time | toDay }}
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
    import {declineDownload, declineSearch} from "@/service/declineSer";
    import {isEmpty} from "@/utils/validate";

    export default {
        name: "decline",
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
                    title: 'nav.decline_manage', page: 1,
                    trade_id: '', merchant_order_no: '', site_url: '', decline_type: '', search_date: '',
                },
                tabData: {list: [], page: {count: 0, page_num: 0, total: 0}},
                paneName: 'all', //默认
                searchDeclineTimeTip: '',// 搜索的是拒付导入时间，不是订单
            }
        },
        mounted() {
            this.searchParams.decline_status = this.paneName
            this.search();
        },
        methods: {
            paneClick(tab) {
                this.searchParams.page = 1;//重置页码
                this.paneName = tab.name
                this.searchParams.decline_status = tab.name //搜索对应status
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
                if (!isEmpty(this.searchParams.search_date)) {
                    this.searchDeclineTimeTip = this.$i18n.t('comm.declineTime') + ''
                } else {
                    this.searchDeclineTimeTip = ''
                }
                declineSearch(this.searchParams).then(res => {
                    const {data} = res
                    this.$data.tabData = data
                }).finally(() => {
                    this.loading = false
                })
            },
            downDecline() {
                this.loading = true
                declineDownload(this.searchParams).then(() => {
                    this.$message.success(this.$i18n.t('comm.success').toString())
                }).finally(() => {
                    this.loading = false
                })
            },
        },
    }
</script>

<style scoped>

</style>
