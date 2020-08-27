<template>
    <div class="d-flex flex-column h-100" v-loading="loading">

        <div class="text-center">
            <form class="form-signin bg-white pb-3 pt-3 shadow-sm rounded-sm" method="post" onsubmit="return false">
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
                <el-button type="primary"
                           class="btn-block btn-mp"
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
    </div>
</template>

<script>
    import configs from "@/configs";
    import {findPath} from "@/router/routerUtils";
    import {mapState} from "vuex";
    import {isEmpty} from "@/utils/validate";

    export default {
        name: "login",
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
                userLogin: {
                    mer_no: 'M70447',
                    username: 'admin1',
                    password: 'Test123456'
                },
                redirect: '',
                loading: false,
            }
        },
        methods: {
            submitLogin() {
                try {
                    this.loading = true
                    this.$store.dispatch('user/login', this.userLogin)
                        .then(() => {
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
                            this.$router.push({path: redirect})
                            //this.$message.success('登录成功')
                        })
                        .catch((e) => {
                            this.$data.errorMsg = e.message
                        }).finally(() => {
                        this.loading = false
                    })
                } catch (e) {
                    console.log(e)
                }
            }
        },
        watch: {
            $route: {
                handler: function (route) {
                    const query = route.query
                    if (query) {
                        this.redirect = query.redirect
                    }
                },
                immediate: true
            }
        },

    }
</script>

<style scoped src="../../../public/static/css/login.css"/>
