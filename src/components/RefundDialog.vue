<template>
    <div class="clearfix">
        <!--    d    -->
        <el-dialog custom-class="wpy-dialog sm-dialog"
                   :show-close="false" :close-on-click-modal="false"
                   title="退款"
                   :visible.sync="refundDialogVisible">
            <div>
                <el-form ref="refund"
                         :model="refund"
                         :rules="rules" label-width="80px">
                    <el-form-item label="流水号">
                        <el-input :value="refund.trade_id" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="订单金额">
                        <el-input :value="refund.order_amount" :disabled="true">
                            <template slot="append">{{ refund.order_currency }}</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="退款金额" prop="refund_amount">
                        <el-input v-model="refund.refund_amount" placeholder="请输入退款金额">
                            <template slot="append">{{ refund.order_currency }}</template>
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer" v-loading="loading">
                <el-button size="mini" @click="closeDialog('refund_form')">取消</el-button>
                <el-popconfirm title="确实提交退款操作" @onConfirm="submitRefund" :hideIcon="true">
                    <el-button slot="reference" size="mini" type="primary" class="ml-3" >提交退款</el-button>
                </el-popconfirm>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    import {applyRefund} from "@/service/refundSer";
    import {isEmpty} from "@/utils/validate";

    export default {
        name: "RefundDialog",
        props: [],
        data() {
            return {
                loading: false,
                refund: this.initFormObj(),
                refundDialogVisible: false,
                rules: {
                    refund_amount: [
                        {required: true, message: '请输入退款金额', trigger: 'blur'},
                    ]
                },
            }
        },
        watch: {},
        mounted() {
        },
        methods: {
            initFormObj() {
                return {trade_id: '', order_amount: '', order_currency: '', refund_amount: ''};
            },
            closeDialog() {
                this.refundDialogVisible = false
                this.$refs.refund.resetFields();//重置
            },
            show(order) {
                if (!isEmpty(order)) {
                    this.refund.trade_id = order.trade_id
                    this.refund.order_amount = order.order_amount
                    this.refund.order_currency = order.order_currency
                }
                this.refundDialogVisible = true
            },
            submitRefund() {
                this.$refs.refund.validate((valid) => {
                    if (!valid) {
                        return false;
                    } else {
                        this.loading = true
                        applyRefund(this.refund).then(() => {
                            this.$message.success(this.$i18n.t('comm.success').toString())
                            this.closeDialog()
                            this.getOrder();//reload
                        }).finally(() => {
                            this.$data.loading = false
                        })
                    }
                });
            },

        },

    }
</script>
