<template>
  <div v-loading="loading">
    <div v-if="order.trade_id" class="order-detail p-0" :class="'order-detail-' + lang">
      <div class="row">
        <div class="col-12 mb-2">
          <el-card shadow="hover" class="wpy-card box-card p-3" :body-style="{ padding: '0px' }">
            <div class="text-left clearfix">
              <el-button type="text" @click="goBack"><i class="el-icon-arrow-left"></i></el-button>
              {{ $t('order.order_trade_amount') }}
              <el-button v-if="order.pay_status === 'paid'" class="float-right" size="mini" @click="openRefundDialog">
                <font-awesome-icon icon="undo" />
                {{ $t('kind.refund') }}
              </el-button>
              <el-button v-else-if="order.pay_status === 'pending'" class="float-right" size="mini"
                @click="openCancelPendingDialog">
                <i class="el-icon-refresh-right"></i>
                {{ $t('order.cancel_order') }}
              </el-button>
            </div>
            <div class="text-left">
              <strong>{{ order.order_currency }} {{ order.order_amount }}</strong>
              <span v-if="order.payment_method != 'card'" class="payment-method"
                    :class="['pm-' + order.payment_method]" style="width: 100px;height: 18px;"></span>
              <span v-if="order.declined" class="pay-status declined-1 ml-1">
                {{ $t('status.has_declined') }}
                <small v-if="order.chargeback_cancel" class="pay-status text-green ml-1">
                  {{ $t('timeline.chargeback_cancel') }}
                </small>
              </span>
              <span v-if="order.refund_total < 0" class="pay-status refund-1 ml-1">
                {{ $t('kind.refund') }} {{ order.refund_total }} {{ order.order_currency }}
              </span>
              <span v-else class="pay-status ml-1" :class="['ps-' + order.pay_status]">
                <span v-if="order.payment_method != 'card' && order.pay_status == 'pending'">
                  {{$i18n.t('status.localPayPending')}}
                </span>
                <span v-else>{{ order.pay_status | payStatus }}</span>
              </span>
              <span class="ml-1 tr-id btn clipboard-btn" :data-clipboard-text="order.trade_id" @click="copy">
                {{ order.trade_id }}
                <font-awesome-icon :icon="['far', 'clipboard']" />
              </span>
            </div>
          </el-card>
        </div>
        <div class="col-12 mb-2">
          <el-card shadow="hover" class="wpy-card box-card">
            <div slot="header" class="clearfix">
              <span>{{ $t('comm.timeline') }}</span>
              <!--                            <el-button class="float-right" size="mini">-->
              <!--                                <i class="el-icon-plus"></i>添加备注-->
              <!--                            </el-button>-->
            </div>
            <el-timeline>
              <el-timeline-item v-for="(activity, index) in timeline" :key="index" :type="timelineType(activity.kind)"
                :timestamp="activity.created_time | toMinuteTime">
                {{ $t('timeline.' + activity.kind) }}
                <span v-if="activity.kind === 'payment_failed'">
                  {{ activity.transaction.fail_code }} {{ activity.transaction.fail_message }}
                  <small v-if="activity.transaction.fail_code === '115100'">高风险黑名单顾客</small>
                </span>
                <span v-if="activity.kind === 'order_canceled'">
                  {{ activity.info }}
                </span>
                <span v-if="activity.kind === 'refund'">
                  {{ activity.title | refundStatus }}
                  <small><i>{{ refundReasonI18n(activity.transaction.reason) }}</i></small>
                  <storng v-if="activity.transaction.review_reason
                    && activity.title === 'rejectRefund'">
                    {{ activity.transaction.review_reason }}
                  </storng>
                </span>
                <span v-if="activity.kind === 'shipment_info'">
                  {{ activity.title | shipTitle }}
                  {{ activity.info | timelineShipInfo }}
                </span>
                <span v-if="activity.kind === 'settle'">
                  {{ activity.title | settleTitle }}
                  {{ activity.info }}
                </span>
                <span v-if="activity.kind === 'finance_ticket'">
                  {{ activity.info }}
                </span>
              </el-timeline-item>
            </el-timeline>
          </el-card>
        </div>
        <div class="col-12 mb-2">
          <el-card shadow="hover" class="wpy-card box-card">
            <div slot="header" class="clearfix">
              <span>{{ $t('order.payment_info') }}</span>
            </div>
            <div class="row list-info-box">
              <div class="col-6">
                <div class="item"><span class="label">{{ $t('comm.trade_id') }}</span><span class="value">{{
                  order.trade_id }}</span></div>
                <div class="item"><span class="label">{{ $t('comm.merchant_order_no') }}</span><span class="value">{{
                  order.merchant_order_no }}</span>
                </div>
                <div class="item"><span class="label">{{ $t('order.trade_amount') }}</span>
                  <span class="value">{{ order.order_amount }} {{ order.order_currency }}</span>
                </div>
                <div class="item"><span class="label">{{ $t('comm.settle_amount') }}</span>
                  <span class="value">{{ order.settle_amount }} {{ order.settle_currency }}</span>
                </div>
                <div class="item"><span class="label">{{ $t('order.settle_status') }}</span><span class="value">{{
                  order.settled | settleStatus }}</span>
                </div>
                <div class="item"><span class="label">{{ $t('order.chargeback_status') }}</span><span class="value">{{
                  order.declined | yesOrNo }}</span>
                </div>
                <div class="item"><span class="label">{{ $t('order.refund_status') }}</span><span class="value">{{
                  order.refunded | refundStatus }}</span>
                </div>
                <div class="item"><span class="label">{{ $t('order.refund_total_amount') }}</span>
                  <span class="value">{{ order.refund_total }} {{ order.order_currency }}</span>
                </div>
                <div class="item"><span class="label">{{ $t('comm.processing_fees') }}</span>
                  <span class="value">{{ order.origin_risk_fees }} USD</span>
                </div>

              </div>
              <div class="col-6">
                <div v-if="order.card" class="item">
                  <span class="label">{{ $t('order.card_brand') }}</span>
                  <span class="value"><span class="card-brand" :class="['cb-' + order.card.brand]"></span></span>
                </div>
                <div v-else class="item">
                  <span class="label">{{ $t('order.payment_method') }}</span>
                  <span class="value">
                    {{order.payment_method}}<br/>
                    <span class="payment-method" :class="['pm-' + order.payment_method]" style="width: 100px;height: 30px;"></span>
                  </span>
                </div>
                <div class="item" v-if="order.card">
                  <span class="label">{{ $t('risk.card_no') }}</span><span class="value">••••
                  {{order.card.last4 }}</span>
                </div>
                <div v-if="order.bill_address && order.bill_address != 'x'" class="item">
                  <span class="label">{{ $t('risk.bill_address') }}&nbsp;</span>
                  <span class="value emailValue">{{ order.bill_address }}</span>
                </div>
                <div class="item"><span class="label">{{ $t('order.order_time') }}&nbsp;</span><span class="value">{{
                  order.created_time | toFullTime }}</span>
                </div>
                <div class="item"><span class="label">{{ $t('order.payment_time') }}&nbsp;</span><span class="value">{{
                  order.payment_time | toFullTime }}</span>
                </div>
                <div class="item"><span class="label">{{ $t('order.payment_id') }}&nbsp;</span><span class="value">{{
                  order.payment_id }}</span>
                </div>
                <div class="item"><span class="label">{{ $t('order.trade_site_url') }}</span><span class="value">{{
                  order.site_url }}</span>
                </div>
                <div class="item"><span class="label">{{ $t('order.trade_ip') }}&nbsp;</span><span class="value">{{
                  order.ip }}</span></div>
                <div class="item"><span class="label">{{ $t('order.track') }}</span>
                  <span class="value">{{ order.track_brand }} {{ order.track_number }}</span>
                </div>
                <div class="item" v-if="order.sale_settle_batch_id"><span class="label">BatchID</span>
                  <span class="value">{{ order.sale_settle_batch_id }}</span>
                </div>
                <div class="item" v-if="order.deposit_batch_id"><span class="label">Deposit BatchID</span>
                  <span class="value">{{ order.deposit_batch_id }}</span>
                </div>
              </div>
            </div>
          </el-card>
        </div>
        <div class="col-12 mb-2">
          <el-card shadow="hover" class="wpy-card box-card">
            <div slot="header" class="clearfix">
              <span>{{ $t('order.customer_info') }}</span>
            </div>
            <div class="row list-info-box">
              <div class="col-6">
                <div><strong class="title">{{ $t('order.shipping_info') }}</strong></div>
                <div class="item"><span class="label">{{ $t('order.order_customer_email') }}&nbsp;</span>
                  <span class="value emailValue">{{ order.customer.shipping_email }}</span>
                </div>
                <div class="item"><span class="label">{{ $t('order.order_customer_name') }}&nbsp;</span>
                  <span class="value">{{ order.customer.shipping_first_name }}</span>
                  <span>{{ order.customer.shipping_last_name }}</span>
                </div>
                <div class="item"><span class="label">{{ $t('order.order_customer_phone') }}&nbsp;</span>
                  <span class="value">{{ order.customer.shipping_phone }}</span>
                </div>
                <div class="item"><span class="label">{{ $t('order.order_customer_address') }}&nbsp;</span>
                  <span class="value">{{ order.customer.shipping_address }}</span>
                </div>
                <div class="item"><span class="label">{{ $t('order.order_customer_city') }}&nbsp;</span>
                  <span class="value">{{ order.customer.shipping_city }}</span>
                </div>
                <div class="item"><span class="label">{{ $t('order.order_customer_state') }}&nbsp;</span>
                  <span class="value">{{ order.customer.shipping_state }}</span>
                </div>
                <div class="item"><span class="label">{{ $t('order.order_customer_country') }}&nbsp;</span>
                  <span class="value">{{ order.customer.shipping_country }}</span>
                </div>
                <div class="item"><span class="label">{{ $t('order.order_customer_zip_code') }}&nbsp;</span>
                  <span class="value">{{ order.customer.shipping_zip_code }}</span>

                </div>
              </div>
              <div class="col-6">
                <div><strong class="title">{{ $t('order.billing_info') }}</strong></div>
                <div class="item"><span class="label">{{ $t('order.order_customer_email') }}&nbsp;</span>
                  <span class="value emailValue">{{ order.customer.email }}</span>
                </div>
                <div class="item"><span class="label">{{ $t('order.order_customer_name') }}&nbsp;</span>
                  <span class="value">{{ order.customer.first_name }}</span> <span>{{ order.customer.last_name }}</span>
                </div>
                <div class="item"><span class="label">{{ $t('order.order_customer_phone') }}&nbsp;</span>
                  <span class="value">{{ order.customer.phone }}</span>
                </div>
                <div class="item"><span class="label">{{ $t('order.order_customer_address') }}&nbsp;</span>
                  <span class="value">{{ order.customer.address }}</span>
                </div>
                <div class="item"><span class="label">{{ $t('order.order_customer_city') }}&nbsp;</span>
                  <span class="value">{{ order.customer.city }}</span>
                </div>
                <div class="item"><span class="label">{{ $t('order.order_customer_state') }}&nbsp;</span>
                  <span class="value">{{ order.customer.state }}</span>
                </div>
                <div class="item"><span class="label">{{ $t('order.order_customer_country') }}&nbsp;</span>
                  <span class="value">{{ order.customer.country }}</span>
                </div>
                <div class="item"><span class="label">{{ $t('order.order_customer_zip_code') }}&nbsp;</span>
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
              <span>{{ $t('order.order_product_info') }}</span>
            </div>
            <div class="row list-info-box">
              <div v-if="order.products" class="col-12">
                <div v-for="item in order.products" :key="item.sku">
                  <div class="item"><span class="label">{{ $t('order.product_sku') }}</span><span class="value">{{
                    item.sku }}</span></div>
                  <div class="item"><span class="label">{{ $t('order.product_name') }}</span><span class="value">{{
                    item.name }}</span></div>
                  <div class="item"><span class="label">{{ $t('order.product_amount') }}</span><span class="value">{{
                    item.amount }} {{ item.currency }}</span>
                  </div>
                  <div class="item"><span class="label">{{ $t('order.product_quantity') }}</span><span class="value">{{
                    item.quantity }}</span></div>
                  <el-divider></el-divider>
                </div>
              </div>
              <div v-else-if="order.product_json">
                {{ order.product_json }}
              </div>
              <div v-else class="col-12">
                --{{ $t('order.not_date') }}--
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="row">
        <div class="col-12 mb-2">
          <el-card shadow="hover" class="wpy-card box-card p-3" :body-style="{ padding: '0px' }">
            <div class="text-muted p-0">
              <i class="el-icon-warning-outline text-blue"></i> {{ $t('order.no_find_order_info') }}
            </div>
          </el-card>
        </div>
      </div>
    </div>
    <!--    d    -->
    <RefundDialog ref="refund_dialog"></RefundDialog>
    <CancelPendingDialog ref="cancel_pending_dialog"></CancelPendingDialog>

  </div>
</template>

<script>
import configs from '@/configs'
import { getOrder, getTimeline } from "@/service/orderSer";
import { isEmpty } from "@/utils/validate";
import newClipboard from "@/utils/clipboard";
import RefundDialog from "@/components/RefundDialog";
import CancelPendingDialog from "@/components/CancelPendingDialog";
import { mapState } from "vuex";

export default {
  name: "order_detail",
  components: { RefundDialog, CancelPendingDialog },
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
      setTimeout(() => {
        
      }, 100)
      this.$bus.$emit('search_date', this.$route.query.search_date)
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
        const { data } = res
        this.$data.order = data
        getTimeline(this.tradeId).then(res => {
          const { data } = res
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
    openCancelPendingDialog() {
      this.$refs.cancel_pending_dialog.show(this.order, this.getOrder)
    },
    refundReasonI18n(reason) {
      if ("申请全额退款" === reason) {
        return this.$i18n.t('refund.all_amount_refund').toString();
      } else if (reason.indexOf('申请部份退款金额') === 0) {
        return this.$i18n.t('refund.part_refund').toString() + reason.replace('申请部份退款金额', '');
      } else {
        return reason;
      }
    }

  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.order-detail-en .list-info-box span.label {
  width: 130px;

}

.emailValue {
  user-select: all !important;
}
</style>
