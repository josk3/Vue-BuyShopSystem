<template>
    <div class="clearfix">
        <el-card class="search-box wpy-card box-card mb-2" :body-style="{ padding: '0px' }" shadow="hover">
            <div slot="header" class="clearfix">
                <span>{{ $t(searchForm.title) }}</span>
            </div>
            <el-form :model="searchForm" :inline="true" class="form form-inline" ref="searchForm"
                     @submit.native.prevent="submitSearch">
                <!-- 日期表组建 -->
                <div class="p-3 pb-0">
                    <el-form-item v-if="searchForm.trade_id !== undefined" prop="trade_id">
                        <el-input size="mini" v-model="searchForm.trade_id" :placeholder="$t('comm.trade_id')"
                                  @keyup.native.enter="submitSearch"
                                  clearable></el-input>
                    </el-form-item>
                    <el-form-item v-if="searchForm.batch_id !== undefined" prop="batch_id">
                        <el-input size="mini" v-model="searchForm.batch_id" :placeholder="$t('comm.batch_id')"
                                  @keyup.native.enter="submitSearch"
                                  clearable></el-input>
                    </el-form-item>
                    <el-form-item v-if="searchForm.merchant_order_no !== undefined" prop="merchant_order_no">
                        <el-input size="mini" v-model="searchForm.merchant_order_no"
                                  @keyup.native.enter="submitSearch"
                                  :placeholder="$t('comm.merchant_order_no')" clearable></el-input>
                    </el-form-item>
                    <el-form-item v-if="searchForm.pay_status !== undefined" prop="pay_status">
                        <el-select size="mini" v-model="searchForm.pay_status" :placeholder="$t('comm.status')"
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
                                  @keyup.native.enter="submitSearch"
                                  :placeholder="$t('comm.country_name')" clearable></el-input>
                    </el-form-item>
                    <el-form-item v-if="searchForm.blacklist_value !== undefined" prop="blacklist_value">
                        <el-input size="mini" v-model="searchForm.blacklist_value"
                                  @keyup.native.enter="submitSearch"
                                  :placeholder="$t('comm.blacklist_value')" clearable></el-input>
                    </el-form-item>
                    <el-form-item v-if="searchForm.blacklist_type !== undefined" prop="blacklist_type">
                        <el-select size="mini" v-model="searchForm.blacklist_type"
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
                                  @keyup.native.enter="submitSearch"
                                  clearable=""></el-input>
                    </el-form-item>
                    <el-form-item v-if="searchForm.site_url !== undefined" prop="site_url">
                        <el-input size="mini" v-model="searchForm.site_url"
                                  @keyup.native.enter="submitSearch"
                                  :placeholder="$t('comm.search_site_url')" clearable></el-input>
                    </el-form-item>
                    <el-form-item v-if="searchForm.decline_type !== undefined" prop="decline_type">
                        <el-select size="mini" v-model="searchForm.decline_type" :placeholder="$t('comm.type')"
                                   clearable>
                            <el-option
                                    v-for="item in declineTypes"
                                    :key="item.value"
                                    :label="$t('decline.' + item.value)"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="searchForm.ip !== undefined" prop="ip">
                        <el-input size="mini" v-model="searchForm.ip"
                                  @keyup.native.enter="submitSearch"
                                  :placeholder="$t('comm.ip')" clearable></el-input>
                    </el-form-item>
                    <el-form-item v-if="searchForm.track_number !== undefined" prop="track_number">
                        <el-input size="mini" v-model="searchForm.track_number"
                                  @keyup.native.enter="submitSearch"
                                  :placeholder="$t('comm.track_number')" clearable></el-input>
                    </el-form-item>
                    <el-form-item v-if="searchForm.delivery_status !== undefined" prop="delivery_status">
                        <el-select size="mini" v-model="searchForm.delivery_status" :placeholder="$t('comm.status')"
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
                                type="daterange"
                                size="mini"
                                value-format="yyyy-MM-dd"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item v-if="searchForm.trade_batch_id !== undefined" prop="trade_batch_id">
                        <el-input size="mini" v-model="searchForm.trade_batch_id"
                                  :placeholder="$t('comm.trade_batch_id')"
                                  @keyup.native.enter="submitSearch"
                                  clearable></el-input>
                    </el-form-item>
                    <el-form-item v-if="searchForm.deposit_batch_id !== undefined" prop="deposit_batch_id">
                        <el-input size="mini" v-model="searchForm.deposit_batch_id"
                                  :placeholder="$t('comm.deposit_batch_id')"
                                  @keyup.native.enter="submitSearch"
                                  clearable></el-input>
                    </el-form-item>
                    <el-form-item v-if="searchForm.trade_settled !== undefined" prop="trade_settled">
                        <el-select size="mini" v-model="searchForm.trade_settled"
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
                                   :placeholder="$t('comm.deposit_settled')" clearable>
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
                                   @click="submitSearch">{{$t('comm.search')}}
                        </el-button>
                        <el-button size="mini"
                                   @click="resetForm('searchForm')">{{$t('comm.reset')}}
                        </el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-card>
    </div>
</template>

<script>

    export default {
        name: "SearchBox",
        props: ['params'],
        data() {
            return {
                searchForm: this.params,
                blacklistTypeList: [
                    {value: 'fingerprint'},
                    {value: 'email'},
                    {value: 'ip'},
                    {value: 'address'},
                    {value: 'full_name'},
                    {value: 'phone'},
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
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
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
</style>
<style scoped>
</style>
