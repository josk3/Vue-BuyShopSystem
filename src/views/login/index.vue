<template>
    <div class="d-flex flex-column h-100" v-loading="loading">

        <div class="text-center login-box">
            <div v-if="!nextCheckStatus">
                <form class="form-signin bg-white pb-3 pt-3 shadow-sm rounded-sm" action="" method="post"
                      @submit.prevent="submitLogin">
                    <h1 class="h3 mb-3 font-weight-normal">
                        <svg-icon icon-class="wintopay_icon_color" style="width: 45px;height: 29px;"/>
                        {{ $t('comm.merchant_login') }}
                    </h1>
                    <el-alert v-if="errorMsg" :title="errorMsg"
                              type="error"
                              style="background: none;margin-bottom: 10px;"
                              center show-icon :closable="false">
                    </el-alert>
                    <label for="inputMerNo" class="sr-only">{{ $t('user.mer_no') }}</label>
                    <input type="text" id="inputMerNo" name="merNo" class="form-control firs-input"
                           v-model="userLogin.mer_no"
                           :placeholder="$t('user.mer_no')" required
                           autofocus>
                    <label for="inputUsername" class="sr-only">Username</label>
                    <input type="text" id="inputUsername" name="username" class="form-control mid-clear"
                           v-model="userLogin.username"
                           :placeholder="$t('user.username')" required>
                    <label for="inputPassword" class="sr-only">Password</label>
                    <input type="password" id="inputPassword" name="password" class="form-control last-input"
                           v-model="userLogin.password"
                           :placeholder="$t('user.password')"
                           required>
                    <div class="d-block clearfix mb-2">
                        <el-link type="primary" class="small float-right">
                            <router-link :to="configs.forgetPwdPath">
                                {{ $t('comm.forget_pwd') }}
                            </router-link>
                        </el-link>
                    </div>
                    <el-button type="primary" native-type="submit"
                               class="btn-block wpy-btn"
                               @click="submitLogin"
                               :loading="loading">{{ $t('comm.login') }}
                    </el-button>
                    <div class="d-block row">
                        <div class="col-12 mt-5 mb-3">
                            <span class="text-dark small">{{ $t('comm.not_a_account') }}</span>
                            <el-link type="primary" style="font-size: 17px;">
                                <router-link :to="configs.registerPath">
                                    {{ $t('comm.register_now') }}
                                </router-link>
                            </el-link>
                        </div>
                    </div>

                </form>
            </div>
            <div v-else>
                <div class="form-signin bg-white pb-3 pt-3 shadow-sm rounded-sm" style="max-width:330px;">
                    <UserValidEmailPhone :user_info="res" kind="login_recheck"
                                         @success="validStatueOk"></UserValidEmailPhone>
                    <div class="mt-4 text-center">
                        <span class="small text-muted">{{$t('comm.has_a_account')}}</span>
                        <el-button @click="loadPage" type="text">{{ $t('comm.login') }}</el-button>
                    </div>
                </div>
            </div>
        </div>
        <AliValidCode :visible="validCodeVisible" @close="validCodeClose" @callback="validCodeCallback"></AliValidCode>
    </div>
</template>

<script>
    import configs from "@/configs";
    import {findPath} from "@/router/routerUtils";
    import {mapState} from "vuex";
    import {isEmpty} from "@/utils/validate";
    import AliValidCode from "@/components/AliValidCode";
    import UserValidEmailPhone from "@/components/UserValidEmailPhone";
    import {getToken} from "@/service/auth/token";

    export default {
        name: "login",
        components: {UserValidEmailPhone, AliValidCode},
        computed: { //watch跟踪数据变化, 重点user, configs
            ...mapState({
                sidebar: state => state.app.sidebar,
                device: state => state.app.device,
                menus: state => state.user.menus,
            }),
            configs() {
                return configs;
            },
        },
        mounted() {
            if (!isEmpty(getToken())) { //在登录页面，如果已经是登录状态直接跳转到首页
                this.loading = true
                this.$store.dispatch('user/loadUserInfo').then((res) => {
                    if (!isEmpty(res) && !isEmpty(res.user)) {
                        location.href = configs.homePath
                        //this.$router.push({path: configs.homePath})
                    }
                }).catch(() => {
                    this.$store.dispatch('user/resetToken').then()
                }).finally(() => {
                    this.loading = false
                })
            }
        },
        watch: {
            $route: {
                handler: function (route) {
                    const query = route.query
                    if (!isEmpty(query) && !isEmpty(query.redirect)) {
                        this.redirect = query.redirect
                    }
                },
                immediate: true
            },
        },
        data() {
            return {
                validCodeVisible: false,
                errorMsg: '',
                userLogin: {
                    mer_no: '',
                    username: '',
                    password: '',
                    valid_sig: {},
                },
                redirect: '',
                loading: false,
                nextCheckStatus: false,
                res: {},
            }
        },
        methods: {
            validMsg(name) {
                return this.$i18n.t('valid.required_field', [this.$i18n.t(name)]);
            },
            submitLogin() {
                this.$data.errorMsg = ''
                if (isEmpty(this.userLogin.mer_no)) {
                    this.$data.errorMsg = this.validMsg('user.mer_no')
                } else if (isEmpty(this.userLogin.username)) {
                    this.$data.errorMsg = this.validMsg('user.username')
                } else if (isEmpty(this.userLogin.password)) {
                    this.$data.errorMsg = this.validMsg('user.password')
                } else {
                    try {
                        this.loading = true
                        this.$store.dispatch('user/login', this.userLogin)
                            .then((res) => {
                                let redirect;
                                if (!isEmpty(this.redirect) && this.redirect !== configs.loginPath) {
                                    let findRouterPath = findPath('/' + this.redirect, this.menus);
                                    if (isEmpty(findRouterPath)) {//在路由有存在
                                        redirect = configs.homePath
                                    } else {
                                        redirect = this.redirect
                                    }
                                } else {
                                    redirect = configs.homePath
                                }
                                if (res.need_change_pwd_with_safe !== undefined && res.need_change_pwd_with_safe === 1) {
                                    //老商户密码策略检测需要修改密码
                                    redirect = configs.profilePath + '?change_pwd=with_safe'
                                }else if (res.need_change_pwd_with_expire !== undefined && res.need_change_pwd_with_expire === configs.apiCode.passwordExpired) {
                                    //密码过期
                                    redirect = configs.profilePath + '?change_pwd=with_expire'
                                }
                                this.$router.push({path: redirect})
                                //this.$message.success('登录成功')
                            })
                            .catch((res) => {
                                this.$data.errorMsg = res.message
                                if (res.code === configs.apiCode.needValidCode) {
                                    //验证码
                                    this.validCodeVisible = true
                                } else if (res.code === configs.apiCode.needValidStatus) {
                                    //状态
                                    this.$data.nextCheckStatus = true //登录时发现用户还没验证邮箱或手机号
                                    this.$data.res = res.data
                                }
                            }).finally(() => {
                            this.loading = false
                        })
                    } catch (e) {
                        console.log(e)
                    }
                }
                return false
            },
            validStatueOk() {
                this.$message.success(this.$i18n.t('comm.success').toString())
                this.nextCheckStatus = false
                this.errorMsg = ''
                this.$router.push({name: 'login', params: {v: '1'}})
                //location.reload()
            },
            loadPage() {
                this.nextCheckStatus = false
                this.errorMsg = ''
            },
            //---
            validCodeCallback(jsonData) {
                this.userLogin.valid_sig = jsonData
                this.submitLogin()
            },
            validCodeClose() {
                this.validCodeVisible = false
            },

        },


    }
</script>
<style scoped src="../../../public/static/css/login.css"/>
<style>
    .login-box .form-signin {
        padding: 25px;
    }

    .login-box .form-signin .firs-input, .login-box .form-signin .mid-clear {
        margin-bottom: 0;
    }

    .login-box .form-signin .firs-input, .login-box .form-signin .mid-clear, .login-box .form-signin .last-input {
        border-left: 0;
        border-right: 0;
        border-radius: 0;
        border-top: 0;
    }
</style>
