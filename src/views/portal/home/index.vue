<template>
    <div v-loading="loading">
        <div class="row p-0">
            <div class="col-12 mt-1 mb-2" style="font-size: 80%;">
                <span class="float-left pl-3">您好, {{ user.name }}</span>
                <span class="float-right pr-3">最近登录: {{ user.second_login }}</span>
            </div>
            <div class="col-12 mb-3">
                <el-card shadow="hover" class="box-card p-3"
                         :body-style="{ padding: '0px' }">
                    <div class="row p-0">
                        <div class="col-11 row">
                            <div class="col-4">
                                <i class="el-icon-info text-blue"></i> 您有1笔拒付交易未处理
                            </div>
                            <div class="col-4">
                                <i class="el-icon-info text-blue"></i> 您有1笔拒付交易未处理
                            </div>
                            <div class="col-4">
                                <i class="el-icon-info text-blue"></i> 您有1笔拒付交易未处理
                            </div>
                        </div>
                        <div class="col-1">
                            <el-button class="float-right" type="text" size="mini">
                                <router-link :to="configs.notifyListPath">{{ $t('comm.view_more') }}</router-link>
                            </el-button>
                        </div>
                    </div>
                </el-card>
            </div>
            <div class="col-12 mb-3" style="min-height: 350px">
                <el-card shadow="hover" class="box-card p-3 bg-white"
                         :body-style="{ padding: '0px' }">
                    <div class="home-last-trade-report">
                        <LastTimeReport></LastTimeReport>
                    </div>
                </el-card>
            </div>
            <div class="col-12 row" style="min-height: 155px">
                <div class="col-7" v-loading="balanceLoading">
                    <el-card class="box-card wpy-card sm-card box-pane pb-4" shadow="hover" :body-style="{ padding: '0px' }">
                        <div class="row">
                            <div class="col-8 pr-0">
                                <el-tabs v-model="paneName" type="border-card"
                                         @tab-click="paneClick">
                                    <el-tab-pane :label="$t('comm.trade_balance')" name="trade_balance"></el-tab-pane>
                                    <el-tab-pane :label="$t('comm.deposit_balance')" name="deposit_balance"></el-tab-pane>
                                </el-tabs>
                            </div>
                            <div class="col-4 text-right p-0" style="background-color: #F5F7FA">
                                <div class="mr-5 mt-1">
                                    <router-link :to="configs.financePath">
                                        <el-button type="text">查看明细</el-button>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <el-table
                                stripe
                                :class="tabData.list.length ? '' : 'wpy-z-table'"
                                :data="tabData.list"
                                :header-row-style="{background:'#2C2E2F'}"
                                style="width: 100%">
                            <el-table-column
                                    prop="currency"
                                    label="类型">
                                <template>
                                    {{ $t('comm.' + paneName) }}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="currency"
                                    :label="$t('comm.currency')">
                                <template v-slot="scope">
                                    {{scope.row.currency}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="balance"
                                    :label="$t('comm.balance')">
                                <template v-slot="scope">
                                    {{scope.row.balance}} {{scope.row.currency}}
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-card>
                </div>
                <div class="col-5 pr-0" v-loading="announceLoading">
                    <el-card class="box-card wpy-card sm-card bg-body" shadow="hover">
                        <div slot="header" class="clearfix">
                            <span>公告</span>
                            <el-button style="float: right; padding: 3px 0" type="text">
                                <router-link :to="configs.msgCenterPath">{{ $t('comm.more') }}</router-link>
                            </el-button>
                        </div>
                        <div>
                            <el-table
                                    size="mini"
                                    max-height="200"
                                    :show-header="false"
                                    :highlight-current-row="true"
                                    class="hide-table-title pointer"
                                    :class="announceList ? '' : 'wpy-z-table'"
                                    :data="announceList"
                                    @row-click="goAnnounceDetail"
                                    style="width: 100%">
                                <el-table-column width="220px" :show-overflow-tooltip="true">
                                    <template v-slot="scope">
                                        {{scope.row.title}}
                                    </template>
                                </el-table-column>
                                <el-table-column>
                                    <template v-slot="scope">
                                        {{scope.row.time}}
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-card>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import configs from '@/configs'
    import user from "@/store/modules/user";
    import LastTimeReport from "@/components/LastTimeReport";
    import {getBalances} from "@/service/merchantSer";
    import {getLastAnnounce} from "@/service/noticeSer";
    import store from "@/store";

    export default {
        name: "home",
        components: {LastTimeReport},
        computed: { //watch跟踪数据变化, 重点user, configs
            configs() {
                return configs;
            },
            user() {
                return user.state.user;
            },
        },
        data() {
            return {
                loading: false,
                balanceLoading: false,
                announceLoading: false,
                paneName: 'trade_balance',
                balanceParams: {type: this.paneName},
                tabData: {list: [], page: {count: 0, page_num: 0, total: 0}},
                announceList: [],
            }
        },
        mounted() {
            this.getBalances()
            this.getAnnounceList()
            this.$store.dispatch('user/loadUserInfo')
        },
        methods: {
            paneClick(tab) {
                this.paneName = tab.name
                this.balanceParams.type = tab.name //搜索对应
                this.getBalances()
            },
            getBalances() {
                this.balanceLoading = true
                getBalances(this.balanceParams).then(res => {
                    const {data} = res
                    this.$data.tabData = data
                }).finally(() => {
                    this.balanceLoading = false
                })
            },
            getAnnounceList() {
                this.announceLoading = true
                getLastAnnounce().then(res => {
                    const {data} = res
                    this.$data.announceList = data.list.slice(0,3) //只显示
                }).finally(() => {
                    this.announceLoading = false
                })
            },
            goAnnounceDetail(row) {
                this.$router.push({name: 'announce_detail',params:{id:row.nid}})
            },
        },
    }
</script>

<style>
    .home-last-trade-report {
    }
</style>
