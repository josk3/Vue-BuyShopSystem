<template>
    <div>
        <el-alert v-if="errorMsg" :title="errorMsg"
                  type="error"
                  class="text-center"
                  style="background: none;margin-bottom: 10px;"
                  center show-icon :closable="false">
        </el-alert>
        <div v-if="useEmail">
            <div>
                <div class="mb-4 font-weight-bold">{{$t('user.mer_no')}} {{ userData.mer_no }}</div>
                <p class="mb-1">
                    <small><i class="el-icon-circle-check"></i>{{$t('login.has_send_active_email')}}</small>
                </p>
                <p class="mb-2">
                    <i class="el-icon-info text-yellow"></i>{{$t('account.login_mail_and_click_valid_link')}}
                </p>
                <p class="mb-3">
                    {{ userData.email }}
                </p>
            </div>
            <div class="mb-3">
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
                                <el-button type="primary" @click="resendEmailBtn">{{ $t('login.resolver_email_fail[1]') }}</el-button>
                            </span>
                </el-dialog>
            </div>
        </div>
        <div v-else>
            <div class="mb-4 mt-2">
                <div class="mb-4 font-weight-bold">{{$t('user.mer_no')}} {{ userData.mer_no }}</div>
                <el-form :inline="true" @submit.native.prevent="activePhoneBtn">
                    <el-form-item :label="$t('login.sms_valid_code')">
                        <el-input type="phone" v-model="phoneCode"
                                  :placeholder="$t('login.sms_valid_code')"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="activePhoneBtn">{{$t('comm.submit')}}
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="mb-3">
                <span class="small">{{ $t('login.resolver_email_fail[0]') }}</span>
                <span v-show="!showTime" class="count"> {{countTime}} s</span>
                <!--      phone          -->
                <el-link v-show="showTime" type="primary" @click="resendPhoneBtn">
                    {{ $t('login.resolver_email_fail[1]') }}
                </el-link>
            </div>
        </div>

        <AliValidCode :visible="validCodeVisible" @close="validCodeClose" @callback="validCodeCallback"></AliValidCode>

    </div>
</template>

<script>
    import {activePhone, resendVerifyCodeEmail, resendVerifyCodePhone} from "@/service/userSer";
    import {mapState} from "vuex";
    import configs from "@/configs";
    import AliValidCode from "@/components/AliValidCode";
    import {isEmpty} from "@/utils/validate";


    export default {
        name: "UserValidEmailPhone", //用户验证邮箱或手机验证码
        components: {AliValidCode},
        //user_info 的数据为 data.user.email ...
        props: ['user_info', 'kind'],
        computed: { //watch跟踪数据变化, 重点user, configs
            ...mapState({
                lang: state => state.app.lang,//多语言
            }),
            configs() {
                return configs;
            },
        },
        watch: {
            user_info(newVal) {
                this.renderUser(newVal)
            },
        },
        data() {
            return {
                countTime: 0,
                showTime: true,
                timer: null,
                userData: {},
                validCodeVisible: false,
                validCodeFrom: 'register',
                errorMsg: '',
                loading: false,
                useEmail: false,
                phoneCode: '',
                confirmResendDialog: false,
            }
        },
        mounted() {
            this.renderUser(this.user_info)
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
            renderUser(newVal){
                if (!isEmpty(newVal)) {
                    this.useEmail = !isEmpty(newVal.user.email);
                    this.userData = newVal.user
                    this.getCoded()
                }else {
                    this.userData = {}
                }
            },
            validMsg(name) {
                return this.$i18n.t('valid.required_field', [this.$i18n.t(name)]);
            },
            resendEmailBtn(){
                this.showValidCode('resend_email')
            },
            resendPhoneBtn(){
                this.showValidCode('resend_phone')
            },
            //重发phone code
            resendActivePhone() {
                this.loading = true
                this.errorMsg = ''
                this.confirmResendDialog = false
                resendVerifyCodePhone(this.convertReqData()).then(() => {
                    this.$message.success(this.$i18n.t('comm.success').toString())
                    this.getCoded()
                }).catch((res) => {
                    if (res.code === configs.apiCode.needValidCode) {
                        //验证码
                        this.resendPhoneBtn()
                    } else {
                        this.$data.errorMsg = res.message
                    }
                }).finally(() => {
                    this.loading = false
                })
            },
            //验证phone code
            activePhoneBtn() {
                this.showValidCode('active_phone')
            },
            activePhoneCode() {
                this.loading = true
                this.errorMsg = ''
                this.confirmResendDialog = false
                let data = this.userData
                data.code = this.phoneCode
                activePhone(data).then(() => {
                    this.$message.success(this.$i18n.t('comm.success').toString())
                    this.$emit('success', true)
                }).catch((res) => {
                    if (res.code === configs.apiCode.needValidCode) {
                        //验证码
                        this.activePhoneBtn()
                    } else {
                        this.$data.errorMsg = res.message
                    }
                }).finally(() => {
                    this.loading = false
                })
            },
            //重发email code, 邮箱的验证在 /active_email ?code= xxx
            submitResendActiveEmail() {
                this.loading = true
                this.errorMsg = ''
                this.confirmResendDialog = false
                resendVerifyCodeEmail(this.convertReqData()).then(() => {
                    this.$message.success(this.$i18n.t('comm.success').toString())
                    this.getCoded()
                }).catch((res) => {
                    if (res.code === configs.apiCode.needValidCode) {
                        //验证码
                        this.resendEmailBtn()
                    } else {
                        this.$data.errorMsg = res.message
                    }
                }).finally(() => {
                    this.loading = false
                })
            },
            convertReqData() {
                return  {kind: this.kind, uid: this.userData.uid, valid_sig: this.userData.valid_sig}
            },

            //---
            showValidCode(type){
                this.validCodeVisible = true
                this.validCodeFrom = type
            },
            validCodeCallback(jsonData) {
                if (this.validCodeFrom === 'active_phone') {
                    this.userData.valid_sig = jsonData
                    this.activePhoneCode()
                }else if (this.validCodeFrom === 'resend_email') {
                    this.userData.valid_sig = jsonData
                    this.submitResendActiveEmail()
                }else {
                    this.userData.valid_sig = jsonData
                    this.resendActivePhone()
                }
            },
            validCodeClose(){
                this.validCodeVisible = false
            },
            //--
        }
    }
</script>

<style scoped>

</style>
