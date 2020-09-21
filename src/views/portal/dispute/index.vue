<template>
    <div v-loading="loading">
        <!--公共搜索栏-->
        <SearchBox :params="searchParams" @search="disputeSearch"></SearchBox>
        <el-card class="box-card box-pane" shadow="never" :body-style="{ padding: '0px' }">
            <!--标签页-->
            <el-tabs v-model="tabName" type="border-card" @tab-click="clickSearch">
                <el-tab-pane label="全部" name="all">
                </el-tab-pane>
                <el-tab-pane label="未处理" name="untreated"></el-tab-pane>
                <el-tab-pane label="处理中" name="underway"></el-tab-pane>
                <el-tab-pane label="处理完成" name="complete"></el-tab-pane>
            </el-tabs>
            <el-table
                    :data="disputeList.list"
                    :header-row-style="{background:'#2C2E2F'}"
                    style="width: 100%">
                <el-table-column
                        prop="dispute_no"
                        label="争议单号"
                        width="160">
                    <template slot-scope="scope">
                        <router-link :to="{name:'dispute_detail',params:{id:scope.row.dispute_no}}" class="btn-link">
                            {{scope.row.dispute_no}}
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="mer_no"
                        label="商户号">
                </el-table-column>
                <el-table-column
                        prop="trade_no"
                        :show-overflow-tooltip="true"
                        label="订单流水号" width="200">
                </el-table-column>
                <el-table-column
                        prop="merchant_order_no"
                        label="商户订单号" width="130px">
                </el-table-column>
                <el-table-column
                        prop="dispute_status"
                        label="处理状态">
                    <template v-slot="scope">
                            <span>
                                {{scope.row.dispute_status | disputeStatus}}
                            </span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="dispute_type"
                        label="争议类型">
                </el-table-column>
                <el-table-column
                        prop="remark"
                        :show-overflow-tooltip="true"
                        label="争议说明">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="持卡人邮箱">
                </el-table-column>
                <el-table-column
                        prop="created"
                        label="持卡人争议日期">
                </el-table-column>
            </el-table>
            <div class="block mb-3">
                <Pagination :page="disputeList.page" @change="pageChange"></Pagination>
            </div>
        </el-card>

    </div>
</template>

<script>
    import SearchBox from "@/components/SearchBox";
    import Pagination from "@/components/Pagination";
    import {disputeSearch} from '@/service/disputeSer';

    export default {
        name: "index",
        components: {SearchBox, Pagination}, //定义分页、检索栏组件
        data() {
            return {
                loading: false, //加载效果
                searchParams: {
                    title: 'nav.dispute_manage', page: 1,
                    trade_id: '', merchant_order_no: '', email: '',
                    dispute_status: ''
                },
                disputeList: {
                    list: [],
                    page: {
                        page_num: 0, //当前页
                        page_size: 0, //总页
                        total: 0, //工单总数
                    }
                },
                tabName: 'all',
            }
        },
        mounted() {
            this.searchParams.dispute_status = this.tabName;
            this.disputeSearch();
        },
        methods: {
            pageChange(page) {
                this.searchParams.page = page.page_num
                this.disputeSearch();
            },
            disputeSearch() {
                this.loading = true;
                disputeSearch(this.searchParams).then(res => {
                    this.$data.disputeList = res.data;
                }).finally(() => {
                    this.loading = false;
                })
            }, clickSearch(tab) {
                this.searchParams.dispute_status = tab.name;
                this.searchParams.page = 1;
                this.disputeSearch();
            }
        }
    }
</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;

    }

    :last-child {
        margin-bottom: 0;
    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

    span.dp-untreated {
        color: #ffc112;
        background-color: #fff5d9;
    }

    span.dp-underway {
        color: #172474;
        background-color: #f5f8fe;
    }

    span.dp-complete {
        color: #670d2e;
        background-color: #f8f1ff;
    }
</style>