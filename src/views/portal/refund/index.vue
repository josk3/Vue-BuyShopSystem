<template>
    <div>
        <template>
            <el-table
                    :data="tabData.list"
                    v-loading="loading"
                    :header-row-style="{background:'#2C2E2F'}"
                    style="width: 100%">
                <el-table-column
                        prop="trade_no"
                        :label="$t('comm.trade_no')" width="210px">
                </el-table-column>
                <el-table-column
                        prop="merchant_order_no"
                        :label="$t('comm.merchant_order_no')" >
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
                                <el-dropdown-item>{{ scope.row.trade_no }}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>

<script>
    import configs from '@/configs'
    import {refundSearch} from "@/service/refundSer";

    export default {
        name: "refund",
        computed: { //watch跟踪数据变化, 重点user, configs
            configs() {
                return configs;
            },
        },
        data() {
            return {
                loading: false,
                searchParams: {},
                tabData: {list: [], page: {count: 0, number: 0}}
            }
        },
        mounted() {
            this.loading = true
            refundSearch(this.searchParams).then(res => {
                const {data} = res
                this.$data.tabData = data
            }).finally(() => {
                this.loading = false
            })
        },
        methods: {},
    }
</script>

<style scoped>

</style>
