<template>
    <div class="d-flex flex-column h-100" v-loading="loading">
        <div class="register-box">
            <div class="form-signin bg-white pb-3 pt-3 shadow-sm rounded-sm" style="max-width:360px;">
                <el-alert v-if="errorMsg" :title="errorMsg"
                          type="error"
                          class="text-center"
                          style="background: none;margin-bottom: 10px;"
                          center show-icon :closable="false">
                </el-alert>
                <div v-if="!regOk">
                    <p class="text-center">{{$t('login.register_right_now')}}</p>
                    <el-form label-position="top" :rules="rules" ref="register" label-width="90px" :model="register">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="register.username"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号/邮箱" prop="email_or_phone">
                            <el-input v-model="register.email_or_phone"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="register.password" type="password"></el-input>
                        </el-form-item>
                        <el-form-item prop="terms">
                            <el-checkbox label="" :checked="register.terms" v-model="register.terms"
                                         name="term"></el-checkbox>
                            <span class="small"> 我已阅读同意《服务条款》和《法律声明》</span>
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
                <div v-if="regOk" class="text-center">
                    <div v-if="useEmail">
                        <div>
                            <p class="mb-3 text-green"><i class="el-icon-circle-check"></i>
                                已发送一封激活邮件</p>
                            <p class="mb-3">
                                到您注册的邮箱 {{ register.email_or_phone }}, 请打开邮件激活。
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
                                    width="30%"
                                    center>
                                <p class="text-center">{{$t('login.resolver_email_fail[2]')}}</p>
                                <span slot="footer" class="dialog-footer">
                                <el-button @click="confirmResendDialog = false">{{$t('comm.cancel')}}</el-button>
                                <el-button type="primary" @click="resendRegEmail">{{ $t('login.resolver_email_fail[1]') }}</el-button>
                            </span>
                            </el-dialog>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-4 text-center">
                <span v-if="!regOk" class="small text-muted">已经有账号?</span>
                <router-link :to="configs.loginPath"
                             class="btn btn-sm p-2 pl-1 pr-4 btn-link btn-mp">
                    {{ $t('comm.login') }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import configs from "@/configs";
    import {mapState} from "vuex";
    import {isEmpty} from "@/utils/validate";
    import Schema from 'async-validator';
    import {registerMer, resendRegisterEmail} from "@/service/userSer";

    export default {
        name: "register",
        computed: { //watch跟踪数据变化, 重点user, configs
            ...mapState({
                sidebar: state => state.app.sidebar,
                device: state => state.app.device,
                rf: state => state.app.rf,
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
                    callback(new Error('请输入手机号或邮箱'));
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
                                callback(new Error('请填写正确的手机号或邮箱'));
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
                errorMsg: '',
                loading: false,
                regBtnDisable: false,
                regOk: false,
                useEmail: false,
                confirmResendDialog: false,
                register: {
                    username: '',
                    email_or_phone: '',
                    password: '',
                    valid_code: '',
                    rf: this.rf,
                    terms: true,
                },
                res: {},
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur'},
                        {
                            type: 'string', pattern: /^[a-zA-Z0-9@_\-.]+$/,
                            message: '英文字母数字或邮箱', trigger: 'change'
                        }
                    ],
                    email_or_phone: [
                        {required: true, message: '请输入手机号或邮箱', trigger: 'change'},
                        {validator: emailOrPhone, trigger: ['blur']}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 25, message: '长度不能少于6位', trigger: 'blur'},
                    ],
                    terms: [
                        {validator: termCheck, trigger: ['blur', 'change']},
                    ]
                }
            }
        },
        methods: {
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
                            this.$data.regOk = true
                            this.$data.res = response.data
                        }).catch((e) => {
                            this.$data.errorMsg = e.message
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
            }
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
