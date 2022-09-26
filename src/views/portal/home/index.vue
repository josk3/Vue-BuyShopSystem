<template>
    <div v-loading="loading">
        <div class="row p-0">
            <div class="col-12 mt-1 mb-2" style="font-size: 80%;">
                <span class="float-left pl-3">{{$t('home.hello')}}, {{ user.full_name }}</span>
                <span class="float-right pr-3">{{$t('home.last_login')}}: {{ user.second_login | toFullTime }}</span>
            </div>
          <el-alert
              v-if="willExpire"
              :title="$t('account.will_expire_remind')"
              type="warning"
              show-icon
              :close-text="$t('account.remindClose')"
              :description="$t('account.expire_time') + ': ' + this.info.expire_date + '  （' + this.remainingDays + $t('account.remainingDays') + ')'"  class="mb-2">
          </el-alert>
            <div class="col-12 mb-3 home-top-info-box">
                <el-card shadow="hover" class="box-card p-2 pl-3"
                         :body-style="{ padding: '0px' }">
                    <div class="row p-0">
                        <div class="col-11 row">
                            <div class="col-4 item">
                                <i class="el-icon-info text-blue"></i> {{$t('home.this_month_ecm')}} {{ ecmRateText(user.monitor_ecm)
                                }}
                            </div>
                            <div class="col-4 item">
                                <i class="el-icon-info text-blue"></i> {{$t('home.total_ecm')}} {{ ecmRateText(user.total_ecm) }}
                            </div>
                            <div class="col-4 item">
                                <i class="el-icon-info text-blue"></i> {{$t('home.last_month_ecm')}} {{
                                ecmRateText(user.last_monthly_ecm) }}
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
                        <LastTimeReport :start_load_data="loadingLastTrade"></LastTimeReport>
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
    import {getBalances, getMerInfo} from "@/service/merchantSer";
    import {getLastAnnounce} from "@/service/noticeSer";
    import {mapState} from "vuex";
    import {hasPermission} from "@/service/userSer";
    import {isEmpty} from "@/utils/validate";
    import {alertUnOnlineStatus} from "@/service/CommSer";

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
            ol() {
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
                loadingLastTrade: false,
                permViewBalance: false,
                menu_disabled: false,
                info: {},
                willExpire: false,
                remainingDays: '',
                //-
            }
        },
        mounted() {
            this.balanceParams.type = this.paneName
            this.permReportLastTrade = hasPermission(configs.perm.home_trade_report, this.permissions)
            this.permViewBalance = hasPermission(configs.perm.can_view_balance, this.permissions)
            this.$store.dispatch('user/loadUserInfo').then((res) => {
                if (!isEmpty(res) && !isEmpty(res.user) && !isEmpty(res.user.online)) {
                    this.$data.menu_disabled = res.user.online === false
                    this.onlyOnlineCanUse()
                }
                this.getAnnounceList()
                if (this.permViewBalance) this.getBalances()
                this.$data.loadingLastTrade = true
            })
            if (this.user.is_master) {
                this.getRemainingDay()
            }
        },
        methods: {
            onlyOnlineCanUse() {
                if (isEmpty(this.user.email) || this.user.email_valid === false) {
                    //引导用户填写邮箱
                    this.$router.push({name: 'profile', params: {user_init_email: 1}})
                } else {
                    if (this.menu_disabled === true) {
                        alertUnOnlineStatus()
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
            getAnnounceList() {//公告
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
            getRemainingDay() {
                this.willExpire = false
                getMerInfo().then(res => {
                    const {data} = res
                    this.$data.info = data.info
                    this.$data.info.expire_date = data.info.expire_date
                    let expireTime = new Date(this.info.expire_date).getTime()
                    const currentTime = new Date().getTime()
                    let lastTime = expireTime - currentTime
                    let remainingDay = lastTime / (1000 * 60 * 60 * 24);
                    if ((31 <= remainingDay && remainingDay < 32) || (7 <= remainingDay && remainingDay < 8)) {
                      this.willExpire = true
                    }
                    this.remainingDays = Math.floor(remainingDay)
                }).finally(() => {
                })
            },
            ecmRateText (rate) {
                return (rate * 100).toFixed(2) + '%';//显示2位小数点
            }
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
