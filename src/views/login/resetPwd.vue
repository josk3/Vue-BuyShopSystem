<template>
    <div class="d-flex flex-column h-100" v-loading="loading">
        <div class="text-center">
            <div v-if="!ok" class="form-signin bg-white pb-5 pt-4 shadow-sm rounded-sm">
                <el-alert v-if="errorMsg" :title="errorMsg"
                          type="error"
                          style="background: none;margin-bottom: 10px;"
                          center show-icon :closable="false">
                </el-alert>
                <p class="mb-3">{{ $t('login.reset_new_pwd') }}</p>
                <el-form ref="reset" :model="form"
                         :rules="rules" label-width="135px">
                    <el-form-item :label="$t('login.new_password')" prop="new_pwd" style="white-space:nowrap;">
                        <el-input type="password" v-model="form.new_pwd"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('login.confirm_new_password')" prop="confirm_new_pwd" style="white-space:nowrap;">
                        <el-input type="password" v-model="form.confirm_new_pwd"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary"
                           class="wpy-btn pl-5 pr-5 mt-2"
                           @click="submitResetPwd"
                           :loading="loading">{{ $t('comm.confirm') }}
                </el-button>
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
    import {forgetValidEmailCode} from "@/service/userSer";
    import {isEmpty} from "@/utils/validate";

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
            var pwdAgainCheck = async(rule, value, callback) => {
                if(this.form.new_pwd !== this.form.confirm_new_pwd){
                    return callback(new Error(this.$i18n.t('login.password_different').toString()));
                }
                callback();
            };
            return {
                errorMsg: '',
                loading: false,
                ok: false,
                form: {new_pwd: '', confirm_new_pwd: '', code: '', uid: ''},
                rules: {
                    new_pwd: [
                        {required: true, message: this.validMsg('user.password'), trigger: 'blur'},
                        {min: 7, max: 25, message: this.$i18n.t('valid.bad.min_length_7'), trigger: 'blur'},
                    ],
                    confirm_new_pwd: [
                        {required: true, message: this.validMsg('user.password'), trigger: 'blur'},
                        {min: 7, max: 25, message: this.$i18n.t('valid.bad.min_length_7'), trigger: 'blur'},
                        { validator: pwdAgainCheck, trigger: 'blur' }
                    ],
                }
            }
        },
        mounted() {
            if (!isEmpty(this.$route.query)) {
                this.form.code = this.$route.query.code
                this.form.uid = this.$route.query.uid
            }
        },
        methods: {
            validMsg(name) {
                return this.$i18n.t('valid.required_field', [this.$i18n.t(name)]);
            },
            submitResetPwd() {
                this.$refs.reset.validate((valid) => {
                    if (!valid) {
                        return false;
                    } else {
                        this.loading = true
                        this.errorMsg = ''
                        forgetValidEmailCode(this.form).then(() => {
                            this.$data.ok = true
                            this.$message.success(this.$i18n.t('comm.success').toString())
                        }).catch((e) => {
                            this.$data.errorMsg = e.message
                        }).finally(() => {
                            this.loading = false
                        })
                    }
                })
            },

        },

    }
</script>

<style scoped src="../../../public/static/css/login.css"/>
