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
                        <el-steps :active="2">
                            <el-step>
                                <div slot="icon">
                                    <svg-icon icon-class="delivery_manage"/>
                                </div>
                                <div slot="title">
                                    <small style="font-size: 10px">{{$t('shipment.add_track_info')}}</small>
                                </div>
                            </el-step>
                            <el-step>
                                <div slot="icon">
                                    <svg-icon icon-class="payout_select"/>
                                </div>
                                <div slot="title">
                                    <small style="font-size: 10px">{{$t('comm.submit')}}{{$t('payout.payout_apply')}}</small>
                                </div>
                            </el-step>
                            <el-step>
                                <div slot="icon">
                                    <svg-icon icon-class="finance_select"/>
                                </div>
                                <div slot="title">
                                    <small style="font-size: 10px">{{$t('comm.generate_settle_batch')}}</small>
                                </div>
                            </el-step>
                            <el-step>
                                <div slot="icon">
                                    <svg-icon icon-class="finance_select"/>
                                </div>
                                <div slot="title">
                                    <small style="font-size: 10px">{{$t('comm.payout')}}</small>
                                </div>
                            </el-step>
                        </el-steps>
                        <p v-if="tabData.can_apply_order_time && tabData.page.total == 0" class="mb-1">
                            <small>*{{$t('settle.settle_dateTip_start')}} {{tabData.can_apply_order_time}}{{$t('settle.settle_dateTip_last')}}</small>
                        </p>
                    </div>
                    <div v-if="this.user.is_master">
                        <el-alert v-if="this.user.identity_status == 0 || this.user.identity_status == 3"
                                  type="error"
                                  effect="dark">
                            <div slot="title">
                                {{$t('settle.settle_tips1')}},
                                <router-link :to="{name:'active_account'}" class="btn-link">
                                    <svg-icon icon-class="active_account"/> {{ $t('nav.active_account') }}
                                </router-link>
                            </div>
                        </el-alert>
                        <el-alert v-if="this.user.bank_status != 1"
                                  type="warning"
                                  effect="dark">
                            <div slot="title">
                                 {{$t('settle.settle_tips2')}},
                                <router-link :to="{name:'merchant_info'}" class="btn-link">
                                    <svg-icon icon-class="account_manage"/> {{ $t('nav.merchant_info') }}
                                </router-link>
                            </div>
                        </el-alert>
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
                            <span v-if="scope.row.virtual_ship">
                                <small v-if="scope.row.virtual_ship === '1'">{{ $t('shop.is_a_virtual') }}</small>
                                <small v-else></small>
                            </span>
                            <span v-else>{{ scope.row.track_number }}</span>
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
    import user from "@/store/modules/user";
    export default {
        name: "payout_apply",
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
                searchParams: {
                    title: 'nav.payout_apply', page: 1,
                    trade_id: '', merchant_order_no: '', email: ''
                },
                tabData: {list: [], page: {count: 0, page_num: 0, total: 0}, can_apply_order_time: '', next_settle_day: ''},
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