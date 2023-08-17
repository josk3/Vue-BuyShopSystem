<template>
  <div class="clearfix">
    <el-card class="search-box wpy-card box-card mb-2" :body-style="{ padding: '0px' }" shadow="hover">
      <div slot="header" class="clearfix" v-if="searchForm.title !== false">
        <span>{{ $t(searchForm.title) }}</span>
      </div>
      <el-form :model="searchForm" :inline="true" class="form form-inline" ref="searchForm"
               @submit.native.prevent="submitSearch">
        <!-- 日期表组建 -->
        <div class="p-3 pb-0">
          <el-form-item v-if="searchForm.trade_id !== undefined" prop="trade_id">
            <el-input size="mini" v-model="searchForm.trade_id" :placeholder="$t('comm.trade_id')"
                      :class="{inputHaveVal:searchForm.trade_id !== ''}"
                      @keyup.native.enter="submitSearch"
                      clearable></el-input>
          </el-form-item>
          <el-form-item v-if="searchForm.batch_id !== undefined" prop="batch_id">
            <el-input size="mini" v-model="searchForm.batch_id" :placeholder="$t('comm.batch_id')"
                      :class="{inputHaveVal:searchForm.batch_id !== ''}"
                      @keyup.native.enter="submitSearch"
                      clearable></el-input>
          </el-form-item>
          <el-form-item v-if="searchForm.merchant_order_no !== undefined" prop="merchant_order_no">
            <el-input size="mini" v-model="searchForm.merchant_order_no"
                      @keyup.native.enter="submitSearch"
                      :class="{inputHaveVal:searchForm.merchant_order_no !== ''}"
                      :placeholder="searchForm.title === 'nav.trade_manage' ? $t('comm.merchant_order_no_like_left') : $t('comm.merchant_order_no')"
                      clearable></el-input>
          </el-form-item>
          <el-form-item v-if="searchForm.pay_status !== undefined" prop="pay_status">
            <el-select size="mini" v-model="searchForm.pay_status" :placeholder="$t('comm.status')"
                       :class="{inputHaveVal:searchForm.pay_status !== ''}"
                       clearable>
              <el-option
                  v-for="item in payStatusList"
                  :key="item.value"
                  :label="$t('status.' + item.value)"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="searchForm.country_name !== undefined" prop="country_name">
            <el-input size="mini" v-model="searchForm.country_name"
                      :class="{inputHaveVal:searchForm.country_name !== ''}"
                      @keyup.native.enter="submitSearch"
                      :placeholder="$t('comm.country_name')" clearable></el-input>
          </el-form-item>
          <el-form-item v-if="searchForm.blacklist_value !== undefined" prop="blacklist_value">
            <el-input size="mini" v-model="searchForm.blacklist_value"
                      :class="{inputHaveVal:searchForm.blacklist_value !== ''}"
                      @keyup.native.enter="submitSearch"
                      :placeholder="$t('comm.blacklist_value')" clearable></el-input>
          </el-form-item>
          <el-form-item v-if="searchForm.blacklist_type !== undefined" prop="blacklist_type">
            <el-select size="mini" v-model="searchForm.blacklist_type"
                       :class="{inputHaveVal:searchForm.blacklist_type !== ''}"
                       :placeholder="$t('comm.blacklist_type')" clearable>
              <el-option
                  v-for="item in blacklistTypeList"
                  :key="item.value"
                  :label="$t('risk.' + item.value)"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="searchForm.email !== undefined" prop="email">
            <el-input type="email" size="mini" v-model="searchForm.email" :placeholder="$t('comm.email')"
                      :class="{inputHaveVal:searchForm.email !== ''}"
                      @keyup.native.enter="submitSearch"
                      clearable=""></el-input>
          </el-form-item>
          <el-form-item v-if="searchForm.site_url !== undefined" prop="site_url">
            <el-input size="mini" v-model="searchForm.site_url"
                      :class="{inputHaveVal:searchForm.site_url !== ''}"
                      @keyup.native.enter="submitSearch"
                      :placeholder="$t('comm.search_site_url')" clearable></el-input>
          </el-form-item>
          <el-form-item v-if="searchForm.decline_type !== undefined" prop="decline_type">
            <el-select size="mini" v-model="searchForm.decline_type" :placeholder="$t('comm.type')"
                       :class="{inputHaveVal:searchForm.decline_type !== ''}"
                       clearable>
              <el-option
                  v-for="item in declineTypes"
                  :key="item.value"
                  :label="$t('decline.' + item.value)"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="searchForm.decline_warn_type !== undefined" prop="decline_warn_type">
            <el-select size="mini" v-model="searchForm.decline_warn_type" :placeholder="$t('comm.warn_type')"
                       :class="{inputHaveVal:searchForm.decline_warn_type !== ''}"
                       clearable>
              <el-option
                      v-for="item in declineWarnType"
                      :key="item.value"
                      :label="$t('decline_warn_type.' + item.value)"
                      :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
<!--          <el-form-item v-if="searchForm.decline_warn_source !== undefined" prop="decline_warn_source">-->
<!--            <el-select size="mini" v-model="searchForm.decline_warn_source" :placeholder="$t('comm.service_provider')"-->
<!--                       clearable>-->
<!--              <el-option-->
<!--                      v-for="item in declineWarnSource"-->
<!--                      :key="item.value"-->
<!--                      :label="$t('decline_warn_source.' + item.value)"-->
<!--                      :value="item.value">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
          <el-form-item v-if="searchForm.ip !== undefined" prop="ip">
            <el-input size="mini" v-model="searchForm.ip"
                      @keyup.native.enter="submitSearch"
                      :class="{inputHaveVal:searchForm.ip !== ''}"
                      :placeholder="$t('comm.ip')" clearable></el-input>
          </el-form-item>
          <el-form-item v-if="searchForm.track_number !== undefined" prop="track_number">
            <el-input size="mini" v-model="searchForm.track_number"
                      @keyup.native.enter="submitSearch"
                      :class="{inputHaveVal:searchForm.track_number !== ''}"
                      :placeholder="$t('comm.track_number')" clearable></el-input>
          </el-form-item>
          <el-form-item v-if="searchForm.delivery_status !== undefined" prop="delivery_status">
            <el-select size="mini" v-model="searchForm.delivery_status" :placeholder="$t('comm.status')"
                       :class="{inputHaveVal:searchForm.delivery_status !== ''}"
                       clearable>
              <el-option
                  v-for="item in deliveryStatus"
                  :key="item.value"
                  :label="$t('shipment.' + item.value)"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="searchForm.card_brand !== undefined" prop="delivery_status">
            <el-select size="mini" v-model="searchForm.card_brand" :placeholder="$t('order.card_brand')"
                       :class="{inputHaveVal:searchForm.card_brand !== ''}"
                       clearable>
              <el-option
                  v-for="item in cardBrandLists"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="searchForm.search_date !== undefined" prop="start_date">
            <el-date-picker
                v-model="searchForm.search_date"
                :class="formItemClass('search_date')"
                :clearable="searchDateCanClear"
                type="daterange"
                size="mini"
                value-format="yyyy-MM-dd"
                unlink-panels
                :range-separator="$t('comm.to')"
                :start-placeholder="$t('comm.start_date')"
                :end-placeholder="$t('comm.end_date')"
                :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item v-if="searchForm.trade_batch_id !== undefined" prop="trade_batch_id">
            <el-input size="mini" v-model="searchForm.trade_batch_id"
                      :placeholder="$t('comm.trade_batch_id')"
                      @keyup.native.enter="submitSearch"
                      :class="{inputHaveVal:searchForm.trade_batch_id !== ''}"
                      clearable></el-input>
          </el-form-item>
          <el-form-item v-if="searchForm.deposit_batch_id !== undefined" prop="deposit_batch_id">
            <el-input size="mini" v-model="searchForm.deposit_batch_id"
                      :placeholder="$t('comm.deposit_batch_id')"
                      @keyup.native.enter="submitSearch"
                      :class="{inputHaveVal:searchForm.deposit_batch_id !== ''}"
                      clearable></el-input>
          </el-form-item>
          <el-form-item v-if="searchForm.trade_settled !== undefined" prop="trade_settled">
            <el-select size="mini" v-model="searchForm.trade_settled"
                       :class="{inputHaveVal:searchForm.trade_settled !== ''}"
                       :placeholder="$t('comm.trade_settled')" clearable>
              <el-option value="" :label="$t('comm.trade_settled')"></el-option>
              <el-option
                  v-for="item in settleSearchOptions"
                  :key="item.value"
                  :label="$t(item.label)"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="searchForm.deposit_settled !== undefined" prop="deposit_settled">
            <el-select size="mini" v-model="searchForm.deposit_settled"
                       :placeholder="$t('comm.deposit_settled')"
                       :class="{inputHaveVal:searchForm.deposit_settled !== ''}" clearable>
              <el-option value="" :label="$t('comm.deposit_settled')"></el-option>
              <el-option
                  v-for="item in settleSearchOptions"
                  :key="item.value"
                  :label="$t(item.label)"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button size="mini" type="primary"
                       @click="submitSearch">{{ $t('comm.search') }}
            </el-button>
            <el-button size="mini" v-if="searchForm.reset_show !== false" prop="reset_show"
                       @click="resetForm('searchForm')">{{ $t('comm.reset') }}
            </el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>

import {isArray, isEmpty} from "@/utils/validate";

export default {
  name: "SearchBox",
  props: ['params', 'red_item_class', 'date_clearable'],
  data() {
    return {
      ///clearable默认为true
      searchDateCanClear: isEmpty(this.date_clearable) ? true : this.date_clearable,
      searchForm: this.params,
      blacklistTypeList: [
        {value: 'fingerprint'},
        {value: 'email'},
        {value: 'ip'},
        {value: 'address'},
        {value: 'full_name'},
        {value: 'phone'},
        {value: 'card_bin'},
      ],
      payStatusList: [
        {value: 'all'},
        {value: 'paid'},
        {value: 'pending'},
        {value: 'failed'},
        {value: 'canceled'},
      ],
      declineTypes: [
        {value: 'customer_service'},
        {value: 'fraud'},
      ],
      declineWarnType: [
        {value: 'consumptionDispute'},
        {value: 'fraudCard'},
      ],
      declineWarnSource: [
        {value: 'collaboration'},
        {value: 'ethoca'},
        {value: 'rdr'},
      ],
      deliveryStatus: [
        {value: 'all'},
        {value: 'normal'},
        {value: 'submitted'},
        {value: 'reject'},
      ],
      settleSearchOptions: [
        {value: '0', label: 'status.un_settled'},
        {value: '1', label: 'status.has_settled'},
      ],
      pickerOptions: {
        shortcuts: [{
          text: this.$i18n.t("comm.latest_week"),
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: this.$i18n.t("comm.latest_month"),
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: this.$i18n.t("comm.latest_three_months"),
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      cardBrandLists: [
        {value: 'visa', label: 'Visa'},
        {value: 'mastercard', label: 'Master card'},
        {value: 'ae', label: 'American Express'},
        {value: 'jcb', label: 'Jcb'},
        {value: 'dc', label: 'Discover Card'},
        {value: 'DClub', label: 'DinersClub'},
      ],
    }
  },
  watch: {},
  methods: {
    formItemClass(name) {
      if (!isEmpty(this.red_item_class) && isArray(this.red_item_class)) {
        if (this.red_item_class.includes(name)) {
          return 'border-danger';
        } else {
          return isEmpty(this.searchForm.search_date) ? '' : 'inputHaveVal'
        }
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitSearch() {
      this.$emit('search', this.form)
    },
  },
  mounted() {
    //date时间控件
  }
}
</script>
<style lang="scss">
.inputHaveVal{
  border-color: #1455cb;
}
.inputHaveVal input {
  color: #003088;
  font-weight: bold;
  border-color: #1455cb;
}
</style>
<style scoped>
</style>
