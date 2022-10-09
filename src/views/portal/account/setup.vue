<template>
    <div v-loading="loading">
        <div class="row">
            <div class="col-12 mb-2">
                <el-card shadow="always" class="box-card p-3" :body-style="{ padding: '0px' }">
                    <div class="text-muted p-0">
                        <i class="el-icon-info text-blue"></i> {{ $t("account.notice_setup_info[0]") }}
                        {{ $t("account.notice_setup_info[1]") }}
                        <router-link :to="configs.ticketPath" class="btn-link">{{ $t("account.notice_setup_info[2]") }}</router-link>
                    </div>
                </el-card>
            </div>
        </div>
        <div class="wrap-tab p-0">
            <el-card class="box-card wpy-card mb-2" shadow="always" :body-style="{ padding: '0px' }">
                <div slot="header" class="clearfix">
                    <span>{{ $t("account.service_email_settings") }} </span>
                    <span class="btn-link pointer" @click="editEmail" v-if="!showAddEmail">{{ $t("comm.edit") }}</span>
                </div>
                <div class="row pl-5 pt-2" v-if="wait_valid_email">
                    <UserValidEmailPhone :user_info="updateEmailData" kind="update_email" @success="validUpdateEmailOK"></UserValidEmailPhone>
                </div>
                <div v-else class="row">
                    <el-form ref="update_email" :model="update_email" :rules="rulesEmail" label-width="140px" class="pl-1 pr-3 pt-3 pb-0" @submit.native.prevent="submitUpdateEmail('update_email')">
                        <el-form-item :label="$t('comm.email')" prop="email">
                            <el-input v-model="update_email.email" type="email" :disabled="!showAddEmail" style="width: 350px"></el-input>
                            <div class="text-muted p-0">
                                <i class="el-icon-info text-blue"></i>
                                {{ $t("account.service_email_settings_tip") }}
                            </div>
                        </el-form-item>
                        <el-form-item v-if="showAddEmail">
                            <el-button type="primary" @click="submitUpdateEmail('update_email')" v-text="resend ? $t('login.resolver_email_fail[1]') : $t('comm.save')"></el-button>
                            <el-button @click="resetForm('update_email')" v-text="$t('comm.reset')"></el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>
        <div class="wrap-tab p-0">
            <el-card class="box-card wpy-card" shadow="never" :body-style="{ padding: '0px' }">
                <div slot="header" class="clearfix">
                    <span>{{ $t("account.notice_setup") }}</span>
                </div>
                <div class="row">
                    <div :class="lang === 'zh' ? 'col-4' : 'col-6'">
                        <div class="info-control-list">
                            <div class="row">
                                <label class="col-sm-9">{{ $t("account.notice_paid_to_customer") }}</label>
                                <div class="col-sm-3">
                                    <el-switch v-model="notice.pay_ok_to_customer" active-value="1" disabled></el-switch>
                                </div>
                            </div>
                            <div class="row">
                                <label class="col-sm-9">{{ $t("account.notice_paid_to_merchant") }}</label>
                                <div class="col-sm-3">
                                    <el-switch v-model="notice.pay_ok_to_merchant" active-value="1" disabled></el-switch>
                                </div>
                            </div>
                            <div class="row">
                                <label class="col-sm-9">{{ $t("account.notice_dispute_to_merchant") }}</label>
                                <div class="col-sm-3">
                                    <el-switch v-model="notice.complain_notice_mer" active-value="1" disabled></el-switch>
                                </div>
                            </div>
                            <div class="row">
                                <label class="col-sm-9">{{ $t("account.notice_chargeback_to_merchant") }}</label>
                                <div class="col-sm-3">
                                    <el-switch v-model="notice.charge_back_notice_mer" active-value="1" disabled></el-switch>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
        <!--    d    -->
        <el-dialog custom-class="md-dialog" :close-on-click-modal="false" :title="$t('account.update_email')" :visible.sync="changeEmailDialogVisible">
            <!-- <div class="row pl-5 pt-2" v-if="wait_valid_email">
                <UserValidEmailPhone :user_info="updateEmailData" kind="update_email" @success="validUpdateEmailOK"></UserValidEmailPhone>
            </div> -->
            <!-- v-else -->
            <div>
                <el-form ref="update_email" :model="update_email" :rules="rulesEmail" class="form" @close="closeEmailDialog" @submit.native.prevent="submitUpdateEmail('update_email')">
                    <p>{{ $t("account.enter_email") }}</p>
                    <el-form-item prop="email">
                        <el-input v-model="update_email.email" type="email"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="changeEmailDialogVisible = false">{{ $t("comm.cancel") }}</el-button>
                <el-button type="primary" @click="submitUpdateEmail('update_email')">{{ $t("comm.sure") }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import configs from "@/configs";
    import user from "@/store/modules/user";
    import { mapState } from "vuex";
    import { getMerSetup } from "@/service/merchantSer";
    import { getUserInfo, updateServiceStaffEmail } from "@/service/userSer";
    import UserValidEmailPhone from "@/components/UserValidEmailPhone.vue";
    import { isEmpty } from "@/utils/validate";

    export default {
        name: "merchant_setup",
        components: { UserValidEmailPhone },
        computed: {
            //watch跟踪数据变化, 重点user, configs
            ...mapState({
                lang: state => state.app.lang, //多语言
                menus: state => state.user.menus,
            }),
            configs() {
                return configs;
            },
            user() {
                return user.state.user;
            },
        },
        data() {
            var checkEmail = (rule, value, callback) => {
                if (isEmpty(value)) {
                    return callback(this.validMsg("user.email"));
                }
                const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                if (!reg.test(value)) {
                    return callback(this.$i18n.t("user.email") + this.$i18n.t("user.incorrect_format"));
                } else {
                    callback();
                }
            };
            return {
                loading: false,
                notice: {},
                user_info: {},
                showAddEmail: false, //用户还没填写客服邮箱地址，或还没认证
                update_email: { uid: "", email: "", action: "" },
                updateEmailData: "",
                wait_valid_email: false,
                resend: false,
                rulesEmail: {
                    email: [{ required: true, validator: checkEmail, trigger: "blur" }],
                },
                changeEmailDialogVisible: false,
            };
        },
        mounted() {
            this.loadSetupData();
            this.loadSetupData2();
        },
        methods: {
            validMsg(name) {
                return this.$i18n.t("valid.required_field", [this.$i18n.t(name)]);
            },
            loadSetupData() {
                this.loading = true;
                getMerSetup("notice")
                    .then(res => {
                        const { data } = res;
                        this.$data.notice = data.notice;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            loadSetupData2() {
                this.loading = true;
                getUserInfo()
                    .then(res => {
                        const { data } = res;
                        this.$data.user_info = data.user;
                        if (isEmpty(data.user.service_staff_email)) {
                            this.$data.showAddEmail = true;
                        } else {
                            this.update_email.email = data.user.service_staff_email;
                            if (data.user.service_staff_email_valid === false) {
                                this.$data.showAddEmail = true;
                                this.$data.resend = true;
                            } else {
                                this.$data.showAddEmail = false;
                            }
                        }
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            submitUpdateEmail(formName) {
                this.update_email.uid = this.user.uid;
                let newEmail = this.update_email.email;
                this.$refs[formName].validate(valid => {
                    if (!valid) {
                        return false;
                    } else {
                        if (this.changeEmailDialogVisible) {
                            this.changeEmailDialogVisible = false;
                        }
                        this.$data.loading = true;
                        updateServiceStaffEmail(this.update_email)
                            .then(res => {
                                this.$data.wait_valid_email = true;
                                const { data } = res;
                                this.$data.updateEmailData = data;
                                this.$data.updateEmailData.user.email = newEmail;
                            })
                            .finally(() => {
                                this.$data.loading = false;
                            });
                    }
                });
            },
            validUpdateEmailOK() {},
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            editEmail() {
                this.changeEmailDialogVisible = true;
            },
            closeEmailDialog() {
                this.changeEmailDialogVisible = false;
            },
        },
    };
</script>

<style scoped>
    :deep(.md-dialog .el-dialog__body) {
        padding: 10px 20px;
    }
</style>
