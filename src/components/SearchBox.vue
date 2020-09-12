<template>
    <div class="clearfix">
        <el-card class="search-box wpy-card box-card mb-2" :body-style="{ padding: '0px' }" shadow="hover">
            <div slot="header" class="clearfix">
                <span>{{ $t(searchForm.title) }}</span>
            </div>
            <el-form :model="searchForm" :inline="true" class="form form-inline" ref="searchForm">
                <!-- 日期表组建 -->
                <div class="p-3 pb-0">
                    <el-form-item v-if="searchForm.trade_id !== undefined" prop="trade_id">
                        <el-input size="mini" v-model="searchForm.trade_id" :placeholder="$t('comm.trade_id')"
                                  clearable></el-input>
                    </el-form-item>
                    <el-form-item v-if="searchForm.batch_id !== undefined" prop="batch_id">
                        <el-input size="mini" v-model="searchForm.batch_id" :placeholder="$t('comm.batch_id')"
                                  clearable></el-input>
                    </el-form-item>
                    <el-form-item v-if="searchForm.merchant_order_no !== undefined" prop="merchant_order_no">
                        <el-input size="mini" v-model="searchForm.merchant_order_no"
                                  :placeholder="$t('comm.merchant_order_no')" clearable></el-input>
                    </el-form-item>
                    <el-form-item v-if="searchForm.pay_status !== undefined" prop="pay_status">
                        <el-select size="mini" v-model="searchForm.pay_status" :placeholder="$t('comm.status')" clearable>
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
                                  :placeholder="$t('comm.country_name')" clearable></el-input>
                    </el-form-item>
                    <el-form-item v-if="searchForm.blacklist_value !== undefined" prop="blacklist_value">
                        <el-input size="mini" v-model="searchForm.blacklist_value"
                                  :placeholder="$t('comm.blacklist_value')" clearable></el-input>
                    </el-form-item>
                    <el-form-item v-if="searchForm.blacklist_type !== undefined" prop="blacklist_type">
                        <el-select size="mini" v-model="searchForm.blacklist_type" :placeholder="$t('comm.blacklist_type')" clearable>
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
                                  clearable=""></el-input>
                    </el-form-item>
                    <el-form-item v-if="searchForm.site_url !== undefined" prop="site_url">
                        <el-input size="mini" v-model="searchForm.site_url"
                                  :placeholder="$t('comm.site_url')" clearable></el-input>
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
                ]
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
