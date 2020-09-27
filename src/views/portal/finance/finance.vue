<template>
    <div v-loading="loading">
        <SearchBox :params="searchParams" @search="search"></SearchBox>
        <div class="wrap-tab p-0">
            <el-card class="box-card box-pane" shadow="never" :body-style="{ padding: '0px' }">
                <div class="row">
                    <div class="col-8 pr-0">
                        <el-tabs v-model="paneName" type="border-card"
                                 @tab-click="paneClick">
                            <el-tab-pane label="余额" name="all"></el-tab-pane>
                            <el-tab-pane label="收款" name="sale"></el-tab-pane>
                            <el-tab-pane label="结算" name="settle"></el-tab-pane>
                            <el-tab-pane label="退款" name="refund"></el-tab-pane>
                            <el-tab-pane label="拒付" name="chargeback"></el-tab-pane>
                            <el-tab-pane label="保证金返还" name="depositSettle"></el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="col-4 text-right p-0" style="background-color: #F5F7FA">
                        <div class="mr-5 mt-1">
                            <el-button icon="el-icon-download" size="mini"
                                       @click="downFinance" plain>{{ $t('comm.download') }}
                            </el-button>
                        </div>
                    </div>
                </div>
                <FinanceTable :tab_data="tabData" @page_change="pageChange($event)"></FinanceTable>
            </el-card>
        </div>
    </div>
</template>

<script>
    import configs from '@/configs'
    import SearchBox from "@/components/SearchBox";
    import {financeDownload, financeSearch} from "@/service/financeSer";
    import {isEmpty} from "@/utils/validate";
    import FinanceTable from "@/components/FinanceTable";

    export default {
        name: "finance",
        components: {FinanceTable, SearchBox},
        computed: { //watch跟踪数据变化, 重点user, configs
            configs() {
                return configs;
            },
        },
        data() {
            return {
                loading: false,
                searchParams: {
                    title: 'nav.finance_search', page: 1,
                    batch_id: '', trade_id: '', merchant_order_no: ''
                },
                tabData: {list: [], page: {count: 0, page_num: 0, total: 0}},
                paneName: 'all', //默认
            }
        },
        mounted() {
            if (!isEmpty(this.$route.params)) {
                if (!isEmpty(this.$route.params.batch_id)) {
                    this.searchParams.batch_id = this.$route.params.batch_id
                }
            }
            this.searchParams.finance_status = this.paneName
            this.search();
        },
        methods: {
            paneClick(tab) {
                this.searchParams.page = 1;//重置页码
                this.paneName = tab.name
                this.searchParams.finance_status = tab.name //搜索对应status
                this.search()
            },
            pageChange(page) {
                this.searchParams.page = page.page_num
                this.search()
            },
            search() {
                this.loading = true
                financeSearch(this.searchParams).then(res => {
                    const {data} = res
                    this.$data.tabData = data
                }).finally(() => {
                    this.loading = false
                })
            },
            downFinance() {
                this.loading = true
                financeDownload(this.searchParams).then(() => {
                    this.$message.success(this.$i18n.t('comm.success').toString())
                }).finally(() => {
                    this.loading = false
                })
            },
        },
    }
</script>

<style scoped>

</style>
