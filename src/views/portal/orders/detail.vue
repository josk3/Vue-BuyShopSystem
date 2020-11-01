<template>
    <div v-loading="loading">
        <div v-if="order.trade_id" class="order-detail p-0"  :class="'order-detail-' + lang">
            <div class="row">
                <div class="col-12 mb-2">
                    <el-card shadow="hover" class="wpy-card box-card p-3"
                             :body-style="{ padding: '0px' }">
                        <div class="text-left clearfix">
                            <el-button type="text" @click="goBack"><i class="el-icon-arrow-left"></i></el-button>
                            {{$t('order.order_trade_amount')}}
                            <el-button v-if="order.pay_status === 'paid'" class="float-right" size="mini"
                                       @click="openRefundDialog">
                                <font-awesome-icon icon="undo"/>
                                {{$t('kind.refund')}}
                            </el-button>
                        </div>
                        <div class="text-left">
                            <strong>{{ order.order_currency }} {{ order.order_amount }}</strong>
                            <span v-if="order.declined" class="pay-status declined-1 ml-1">
                                {{$t('status.has_declined')}}
                            </span>
                            <span v-else-if="order.refund_total < 0" class="pay-status refund-1 ml-1">
                                {{$t('kind.refund')}} {{order.refund_total}} {{ order.order_currency }}
                            </span>
                            <span v-else class="pay-status ml-1" :class="['ps-' + order.pay_status]">
                                {{order.pay_status | payStatus}}
                            </span>
                            <span class="ml-1 tr-id btn clipboard-btn" :data-clipboard-text="order.trade_id"
                                  @click="copy">
                                {{ order.trade_id }}
                                <font-awesome-icon :icon="['far', 'clipboard']"/>
                            </span>
                        </div>
                    </el-card>
                </div>
                <div class="col-12 mb-2">
                    <el-card shadow="hover" class="wpy-card box-card">
                        <div slot="header" class="clearfix">
                            <span>{{$t('comm.timeline')}}</span>
                            <!--                            <el-button class="float-right" size="mini">-->
                            <!--                                <i class="el-icon-plus"></i>添加备注-->
                            <!--                            </el-button>-->
                        </div>
                        <el-timeline>
                            <el-timeline-item
                                    v-for="(activity, index) in timeline"
                                    :key="index"
                                    :type="timelineType(activity.kind)"
                                    :timestamp="activity.created_time | toMinuteTime">
                                {{ $t('timeline.' + activity.kind) }}
                                <span v-if="activity.kind === 'payment_failed'">
                                    {{ activity.transaction.fail_code}} {{ activity.transaction.fail_message}}
                                </span>
                                <span v-if="activity.kind === 'order_canceled'">
                                    {{ activity.info }}
                                </span>
                                <span v-if="activity.kind === 'refund'">
                                    {{ activity.transaction.status | refundStatus}}
                                    {{ activity.transaction.reason}}
                                </span>
                            </el-timeline-item>
                        </el-timeline>
                    </el-card>
                </div>
                <div class="col-12 mb-2">
                    <el-card shadow="hover" class="wpy-card box-card">
                        <div slot="header" class="clearfix">
                            <span>{{$t('order.payment_info')}}</span>
                        </div>
                        <div class="row list-info-box">
                            <div class="col-6">
                                <div class="item"><span class="label">{{$t('comm.trade_id')}}</span><span
                                        class="value">{{ order.trade_id }}</span></div>
                                <div class="item"><span class="label">{{$t('comm.merchant_order_no')}}</span><span
                                        class="value">{{ order.merchant_order_no }}</span>
                                </div>
                                <div class="item"><span class="label">{{$t('order.trade_amount')}}</span>
                                    <span class="value">{{ order.order_amount }} {{ order.order_currency }}</span>
                                </div>
                                <div class="item"><span class="label">{{$t('comm.settle_amount')}}</span>
                                    <span class="value">{{ order.settle_amount }} {{ order.settle_currency }}</span>
                                </div>
                                <div class="item"><span class="label">{{$t('order.settle_status')}}</span><span
                                        class="value">{{ order.settled | settleStatus }}</span>
                                </div>
                                <div class="item"><span class="label">{{$t('order.chargeback_status')}}</span><span
                                        class="value">{{ order.declined | yesOrNo }}</span>
                                </div>
                                <div class="item"><span class="label">{{$t('order.refund_status')}}</span><span
                                        class="value">{{ order.refunded | refundStatus }}</span>
                                </div>
                                <div class="item"><span class="label">{{$t('order.refund_total_amount')}}</span>
                                    <span class="value">{{ order.refund_total }} {{ order.order_currency }}</span>
                                </div>
                                <div class="item"><span class="label">{{$t('comm.processing_fees')}}</span>
                                    <span class="value">{{ order.origin_risk_fees }} USD</span>
                                </div>

                            </div>
                            <div class="col-6">
                                <div class="item"><span class="label">{{$t('order.card_brand')}}</span>
                                    <span class="value"><span class="card-brand"
                                                              :class="['cb-' + order.card.brand]"></span></span>
                                </div>
                                <div class="item"><span class="label">{{$t('risk.card_no')}}</span><span class="value">•••• {{ order.card.last4 }}</span>
                                </div>
                                <div class="item"><span class="label">{{$t('risk.fingerprint')}}</span>
                                    <span class="value">{{ order.card.fingerprint }}</span>
                                </div>
                                <div class="item"><span class="label">{{$t('order.order_time')}}</span><span
                                        class="value">{{ order.created_time | toFullTime }}</span>
                                </div>
                                <div class="item"><span class="label">{{$t('order.payment_time')}}</span><span
                                        class="value">{{ order.payment_time | toFullTime }}</span>
                                </div>
                                <div class="item"><span class="label">{{$t('order.payment_id')}}</span><span
                                        class="value">{{ order.payment_id }}</span>
                                </div>
                                <div class="item"><span class="label">{{$t('order.trade_site_url')}}</span><span
                                        class="value">{{ order.site_url }}</span>
                                </div>
                                <div class="item"><span class="label">{{$t('order.trade_ip')}}</span><span
                                        class="value">{{ order.ip }}</span></div>
                                <div class="item"><span class="label">{{$t('order.track')}}</span>
                                    <span class="value">{{ order.track_brand }} {{ order.track_number }}</span>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </div>
                <div class="col-12 mb-2">
                    <el-card shadow="hover" class="wpy-card box-card">
                        <div slot="header" class="clearfix">
                            <span>{{$t('order.customer_info')}}</span>
                        </div>
                        <div class="row list-info-box">
                            <div class="col-6">
                                <div><strong class="title">{{$t('order.shipping_info')}}</strong></div>
                                <div class="item"><span class="label">{{$t('order.order_customer_email')}}</span>
                                    <span class="value">{{ order.customer.shipping_email }}</span>
                                </div>
                                <div class="item"><span class="label">{{$t('order.order_customer_name')}}</span>
                                    <span class="value">{{ order.customer.shipping_first_name }}</span> <span>{{ order.customer.shipping_last_name }}</span>
                                </div>
                                <div class="item"><span class="label">{{$t('order.order_customer_phone')}}</span>
                                    <span class="value">{{ order.customer.shipping_phone }}</span>
                                </div>
                                <div class="item"><span class="label">{{$t('order.order_customer_address')}}</span>
                                    <span class="value">{{ order.customer.shipping_address }}</span>
                                </div>
                                <div class="item"><span class="label">{{$t('order.order_customer_city')}}</span>
                                    <span class="value">{{ order.customer.shipping_city }}</span>
                                </div>
                                <div class="item"><span class="label">{{$t('order.order_customer_state')}}</span>
                                    <span class="value">{{ order.customer.shipping_state }}</span>
                                </div>
                                <div class="item"><span class="label">{{$t('order.order_customer_country')}}</span>
                                    <span class="value">{{ order.customer.shipping_country }}</span>
                                </div>
                                <div class="item"><span class="label">{{$t('order.order_customer_zip_code')}}</span>
                                    <span class="value">{{ order.customer.shipping_zip_code }}</span>

                                </div>
                            </div>
                            <div class="col-6">
                                <div><strong class="title">{{$t('order.billing_info')}}</strong></div>
                                <div class="item"><span class="label">{{$t('order.order_customer_email')}}</span>
                                    <span class="value">{{ order.customer.email }}</span>
                                </div>
                                <div class="item"><span class="label">{{$t('order.order_customer_name')}}</span>
                                    <span class="value">{{ order.customer.first_name }}</span> <span>{{ order.customer.last_name }}</span>
                                </div>
                                <div class="item"><span class="label">{{$t('order.order_customer_phone')}}</span>
                                    <span class="value">{{ order.customer.phone }}</span>
                                </div>
                                <div class="item"><span class="label">{{$t('order.order_customer_address')}}</span>
                                    <span class="value">{{ order.customer.address }}</span>
                                </div>
                                <div class="item"><span class="label">{{$t('order.order_customer_city')}}</span>
                                    <span class="value">{{ order.customer.city }}</span>
                                </div>
                                <div class="item"><span class="label">{{$t('order.order_customer_state')}}</span>
                                    <span class="value">{{ order.customer.state }}</span>
                                </div>
                                <div class="item"><span class="label">{{$t('order.order_customer_country')}}</span>
                                    <span class="value">{{ order.customer.country }}</span>
                                </div>
                                <div class="item"><span class="label">{{$t('order.order_customer_zip_code')}}</span>
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
                            <span>{{$t('order.order_product_info')}}</span>
                        </div>
                        <div class="row list-info-box">
                            <div v-if="order.products" class="col-12">
                                <div v-for="item in order.products" :key="item.sku">
                                    <div class="item"><span class="label">{{$t('order.product_sku')}}</span><span
                                            class="value">{{ item.sku }}</span></div>
                                    <div class="item"><span class="label">{{$t('order.product_name')}}</span><span
                                            class="value">{{ item.name }}</span></div>
                                    <div class="item"><span class="label">{{$t('order.product_amount')}}</span><span
                                            class="value">{{ item.amount }} {{ item.currency }}</span>
                                    </div>
                                    <div class="item"><span class="label">{{$t('order.product_quantity')}}</span><span
                                            class="value">{{ item.quantity }}</span></div>
                                    <el-divider></el-divider>
                                </div>
                            </div>
                            <div v-else class="col-12">
                                --{{$t('order.not_date')}}--
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
                            <i class="el-icon-warning-outline text-blue"></i> {{$t('order.no_find_order_info')}}
                        </div>
                    </el-card>
                </div>
            </div>
        </div>
        <!--    d    -->
        <RefundDialog ref="refund_dialog"></RefundDialog>

    </div>
</template>

<script>
    import configs from '@/configs'
    import {getOrder, getTimeline} from "@/service/orderSer";
    import {isEmpty} from "@/utils/validate";
    import newClipboard from "@/utils/clipboard";
    import RefundDialog from "@/components/RefundDialog";
    import {mapState} from "vuex";

    export default {
        name: "order_detail",
        components: {RefundDialog},
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
                tradeId: '',
                order: {},
                timeline: [],
            }
        },
        mounted() {
            if (!isEmpty(this.$route.params)) {
                this.tradeId = this.$route.params.id
                this.loadOrder();
            } else {
                this.$message.error(this.$i18n.t('comm.fail').toString())
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            copy() {
                newClipboard('.clipboard-btn')
            },
            loadOrder() {
                this.getOrder()
            },
            getOrder(callback) {
                this.loading = true
                getOrder(this.tradeId).then(res => {
                    const {data} = res
                    this.$data.order = data
                    getTimeline(this.tradeId).then(res => {
                        const {data} = res
                        this.$data.timeline = data.list
                        if (callback !== undefined) {
                            callback(this.$data)
                        }
                    }).finally(() => {
                        this.loading = false
                    })
                }).finally(() => {
                    this.loading = false
                })
            },
            openRefundDialog() {
                this.$refs.refund_dialog.show(this.order)
            },
            timelineType(kind) {
                if (kind === 'payment_paid') {
                    return 'success';
                } else if (kind === 'chargeback') {
                    return 'danger';
                }
            },

        },
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .order-detail-en .list-info-box span.label{
        width: 130px;
    }
</style>
