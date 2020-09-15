<template>
    <div class="d-flex flex-column h-100" v-loading="loading">
        <div class="register-box">
            <div class="form-signin bg-white pb-3 pt-3 shadow-sm rounded-sm" style="max-width:330px;">
                <el-alert v-if="errorMsg" :title="errorMsg"
                          type="error"
                          class="text-center"
                          style="background: none;margin-bottom: 10px;"
                          center show-icon :closable="false">
                </el-alert>
                <div v-if="!regSuccess">
                    <div v-if="!submitOk">
                        <p class="text-center">{{$t('login.register_right_now')}}</p>
                        <el-form label-position="top" :rules="rules" ref="register" label-width="90px"
                                 :model="register">
                            <el-form-item :label="$t('user.username')" prop="username">
                                <el-input v-model="register.username"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('comm.email_or_phone')" prop="email_or_phone">
                                <el-input v-model="register.email_or_phone"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('user.password')" prop="password">
                                <el-input v-model="register.password" type="password"></el-input>
                            </el-form-item>
                            <el-form-item prop="terms">
                                <el-checkbox label="" :checked="register.terms" v-model="register.terms"
                                             name="term"></el-checkbox>
                                <span class="small"> {{$t('login.reg_terms[0]')}}《<router-link :to="configs.termsPath">{{$t('login.reg_terms[1]')}}</router-link>》</span>
                            </el-form-item>

                            <el-form-item>
                                <el-button :disabled="regBtnDisable" type="primary"
                                           class="btn-block"
                                           :loading="loading"
                                           @click="submitRegister()">
                                    {{ $t('comm.register') }}
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div v-if="submitOk" class="text-center">
                        <div v-if="useEmail">
                            <div>
                                <div class="mb-4 font-weight-bold">{{$t('user.mer_no')}} {{ res.mer_no }}</div>
                                <p class="mb-3 text-green"><i class="el-icon-circle-check"></i>
                                    {{$t('login.has_send_active_email')}}</p>
                                <p class="mb-3">
                                    {{ register.email_or_phone }}
                                </p>
                            </div>
                            <div class="mb-3">
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
                                <el-button type="primary" @click="resendRegEmail">{{ $t('login.resolver_email_fail[1]') }}</el-button>
                            </span>
                                </el-dialog>
                            </div>
                        </div>
                        <div v-if="!useEmail">
                            <div class="mb-4 mt-2">
                                <div class="mb-4 font-weight-bold">{{$t('user.mer_no')}} {{ res.mer_no }}</div>
                                <el-form :inline="true">
                                    <el-form-item :label="$t('login.sms_valid_code')">
                                        <el-input type="phone" v-model="phoneCode"
                                                  :placeholder="$t('login.sms_valid_code')"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="activePhoneCode">{{$t('comm.submit')}}
                                        </el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div class="mb-3">
                                <span class="small">{{ $t('login.resolver_email_fail[0]') }}</span>
                                <el-link type="primary" @click="confirmResendDialog = true">
                                    {{ $t('login.resolver_email_fail[1]') }}
                                </el-link>
                                <el-dialog
                                        :title="$t('comm.confirm')"
                                        :visible.sync="confirmResendDialog"
                                        width="350px"
                                        center>
                                <span slot="footer" class="dialog-footer">
                                <el-button @click="confirmResendDialog = false">{{$t('comm.cancel')}}</el-button>
                                <el-button type="primary" @click="resendRegEmail">{{ $t('login.resolver_email_fail[1]') }}</el-button>
                            </span>
                                </el-dialog>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="regSuccess" class="text-center">
                    <h4 class="mb-4 mb-3 text-green">
                        <i class="el-icon-circle-check"></i>
                        {{ $t('comm.success') }}
                    </h4>
                    <h2>{{$t('user.mer_no')}}: {{ res.mer_no }}</h2>
                    <p class="mt-4 font-weight-bold">{{$t('login.remember_you_merchant_no')}}</p>
                </div>

            </div>
            <div class="mt-4 text-center">
                <span v-if="!submitOk" class="small text-muted">{{$t('comm.has_a_account')}}</span>
                <router-link :to="configs.loginPath"
                             class="btn btn-sm p-2 pl-1 pr-4 btn-link wpy-btn">
                    {{ $t('comm.login') }}
                </router-link>
            </div>
        </div>

        <AliValidCode :visible="validCodeVisible" @callback="validCodeCallback"></AliValidCode>
    </div>
</template>

<script>
    import configs from "@/configs";
    import {mapState} from "vuex";
    import {isEmpty} from "@/utils/validate";
    import Schema from 'async-validator';
    import {activePhone, registerMer, resendRegisterEmail, resendRegisterPhone} from "@/service/userSer";
    import AliValidCode from "@/components/AliValidCode";

    export default {
        name: "register",
        components: {AliValidCode},
        computed: { //watch跟踪数据变化, 重点user, configs
            ...mapState({
                device: state => state.app.device,
                rf: state => state.app.rf,
                lang: state => state.app.lang,//多语言
            }),
            configs() {
                return configs;
            },
        },
        mounted() {
        },
        data() {
            var emailOrPhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.validMsg('comm.email_or_phone')));
                } else {
                    if (!isEmpty(value)) value = value.trim();
                    if (/^1\d{10}$/.test(value)) {
                        this.$data.useEmail = false
                        callback();
                    } else {
                        const descriptor = {
                            email: [{type: 'email', required: true}]
                        };
                        const validator = new Schema(descriptor);
                        validator.validate({email: value}, (errors) => {
                            if (errors) {
                                callback(new Error(this.$i18n.t('valid.bad.input_valid_email_or_phone').toString()));
                            }
                            this.$data.useEmail = true
                            // validation passed
                        });
                    }
                    callback();
                }
            };
            var termCheck = (rule, value, callback) => {
                this.$data.regBtnDisable = !!(isEmpty(value) || value === false);
                callback();
            };
            return {
                validCodeVisible: false,
                errorMsg: '',
                loading: false,
                regBtnDisable: false,
                submitOk: false,
                useEmail: false,
                confirmResendDialog: false,
                register: {
                    username: 'admin',
                    email_or_phone: 'test@test.com',
                    password: '1243424234',
                    valid_code: '',
                    rf: this.rf,
                    terms: true,
                    valid_sig: {},
                },
                res: {},
                phoneCode: '',
                regSuccess: false,
                rules: {
                    username: [
                        {required: true, message: this.validMsg('user.username'), trigger: 'blur'},
                        {min: 5, max: 20, message: this.$i18n.t('valid.bad.length_5_20'), trigger: 'blur'},
                        {
                            type: 'string', pattern: /^[a-zA-Z0-9@_\-.]+$/,
                            message: this.$i18n.t('valid.bad.only_en_number_email'), trigger: 'change'
                        }
                    ],
                    email_or_phone: [
                        {required: true, message: this.validMsg('comm.email_or_phone'), trigger: 'change'},
                        {validator: emailOrPhone, trigger: ['blur']}
                    ],
                    password: [
                        {required: true, message: this.validMsg('user.password'), trigger: 'blur'},
                        {min: 6, max: 25, message: this.$i18n.t('valid.bad.min_length_6'), trigger: 'blur'},
                    ],
                    terms: [
                        {validator: termCheck, trigger: ['blur', 'change']},
                    ]
                }
            }
        },
        methods: {
            validMsg(name) {
                return this.$i18n.t('valid.required_field', [this.$i18n.t(name)]);
            },
            submitRegister() {
                this.$refs['register'].validate((valid) => {
                    if (!valid) {
                        return false;
                    } else {
                        //
                        this.$data.errorMsg = ''
                        this.$data.loading = true
                        registerMer(this.$data.register).then(response => {
                            this.$message.success(this.$i18n.t('comm.success').toString())
                            this.$data.submitOk = true
                            this.$data.res = response.data
                        }).catch((res) => {
                            if (res.code === configs.apiCode.needValidCode) {
                                //验证码
                                this.validCodeVisible = true
                            } else {
                                this.$data.errorMsg = res.message
                            }
                        }).finally(() => {
                            this.$data.loading = false
                        })
                    }
                });
            },
            resendRegEmail() {
                this.loading = true
                this.errorMsg = ''
                this.confirmResendDialog = false
                resendRegisterEmail(this.res).then(() => {
                    this.$message.success(this.$i18n.t('comm.success').toString())
                }).catch((e) => {
                    this.$data.errorMsg = e.message
                }).finally(() => {
                    this.loading = false
                })
            },
            resendRegPhone() {
                this.loading = true
                this.errorMsg = ''
                this.confirmResendDialog = false
                resendRegisterPhone(this.res).then(() => {
                    this.$message.success(this.$i18n.t('comm.success').toString())
                }).catch((e) => {
                    this.$data.errorMsg = e.message
                }).finally(() => {
                    this.loading = false
                })
            },
            activePhoneCode() {
                this.loading = true
                this.errorMsg = ''
                this.confirmResendDialog = false
                let data = this.res
                data.code = this.phoneCode
                activePhone(data).then(() => {
                    this.$message.success(this.$i18n.t('comm.success').toString())
                    this.$data.regSuccess = true
                }).catch((e) => {
                    this.$data.errorMsg = e.message
                }).finally(() => {
                    this.loading = false
                })
            },

            //---
            validCodeCallback(jsonData) {
                this.register.valid_sig = jsonData
                this.submitRegister()
            },

        },

    }
</script>

<style>
    .register-box label {
        margin-bottom: 0;
    }

    .register-box .el-form--label-top .el-form-item__label {
        padding-bottom: 1px;
    }
</style>
<style scoped src="../../../public/static/css/login.css"/>
