<template>
    <div class="d-flex flex-column h-100" v-loading="loading">
        <div class="register-box">
            <div class="form-signin bg-white pb-3 pt-3 shadow-sm rounded-sm" style="max-width:330px;">
                <el-alert v-if="errorMsg" :title="errorMsg"
                          type="error"
                          class="text-center"
                          style="background: none;margin-bottom: 10px;"
                          center show-icon :closable="false">
                    <template>
                        <span v-show="showLoginByError">
                            <router-link :to="configs.loginPath"
                                         class="btn btn-sm p-2 pl-1 pr-4 btn-link wpy-btn">
                                {{ $t('comm.login') }}
                            </router-link>
                        </span>
                    </template>
                </el-alert>
                <div v-if="!regSuccess">
                    <div v-if="!submitOk">
                        <p class="text-center">{{$t('login.register_right_now')}}</p>
                        <el-form label-position="top" :rules="rules" ref="register" label-width="90px"
                                 :model="register">
                            <el-form-item :label="$t('user.name')" prop="name">
                                <el-input v-model="register.name" name="name"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('register_form.email_or_phone')" prop="email_or_phone">
                                <el-input v-model="register.email_or_phone" name="email_or_phone"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('user.username')" prop="username">
                                <el-input v-model="register.username" name="username"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('user.password')" prop="password">
                                <el-input v-model="register.password" type="password" name="password-wpy"></el-input>
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
                        <UserValidEmailPhone :user_info="res" @success="validStatueOk"></UserValidEmailPhone>
                    </div>
                </div>
                <div v-if="regSuccess" class="text-center">
                    <h4 class="mb-4 mb-3 text-green">
                        <i class="el-icon-circle-check"></i>
                        {{ $t('comm.success') }}
                    </h4>
                    <h2>{{$t('user.mer_no')}}: <span class="text-red">{{ res.user.mer_no }}</span></h2>
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

        <AliValidCode :visible="validCodeVisible" @close="validCodeClose" @callback="validCodeCallback"></AliValidCode>
    </div>
</template>

<script>
    import configs from "@/configs";
    import {mapState} from "vuex";
    import {isEmpty} from "@/utils/validate";
    import Schema from 'async-validator';
    import {registerMer} from "@/service/userSer";
    import AliValidCode from "@/components/AliValidCode";
    import UserValidEmailPhone from "@/components/UserValidEmailPhone";

    export default {
        name: "register",
        components: {UserValidEmailPhone, AliValidCode},
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
                    callback(new Error(this.validMsg('register_form.email_or_phone')));
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
                validCodeFrom: 'register',
                errorMsg: '',
                showLoginByError: false,
                loading: false,
                regBtnDisable: false,
                submitOk: false,
                useEmail: false,
                confirmResendDialog: false,
                register: {
                    name: '',
                    username: '',
                    email_or_phone: '',
                    password: '',
                    valid_code: '',
                    rf: this.rf,
                    terms: true,
                    valid_sig: {},
                },
                res: {},
                phoneCode: '',
                regSuccess: false,
                rules: {
                    name: [
                        {required: true, message: this.validMsg('user.name'), trigger: 'blur'},
                    ],
                    username: [
                        {required: true, message: this.validMsg('user.username'), trigger: 'blur'},
                        {min: 5, max: 20, message: this.$i18n.t('valid.bad.length_5_20'), trigger: 'blur'},
                        {
                            type: 'string', pattern: /^[a-zA-Z0-9@_\-.]+$/,
                            message: this.$i18n.t('valid.bad.only_en_number_email'), trigger: 'change'
                        }
                    ],
                    email_or_phone: [
                        {required: true, message: this.validMsg('register_form.email_or_phone'), trigger: 'change'},
                        {validator: emailOrPhone, trigger: ['blur']}
                    ],
                    password: [
                        {required: true, message: this.validMsg('user.password'), trigger: 'blur'},
                        {min: 7, max: 25, message: this.$i18n.t('valid.bad.min_length_7'), trigger: 'blur'},
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
                        this.$data.showLoginByError = false
                        this.$data.loading = true
                        registerMer(this.$data.register).then(res => {
                            //this.$message.success(this.$i18n.t('comm.success').toString())
                            this.$data.res = res.data
                            this.$data.submitOk = true
                        }).catch((res) => {
                            if (res.code === configs.apiCode.needValidCode) {
                                //验证码
                                this.showValidCode('register')
                            } else {
                                if (res.code === configs.apiCode.existsParam) {
                                    this.$data.showLoginByError = true
                                }
                                this.$data.errorMsg = res.message
                                this.$message.error(this.$data.errorMsg)
                            }
                        }).finally(() => {
                            this.$data.loading = false
                        })
                    }
                });
            },
            validStatueOk() {
                this.regSuccess = true
            },
            //---
            showValidCode(type) {
                this.validCodeVisible = true
                this.validCodeFrom = type
            },
            validCodeCallback(jsonData) {
                if (this.validCodeFrom === 'register') {
                    this.register.valid_sig = jsonData
                    this.submitRegister()
                }
            },
            validCodeClose() {
                this.validCodeVisible = false
            },
            //--

        },

    }
</script>
<style scoped src="../../../public/static/css/login.css"/>
<style>
    .register-box label {
        margin-bottom: 0;
    }

    .register-box .el-form--label-top .el-form-item__label {
        padding-bottom: 1px;
    }
</style>
