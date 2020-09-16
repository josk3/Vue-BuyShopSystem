<template>
    <div v-loading="loading">
        <!--公共搜索栏-->
        <SearchBox :params="searchParams"></SearchBox>
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
                        fixed
                        prop="dispute_no"
                        label="投诉单号"
                        width="160">
                    <template slot-scope="scope">
                        <router-link :to="{name:'dispute_detail',params:{id:scope.row.dispute_no}}" class="btn-link">
                            {{scope.row.dispute_no}}
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="merchant_order_no"
                        label="商户流水号" width="210px">
                </el-table-column>
                <el-table-column
                        prop="order_no"
                        :show-overflow-tooltip="true"
                        label="订单号">
                </el-table-column>
                <el-table-column
                        prop="email"
                        :show-overflow-tooltip="true"
                        label="持卡人邮箱">
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="处理状态">
                    <template v-slot="scope">
                        {{scope.row.status | disputeStatus }}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="reason"
                        label="投诉事由">
                </el-table-column>
                <el-table-column
                        prop="created"
                        label="持卡人投诉日期">
                </el-table-column>
                <el-table-column
                        prop="updated"
                        label="最近更新日期">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="150">
                    <template slot-scope="scope">
                        <router-link :to="{name:'dispute_detail',params:{id:scope.row.dispute_no}}" class="btn-link">
                            查看
                        </router-link>
                    </template>
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
                /* dispute_no: '', //投诉单号
                 merchant_order_no: '', //商户流水号
                 order_no: '', //订单号
                 email: '', //持卡人或商户邮箱
                 created: '', //持卡人投诉日期
                 updated: '', //最近更新日期
                 status: '', //处理状态: 待处理 处理中 处理完成
                 reason: '', //投诉事由(下拉值)*/
            }
        },
        mounted() {
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
                this.search();
            }
        }
    }
</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;

    &
    :last-child {
        margin-bottom: 0;
    }

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
</style>