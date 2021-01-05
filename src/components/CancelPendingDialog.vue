<template>
    <div class="clearfix">
        <!--    d    -->
        <el-dialog custom-class="wpy-dialog sm-dialog"
                   :show-close="false" :close-on-click-modal="false"
                   :title="$t('order.cancel_pending')"
                   :visible.sync="cancelPendingDialogVisible">
            <div>
                <el-form ref="cancel_pending"
                         :model="cancel_pending"
                         :label-width="lang === 'zh' ? '80px' : '130px'">
                    <el-form-item :label="$t('comm.trade_id')">
                        <el-input :value="cancel_pending.trade_id" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('comm.order_amount')">
                        <el-input :value="cancel_pending.order_amount" :disabled="true">
                            <template slot="append">{{ cancel_pending.order_currency }}</template>
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer" v-loading="loading">
                <el-button size="mini" @click="closeDialog()">{{$t('comm.cancel')}}</el-button>
                <el-button size="mini" type="primary" @click="submitCancelPending" class="ml-3">
                    {{$t('comm.sure')}}-{{$t('order.cancel_pending')}}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    import {isEmpty} from "@/utils/validate";
    import {mapState} from "vuex";
    import configs from "@/configs";
    import {cancelPendingOrder} from "@/service/orderSer";

    export default {
        name: "CancelPendingDialog",
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
                cancel_pending: this.initFormObj(),
                cancelPendingDialogVisible: false,
                callbackFun: '',
            }
        },
        watch: {},
        mounted() {
        },
        methods: {
            initFormObj() {
                return {trade_id: '', order_amount: '', order_currency: ''};
            },
            closeDialog() {
                this.cancelPendingDialogVisible = false
                this.$refs.cancel_pending.resetFields();//重置
            },
            show(order, callbackFun) {
                if (!isEmpty(order)) {
                    this.cancel_pending.trade_id = order.trade_id
                    this.cancel_pending.order_amount = order.order_amount
                    this.cancel_pending.order_currency = order.order_currency
                }
                this.cancelPendingDialogVisible = true
                this.callbackFun = callbackFun;
            },
            submitCancelPending() {
                let fun = this.callbackFun
                cancelPendingOrder(this.cancel_pending).then(() => {
                    this.$message.success(this.$i18n.t('comm.success').toString())
                    this.closeDialog()
                    if (!isEmpty(fun)) {
                        fun();
                    }
                }).finally(() => {
                    this.$data.loading = false
                })
            },

        },

    }
</script>
