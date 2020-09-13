<template>
    <div v-loading="loading">
        <div class="row">
            <div class="col-12 mb-2">
                <el-card shadow="always" class="box-card p-3"
                         :body-style="{ padding: '0px' }">
                    <div class="text-muted p-0">
                        <i class="el-icon-info text-blue"></i> {{$t('user.mer_no')}}: {{ user.mer_no }}
                    </div>
                </el-card>
            </div>
        </div>
        <div class="wrap-tab p-0">
            <el-card class="box-card wpy-card mb-2" shadow="never" :body-style="{ padding: '0px' }">
                <div slot="header" class="clearfix">
                    <span>基础信息</span>
                </div>
                <div>
                    <div v-if="info" class="row info-control-list">
                        <div class="col-6">
                            <div class="row">
                                <label class="col-4">
                                    <el-popover
                                            placement="top-start"
                                            width="200"
                                            trigger="hover"
                                            content="对接接口配置要使用">
                                        <span slot="reference">Md5Key <i class="el-icon-warning-outline"></i></span>
                                    </el-popover>
                                </label>
                                <div class="col-8">
                                    <ShowMoreBtn :txt="info.md5_key"></ShowMoreBtn>
                                </div>
                            </div>
                            <div class="row">
                                <label class="col-4">注册时间</label>
                                <div class="col-8"><span>{{info.created}}</span></div>
                            </div>
                            <div class="row"><label class="col-4">过期时间</label>
                                <div class="col-8"><span>{{info.expire_date | nullToLine}}</span></div>
                            </div>
                            <div class="row"><label class="col-4">结算日</label>
                                <div class="col-8"><span>{{info.settlement_cycle | settleCycle}}</span></div>
                            </div>
                            <div class="row"><label class="col-4">拒付处理费</label>
                                <div class="col-8"><span>{{info.chargeback_fees | nullToLine}}美元, 每个自然月1号更新</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="row"><label class="col-4">拒付率(当前月份)</label>
                                <div class="col-8"><span>{{info.monitor_ecm | nullToLine}}</span></div>
                            </div>
                            <div class="row"><label class="col-4">当月拒付笔数</label>
                                <div class="col-8"><span>{{info.total_declined_num | nullToLine}}</span></div>
                            </div>
                            <div class="row"><label class="col-4">拒付率(总交易)</label>
                                <div class="col-8"><span>{{info.total_ecm | nullToLine}}</span></div>
                            </div>
                            <div class="row"><label class="col-4">总拒付笔数</label>
                                <div class="col-8"><span>{{info.declined_num | nullToLine}}</span></div>
                            </div>
                            <div class="row"><label class="col-4">拒付率(上个月)</label>
                                <div class="col-8"><span>{{info.last_monthly_ecm | nullToLine}}</span></div>
                            </div>
                        </div>

                    </div>
                </div>
            </el-card>
            <!--            -->
            <el-card class="box-card wpy-card mb-2" shadow="never" :body-style="{ padding: '0px' }">
                <div slot="header" class="clearfix">
                    <span>结算银行卡</span>
                </div>
                <div class="row">
                    <div class="col-7">
                        <div class="info-control-list">
                            <div class="row"><label class="col-4">类型</label>
                                <div class="col-8"><span>{{bank.card_type_str}}</span></div>
                            </div>
                            <div class="row"><label class="col-4">姓名/企业</label>
                                <div class="col-8"><span>{{bank.card_account_name}}</span></div>
                            </div>
                            <div class="row"><label class="col-4">开户行名称</label>
                                <div class="col-8"><span>{{bank.bank_name}}</span></div>
                            </div>
                            <div class="row"><label class="col-4">卡号</label>
                                <div class="col-8">
                                    <ShowMoreBtn :txt="bank.card_no"></ShowMoreBtn>
                                </div>
                            </div>
                            <div class="row"><label class="col-4">手机号</label>
                                <div class="col-8"><span>{{bank.bank_card_mobile}}</span></div>
                            </div>
                            <div class="row"><label class="col-4">状态</label>
                                <div class="col-8"><span>{{bank.status | validStatus}}</span></div>
                            </div>
                            <div class="row"><label class="col-4">时间</label>
                                <div class="col-8"><span>{{bank.created | toDay}}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-card>
            <!--            -->

        </div>
    </div>
</template>

<script>
    import configs from '@/configs'
    import user from "@/store/modules/user";
    import {mapState} from "vuex";
    import ShowMoreBtn from "@/components/ShowMoreBtn";
    import {getMerInfo} from "@/service/merchantSer";

    export default {
        name: "merchant_info",
        components: {ShowMoreBtn},
        computed: { //watch跟踪数据变化, 重点user, configs
            ...mapState({
                menus: state => state.user.menus,
            }),
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
                info: {},
                bank: {},
            }
        },
        mounted() {
            this.loadMerInfo();
        },
        methods: {
            loadMerInfo() {
                this.loading = true
                getMerInfo().then(res => {
                    const {data} = res
                    this.$data.info = data.info
                    this.$data.bank = data.bank
                }).finally(() => {
                    this.loading = false
                })
            },
        },
    }
</script>

<style scoped>

</style>
