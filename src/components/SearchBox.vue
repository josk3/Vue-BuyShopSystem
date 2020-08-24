<template>
    <el-card class="search-box box-card mb-3" :body-style="{ padding: '0px' }" shadow="hover">
        <div slot="header" class="clearfix">
            <span>{{ $t(searchForm.title) }}</span>
        </div>
        <el-form :model="searchForm" :inline="true" class="form form-inline" ref="searchForm">
            <!-- 日期表组建 -->
            <div class="p-3 pb-0">
                <el-form-item v-if="searchForm.trade_no !== undefined" prop="trade_no">
                    <el-input v-model="searchForm.trade_no" :placeholder="$t('comm.trade_no')"></el-input>
                </el-form-item>
                <el-form-item v-if="searchForm.merchant_order_no !== undefined" prop="merchant_order_no">
                    <el-input v-model="searchForm.merchant_order_no"
                              :placeholder="$t('comm.merchant_order_no')"></el-input>
                </el-form-item>
                <el-form-item v-if="searchForm.email !== undefined" prop="email">
                    <el-input v-model="searchForm.email" :placeholder="$t('comm.email')"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="btn-sm"
                               @click="submitSearch">{{$t('comm.search')}}
                    </el-button>
                    <el-button class="btn-sm"
                               @click="resetForm('searchForm')">{{$t('comm.reset')}}
                    </el-button>
                </el-form-item>
            </div>
        </el-form>
    </el-card>
</template>

<script>

    export default {
        name: "SearchBox",
        props: ['params'],
        data() {
            return {
                searchForm: this.params,
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
