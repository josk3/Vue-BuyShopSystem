<template>
    <div class="d-flex flex-column h-100">

        <div class="text-center" v-loading="loading">
            <form class="form-signin" method="post" onsubmit="return false">
                <h1 class="h3 mb-3 font-weight-normal">{{ $t('comm.merchant_login') }}</h1>
                <label for="inputMerNo" class="sr-only">{{ $t('user.mer_no') }}</label>
                <input type="text" id="inputMerNo" name="merNo" class="form-control firs-input"
                       v-model="userLogin.mer_no"
                       :placeholder="$t('user.mer_no')" required
                       autofocus>
                <label for="inputUsername" class="sr-only">Password</label>
                <input type="text" id="inputUsername" name="username" class="form-control mid-clear"
                       v-model="userLogin.username"
                       :placeholder="$t('user.username')" required>
                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" id="inputPassword" name="password" class="form-control last-input"
                       v-model="userLogin.password"
                       :placeholder="$t('user.password')"
                       required>
                <button class="btn btn-lg btn-primary btn-block" type="submit"
                        @click="submitLogin">{{ $t('comm.login') }}
                </button>

            </form>
        </div>
    </div>
</template>

<script>
    import configs from "@/configs";
    import {findPath} from "@/router/routerUtils";
    import {mapState} from "vuex";
    import user from "@/store/modules/user";
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
            user() {
                return user.state.user;
            },
            menus() {
                return user.state.menus;
            },
        },
        data() {
            return {
                userLogin: {
                    mer_no: 'M70447',
                    username: 'admin',
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
                            console.error(e)
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
