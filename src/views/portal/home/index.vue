<template>
    <div v-loading="loading">
        <div class="row p-0">
            <div class="col-12 mt-1 mb-2" style="font-size: 80%;">
                <span class="float-left pl-3">{{$t('home.hello')}}, {{ user.full_name }}</span>
                <span class="float-right pr-3">{{$t('home.last_login')}}: {{ user.second_login | toFullTime }}</span>
            </div>
            <div class="col-12 mb-3 home-top-info-box">
                <el-card shadow="hover" class="box-card p-2 pl-3"
                         :body-style="{ padding: '0px' }">
                    <div class="row p-0">
                        <div class="col-11 row">
                            <div class="col-4 item">
                                <i class="el-icon-info text-blue"></i> {{$t('home.this_month_ecm')}} {{ user.monitor_ecm
                                }}
                            </div>
                            <div class="col-4 item">
                                <i class="el-icon-info text-blue"></i> {{$t('home.total_ecm')}} {{ user.total_ecm }}
                            </div>
                            <div class="col-4 item">
                                <i class="el-icon-info text-blue"></i> {{$t('home.last_month_ecm')}} {{
                                user.last_monthly_ecm }}
                            </div>
                        </div>
                        <div class="col-1" v-if="user.notice_count > 0">
                            <el-button class="float-right" type="text" size="mini">
                                <router-link :to="configs.notifyListPath">{{ $t('comm.view_more') }}</router-link>
                            </el-button>
                        </div>
                    </div>
                </el-card>
            </div>
            <div v-if="permReportLastTrade" class="col-12 mb-3" style="min-height: 350px">
                <el-card shadow="hover" class="box-card p-3 bg-white"
                         :body-style="{ padding: '0px' }">
                    <div class="home-last-trade-report">
                        <LastTimeReport></LastTimeReport>
                    </div>
                </el-card>
            </div>
            <div class="col-12" style="min-height: 155px">
                <div class="row">
                    <div v-if="permViewBalance" class="col-7" v-loading="balanceLoading">
                        <el-card class="box-card wpy-card sm-card box-pane pb-4" shadow="hover"
                                 :body-style="{ padding: '0px' }">
                            <div class="row">
                                <div class="col-8 pr-0">
                                    <el-tabs v-model="paneName" type="border-card"
                                             @tab-click="paneClick">
                                        <el-tab-pane :label="$t('comm.trade_balance')"
                                                     name="trade_balance"></el-tab-pane>
                                        <el-tab-pane :label="$t('comm.deposit_balance')"
                                                     name="deposit_balance"></el-tab-pane>
                                    </el-tabs>
                                </div>
                                <div class="col-4 text-right p-0" style="background-color: #F5F7FA">
                                    <div class="mr-5 mt-1">
                                        <router-link :to="configs.financePath">
                                            <el-button type="text">{{$t('comm.view_more')}}</el-button>
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
                                        :label="$t('comm.type')">
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
                    <div class="col-5" v-loading="announceLoading">
                        <el-card class="box-card wpy-card sm-card bg-body" shadow="hover">
                            <div slot="header" class="clearfix">
                                <span>{{$t('nav.announce')}}</span>
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
    </div>
</template>

<script>
    import configs from '@/configs'
    import user from "@/store/modules/user";
    import LastTimeReport from "@/components/LastTimeReport";
    import {getBalances} from "@/service/merchantSer";
    import {getLastAnnounce} from "@/service/noticeSer";
    import {mapState} from "vuex";
    import {hasPermission} from "@/service/userSer";
    import {isEmpty} from "@/utils/validate";

    export default {
        name: "home",
        components: {LastTimeReport},
        computed: { //watch跟踪数据变化, 重点user, configs
            ...mapState({
                sidebar: state => state.app.sidebar,
                permissions: state => state.user.permissions,
                lang: state => state.app.lang,
            }),
            configs() {
                return configs;
            },
            user() {
                return user.state.user;
            },
            ol() {
              return this.$route.query.ol;
            },
        },
        watch: {
            ol(){
                this.onlyOnlineCanUse()
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
                permReportLastTrade: false,
                permViewBalance: false,
                menu_disabled: false,
                online_box_show: false,
            }
        },
        mounted() {
            this.balanceParams.type = this.paneName
            this.permReportLastTrade = hasPermission(configs.perm.home_trade_report, this.permissions)
            this.permViewBalance = hasPermission(configs.perm.can_view_balance, this.permissions)
            this.getBalances()
            this.getAnnounceList()
            this.$store.dispatch('user/loadUserInfo').then((res) => {
                if (!isEmpty(res) && !isEmpty(res.user) && !isEmpty(res.user.online)) {
                    this.$data.menu_disabled = res.user.online === false
                    this.onlyOnlineCanUse()
                }
            })
        },
        methods: {
            onlyOnlineCanUse() {
                if (this.menu_disabled === true) {
                    if (this.online_box_show === false) {
                        this.$confirm('当前账户状态：未开通，请联系我们开通商户号。', '未开通', {
                            confirmButtonText: '联系我们',
                            cancelButtonText: '取消',
                            type: 'warning',
                            center: true
                        }).then(() => {
                            this.$data.online_box_show = false
                            location.href = configs.contactUsUrl
                        }).catch(() => {
                            this.$data.online_box_show = false
                        });
                    }
                }
            },
            paneClick(tab) {
                this.paneName = tab.name
                this.balanceParams.type = tab.name //搜索对应
                this.getBalances()
            },
            getBalances() {
                if (!this.permViewBalance) return
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
                    this.$data.announceList = data.list.slice(0, 3) //只显示
                }).finally(() => {
                    this.announceLoading = false
                })
            },
            goAnnounceDetail(row) {
                this.$router.push({name: 'announce_detail', params: {id: row.nid}})
            },
        },
    }
</script>

<style>
    .home-top-info-box {
        font-size: 14px;
    }

    .home-top-info-box .item {
        padding-top: 4px;
    }

    .home-last-trade-report {
    }
</style>
