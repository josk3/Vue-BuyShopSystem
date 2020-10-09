<template>
    <div v-loading="loading">
        <div class="row">
            <div class="col-12 mb-2">
                <el-card shadow="always" class="box-card p-3"
                         :body-style="{ padding: '0px' }">
                    <div class="text-muted p-0">
                        <i class="el-icon-info text-blue"></i> {{$t('account.notice_setup_info[0]')}}
                        {{$t('account.notice_setup_info[1]')}}
                        <router-link :to="configs.ticketPath" class="btn-link">{{$t('account.notice_setup_info[2]')}}</router-link>
                    </div>
                </el-card>
            </div>
        </div>
        <div class="wrap-tab p-0">
            <el-card class="box-card wpy-card" shadow="never" :body-style="{ padding: '0px' }">
                <div slot="header" class="clearfix">
                    <span>{{$t('account.notice_setup')}}</span>
                </div>
                <div class="row">
                    <div :class="lang === 'zh' ? 'col-4' : 'col-6'">
                        <div class="info-control-list">
                            <div class="row">
                                <label class="col-sm-9">{{$t('account.notice_paid_to_customer')}}</label>
                                <div class="col-sm-3">
                                    <el-switch v-model="notice.pay_ok_to_customer" active-value="1" disabled></el-switch>
                                </div>
                            </div>
                            <div class="row">
                                <label class="col-sm-9">{{$t('account.notice_paid_to_merchant')}}</label>
                                <div class="col-sm-3">
                                    <el-switch v-model="notice.pay_ok_to_merchant" active-value="1" disabled></el-switch>
                                </div>
                            </div>
                            <div class="row">
                                <label class="col-sm-9">{{$t('account.notice_dispute_to_merchant')}}</label>
                                <div class="col-sm-3">
                                    <el-switch v-model="notice.complain_notice_mer" active-value="1" disabled></el-switch>
                                </div>
                            </div>
                            <div class="row">
                                <label class="col-sm-9">{{$t('account.notice_chargeback_to_merchant')}}</label>
                                <div class="col-sm-3">
                                    <el-switch v-model="notice.charge_back_notice_mer" active-value="1" disabled></el-switch>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-card>

        </div>
    </div>
</template>

<script>
    import configs from '@/configs'
    import user from "@/store/modules/user";
    import {mapState} from "vuex";
    import {getMerSetup} from "@/service/merchantSer";

    export default {
        name: "merchant_setup",
        components: {},
        computed: { //watch跟踪数据变化, 重点user, configs
            ...mapState({
                lang: state => state.app.lang,//多语言
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
                notice: {},
            }
        },
        mounted() {
            this.loadSetupData()
        },
        methods: {
            loadSetupData() {
                this.loading = true
                getMerSetup('notice').then(res => {
                    const {data} = res
                    this.$data.notice = data.notice
                }).finally(() => {
                    this.loading = false
                })
            },
        },
    }
</script>

<style scoped>

</style>
