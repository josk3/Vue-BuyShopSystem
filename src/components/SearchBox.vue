<template>
    <div class="clearfix">
        <el-card class="search-box box-card mb-2" :body-style="{ padding: '0px' }" shadow="hover">
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
                                    :label="$t('risk.' + item.vale)"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="searchForm.email !== undefined" prop="email">
                        <el-input type="email" size="mini" v-model="searchForm.email" :placeholder="$t('comm.email')"
                                  clearable=""></el-input>
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
                    {vale: 'fingerprint'},
                    {vale: 'email'},
                    {vale: 'ip'},
                    {vale: 'address'},
                    {vale: 'full_name'},
                    {vale: 'phone'},
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
            }
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
