<template>
    <div class="clearfix">
        <!--    d    -->
        <el-dialog custom-class="wpy-dialog sm-dialog"
                   :show-close="false" :close-on-click-modal="false"
                   :title="$t('kind.refund')"
                   :visible.sync="refundDialogVisible">
            <div>
                <el-form ref="refund"
                         :model="refund"
                         :rules="rules"
                         :label-width="lang === 'zh' ? '80px' : '130px'">
                    <el-form-item :label="$t('comm.trade_id')">
                        <el-input :value="refund.trade_id" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('comm.order_amount')">
                        <el-input :value="refund.order_amount" :disabled="true">
                            <template slot="append">{{ refund.order_currency }}</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="$t('comm.refund_amount')" prop="refund_amount">
                        <el-input v-model="refund.refund_amount" :placeholder="$t('comm.refund_amount')">
                            <template slot="append">{{ refund.order_currency }}</template>
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer" v-loading="loading">
                <el-button size="mini" @click="closeDialog('refund_form')">{{$t('comm.cancel')}}</el-button>
                <el-popconfirm
                        :confirmButtonText="$t('comm.sure')"
                        :cancelButtonText="$t('comm.cancel')"
                        :title="$t('order.confirm_apply_refund')" @onConfirm="submitRefund" :hideIcon="true">
                    <el-button slot="reference" size="mini" type="primary" class="ml-3" >{{$t('order.submit_refund')}}</el-button>
                </el-popconfirm>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    import {applyRefund} from "@/service/refundSer";
    import {isEmpty} from "@/utils/validate";
    import {mapState} from "vuex";
    import configs from "@/configs";

    export default {
        name: "RefundDialog",
        props: [],
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
                refund: this.initFormObj(),
                refundDialogVisible: false,
                rules: {
                    refund_amount: [
                        {required: true, message: this.validMsg('comm.refund_amount'), trigger: 'blur'},
                    ]
                },
            }
        },
        watch: {},
        mounted() {
        },
        methods: {
            validMsg(name) {
                return this.$i18n.t('valid.required_field', [this.$i18n.t(name)]);
            },
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
