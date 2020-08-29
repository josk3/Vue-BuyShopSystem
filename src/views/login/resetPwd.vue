<template>
    <div class="d-flex flex-column h-100" v-loading="loading">
        <div class="text-center">
            <div v-if="!ok" class="form-signin bg-white pb-5 pt-4 shadow-sm rounded-sm">
                <el-alert v-if="errorMsg" :title="errorMsg"
                          type="error"
                          style="background: none;margin-bottom: 10px;"
                          center show-icon :closable="false">
                </el-alert>
                <form method="post" onsubmit="return false">
                    <p class="mb-3">{{ $t('login.reset_new_pwd') }}</p>
                    <label for="inputNewPwd" class="sr-only">{{ $t('login.new_password') }}</label>
                    <input type="password" id="inputNewPwd" class="form-control firs-input"
                           v-model="form.new_pwd"
                           :placeholder="$t('login.new_password')" required
                           autofocus>
                    <label for="inputConfirmNewPwd" class="sr-only">{{ $t('login.confirm_new_password') }}</label>
                    <input type="password" id="inputConfirmNewPwd" class="form-control last-input"
                           v-model="form.confirm_new_pwd"
                           :placeholder="$t('login.confirm_new_password')"
                           required>
                    <el-button type="primary"
                               class="wpy-btn pl-5 pr-5 mt-2"
                               @click="submitResetPwd"
                               :loading="loading">{{ $t('comm.confirm') }}
                    </el-button>
                </form>
            </div>
            <div v-if="ok" class="form-signin bg-white pb-2 pt-4 shadow-sm rounded-sm">
                <h3 class="mb-3 text-green">
                    <i class="el-icon-circle-check"></i>
                    {{ $t('comm.success') }}
                </h3>
            </div>
            <div class="mt-3">
                <router-link :to="configs.loginPath"
                             class="btn btn-sm p-2 btn-link wpy-btn">
                    {{ $t('comm.login') }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import configs from "@/configs";
    import {mapState} from "vuex";
    import {resetPwd} from "@/service/userSer";

    export default {
        name: "resetPwd",
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
                ok: false,
                form: {new_pwd: '', confirm_new_pwd: '', code: ''}
            }
        },
        mounted() {
            this.form.code = this.$route.query.code
        },
        methods: {
            submitResetPwd() {
                this.loading = true
                this.errorMsg = ''
                resetPwd(this.form).then(() => {
                    this.$data.ok = true
                    this.$message.success(this.$i18n.t('comm.success').toString())
                }).catch((e) => {
                    this.$data.errorMsg = e.message
                }).finally(() => {
                    this.loading = false
                })
            },

        },

    }
</script>

<style scoped src="../../../public/static/css/login.css"/>
