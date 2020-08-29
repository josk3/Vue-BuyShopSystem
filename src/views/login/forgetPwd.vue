<template>
    <div class="d-flex flex-column h-100" v-loading="loading">

        <div class="text-center">
            <div class="form-signin bg-white pb-4 pt-3 shadow-sm">
                <el-alert v-if="errorMsg" :title="errorMsg"
                          type="error"
                          style="background: none;margin-bottom: 10px;"
                          center show-icon :closable="false">
                </el-alert>
                <div v-if="submitOk">
                    <div v-if="!hasResendEmail">
                        <p class="mb-3 text-green"><i class="el-icon-circle-check"></i>
                            {{ $t('login.resolver_email_send[0]') }}</p>
                        <p class="mb-4 small">{{ $t('login.resolver_email_send[1]') }}</p>
                    </div>
                    <div class="mb-5">
                        <span class="small">{{ $t('login.resolver_email_fail[0]') }}</span>
                        <el-link type="primary" @click="confirmResendDialog = true">
                            {{ $t('login.resolver_email_fail[1]') }}
                        </el-link>
                        <el-dialog
                                :title="$t('comm.confirm')"
                                :visible.sync="confirmResendDialog"
                                width="350px"
                                center>
                            <p class="text-center">{{$t('login.resolver_email_fail[2]')}}</p>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="confirmResendDialog = false">{{$t('comm.cancel')}}</el-button>
                                <el-button type="primary" @click="resendForgetPwdEmail">{{ $t('login.resolver_email_fail[1]') }}</el-button>
                            </span>
                        </el-dialog>
                    </div>
                    <p>
                        <router-link :to="configs.loginPath" class="btn btn-sm p-2 pl-5 pr-5 btn-outline-primary">
                            {{ $t('comm.login') }}
                        </router-link>
                    </p>
                </div>
                <form v-if="!submitOk" method="post" onsubmit="return false">
                    <font-awesome-icon icon="unlock-alt" size="3x" class="text-blue mb-3"/>
                    <p class="mb-3 text-muted">{{ $t('login.resolver_password') }}</p>
                    <p class="small">{{ $t('login.info_will_send_email') }}</p>
                    <label for="inputMerNo" class="sr-only">{{ $t('user.mer_no') }}</label>
                    <input type="text" id="inputMerNo" name="merNo" class="form-control firs-input"
                           v-model="form.mer_no"
                           :placeholder="$t('user.mer_no')" required
                           autofocus>
                    <label for="inputEmail" class="sr-only">Email</label>
                    <input type="email" id="inputEmail" name="email" class="form-control last-input"
                           v-model="form.email"
                           :placeholder="$t('comm.email')"
                           required>
                    <el-button type="primary"
                               class="btn-block wpy-btn"
                               @click="submitForgetPwd"
                               :loading="loading">{{ $t('comm.setup_next') }}
                    </el-button>

                </form>
            </div>
            <div v-if="!submitOk" class="mt-4 text-center">
                <router-link :to="configs.loginPath"
                             class="btn btn-sm p-2 pl-1 pr-4 btn-link wpy-btn">
                    {{ $t('comm.login') }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import configs from "@/configs";
    import {mapState} from "vuex";
    import {forgetPwd, resendForgetPwdEmail} from "@/service/userSer";

    export default {
        name: "forgetPwd",
        computed: { //watch跟踪数据变化, 重点user, configs
            ...mapState({
                sidebar: state => state.app.sidebar,
                device: state => state.app.device,
            }),
            configs() {
                return configs;
            },
        },
        data() {
            return {
                errorMsg: '',
                loading: false,
                submitOk: false,
                confirmResendDialog: false,
                hasResendEmail: false,
                form: {mer_no: '', email: ''}
            }
        },
        methods: {
            submitForgetPwd() {
                this.loading = true
                this.errorMsg = ''
                forgetPwd(this.form).then(() => {
                    this.$data.submitOk = true
                    this.$message.success(this.$i18n.t('comm.success').toString())
                }).catch((e) => {
                    this.$data.errorMsg = e.message
                }).finally(() => {
                    this.loading = false
                })
            },
            resendForgetPwdEmail() {
                this.loading = true
                this.errorMsg = ''
                this.confirmResendDialog = false
                resendForgetPwdEmail(this.form).then(() => {
                    this.$data.submitOk = true
                    this.$message.success(this.$i18n.t('comm.success').toString())
                }).catch((e) => {
                    this.hasResendEmail = true
                    this.$data.errorMsg = e.message
                }).finally(() => {
                    this.loading = false
                })
            },
        },

    }
</script>

<style scoped src="../../../public/static/css/login.css"/>
