<template>
    <div v-loading="loading">
        <div class="wrap-tab p-0">
            <el-card class="box-card wpy-card mb-2" shadow="never" :body-style="{ padding: '0px' }">
                <div slot="header" class="clearfix">
                    <span>修改密码</span>
                </div>
                <div class="row">
                    <el-form ref="update_pwd"
                             :model="update_pwd"
                             status-icon
                             :rules="rules" label-width="140px" class="pl-1 pr-3 pt-3 pb-0">
                        <el-form-item :label="$t('user.old_password')" prop="old_pwd">
                            <el-input v-model="update_pwd.old_pwd" type="password"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('user.new_password')" prop="new_pwd">
                            <el-input v-model="update_pwd.new_pwd" type="password"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitUpdatePwd">确认修改</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
            <el-card class="box-card wpy-card mb-2" shadow="never" :body-style="{ padding: '0px' }">
                <div slot="header" class="clearfix">
                    <span>个人信息</span>
                </div>
                <div class="row">
                    <el-form ref="user_info"
                             :model="user_info"
                             :show-message="false"
                             status-icon
                             :rules="rules" label-width="140px" class="pl-1 pr-3 pt-3 pb-0">
                        <el-form-item :label="$t('user.username')" prop="username">
                            <el-input v-model="user_info.username" :disabled="true" ></el-input>
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
        </div>
    </div>
</template>

<script>
    import configs from '@/configs'
    import user from "@/store/modules/user";
    import {mapState} from "vuex";
    import {getUserInfo, updatePwd, updateUserInfo} from "@/service/userSer";

    export default {
        name: "profile",
        components: {},
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
                    old_pwd: [{required: true, message: '请输入密码', trigger: 'blur'},],
                    new_pwd: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 25, message: '长度不能少于6位', trigger: 'blur'},
                    ],
                },
                user_info: {},
            }
        },
        mounted() {
            this.loadSetupData()
        },
        methods: {
            submitUpdatePwd() {
                this.$refs['update_pwd'].validate((valid) => {
                    if (!valid) {
                        return false;
                    } else {
                        this.$data.loading = true
                        updatePwd(this.update_pwd).then(() => {
                            this.$message.success(this.$i18n.t('comm.success').toString())
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
        },
    }
</script>

<style scoped>

</style>
