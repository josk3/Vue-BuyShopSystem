<template>
    <div v-loading="loading">
        <div class="wrap-tab p-0">
            <el-card v-if="canChangeEmail"
                     class="box-card wpy-card mb-2" shadow="always" :body-style="{ padding: '0px' }">
                <div slot="header" class="clearfix">
                    <span>{{$t('comm.email')}}</span>
                    <span v-if="onlyShowUpdateEmailCard">( {{$t('user.mer_no')}}: <strong>{{user.mer_no}}</strong> )</span>
                </div>
                <div class="row pl-5 pt-2" v-if="wait_valid_email">
                    <UserValidEmailPhone :user_info="updateEmailData" kind="update_email"
                                         @success="validUpdateEmailOK"></UserValidEmailPhone>
                </div>
                <div v-else class="row">
                    <div v-if="onlyShowUpdateEmailCard" class="col-12">
                        <el-alert :title="$t('user.complete_input_email')" type="warning" class="pl-5"
                                  show-icon></el-alert>
                    </div>
                    <el-form ref="update_email"
                             :model="update_email"
                             :rules="rulesEmail" label-width="140px" class="pl-1 pr-3 pt-3 pb-0"
                             @submit.native.prevent="submitUpdateEmail">
                        <el-form-item :label="$t('comm.email')" prop="email">
                            <el-input v-model="update_email.email" type="email"></el-input>
                            <div class="text-muted p-0">
                                <i class="el-icon-info text-blue"></i>
                                {{$t('user.input_often_email_to_receive_notice')}}
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitUpdateEmail">{{$t('comm.save')}}</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
            <div v-if="!onlyShowUpdateEmailCard">
                <!--            -->
                <el-card class="box-card wpy-card mb-2" shadow="never" :body-style="{ padding: '0px' }">
                    <div slot="header" class="clearfix">
                        <span>{{$t('user.update_password')}}</span>
                    </div>
                    <div class="row">
                        <el-form ref="update_pwd"
                                 :model="update_pwd"
                                 :rules="rules" label-width="140px" class="pl-1 pr-3 pt-3 pb-0">
                            <el-form-item :label="$t('user.old_password')" prop="old_pwd">
                                <el-input v-model="update_pwd.old_pwd" type="password"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('user.new_password')" prop="new_pwd">
                                <el-input v-model="update_pwd.new_pwd" type="password"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitUpdatePwd">{{$t('comm.confirm_submit')}}
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-card>
                <!--            -->
                <el-card class="box-card wpy-card mb-2" shadow="never" :body-style="{ padding: '0px' }">
                    <div slot="header" class="clearfix">
                        <span>{{$t('user.profile_info')}}</span>
                    </div>
                    <div class="row">
                        <el-form ref="user_info"
                                 :model="user_info"
                                 :show-message="false"
                                 :rules="rules" label-width="140px" class="pl-1 pr-3 pt-3 pb-0">
                            <el-form-item :label="$t('user.username')" prop="username">
                                <el-input v-model="user_info.username" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('comm.email')" prop="email">
                                <el-input v-model="user_info.email" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('user.role_name')" prop="role_name">
                                <el-input v-model="user_info.role_name" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('comm.phone')" prop="phone">
                                <el-input v-model="user_info.phone" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('user.full_name')" prop="full_name">
                                <el-input v-model="user_info.full_name" :disabled="true"></el-input>
                            </el-form-item>
                            <!--                        <el-form-item>-->
                            <!--                            <el-button type="primary" @click="submitUpdateInfo">确认修改</el-button>-->
                            <!--                        </el-form-item>-->
                        </el-form>
                    </div>
                </el-card>
                <!--                -->
            </div>

        </div>
        <el-dialog custom-class="wpy-dialog sm-dialog"
                   :show-close="false" :close-on-click-modal="false"
                   :title="$t('user.update_password')"
                   :visible.sync="updatePwdWithSafe">
            <div>
                <p class="text-blue"><b>{{$t('login.you_password_is_simple')}}</b></p>
                <el-form ref="update_pwd_with_safe"
                         @submit.native.prevent="submitChangePwdWithSafe"
                         :model="updatePwdWithSafeForm">
                    <el-form-item :label="$t('user.new_password')">
                        <el-input v-model="updatePwdWithSafeForm.new_pwd" show-password></el-input>
                    </el-form-item>
                    <p v-if="updatePwdWithSafeErr" class="text-red">{{updatePwdWithSafeErr}}</p>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer" v-loading="loading">
                <el-button size="mini" type="primary" @click="submitChangePwdWithSafe" class="ml-3">
                    {{$t('comm.sure')}}
                </el-button>
            </div>
        </el-dialog>
        <el-dialog custom-class="wpy-dialog sm-dialog"
                   :show-close="false" :close-on-click-modal="false"
                   :title="$t('user.update_password')"
                   :visible.sync="updatePwdWithExpire">
            <div>
                <p class="text-blue"><b>{{$t('login.you_password_is_expire')}}</b></p>
                <el-form ref="update_pwd_with_safe"
                         @submit.native.prevent="submitChangePwdWithSafe"
                         :model="updatePwdWithExpireForm">
                    <el-form-item :label="$t('user.new_password')">
                        <el-input v-model="updatePwdWithExpireForm.new_pwd" show-password></el-input>
                    </el-form-item>
                    <p v-if="updatePwdWithExpireErr" class="text-red">{{updatePwdWithExpireErr}}</p>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer" v-loading="loading">
                <el-button size="mini" type="primary" @click="submitChangePwdWithExpire" class="ml-3">
                    {{$t('comm.sure')}}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import configs from '@/configs'
    import user from "@/store/modules/user";
    import {mapState} from "vuex";
    import {
        getUserInfo,
        updateEmail,
        updatePwd,
        updatePwdWithExpire,
        updatePwdWithSafe,
        updateUserInfo
    } from "@/service/userSer";
    import UserValidEmailPhone from "@/components/UserValidEmailPhone";
    import {isEmpty} from "@/utils/validate";

    export default {
        name: "profile",
        components: {UserValidEmailPhone},
        computed: { //watch跟踪数据变化, 重点user, configs
            ...mapState({
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
            return {
                loading: false,
                update_pwd: {old_pwd: '', new_pwd: ''},
                rules: {
                    old_pwd: [{required: true, message: this.validMsg('user.password'), trigger: 'blur'},],
                    new_pwd: [
                        {required: true, message: this.validMsg('user.password'), trigger: 'blur'},
                        {min: 7, max: 25, message: this.$i18n.t('valid.bad.min_length_7'), trigger: 'blur'},
                    ],
                },
                user_info: {},
                //-email
                onlyShowUpdateEmailCard: false,//只显示填写邮箱卡片,一般是在用户没有填写过邮箱按提示入口过来的.
                canChangeEmail: false,//用户还没填写邮箱地址，或还没认证
                update_email: {uid: '', email: '', action: ''},
                updateEmailData: '',
                wait_valid_email: false,
                rulesEmail: {
                    email: [{required: true, type: 'email', message: this.validMsg('user.email'), trigger: 'blur'},],
                },
                updatePwdWithSafe: false,
                updatePwdWithSafeForm: {'new_pwd': ''},
                updatePwdWithSafeErr: '',
                updatePwdWithExpire: false,
                updatePwdWithExpireForm: {'new_pwd': ''},
                updatePwdWithExpireErr: '',
            }
        },
        mounted() {
            this.loadSetupData()
            if (!isEmpty(this.$route.params)) {
                if (!isEmpty(this.$route.params.user_init_email) && this.$route.params.user_init_email === 1) {
                    this.onlyShowUpdateEmailCard = true
                }
            }
            if (!isEmpty(this.$route.query)) {
                if (this.$route.query.change_pwd !== undefined && this.$route.query.change_pwd === 'with_safe') {
                    this.updatePwdWithSafe = true
                } else if (this.$route.query.change_pwd !== undefined && this.$route.query.change_pwd === 'with_expire') {
                    this.updatePwdWithExpire = true
                }
            }
        },
        methods: {
            validMsg(name) {
                return this.$i18n.t('valid.required_field', [this.$i18n.t(name)]);
            },
            submitUpdatePwd() {
                this.$refs['update_pwd'].validate((valid) => {
                    if (!valid) {
                        return false;
                    } else {
                        this.$data.loading = true
                        updatePwd(this.update_pwd).then(() => {
                            this.$message.success(this.$i18n.t('comm.success').toString())
                            this.$router.push({name: 'logout'})
                        }).finally(() => {
                            this.$data.loading = false
                        })
                    }
                });
            },
            loadSetupData() {
                this.loading = true
                getUserInfo().then(res => {
                    const {data} = res
                    this.$data.user_info = data.user
                    if (isEmpty(data.user.email) || data.user.email_valid === false) this.$data.canChangeEmail = true
                }).finally(() => {
                    this.loading = false
                })
            },
            submitUpdateInfo() {
                updateUserInfo(this.user_info).then(res => {
                    const {data} = res
                    this.$data.user_info = data.user
                }).finally(() => {
                    this.loading = false
                })
            },
            submitUpdateEmail() {
                this.update_email.uid = this.user.uid
                let newEmail = this.update_email.email
                this.$refs['update_email'].validate((valid) => {
                    if (!valid) {
                        return false;
                    } else {
                        this.$data.loading = true
                        updateEmail(this.update_email).then(res => {
                            this.$data.wait_valid_email = true
                            const {data} = res
                            this.$data.updateEmailData = data
                            this.$data.updateEmailData.user.email = newEmail
                        }).finally(() => {
                            this.$data.loading = false
                        })
                    }
                });
            },
            validUpdateEmailOK() {
            },
            submitChangePwdWithSafe() {
                if (isEmpty(this.updatePwdWithSafeForm.new_pwd)) {
                    this.updatePwdWithSafeErr = this.$i18n.t('login.reset_new_pwd')
                } else {
                    this.updatePwdWithSafeErr = ''
                    updatePwdWithSafe(this.updatePwdWithSafeForm).then(() => {
                        this.$message.success(this.$i18n.t('comm.success').toString())
                        this.$router.push({path: this.configs.homePath})
                    }).catch((res) => {
                        this.$data.updatePwdWithSafeErr = res.message
                        this.$message.error(this.$data.errorMsg)
                    }).finally(() => {
                        this.$data.loading = false
                    })
                }
            },
            submitChangePwdWithExpire() {
                if (isEmpty(this.updatePwdWithExpireForm.new_pwd)) {
                    this.updatePwdWithExpireErr = this.$i18n.t('login.reset_new_pwd')
                } else {
                    this.updatePwdWithExpireErr = ''
                    updatePwdWithExpire(this.updatePwdWithExpireForm).then(() => {
                        this.$message.success(this.$i18n.t('comm.success').toString())
                        this.$router.push({path: this.configs.homePath})
                    }).catch((res) => {
                        this.$data.updatePwdWithExpireErr = res.message
                        this.$message.error(this.$data.errorMsg)
                    }).finally(() => {
                        this.$data.loading = false
                    })
                }
            },
        },
    }
</script>

<style scoped>

</style>
