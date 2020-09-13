<template>
    <div v-loading="loading">
        <div class="row">
            <div class="col-12 mb-2">
                <el-card shadow="always" class="box-card p-3"
                         :body-style="{ padding: '0px' }">
                    <div class="text-muted p-0">
                        <i class="el-icon-info text-blue"></i> 如有特殊情况要关闭邮件通知请联系客服
<!--                        或发起<router-link :to="configs.ticketPath" class="btn-link">服务工单</router-link>-->
                    </div>
                </el-card>
            </div>
        </div>
        <div class="wrap-tab p-0">
            <el-card class="box-card wpy-card" shadow="never" :body-style="{ padding: '0px' }">
                <div slot="header" class="clearfix">
                    <span>通知设置</span>
                </div>
                <div class="row">
                    <div class="col-4">
                        <div class="info-control-list">
                            <div class="row">
                                <label class="col-sm-9">付款成功给持卡人发邮件</label>
                                <div class="col-sm-3">
                                    <el-switch v-model="notice.pay_ok_to_customer" active-value="1" disabled></el-switch>
                                </div>
                            </div>
                            <div class="row">
                                <label class="col-sm-9">付款成功给商户发邮件</label>
                                <div class="col-sm-3">
                                    <el-switch v-model="notice.pay_ok_to_merchant" active-value="1" disabled></el-switch>
                                </div>
                            </div>
                            <div class="row">
                                <label class="col-sm-9">有投诉时邮件通知商户</label>
                                <div class="col-sm-3">
                                    <el-switch v-model="notice.complain_notice_mer" active-value="1" disabled></el-switch>
                                </div>
                            </div>
                            <div class="row">
                                <label class="col-sm-9">有拒付时邮件通知商户</label>
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
