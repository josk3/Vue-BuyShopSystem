<template>
    <div class="d-flex flex-column h-100">
        <div class="text-center" v-loading="loading">
            <div class="form-signin bg-white pb-3 pt-4 shadow-sm rounded-sm">
                <el-alert v-if="errorMsg" :title="errorMsg"
                          type="error"
                          style="background: none;margin-bottom: 10px;"
                          center show-icon :closable="false">
                </el-alert>
                <div v-if="ok" class="mb-3">
                    <h3 class="text-green">
                        <i class="el-icon-circle-check"></i>
                        {{ $t('comm.success') }}
                    </h3>
                    <hr>
                    {{$t('user.mer_no')}}: <strong class="text-red">{{ merNo }}</strong>
                    <p>{{$t('login.remember_you_merchant_no')}}</p>
                </div>
            </div>
            <div class="mt-3">
                <router-link v-if="currentToken"
                             :to="configs.homePath"
                             class="btn btn-sm p-2 btn-link wpy-btn">
                    {{ $t('nav.home') }}
                </router-link>
                <router-link v-else
                             :to="configs.loginPath"
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
    import {activeEmail} from "@/service/userSer";
    import {getToken} from "@/service/auth/token";

    export default {
        name: "activeEmail",
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
                merNo: '',
                form: {uid: '', code: ''},
                currentToken: '',
            }
        },
        mounted() {
            this.form.code = this.$route.query.code
            this.form.uid = this.$route.query.uid
            this.submitActiveEmail();
            this.currentToken = getToken();
        },
        methods: {
            submitActiveEmail() {
                this.loading = true
                this.errorMsg = ''
                activeEmail(this.form).then((res) => {
                    this.$data.ok = true
                    this.$data.merNo = res.data.mer_no
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
