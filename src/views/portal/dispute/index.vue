<template>
    <div>
        <!--公共搜索栏-->
        <SearchBox :params="searchParams" ></SearchBox>
        <!--标签页-->
        <el-tabs type="border-card">
            <el-tab-pane label="全部"></el-tab-pane>
            <el-tab-pane label="未处理"></el-tab-pane>
            <el-tab-pane label="已处理"></el-tab-pane>
        </el-tabs>
       <!-- <el-table
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
        </el-table>-->
    </div>
</template>

<script>
    import SearchBox from "@/components/SearchBox";
    import Pagination from "@/components/Pagination";

    export default {
        name: "index",
        components: {SearchBox, Pagination}, //定义分页、检索栏组件
        mounted() {

        },
        data(){
            return {
                searchParams: {
                    title: 'nav.dispute_manage', page: 1,
                    trade_id: '', merchant_order_no: '', email: '',
                    disputeList: {
                        merchant_order_no: '', //商户流水号
                        order_no: '', //订单号
                        email: '', //持卡人或商户邮箱
                        created: '', //持卡人投诉日期
                        updated: '', //最近更新日期
                        status: '', //处理状态 待受理(持卡人发起投诉初始状态) 待处理(商户客服回复后状态) 处理之中(等待商户回复) 已处理(持卡人点击处理完成按钮) 取消处理(持卡人中断投诉)
                        content: '', //投诉主题(事由)
                    }
                },
            }
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>