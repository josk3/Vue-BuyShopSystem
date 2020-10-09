<template>
    <div v-loading="loading">
        <div class="row">
            <div class="col-12 mb-2">
                <el-card shadow="always" class="box-card p-3"
                         :body-style="{ padding: '0px' }">
                    <h5>{{$t('payout.payout_apply')}}</h5>
                    <div class="text-muted p-0">
                        <el-tooltip class="item" effect="dark" :content="$t('comm.click_to_help')" placement="top">
                            <router-link :to="{name: 'faq', hash: '#order_settle'}">
                                <i class="el-icon-info text-blue"></i> {{$t('payout.payout_apply_help_info')}} <i
                                    class="el-icon-warning-outline"></i>
                            </router-link>
                        </el-tooltip>
                    </div>
                </el-card>
            </div>
        </div>
        <div class="wrap-tab p-0">
            <div class="p-2 text-right">
                <el-button icon="el-icon-folder-checked" size="small"
                           @click="submitApply" type="primary" plain>{{$t('payout.submit_apply')}}
                </el-button>
            </div>
            <el-card class="box-card box-pane" shadow="never" :body-style="{ padding: '0px' }">
                <el-table
                        :class="tabData.list.length ? '' : 'wpy-z-table'"
                        :data="tabData.list"
                        :header-row-style="{background:'#2C2E2F'}"
                        @selection-change="handleTableSelect"
                        style="width: 100%">
                    <el-table-column
                            type="selection"
                            width="45">
                    </el-table-column>
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
                            prop="settle_amount,settle_currency"
                            :label="$t('comm.settle_amount')">
                        <template v-slot="scope">
                            {{scope.row.settle_amount}} {{scope.row.settle_currency}}
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
                            prop="refunded"
                            :show-overflow-tooltip="true"
                            :label="$t('payout.refund')">
                        <template v-slot="scope">
                            {{scope.row.refunded | refundStatus }}
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
                </el-table>

                <Pagination :page="tabData.page" @change="pageChange"></Pagination>
            </el-card>
        </div>
    </div>
</template>

<script>
    import configs from '@/configs'
    import Pagination from "@/components/Pagination";
    import {payoutApply, waitApply} from "@/service/payoutSer";
    import {isEmpty} from "@/utils/validate";

    export default {
        name: "payout_apply",
        components: {Pagination},
        computed: { //watch跟踪数据变化, 重点user, configs
            configs() {
                return configs;
            },
        },
        data() {
            return {
                loading: false,
                searchParams: {
                    title: 'nav.payout_apply', page: 1,
                    trade_id: '', merchant_order_no: '', email: ''
                },
                tabData: {list: [], page: {count: 0, page_num: 0, total: 0}},
                selected: [],
            }
        },
        mounted() {
            this.search();
        },
        methods: {
            submitApply() {
                if (isEmpty(this.selected) || this.selected.length <= 0) {
                    this.$message.error(this.$i18n.t('payout.please_select_order').toString())
                } else {
                    this.$data.loading = true
                    payoutApply({'tradeIds': this.selected}).then(() => {
                        this.$message.success(this.$i18n.t('comm.success').toString())
                        this.selected = []
                        this.search()
                    }).catch((e) => {
                        this.$message.error(e.message)
                    }).finally(() => {
                        this.$data.loading = false
                    })
                }
            },
            handleTableSelect(val) {
                this.selected = []
                if (!isEmpty(val) && val.length > 0) {
                    val.forEach(val => {
                        this.$data.selected.push(val.trade_id)
                    });
                }
            },
            pageChange(page) {
                this.searchParams.page = page.page_num
                this.search()
            },
            search() {
                this.loading = true
                waitApply(this.searchParams).then(res => {
                    const {data} = res
                    this.$data.tabData = data
                }).finally(() => {
                    this.$data.loading = false
                })
            }
        },
    }
</script>

<style scoped>

</style>
