<template>
    <div v-loading="loading">
        <SearchBox :params="searchParams" @search="search"></SearchBox>
        <div class="wrap-tab p-0">
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
                                {{scope.row.trade_id }}
                            </router-link>
                            <br/>
                            {{scope.row.merchant_order_no }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            :show-overflow-tooltip="true"
                            :label="$t('order.card_and_email')">
                        <template v-slot="scope">
                            <span v-if="scope.row.card">
                                •••• {{scope.row.card.last4 }}<br/>
                            </span>
                            <span v-else> -- <br/></span>
                            {{scope.row.customer.email }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            :label="$t('order.order_amount_settle_amount')">
                        <template v-slot="scope">
                            {{scope.row.order_amount}} {{scope.row.order_currency}}<br/>
                            {{scope.row.settle_amount}} {{scope.row.settle_currency}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            :label="$t('order.card_brand')" width="60px">
                        <template v-slot="scope">
                            <span v-if="scope.row.card" class="card-brand"
                                  :class="['cb-' + scope.row.card.brand]"></span>
                            <span v-else> -- </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="pay_status"
                            width="90px"
                            :label="$t('comm.status')">
                        <template v-slot="scope">
                            <span class="pay-status" :class="['ps-' + scope.row.pay_status]">
                                {{scope.row.pay_status | payStatus}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="pay_status"
                            :width="lang === 'zh' ? '50px' : 'auto'"
                            :label="$t('kind.chargeback')">
                        <template v-slot="scope">
                            <span :class="'declined-' + scope.row.declined">{{scope.row.declined | yesOrNo}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="site_url,ip"
                            :show-overflow-tooltip="true"
                            :label="$t('order.url_and_ip')">
                        <template v-slot="scope">
                            {{scope.row.site_url}}<br/>
                            {{scope.row.ip}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            :label="$t('order.create_time_payment_time')">
                        <template v-slot="scope">
                            {{scope.row.created_time | toDayTime}}<br/>
                            {{scope.row.payment_time | toDayTime}}
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
                                        {{$t('kind.refund')}}
                                    </el-dropdown-item>
                                    <el-dropdown-item :command="commandVal('detail', scope.row, scope.$index)">
                                        {{$t('comm.view_detail')}}
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                    </el-table-column>
                </el-table>

                <Pagination :page="tabData.page" @change="pageChange"></Pagination>
            </el-card>

            <!--    d    -->
            <RefundDialog ref="refund_dialog"></RefundDialog>
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

    export default {
        name: "trade_manage",
        components: {SearchBox, Pagination, RefundDialog},
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
                    title: 'nav.trade_manage', page: 1,
                    trade_id: '', merchant_order_no: '', pay_status: ''
                },
                tabData: {list: [], page: {count: 0, page_num: 0, total: 0}},
                paneName: 'all', //默认
            }
        },
        mounted() {
            this.searchParams.pay_status = this.paneName
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
                this.searchParams.page = page.page_num
                this.search()
            },
            search() {
                this.loading = true
                ordersSearch(this.searchParams).then(res => {
                    const {data} = res
                    this.$data.tabData = data
                }).finally(() => {
                    this.loading = false
                })
            },
            openRefundDialog(row) {
                this.$refs.refund_dialog.show(row)
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
                }
            },
            downOrders() {
                //页面效果,正在加载中
                this.$data.loading = true
                ordersDownload(this.searchParams).then(() => {
                    this.$message.success(this.$i18n.t('comm.success').toString())
                }).finally(() => {
                    this.$data.loading = false
                })
            },
        },
    }
</script>

<style scoped>

</style>
