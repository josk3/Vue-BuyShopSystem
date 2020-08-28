<template>
    <div>
        <SearchBox :params="searchParams" @search="search"></SearchBox>
        <div class="wrap-tab p-0" v-loading="loading">
            <el-card class="box-card box-pane" shadow="never" :body-style="{ padding: '0px' }">
                <div class="row">
                    <div class="col-8 pr-0">
                        <el-tabs type="border-card">
                        </el-tabs>
                    </div>
                    <div class="col-4 text-right p-0" style="background-color: #F5F7FA">
                        <div class="mr-5 mt-1">
                            <el-button icon="el-icon-download" size="mini"
                                       @click="downSettle" plain>下载
                            </el-button>
                        </div>
                    </div>
                </div>
                <el-table
                        :data="tabData.list"
                        :header-row-style="{background:'#2C2E2F'}"
                        style="width: 100%">
                    <el-table-column
                            prop="batch_id"
                            label="批次号" width="190px">
                    </el-table-column>
                    <el-table-column
                            prop="created"
                            :show-overflow-tooltip="true"
                            label="类型">
                        <template v-slot="scope">
                            {{scope.row.created | toDay }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="created"
                            :show-overflow-tooltip="true"
                            label="生成时间">
                        <template v-slot="scope">
                            {{scope.row.created | toDay }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="payout_time"
                            :show-overflow-tooltip="true"
                            label="划款时间">
                        <template v-slot="scope">
                            {{scope.row.payout_time | toDay }}
                        </template>
                    </el-table-column>
                    batch_id: 'b23ou82f2' + new Date().getMilliseconds() + req.body.finance_status,
                    kind: 'trade',
                    currency: 'USD',
                    fees: 0.34,
                    charge: 234.32,
                    deposit_charge: 0,
                    surplus: 454645.45,
                    deposit_surplus: 8963132.45,
                    created: '2020-01-01 12:12:00',
                    payout_time: '2020-01-01 12:12:00',//划款时间
                    status: 'release', //paid
                </el-table>

                <Pagination :page="tabData.page" @change="pageChange"></Pagination>
            </el-card>
        </div>
    </div>
</template>

<script>
    import configs from '@/configs'
    import SearchBox from "@/components/SearchBox";
    import Pagination from "@/components/Pagination";
    import {settleSearch} from "@/service/financeStr";

    export default {
        name: "settle",
        components: {SearchBox, Pagination},
        computed: { //watch跟踪数据变化, 重点user, configs
            configs() {
                return configs;
            },
        },
        data() {
            return {
                loading: false,
                searchParams: {
                    title: 'nav.settle_search', page: 1,
                    batch_id: ''
                },
                tabData: {list: [], page: {count: 0, page_num: 0, total: 0}},
                paneName: 'all', //默认
            }
        },
        mounted() {
            this.searchParams.settle_status = this.paneName
            this.search();
        },
        methods: {
            paneClick(tab) {
                this.searchParams.page = 1;//重置页码
                this.paneName = tab.name
                this.searchParams.settle_status = tab.name //搜索对应status
                this.search()
            },
            pageChange(page) {
                this.searchParams.page = page.page_num
                this.search()
            },
            search() {
                this.loading = true
                settleSearch(this.searchParams).then(res => {
                    const {data} = res
                    this.$data.tabData = data
                }).finally(() => {
                    this.loading = false
                })
            },
            downSettle() {

            },
        },
    }
</script>

<style scoped>

</style>
