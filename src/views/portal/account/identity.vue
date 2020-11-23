<template>
    <div v-loading="loading">
        <div class="row">
            <div class="col-12 mb-2">
                <el-card shadow="always" class="box-card p-3"
                         :body-style="{ padding: '0px' }">
                    <div class="text-muted p-0">
                        <i class="el-icon-info text-blue"></i>
                        {{$t('comm.status')}} : <strong>{{ info.identity_status | identityStatus}}</strong>
                    </div>
                </el-card>
            </div>
        </div>
        <div class="wrap-tab p-0" v-if="dataLoaded">
            <el-card class="box-card wpy-card" shadow="never" :body-style="{ padding: '0px' }">
                <div slot="header" class="clearfix">
                    <span>{{$t('user.identity_info')}}</span>
                </div>
                <div class="row">
                    <el-alert v-if="detail && detail.identity_reason && info.identity_status === 3"
                              :title="detail.identity_reason"
                              center
                              show-icon
                              type="warning">
                    </el-alert>
                    <div class="col-2"></div>
                    <div class="col-8">
                        <el-form ref="detail"
                                 :model="detail"
                                 :disabled="hold_edit"
                                 :rules="rules" label-width="170px" class="pl-1 pr-3 pt-3 pb-0">
                            <el-form-item :label="$t('user.phone')" prop="phone">
                                <el-input v-model="detail.phone"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('user.email')" prop="email">
                                <el-input v-model="detail.email" type="email"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('user.address')" prop="address">
                                <el-input v-model="detail.address"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('user.zip_code')" prop="zip_code">
                                <el-input v-model="detail.zip_code"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('user.shop_site')" prop="shop_site">
                                <el-input v-model="detail.shop_site"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('user.qq')" prop="qq">
                                <el-input v-model="detail.qq"></el-input>
                            </el-form-item>
                            <hr>
                            <el-form-item prop="mid_type">
                                <template slot="label">
                                    类别
                                    <el-popover v-show="!allowPersonal"
                                                placement="top-start"
                                                width="240"
                                                trigger="hover"
                                                content="要申请个人类型请联系客服">
                                        <span slot="reference"><i class="el-icon-warning-outline"></i></span>
                                    </el-popover>
                                </template>
                                <el-select v-model="detail.mid_type"
                                           :disabled="!allowPersonal"
                                           placeholder="请选择类型"
                                           @change="typeChange"
                                           filterable>
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
                                <el-form-item :label="$t('user.identity_name')" prop="identity_name">
                                    <el-input v-model="detail.identity_name"></el-input>
                                    <small v-show="detail.mid_type === 'company'">法人信息</small>
                                </el-form-item>
                                <el-form-item :label="$t('user.identity_number')" prop="identity_number">
                                    <el-input v-model="detail.identity_number"></el-input>
                                </el-form-item>
                                <el-form-item :label="$t('user.identity_start_date')" prop="identity_start_date">
                                    <el-date-picker
                                            v-model="detail.identity_start_date"
                                            value-format="yyyy-MM-dd"
                                            type="date"
                                            placeholder="选择身份证有效期起始">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item :label="$t('user.identity_expire_date')" prop="identity_expire_date">
                                    <el-date-picker
                                            v-model="detail.identity_expire_date"
                                            value-format="yyyy-MM-dd"
                                            type="date"
                                            placeholder="选择身份证有效期过期">
                                    </el-date-picker>
                                    <el-button size="mini" @click="identityExpireForever" type="text" plain>长期有效
                                    </el-button>
                                </el-form-item>
                                <el-form-item :label="$t('user.identity_photo_a')" prop="identity_photo_a">
                                    <UploadImgOnce txt="身份证-正面照片" size="sm"
                                                   :disable="hold_edit"
                                                   :img_url="fullImgUrl(detail.identity_photo_a_url)"
                                                   @img="updateImg($event, 'identity_photo_a')"></UploadImgOnce>
                                </el-form-item>
                                <el-form-item :label="$t('user.identity_photo_b')" prop="identity_photo_b">
                                    <UploadImgOnce txt="身份证-反面照片" size="sm"
                                                   :disable="hold_edit"
                                                   :img_url="fullImgUrl(detail.identity_photo_b_url)"
                                                   @img="updateImg($event, 'identity_photo_b')"></UploadImgOnce>
                                </el-form-item>
                                <el-form-item :label="$t('user.sex')" prop="sex">
                                    <el-select v-model="detail.sex">
                                        <el-option value="">选择</el-option>
                                        <el-option value="0" label="男"></el-option>
                                        <el-option value="1" label="女"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item :label="$t('user.profession')" prop="profession">
                                    <el-select v-model="detail.profession"
                                               placeholder="请选择"
                                               filterable>
                                        <el-option
                                                v-for="item in professionList"
                                                :key="item.value"
                                                :label="item.text"
                                                :value="item.value">
                                            <span style="float: left">{{ item.text }}</span>
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <hr>
                            <div class="company" v-show="detail.mid_type !== 'personal'">
                                <el-form-item :label="$t('user.company_name')" prop="company_name">
                                    <el-input v-model="detail.company_name"></el-input>
                                </el-form-item>
                                <el-form-item :label="$t('user.company_identity_id')" prop="company_identity_id">
                                    <el-input v-model="detail.company_identity_id"></el-input>
                                </el-form-item>
                                <el-form-item :label="$t('user.company_start_date')" prop="company_start_date">
                                    <el-date-picker
                                            v-model="detail.company_start_date"
                                            value-format="yyyy-MM-dd"
                                            type="date"
                                            placeholder="选择营业执照有效期起始">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item :label="$t('user.company_expire_date')" prop="company_expire_date">
                                    <el-date-picker
                                            v-model="detail.company_expire_date"

                                            value-format="yyyy-MM-dd"
                                            type="date"
                                            placeholder="选择营业执照有效期过期">
                                    </el-date-picker>
                                    <el-button size="mini" @click="companyExpireForever" type="text" plain>长期有效
                                    </el-button>
                                </el-form-item>
                                <el-form-item :label="$t('user.company_identity_photo')" prop="company_identity_photo">
                                    <UploadImgOnce txt="营业执照照片" size="sm"
                                                   :disable="hold_edit"
                                                   :img_url="fullImgUrl(detail.company_identity_photo_url)"
                                                   @img="updateImg($event, 'company_identity_photo')"></UploadImgOnce>
                                </el-form-item>
                                <el-form-item :label="$t('user.company_scope')" prop="company_scope">
                                    <el-input type="textarea"
                                              :rows="2"
                                              v-model="detail.company_scope"></el-input>
                                </el-form-item>
                                <el-form-item :label="$t('user.company_address')" prop="company_address">
                                    <el-input v-model="detail.company_address"></el-input>
                                </el-form-item>
                                <el-form-item :label="$t('user.company_phone')" prop="company_phone">
                                    <el-input v-model="detail.company_phone"></el-input>
                                </el-form-item>
                            </div>
                            <el-form-item>
                                <el-button size="mini" type="primary" @click="submitDetail">
                                    {{$t('comm.confirm_submit')}}
                                </el-button>
                            </el-form-item>
                            <el-form-item v-if="hold_edit">
                                <strong>{{ info.identity_status | identityStatus}}</strong>
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
    import {isEmpty} from "@/utils/validate";

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
                detail: {mid_type: ''},
                rules: {},
                rulesA: {
                    phone: [{required: true, message: this.validMsg('user.phone'), trigger: 'blur'},],
                    email: [{required: true, type: 'email', message: this.validMsg('user.email'), trigger: 'blur'},],
                    identity_name: [{required: true, message: this.validMsg('user.identity_name'), trigger: 'blur'},],
                    identity_photo_a: [{
                        required: true,
                        message: this.validMsg('user.identity_photo_a'),
                        trigger: 'change'
                    },],
                    identity_photo_b: [{
                        required: true,
                        message: this.validMsg('user.identity_photo_b'),
                        trigger: 'change'
                    },],
                    //identity_bank_photo: [{required: true, message: this.validMsg('user.identity_bank_photo'),trigger: 'change'},],
                    identity_number: [{
                        required: true,
                        message: this.validMsg('user.identity_number'),
                        trigger: 'blur'
                    },],
                    identity_start_date: [{
                        required: true,
                        message: this.validMsg('user.identity_start_date'),
                        trigger: 'blur'
                    },],
                    identity_expire_date: [{
                        required: true,
                        message: this.validMsg('user.identity_expire_date'),
                        trigger: 'blur'
                    },],
                    address: [{required: true, message: this.validMsg('user.address'), trigger: 'blur'},],
                    profession: [{required: true, message: this.validMsg('user.profession'), trigger: 'blur'},],
                    sex: [{required: true, message: this.validMsg('user.sex'), trigger: 'change'},],
                    zip_code: [{required: true, message: this.validMsg('user.zip_code'), trigger: 'blur'},],
                    shop_site: [{required: true, message: this.validMsg('user.shop_site'), trigger: 'blur'},],
                    mid_type: [{required: true, message: this.validMsg('comm.type'), trigger: 'blur'},],
                    //product_info: [{required: true, message: this.validMsg('user.product_info'), trigger: 'blur'},],
                },
                rulesB: {
                    company_name: [{required: true, message: this.validMsg('user.company_name'), trigger: 'blur'},],
                    company_identity_photo: [{
                        required: true,
                        message: this.validMsg('user.company_identity_photo'),
                        trigger: 'change'
                    },],
                    company_identity_id: [{
                        required: true,
                        message: this.validMsg('user.company_identity_id'),
                        trigger: 'blur'
                    },],
                    company_start_date: [{
                        required: true,
                        message: this.validMsg('user.company_start_date'),
                        trigger: 'blur'
                    },],
                    company_expire_date: [{
                        required: true,
                        message: this.validMsg('user.company_expire_date'),
                        trigger: 'blur'
                    },],
                    company_scope: [{required: true, message: this.validMsg('user.company_scope'), trigger: 'blur'},],
                    company_phone: [{required: true, message: this.validMsg('user.company_phone'), trigger: 'blur'},],
                    company_address: [{
                        required: true,
                        message: this.validMsg('user.company_address'),
                        trigger: 'blur'
                    },],
                },
                typeList: [
                    {value: 'personal', text: this.$i18n.t('user.personal')},
                    {value: 'company', text: this.$i18n.t('user.company')},
                ],
                jobType: [],
                businessType: [],
                professionList: [],
                allowPersonal: false,
                dataLoaded: false,
            }
        },
        watch: {},
        mounted() {
            this.rules = this.rulesA
            this.loadMerData()
        },
        methods: {
            fullImgUrl(path) {
                if (isEmpty(path)) return null;
                return configs.imgBaseUrl + path;
            },
            typeChange() {
                this.detail.profession = ''
                if (this.detail.mid_type === 'company') {
                    this.rules = Object.assign(this.rulesB, this.rulesA);
                    this.professionList = this.businessType
                } else {
                    this.professionList = this.jobType
                    this.rules = this.rulesA;
                }
            },
            validMsg(name) {
                return this.$i18n.t('valid.required_field', [this.$i18n.t(name)]);
            },
            reloadAccountType() {
                let detail = this.detail
                if (!isEmpty(detail) && !isEmpty(detail.mid_type)) {
                    if (detail.mid_type === 'company') {
                        this.rules = Object.assign(this.rulesB, this.rulesA);
                        this.professionList = this.businessType
                    } else {
                        this.rules = this.rulesA;
                        this.professionList = this.jobType
                    }
                } else {
                    this.professionList = this.jobType
                    this.rules = this.rulesA;
                }
            },
            loadMerData() {
                this.loading = true
                getMerInfo().then(res => {
                    const {data} = res
                    this.$data.info = data.info
                    this.$data.hold_edit = data.info.identity_validated || data.info.identity_status === 2
                    this.loadIdentityData()
                }).finally(() => {
                    this.loading = false
                })
            },
            loadIdentityData() {
                this.loading = true
                getMerIdentity().then(res => {
                    const {data} = res
                    let detailData = data.detail
                    detailData.mid_type = 'company'//初始值
                    if (detailData.qq === 'null') detailData.qq = ''
                    this.$data.detail = detailData //赋值
                    this.$data.jobType = data.job_type
                    this.$data.businessType = data.business_type
                    //
                    if (this.$data.info.allow_personal === 1) {
                        this.$data.allowPersonal = true
                        if (!isEmpty(this.$data.info.mid_type)) {//type数据在info
                            if (this.$data.info.mid_type === 'company') {
                                this.$data.detail.mid_type = 'company'
                            } else {
                                this.$data.detail.mid_type = 'personal'
                            }
                        }
                    } else {
                        this.$data.detail.mid_type = 'company' //默认只能认证为公司,要个人得人工申请
                        this.$data.allowPersonal = false
                    }
                    this.reloadAccountType()
                    this.dataLoaded = true
                }).finally(() => {
                    this.loading = false
                })

            },
            identityExpireForever() {
                this.detail.identity_expire_date = '9999-12-31'
            },
            companyExpireForever() {
                this.detail.company_expire_date = '9999-12-31'
            },
            submitDetail() {
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
                        updateIdentity(formData).then(() => {
                            this.$store.dispatch('user/loadUserInfo').then(() => {
                                this.loadMerData()
                            })
                        }).finally(() => {
                            this.loading = false
                        })
                    }
                })
            },
            updateImg(e, k) {
                this.detail[k] = e
            },

        },
    }
</script>

<style scoped>

</style>
