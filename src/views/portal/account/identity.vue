<template>
    <div v-loading="loading">
        <div class="row">
            <div class="col-12 mb-2">
                <el-card shadow="always" class="box-card p-3"
                         :body-style="{ padding: '0px' }">
                    <div class="text-muted p-0">
                        <i class="el-icon-info text-blue"></i>
                        {{$t('comm.status')}} : {{ user.identifier_status | validStatus}}
                    </div>
                </el-card>
            </div>
        </div>
        <div class="wrap-tab p-0">
            <el-card class="box-card wpy-card" shadow="never" :body-style="{ padding: '0px' }">
                <div slot="header" class="clearfix">
                    <span>认证信息</span>
                </div>
                <div class="row">
                    <el-alert v-if="detail && detail.identity_reason && user.identifier_status !== 1"
                              :title="detail.identity_reason"
                              center
                              show-icon
                              type="warning">
                    </el-alert>
                    <div class="col-3"></div>
                    <div class="col-6">
                        <el-form ref="detail"
                                 :model="detail"
                                 status-icon
                                 :rules="rules" label-width="140px" class="pl-1 pr-3 pt-3 pb-0">
                            <el-form-item label="手机" prop="phone">
                                <el-input v-model="detail.phone"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱" prop="email">
                                <el-input v-model="detail.email"></el-input>
                            </el-form-item>
                            <el-form-item label="联系地址" prop="address">
                                <el-input v-model="detail.address" :disabled="hold_edit"></el-input>
                            </el-form-item>
                            <el-form-item label="邮编" prop="zip_code">
                                <el-input v-model="detail.zip_code" :disabled="hold_edit"></el-input>
                            </el-form-item>
                            <el-form-item label="QQ" prop="qq">
                                <el-input v-model="detail.qq"></el-input>
                            </el-form-item>
                            <hr>
                            <el-form-item label="类别" prop="mid_type">
                                <el-select v-model="detail.mid_type" :disabled="hold_edit" placeholder="请选择类型"
                                           filterable clearable>
                                    <el-option
                                            v-for="item in typeList"
                                            :key="item.value"
                                            :label="item.text"
                                            :value="item.value">
                                        <span style="float: left">{{ item.text }}</span>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <div class="personal">
                                <el-form-item label="姓名" prop="name">
                                    <el-input v-model="detail.name" :disabled="hold_edit"></el-input>
                                </el-form-item>
                                <el-form-item label="身份证号" prop="identity_number">
                                    <el-input v-model="detail.identity_number" :disabled="hold_edit"></el-input>
                                </el-form-item>
                                <el-form-item label="身份证有效期起始" prop="identity_start_date">
                                    <el-date-picker
                                            v-model="detail.identity_start_date"
                                            :disabled="hold_edit"
                                            value-format="yyyy-MM-dd"
                                            type="date"
                                            placeholder="选择身份证有效期起始">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="身份证有效期过期" prop="identity_expire_date">
                                    <el-date-picker
                                            v-model="detail.identity_expire_date"
                                            :disabled="hold_edit"
                                            value-format="yyyy-MM-dd"
                                            type="date"
                                            placeholder="选择身份证有效期过期">
                                    </el-date-picker>
                                     <el-button size="mini" @click="identityExpireForever" type="text" plain>长期有效</el-button>
                                </el-form-item>
                                <el-form-item label="身份证正面" prop="identity_photo_a">
                                    <UploadImgOnce txt="身份证-正面照片" size="sm"
                                                   :disable="hold_edit"
                                                   :img_url="detail.identity_photo_a_url"
                                                   @img="updateImg($event, 'identity_photo_a')"></UploadImgOnce>
                                </el-form-item>
                                <el-form-item label="身份证反面" prop="identity_photo_b">
                                    <UploadImgOnce txt="身份证-反面照片" size="sm"
                                                   :disable="hold_edit"
                                                   :img_url="detail.identity_photo_b_url"
                                                   @img="updateImg($event, 'identity_photo_b')"></UploadImgOnce>
                                </el-form-item>
                                <el-form-item label="职业/行业" prop="profession">
                                    <el-input v-model="detail.profession" :disabled="hold_edit"></el-input>
                                </el-form-item>
                            </div>
                            <hr>
                            <div class="company" v-show="detail.mid_type !== 'personal'">
                                <el-form-item label="公司名称" prop="company_name">
                                    <el-input v-model="detail.company_name" :disabled="hold_edit"></el-input>
                                </el-form-item>
                                <el-form-item label="公司营业执照号" prop="name">
                                    <el-input v-model="detail.company_identity_id" :disabled="hold_edit"></el-input>
                                </el-form-item>
                                <el-form-item label="营业执照有效期起始" prop="company_start_date">
                                    <el-date-picker
                                            v-model="detail.company_start_date"
                                            :disabled="hold_edit"
                                            value-format="yyyy-MM-dd"
                                            type="date"
                                            placeholder="选择营业执照有效期起始">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="营业执照有效期过期" prop="company_expire_date">
                                    <el-date-picker
                                            v-model="detail.company_expire_date"
                                            :disabled="hold_edit"
                                            value-format="yyyy-MM-dd"
                                            type="date"
                                            placeholder="选择营业执照有效期过期">
                                    </el-date-picker>
                                    <el-button size="mini" @click="companyExpireForever" type="text" plain>长期有效</el-button>
                                </el-form-item>
                                <el-form-item label="营业执照" prop="company_identity_photo">
                                    <UploadImgOnce txt="营业执照照片" size="sm"
                                                   :disable="hold_edit"
                                                   :img_url="detail.company_identity_photo_url"
                                                   @img="updateImg($event, 'company_identity_photo')"></UploadImgOnce>
                                </el-form-item>
                                <el-form-item label="公司营业范围" prop="company_scope">
                                    <el-input v-model="detail.company_scope" :disabled="hold_edit"></el-input>
                                </el-form-item>
                                <el-form-item label="公司地址" prop="company_address">
                                    <el-input v-model="detail.company_address" :disabled="hold_edit"></el-input>
                                </el-form-item>
                                <el-form-item label="公司电话" prop="company_phone">
                                    <el-input v-model="detail.company_phone" :disabled="hold_edit"></el-input>
                                </el-form-item>
                            </div>
                            <el-form-item>
                                <el-button size="mini" type="primary" @click="submitDetail">确认提交</el-button>
                            </el-form-item>
                        </el-form>
                    </div>

                </div>
            </el-card>

        </div>
    </div>
</template>

<script>
    import configs from '@/configs'
    import user from "@/store/modules/user";
    import {mapState} from "vuex";
    import {getMerIdentity, getMerInfo, updateIdentity} from "@/service/merchantSer";
    import UploadImgOnce from "@/components/UploadImgOnce";

    export default {
        name: "merchant_identity",
        components: {UploadImgOnce},
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
                hold_edit: false,
                info: {},
                detail: {},
                rules: {
                    name: [{required: true, trigger: 'blur'},],
                    identity_start_date: [{required: true, trigger: 'blur'},],
                    identity_photo_a: [{required: true, trigger: 'blur'},],
                    identity_photo_b: [{required: true, trigger: 'blur'},],
                },
                typeList: [
                    {value: 'personal', text: '个人'},
                    {value: 'company', text: '企业'},
                ],
            }
        },
        mounted() {
            this.loadMerInfo()
            this.loadIdentityData()
            this.detail.mid_type = this.info.mid_type
        },
        methods: {
            loadMerInfo() {
                this.loading = true
                getMerInfo().then(res => {
                    const {data} = res
                    this.$data.info = data.info
                }).finally(() => {
                    this.loading = false
                })
            },
            loadIdentityData() {
                this.loading = true
                getMerIdentity().then(res => {
                    const {data} = res
                    this.$data.detail = data.detail
                }).finally(() => {
                    this.loading = false
                })

            },
            identityExpireForever(){
                this.detail.identity_expire_date = '9999-12-31'
            },
            companyExpireForever(){
                this.detail.company_expire_date = '9999-12-31'
            },
            submitDetail() {
                console.log(this.detail)
                this.$refs['detail'].validate((valid) => {
                    if (!valid) {
                        return false;
                    } else {
                        this.loading = true
                        let formData = new FormData();
                        let params = this.detail;
                        Object.keys(params).forEach((key) => { //把json转成FormData
                            formData.append(key, params[key]);
                        });
                        updateIdentity(formData).then(res => {
                            const {data} = res
                            this.$data.detail = data.detail
                        }).finally(() => {
                            this.loading = false
                        })
                    }
                })
            },
            changeImgFile(e) {
                this.detail.identity_photo_a = e.raw
            },
            removeImgFile() {
                //this.$refs.upload_img.uploadFiles //all file list
                this.detail.identity_photo_a = ''
            },
            updateImg(e, k) {
                this.detail[k] = e
            },

        },
    }
</script>

<style scoped>

</style>
