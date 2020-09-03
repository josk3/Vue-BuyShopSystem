<template>
    <div v-loading="loading">
        <div v-if="order.trade_id" class="order-detail p-0">
            <div class="row">
                <div class="col-12 mb-2">
                    <el-card shadow="hover" class="wpy-card box-card p-3"
                             :body-style="{ padding: '0px' }">
                        <div class="text-left clearfix">
                            订单交易金额
                            <el-button style="float: right; padding: 3px 0"><font-awesome-icon icon="undo"/> 退款</el-button>
                        </div>
                        <div class="text-left">
                            {{ order.order_currency }} {{ order.order_amount }}
                            <span class="pay-status" :class="['ps-' + order.pay_status]">
                                {{order.pay_status | payStatus}}
                            </span>
                            <div class="ml-3">
                                <span class="tr-id">{{ order.trade_id }}</span>
                                <font-awesome-icon :icon="['far', 'clipboard']" @click="handleCopy(order.trade_id,$event)"/>
                            </div>
                        </div>
                    </el-card>
                </div>
                <div class="col-12 mb-2">
                    <el-card shadow="hover" class="wpy-card box-card">
                        <div slot="header" class="clearfix">
                            <span>时间轴</span>
                            <el-button style="float: right; padding: 3px 0">
                                <i class="el-icon-plus"></i>添加备注
                            </el-button>
                        </div>
                        <div v-for="line in timeline" :key="line" class="text item">
                            {{'列表内容 ' }}
                        </div>
                    </el-card>
                </div>
                <div class="col-12 mb-2">
                    <el-card shadow="hover" class="wpy-card box-card">
                        <div slot="header" class="clearfix">
                            <span>支付信息</span>
                        </div>
                        <div class="row list-info-box">
                            <div class="col-6">
                                <div class="item"><span class="label">流水号</span><span class="value">{{ order.trade_id }}</span></div>
                                <div class="item"><span class="label">订单号</span><span class="value">{{ order.merchant_order_no }}</span></div>
                                <div class="item"><span class="label">交易金额</span>
                                    <span class="value">{{ order.order_amount }} {{ order.order_currency }}</span>
                                </div>
                                <div class="item"><span class="label">结算金额</span>
                                    <span class="value">{{ order.settle_amount }} {{ order.settle_currency }}</span>
                                </div>
                                <div class="item"><span class="label">划款状态</span><span class="value">{{ order.settled | yesOrNo }}</span></div>
                                <div class="item"><span class="label">拒付状态</span><span class="value">{{ order.declined | yesOrNo }}</span></div>
                                <div class="item"><span class="label">退款状态</span><span class="value">{{ order.refunded | refundStatus }}</span></div>
                                <div class="item"><span class="label">退款总金额</span><span class="value">{{ order.refund_total }}</span></div>
                                <div class="item"><span class="label">物流状态</span><span class="value">{{ order.delivery_status }}</span></div>
                                <div class="item"><span class="label">物流公司</span><span class="value">{{ order.track_brand }}</span></div>
                                <div class="item"><span class="label">物流单号</span><span class="value">{{ order.track_number }}</span></div>
                            </div>
                            <div class="col-6">
                                <div class="item"><span class="label">卡种</span>
                                    <span class="value"><span class="card-brand" :class="['cb-' + order.card.brand]"></span></span>
                                </div>
                                <div class="item"><span class="label">卡号</span><span class="value">{{ order.card.card64 }}</span></div>
                                <div class="item"><span class="label">卡指纹</span>
                                    <span class="value">{{ order.card.fingerprint }}</span>
                                </div>
                                <div class="item"><span class="label">手续费</span>
                                    <span class="value">{{ order.fees }} {{ order.settle_currency }}</span>
                                </div>
                                <div class="item"><span class="label">风控费</span>
                                    <span class="value">{{ order.risk_fees }} {{ order.settle_currency }}</span>
                                </div>
                                <div class="item"><span class="label">订单生成时间</span><span class="value">{{ order.created_time }}</span></div>
                                <div class="item"><span class="label">支付时间</span><span class="value">{{ order.payment_time }}</span></div>
                                <div class="item"><span class="label">支付编号</span><span class="value">{{ order.payment_id }}</span></div>
                                <div class="item"><span class="label">交易网址</span><span class="value">{{ order.site_url }}</span></div>
                                <div class="item"><span class="label">交易ip</span><span class="value">{{ order.ip }}</span></div>

                            </div>
                        </div>
                    </el-card>
                </div>
                <div class="col-12 mb-2">
                    <el-card shadow="hover" class="wpy-card box-card">
                        <div slot="header" class="clearfix">
                            <span>持卡人信息</span>
                        </div>
                        <div class="row list-info-box">
                            <div class="col-6">
                                <div><strong class="title">收货信息</strong></div>
                                <div class="item"><span class="label">邮箱</span>
                                    <span class="value">{{ order.customer.shipping_email }}</span>
                                </div>
                                <div class="item"><span class="label">姓名</span>
                                    <span class="value">{{ order.customer.shipping_first_name }}</span> <span>{{ order.customer.shipping_last_name }}</span>
                                </div>
                                <div class="item"><span class="label">电话</span>
                                    <span class="value">{{ order.customer.shipping_phone }}</span>
                                </div>
                                <div class="item"><span class="label">地址</span>
                                    <span class="value">{{ order.customer.shipping_address }}</span>
                                </div>
                                <div class="item"><span class="label">城市</span>
                                    <span class="value">{{ order.customer.shipping_city }}</span>
                                </div>
                                <div class="item"><span class="label">省/州</span>
                                    <span class="value">{{ order.customer.shipping_state }}</span>
                                </div>
                                <div class="item"><span class="label">国家</span>
                                    <span class="value">{{ order.customer.shipping_country }}</span>
                                </div>
                                <div class="item"><span class="label">邮编</span>
                                    <span class="value">{{ order.customer.shipping_zip_code }}</span>

                                </div>
                            </div>
                            <div class="col-6">
                                <div><strong class="title">账单信息</strong></div>
                                <div class="item"><span class="label">邮箱</span>
                                    <span class="value">{{ order.customer.email }}</span>
                                </div>
                                <div class="item"><span class="label">姓名</span>
                                    <span class="value">{{ order.customer.first_name }}</span> <span>{{ order.customer.last_name }}</span>
                                </div>
                                <div class="item"><span class="label">电话</span>
                                    <span class="value">{{ order.customer.phone }}</span>
                                </div>
                                <div class="item"><span class="label">地址</span>
                                    <span class="value">{{ order.customer.address }}</span>
                                </div>
                                <div class="item"><span class="label">城市</span>
                                    <span class="value">{{ order.customer.city }}</span>
                                </div>
                                <div class="item"><span class="label">省/州</span>
                                    <span class="value">{{ order.customer.state }}</span>
                                </div>
                                <div class="item"><span class="label">国家</span>
                                    <span class="value">{{ order.customer.country }}</span>
                                </div>
                                <div class="item"><span class="label">邮编</span>
                                    <span class="value">{{ order.customer.zip_code }}</span>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </div>
            <!--                -->
                <div class="col-12 mb-2">
                    <el-card shadow="hover" class="wpy-card box-card">
                        <div slot="header" class="clearfix">
                            <span>产品信息</span>
                        </div>
                        <div class="row list-info-box">
                            <div v-if="order.products" class="col-12">
                                <div v-for="item in order.products" :key="item.sku">
                                    <div class="item"><span class="label">产品编号</span><span class="value">{{ item.sku }}</span></div>
                                    <div class="item"><span class="label">产品名称</span><span class="value">{{ item.name }}</span></div>
                                    <div class="item"><span class="label">单价</span><span class="value">{{ item.price }} {{ item.currency }}</span></div>
                                    <div class="item"><span class="label">数量</span><span class="value">{{ item.count }}</span></div>
                                </div>
                            </div>
                            <div v-else class="col-12">
                                --无--
                            </div>
                        </div>
                    </el-card>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="row">
                <div class="col-12 mb-2">
                    <el-card shadow="hover" class="wpy-card box-card p-3"
                             :body-style="{ padding: '0px' }">
                        <div class="text-muted p-0">
                            <i class="el-icon-warning-outline text-blue"></i> 找不到订单信息
                        </div>
                    </el-card>
                </div>
            </div>
        </div>
<!--    d    -->
        <el-dialog custom-class="wpy-dialog sm-dialog"
                   :show-close="false" :close-on-click-modal="false"
                   title="退款"
                   :visible.sync="refundDialogVisible">
            <div>
                <el-form ref="refund_form"
                         :model="refund_form"
                         :rules="rules" label-width="80px">
                    <el-form-item label="流水号">
                        <el-input :value="refund_form.trade_id" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="订单金额">
                        <el-input :value="refund_form.order_amount" :disabled="true">
                            <template slot="append">{{ refund_form.order_currency }}</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="退款金额" prop="refund_amount">
                        <el-input v-model="refund_form.refund_amount" placeholder="请输入退款金额">
                            <template slot="append">{{ refund_form.order_currency }}</template>
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer" v-loading="loading">
                <el-button size="mini" @click="closeDialog('refund_form')">取消</el-button>
                <el-button size="mini" type="primary" @click="submitRefund">提交退款</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import configs from '@/configs'
    import {getOrder, getTimeline} from "@/service/orderSer";
    import {isEmpty} from "@/utils/validate";
    import clipboard from "@/utils/clipboard";
    import {applyRefund} from "@/service/refundSer";

    export default {
        name: "order_detail",
        computed: { //watch跟踪数据变化, 重点user, configs
            configs() {
                return configs;
            },
        },
        data() {
            return {
                loading: false,
                tradeId: '',
                order: {},
                timeline: [],
                refundDialogVisible: false,
                refund_form: {trade_id: '', order_amount: '', order_currency: '', refund_amount: ''},
            }
        },
        mounted() {
            if (!isEmpty(this.$route.params)) {
                this.tradeId = this.$route.params.id
            }
            this.getOrder();
        },
        methods: {
            handleCopy(text, event) {
                clipboard(text, event)
            },
            getOrder() {
                this.loading = true
                getOrder(this.tradeId).then(res => {
                    const {data} = res
                    this.$data.order = data
                    getTimeline(this.tradeId).then(res => {
                        const {data} = res
                        this.$data.timeline = data.list
                    }).finally(() => {
                        this.loading = false
                    })
                }).finally(() => {
                    this.loading = false
                })
            },
            closeDialog(name){
                this.refundDialogVisible = false
                this.$refs[name].resetFields();//重置
            },
            submitRefund() {
                applyRefund(this.refund_form).then(() => {
                    this.$message.success(this.$i18n.t('comm.success').toString())
                    this.closeDialog('refund_form')
                    this.getOrder();//reload
                }).finally(() => {
                    this.loading = false
                })
            },
        },
    }
</script>

<style scoped>

</style>
