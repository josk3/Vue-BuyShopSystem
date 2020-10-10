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
                    <!--          byPhone          -->
                    <div v-if="!useEmail">
                        <div class="mb-12 mt-2 mb-4">
                            <el-form ref="phone_form"
                                     :model="forgetPhoneForm" :rules="rules" label-width="100px">
                                <el-form-item :label="$t('login.sms_valid_code')" prop="phone_code">
                                    <el-input type="phone" v-model="forgetPhoneForm.phone_code"
                                              :placeholder="$t('login.sms_valid_code')" name="phone_code"></el-input>
                                </el-form-item>
                                <el-form-item :label="$t('user.new_password')" prop="new_pwd">
                                    <el-input type="password" v-model="forgetPhoneForm.new_pwd"
                                              :placeholder="$t('user.new_password')" name="password-wpy"></el-input>
                                </el-form-item>
                            </el-form>
                            <el-button type="primary" @click="forgetValidPhoneBtn">{{$t('comm.submit')}}
                            </el-button>
                        </div>
                        <div class="mb-12">
                            <span class="small">{{ $t('login.resolver_email_fail[0]') }}</span>
                            <span v-show="!showTime" class="count"> {{countTime}} s</span>
                            <el-link v-show="showTime" type="primary" @click="resendForgetPwdEmailBtn">
                                {{ $t('login.resolver_email_fail[1]') }}
                            </el-link>
                        </div>
                    </div>
                    <div v-else>
                        <div v-if="!hasResendEmail">
                            <p class="mb-3 text-green"><i class="el-icon-circle-check"></i>
                                {{ $t('login.resolver_email_send[0]') }}</p>
                            <p class="mb-4 small">{{ $t('login.resolver_email_send[1]') }}</p>
                        </div>
                        <div class="mb-5">
                            <span class="small">{{ $t('login.resolver_email_fail[0]') }}</span>
                            <span v-show="!showTime" class="count"> {{countTime}} s</span>
                            <el-link v-show="showTime" type="primary" @click="confirmResendDialog = true">
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
                                <el-button type="primary" @click="resendForgetPwdEmailBtn">{{ $t('login.resolver_email_fail[1]') }}</el-button>
                            </span>
                            </el-dialog>
                        </div>
                        <p>
                            <router-link :to="configs.loginPath" class="btn btn-sm p-2 pl-5 pr-5 btn-outline-primary">
                                {{ $t('comm.login') }}
                            </router-link>
                        </p>
                    </div>
                </div>
                <!--       MAIN         -->
                <form v-if="!submitOk" method="post" onsubmit="return false">
                    <font-awesome-icon icon="unlock-alt" size="3x" class="text-blue mb-3"/>
                    <p class="mb-3 text-muted">{{ $t('login.resolver_password') }}</p>
                    <p class="small">{{ $t('login.forget_info_will_send') }}</p>
                    <label for="inputMerNo" class="sr-only">{{ $t('user.mer_no') }}</label>
                    <input type="text" id="inputMerNo" name="merNo" class="form-control firs-input"
                           v-model="form.mer_no"
                           :placeholder="$t('user.mer_no')" required
                           autofocus>
                    <label for="inputEmailOrPhone" class="sr-only">Email or Phone</label>
                    <input type="email" id="inputEmailOrPhone" name="email_or_phone" class="form-control last-input"
                           v-model="form.email_or_phone"
                           :placeholder="$t('comm.email_or_phone')"
                           required>
                    <el-button type="primary"
                               class="btn-block wpy-btn"
                               @click="forgetPwdBtn"
                               :loading="loading">{{ $t('comm.setup_next') }}
                    </el-button>

                </form>
            </div>
            <div class="mt-4 text-center">
                <router-link :to="configs.loginPath"
                             class="btn btn-sm p-2 pl-1 pr-4 btn-link wpy-btn">
                    {{ $t('comm.login') }}
                </router-link>
            </div>
        </div>
        <AliValidCode :visible="validCodeVisible" @close="validCodeClose" @callback="validCodeCallback"></AliValidCode>
    </div>
</template>

<script>
    import configs from "@/configs";
    import {mapState} from "vuex";
    import {forgetPwd, forgetValidPhoneCode, resendForgetPwdCode} from "@/service/userSer";
    import AliValidCode from "@/components/AliValidCode";
    import {isEmpty} from "@/utils/validate";

    export default {
        name: "forgetPwd",
        components: {AliValidCode},
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
                countTime: 0,
                showTime: true,
                timer: null,
                validCodeVisible: false,
                validCodeFrom: 'reset',
                forgetPhoneForm: {phone_code: '', new_pwd: ''},
                rules: {
                    new_pwd: [
                        {required: true, message: this.validMsg('user.password'), trigger: 'blur'},
                        {min: 7, max: 25, message: this.$i18n.t('valid.bad.min_length_7'), trigger: 'blur'},
                    ],
                    phone_code: [
                        {required: true, message: this.validMsg('login.sms_valid_code'), trigger: 'blur'},
                    ],
                },
                useEmail: true,
                errorMsg: '',
                loading: false,
                submitOk: false,
                confirmResendDialog: false,
                hasResendEmail: false,
                form: {action: '', mer_no: '', email_or_phone: ''}
            }
        },
        methods: {
            getCoded() {
                const TIME_COUNT = 60;
                if (!this.timer) {
                    this.countTime = TIME_COUNT;
                    this.showTime = false;
                    this.timer = setInterval(() => {
                        if (this.countTime > 0 && this.countTime <= TIME_COUNT) {
                            this.countTime--;
                        } else {
                            this.showTime = true;
                            clearInterval(this.timer);
                            this.timer = null;
                        }
                    }, 1000)
                }
            },
            submitForgetPwd() {
                this.loading = true
                this.errorMsg = ''
                this.form.action = ''
                forgetPwd(this.form).then(() => {
                    this.$data.submitOk = true
                    this.getCoded()
                    this.$message.success(this.$i18n.t('comm.success').toString())
                }).catch((res) => {
                    if (res.code === configs.apiCode.needValidCode) {
                        //验证码
                        this.showValidCode('reset')
                    } else {
                        this.$data.errorMsg = res.message
                    }
                }).finally(() => {
                    this.loading = false
                })
            },
            submitResendForgetPwdCode() {//email or phone
                this.loading = true
                this.errorMsg = ''
                this.confirmResendDialog = false
                this.form.action = 'resend'
                resendForgetPwdCode(this.form).then(() => {
                    this.$data.submitOk = true
                    this.getCoded()
                    this.$message.success(this.$i18n.t('comm.success').toString())
                }).catch((res) => {
                    this.hasResendEmail = true
                    if (res.code === configs.apiCode.needValidCode) {
                        //验证码
                        this.resendForgetPwdEmailBtn()
                    } else {
                        this.$data.errorMsg = res.message
                    }
                }).finally(() => {
                    this.loading = false
                })
            },
            validMsg(name) {
                return this.$i18n.t('valid.required_field', [this.$i18n.t(name)]);
            },
            forgetPwdBtn() {
                if (isEmpty(this.form.mer_no)) {
                    this.$data.errorMsg = this.validMsg('user.mer_no')
                } else if (isEmpty(this.form.email_or_phone)) {
                    this.$data.errorMsg = this.validMsg('register_form.email_or_phone')
                } else {
                    let val = this.form.email_or_phone
                    if (!isEmpty(val)) val = val.trim();
                    if (/^1\d{10}$/.test(val)) {
                        this.$data.useEmail = false
                        if (!isEmpty(this.$refs['phone_form'])) {
                            this.$refs['phone_form'].clearValidate();//重置
                        }
                    }
                    this.showValidCode('reset')
                }
            },
            resendForgetPwdEmailBtn() {
                this.showValidCode('resend_email')
            },
            forgetValidPhoneBtn(){
                this.showValidCode('valid_phone')
            },
            forgetPwdByPhoneCode() {
                this.$refs['phone_form'].validate((valid) => {
                    if (!valid) {
                        return false;
                    } else {
                        this.loading = true
                        this.errorMsg = ''
                        let req = this.form
                        req.phone_code = this.forgetPhoneForm.phone_code
                        req.new_pwd = this.forgetPhoneForm.new_pwd
                        forgetValidPhoneCode(req).then(() => {
                            this.$data.submitOk = true
                            this.getCoded()
                            this.$message.success(this.$i18n.t('comm.success').toString())
                            this.$router.push({name: 'login'})
                        }).catch((res) => {
                            this.hasResendEmail = true
                            if (res.code === configs.apiCode.needValidCode) {
                                //验证码
                                this.forgetValidPhoneBtn()
                            } else {
                                this.$data.errorMsg = res.message
                            }
                        }).finally(() => {
                            this.loading = false
                        })
                    }
                })
            },
            //---
            showValidCode(type) {
                this.validCodeVisible = true
                this.validCodeFrom = type
            },
            validCodeCallback(jsonData) {
                if (this.validCodeFrom === 'reset') {
                    this.form.valid_sig = jsonData
                    this.submitForgetPwd()
                } else if (this.validCodeFrom === 'valid_phone') {
                    this.form.valid_sig = jsonData
                    this.forgetPwdByPhoneCode()
                }else {
                    this.form.valid_sig = jsonData
                    this.submitResendForgetPwdCode()
                }
            },
            validCodeClose() {
                this.validCodeVisible = false
            },

        },

    }
</script>

<style scoped src="../../../public/static/css/login.css"/>
