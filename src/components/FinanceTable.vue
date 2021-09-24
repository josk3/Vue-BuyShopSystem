<template>
    <div v-if="tab_data">
        <el-table
                :class="tab_data.list.length ? '' : 'wpy-z-table'"
                :data="tab_data.list"
                :header-row-style="{background:'#2C2E2F'}"
                style="width: 100%">
            <el-table-column
                    prop="trade_id"
                    :show-overflow-tooltip="true"
                    min-width="150px"
                    :label="$t('comm.trade_or_batch_id')">
                <template v-slot="scope">
                            <span v-if="scope.row.kind === 'settle' || scope.row.kind === 'depositSettle'">
                                {{scope.row.batch_id | nullToLine}}
                            </span>
                    <span v-else>{{scope.row.trade_id | nullToLine}}</span>
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
                    prop="order_amount"
                    :show-overflow-tooltip="true"
                    :label="$t('comm.order_amount')">
                <template v-slot="scope">
                    {{scope.row.order_amount }}  {{scope.row.order_currency }}
                </template>
            </el-table-column>
            <el-table-column
                    prop="kind"
                    width="50px"
                    :show-overflow-tooltip="true"
                    :label="$t('comm.type')">
                <template v-slot="scope">
                    {{scope.row.kind | chargeKind }}
                    <span v-if="scope.row.manual_kind_name">{{ scope.row.manual_kind_name }}</span>
                    <span v-if="scope.row.reason"><br/>说明: {{ scope.row.reason }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="charge_time"
                    :show-overflow-tooltip="true"
                    :label="$t('comm.created')">
                <template v-slot="scope">
                    {{scope.row.charge_time | toFullTime }}
                </template>
            </el-table-column>
            <el-table-column
                    prop="currency"
                    width="50px"
                    :label="$t('comm.currency')">
                <template v-slot="scope">
                    {{scope.row.currency}}
                </template>
            </el-table-column>
            <el-table-column
                    v-if="page_kind == 'finance'"
                    prop="fees"
                    width="70px"
                    :label="$t('finance.fees')">
                <template v-slot="scope">
                    {{scope.row.fees | nullToLine}}
                </template>
            </el-table-column>
            <el-table-column
                    v-if="page_kind == 'finance'"
                    prop="fixed_fees"
                    width="70px"
                    :label="$t('finance.fixed_fees')">
                <template v-slot="scope">
                    {{scope.row.fixed_fees | nullToLine}}
                </template>
            </el-table-column>
            <el-table-column
                    v-if="tab_data.kind != 'deposit'"
                    min-width="100px"
                    prop="charge">
                <template slot="header">
                    <span slot="reference">{{$t('finance.balance_charge')}}</span>
                </template>
                <template v-slot="scope">
                            <span :class="scope.row.charge === 0 ? '' : (scope.row.charge > 0 ? 'c-income' : 'c-outlay')">
                                {{scope.row.charge | chargeAmount}}
                            </span>
                </template>
            </el-table-column>
            <el-table-column
                    v-if="tab_data.kind == 'deposit' && page_kind == 'settle'"
                    min-width="100px"
                    prop="deposit_charge">
                <template slot="header">
                    <span slot="reference">
                        {{$t('finance.deposit_charge')}}
                    </span>
                </template>
                <template v-slot="scope">
                            <span :class="scope.row.deposit_charge === 0 ? '' : (scope.row.deposit_charge > 0 ? 'c-income' : 'c-outlay')">
                                {{scope.row.deposit_charge | chargeAmount}}
                            </span>
                </template>
            </el-table-column>
            <el-table-column
                    v-if="page_kind == 'finance'"
                    prop="deposit_charge"
                    :label="$t('finance.deposit_charge')">
                <template v-slot="scope">
                            <span :class="scope.row.deposit_charge === 0 ? '' : (scope.row.deposit_charge > 0 ? 'c-income' : 'c-outlay')">
                                {{scope.row.deposit_charge | chargeAmount}}
                            </span>
                </template>
            </el-table-column>
            <el-table-column
                    v-if="page_kind == 'finance'"
                    prop="surplus"
                    :label="$t('comm.balance')">
                <template v-slot="scope">
                    {{scope.row.surplus}}
                </template>
            </el-table-column>
            <el-table-column
                    v-if="page_kind == 'finance'"
                    prop="deposit_surplus"
                    :label="$t('finance.deposit_balance')">
                <template v-slot="scope">
                    {{scope.row.deposit_surplus}}
                </template>
            </el-table-column>
        </el-table>

        <Pagination :page="tab_data.page" @change="pageClick"></Pagination>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination";

    export default {
        name: "FinanceTable",
        components: {Pagination},
        props: ['tab_data', 'page_change', 'page_kind'],
        data() {
            return {
                loading: false,
            }
        },
        watch: {},
        mounted() {
        },
        methods: {
            pageClick(page) {
                this.$emit('page_change', page)
            },
        },

    }
</script>
<style>
</style>
