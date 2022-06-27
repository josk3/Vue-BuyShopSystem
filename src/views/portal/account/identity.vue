<template>
    <div v-loading="loading">
        <div class="row">
            <div class="col-12 mb-2">
                <el-card shadow="always" class="box-card" :body-style="{ padding: '0px' }">
                    <div class="text-muted p-0 p-3">
                        <i class="el-icon-info text-blue"></i>
                        {{ $t("comm.status") }} :
                        <strong>{{ info.identity_status | identityStatus }}</strong>
                    </div>
                    <div v-if="info.identity_status !== 1" class="d-flex align-items-start justify-content-start p-3" style="background-color: rgb(253, 241, 217)">
                        <div class="mb-n1 mr-1">
                            <small class="text-danger">{{ $t("dispute.warm_prompt") }}：</small>
                        </div>
                        <div class="media-body align-self-center text-truncate">
                            <div class="text-truncate">
                                <small>{{ $t("user.hint_Supplementary_account_information") }}</small>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
        <div class="wrap-tab p-0" v-if="dataLoaded">
            <el-card class="box-card wpy-card" shadow="never" :body-style="{ padding: '0px' }">
                <div slot="header" class="clearfix">
                    <span>{{ $t("user.identity_info") }}</span>
                </div>
                <div class="row">
                    <el-alert v-if="detail && detail.identity_reason && info.identity_status === 3" :title="detail.identity_reason" center show-icon type="warning"> </el-alert>
                    <div class="col-2"></div>
                    <div class="col-8">
                        <div style="display:flex;justify-content:center;">
                            <el-radio-group :disabled="hold_edit" v-model="detail.identity_country_type" @change="typeChange" style="margin-top:20px;">
                                <el-radio-button label="inland" :disabled="inland_disabled">
                                    {{ $t("user.inland") }}
                                </el-radio-button>
                                <el-radio-button label="outland" :disabled="outland_disabled">{{ $t("user.outland") }}</el-radio-button>
                            </el-radio-group>
                        </div>

                        <el-form ref="detail" :model="detail" :disabled="hold_edit" :rules="rules" :validate-on-rule-change="true" label-width="170px" class="pl-1 pr-3 pt-3 pb-0">
                            <el-form-item prop="identity_account_type">
                                <template slot="label">
                                    {{ $t("comm.category") }}
                                </template>
                                <el-select v-model="detail.identity_account_type" :placeholder="$t('user.select_type')" @change="typeChange" filterable>
                                    <el-option v-for="item in typeList" :key="item.value" :label="$t(item.text)" :value="item.value">
                                        <span style="float: left">{{ $t(item.text) }}</span>
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <!-- 境内企业 -->
                            <div class="company-inland" v-show="detail.identity_account_type !== 'personal' && detail.identity_country_type === 'inland'">
                                <el-form-item :label="$t('user.company_name')" prop="company_name">
                                    <el-input v-model="detail.company_name"></el-input>
                                </el-form-item>
                                <el-form-item :label="$t('user.company_identity_id')" prop="company_identity_id">
                                    <el-input v-model="detail.company_identity_id"></el-input>
                                </el-form-item>
                                <el-form-item :label="$t('user.company_start_date')" prop="company_start_date">
                                    <el-date-picker v-model="detail.company_start_date" value-format="yyyy-MM-dd" type="date" :placeholder="$t('comm.select') + $t('user.company_start_date')"> </el-date-picker>
                                </el-form-item>
                                <el-form-item :label="$t('user.company_expire_date')" prop="company_expire_date">
                                    <el-date-picker v-model="detail.company_expire_date" value-format="yyyy-MM-dd" type="date" :placeholder="$t('comm.select') + $t('user.company_expire_date')"> </el-date-picker>
                                    <el-button size="mini" @click="companyExpireForever" type="text" plain>{{ $t("user.long_effective") }} </el-button>
                                </el-form-item>
                                <el-form-item :label="$t('user.company_identity_photo')" prop="company_identity_photo" ref="company_identity_photo">
                                    <UploadImgOnce
                                        :txt="$t('user.upload_company_identity_photo')"
                                        size="sm"
                                        :disable="hold_edit"
                                        :img_url="fullImgUrl(detail.company_identity_photo_url)"
                                        :img_url_demo="company_identity_photo_demo_url"
                                        :img_url_tip="$t('user.upload_company_identity_photo_tip')"
                                        @img="updateImg($event, 'company_identity_photo')"
                                    ></UploadImgOnce>
                                </el-form-item>
                                <hr />

                                <el-form-item :label="$t('user.company_scope')" prop="company_scope">
                                    <el-input type="textarea" :rows="2" v-model="detail.company_scope"></el-input>
                                </el-form-item>
                                <el-form-item v-show="detail.identity_account_type === 'company' && detail.identity_country_type === 'inland'" :label="$t('user.company_register_address')" prop="company_register_address">
                                    <el-input v-model="detail.company_register_address"></el-input>
                                </el-form-item>

                                <!-- <el-form-item
                                    :label="$t('user.company_address')"
                                    prop="company_address"
                                >
                                    <el-input
                                        v-model="detail.company_address"
                                    ></el-input>
                                </el-form-item> -->

                                <el-form-item :label="$t('user.company_phone')" prop="company_phone">
                                    <el-input v-model="detail.company_phone"></el-input>
                                </el-form-item>
                            </div>
                            <!-- 境外企业 -->
                            <div class="company-outland" v-show="detail.identity_account_type !== 'personal' && detail.identity_country_type === 'outland'">
                                <el-form-item :label="$t('user.company_name')" prop="company_name">
                                    <el-input v-model="detail.company_name"></el-input>
                                </el-form-item>
                                <el-form-item :label="$t('user.company_register_country')" prop="company_register_country">
                                    <el-input v-model="detail.company_register_country"></el-input>
                                </el-form-item>
                                <el-form-item :label="$t('user.is_own_subsidiary')" prop="is_own_subsidiary" style="margin-bottom:0px;">
                                    <el-radio-group v-model="detail.is_own_subsidiary" @change="showSubsidiary">
                                        <el-radio :label="true" style="line-height:36px;">{{ $t("status.yes") }}</el-radio>
                                        <el-radio :label="false" style="line-height:36px;">{{ $t("status.no") }}</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item v-show="detail.is_own_subsidiary === true" prop="subsidiary_name" :rules="detail.is_own_subsidiary ? { required: true, message: this.validMsg('user.subsidiary_name'), trigger: 'blur' } : {}">
                                    <el-input :placeholder="validMsg('user.subsidiary_name')" v-model="detail.subsidiary_name"></el-input>
                                </el-form-item>
                                <el-form-item v-show="detail.is_own_subsidiary === true" prop="subsidiary_country" :rules="detail.is_own_subsidiary ? { required: true, message: this.validMsg('user.subsidiary_country'), trigger: 'blur' } : {}">
                                    <el-input :placeholder="validMsg('user.subsidiary_country')" v-model="detail.subsidiary_country"></el-input>
                                </el-form-item>
                                <el-form-item :label="$t('user.out_company_start_date')" prop="out_company_start_date">
                                    <el-date-picker v-model="detail.out_company_start_date" value-format="yyyy-MM-dd" type="date" :placeholder="$t('comm.select') + $t('user.out_company_start_date')"> </el-date-picker>
                                </el-form-item>
                                <el-form-item :label="$t('user.out_company_expire_date')" prop="out_company_expire_date">
                                    <el-date-picker v-model="detail.out_company_expire_date" value-format="yyyy-MM-dd" type="date" :placeholder="$t('comm.select') + $t('user.out_company_expire_date')"> </el-date-picker>
                                    <el-button size="mini" @click="outCompanyExpireForever" type="text" plain>{{ $t("user.long_effective") }} </el-button>
                                </el-form-item>
                                <el-form-item :label="$t('user.company_business_identity_photo')" prop="company_business_identity_photo" ref="company_business_identity_photo">
                                    <UploadImgOnce
                                        :txt="$t('user.upload_company_business_identity_photo')"
                                        size="sm"
                                        :disable="hold_edit"
                                        :img_url="fullImgUrl(detail.company_business_identity_photo_url)"
                                        :img_url_demo="company_business_identity_photo_demo_url"
                                        :img_url_tip="$t('user.company_business_identity_photo_tip')"
                                        @img="updateImg($event, 'company_business_identity_photo')"
                                    ></UploadImgOnce>
                                </el-form-item>
                                <el-form-item :label="$t('user.company_register_identity_photo')" prop="company_register_identity_photo" ref="company_register_identity_photo">
                                    <UploadImgOnce
                                        :txt="$t('user.upload_company_register_identity_photo')"
                                        size="sm"
                                        :disable="hold_edit"
                                        :img_url="fullImgUrl(detail.company_register_identity_photo_url)"
                                        :img_url_demo="company_register_identity_photo_demo_url"
                                        :img_url_tip="$t('user.company_register_identity_photo_tip')"
                                        @img="updateImg($event, 'company_register_identity_photo')"
                                    ></UploadImgOnce>
                                </el-form-item>
                                <el-form-item :label="$t('user.company_annual_report_photo')" prop="company_annual_report_photo" ref="company_annual_report_photo">
                                    <UploadImgOnce
                                        :txt="$t('user.upload_company_annual_report_photo')"
                                        size="sm"
                                        :disable="hold_edit"
                                        :img_url="fullImgUrl(detail.company_annual_report_photo_url)"
                                        :img_url_demo="company_annual_report_photo_demo_url"
                                        :img_url_tip="$t('user.company_annual_report_photo_tip')"
                                        @img="updateImg($event, 'company_annual_report_photo')"
                                    ></UploadImgOnce>
                                </el-form-item>
                                <hr />

                                <el-form-item prop="company_position">
                                    <template slot="label">
                                        {{ $t("user.company_position") }}
                                    </template>
                                    <el-select v-model="detail.company_position" :placeholder="$t('user.select_type')" filterable>
                                        <!-- @change="companyPositionChange"  -->
                                        <el-option v-for="item in companyPositionList" :key="item.value" :label="$t(item.text)" :value="item.value">
                                            <span style="float: left">{{ $t(item.text) }}</span>
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <!-- 个人信息 -->
                            <div class="personal">
                                <el-form-item v-show="detail.identity_country_type === 'inland' || detail.identity_account_type === 'personal'" :label="detail.identity_account_type === 'company' ? $t('user.legal_person') : $t('user.identity_name')" prop="identity_name">
                                    <el-input v-model="detail.identity_name"></el-input>
                                </el-form-item>
                                <el-form-item v-show="detail.identity_country_type === 'outland' && detail.identity_account_type === 'personal'" :label="$t('user.belong_what_country')" prop="select_country">
                                    <!-- <el-input v-model="detail.belong_what_country"></el-input> -->
                                    <el-select v-model="detail.select_country" :placeholder="$t('comm.country_name')" value-key="iso2" @change="selectCountry" filterable clearable>
                                        <el-option v-for="item in area_all_list" :key="item.iso2" :label="item.name + ' (' + item.iso2 + ')'" :value="item">
                                            <span style="float: left">{{ item.name }}</span>
                                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.iso2 }}</span>
                                        </el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item prop="personal_identity" v-show="detail.identity_country_type === 'outland'">
                                    <template slot="label">
                                        {{ $t("user.personal_identity") }}
                                    </template>
                                    <el-select v-model="detail.personal_identity" :placeholder="$t('user.select_type')" @change="personalIdentityChange" filterable>
                                        <el-option v-for="item in personalIdentityList" :key="item.value" :label="$t(item.text)" :value="item.value">
                                            <span style="float: left">{{ $t(item.text) }}</span>
                                        </el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item :label="detail.identity_country_type === 'outland' ? $t('user.identity_number2') : $t('user.identity_number')" prop="identity_number">
                                    <el-input v-model="detail.identity_number"></el-input>
                                </el-form-item>
                                <el-form-item :label="detail.identity_country_type === 'outland' ? $t('user.identity_start_date2') : $t('user.identity_start_date')" prop="identity_start_date">
                                    <el-date-picker v-model="detail.identity_start_date" value-format="yyyy-MM-dd" type="date" :placeholder="detail.identity_country_type === 'outland' ? $t('comm.select') + $t('user.identity_start_date2') : $t('comm.select') + $t('user.identity_start_date')">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item :label="detail.identity_country_type === 'outland' ? $t('user.identity_expire_date2') : $t('user.identity_expire_date')" prop="identity_expire_date">
                                    <el-date-picker v-model="detail.identity_expire_date" value-format="yyyy-MM-dd" type="date" :placeholder="detail.identity_country_type === 'outland' ? $t('comm.select') + $t('user.identity_expire_date2') : $t('comm.select') + $t('user.identity_expire_date')">
                                    </el-date-picker>
                                    <el-button size="mini" @click="identityExpireForever" type="text" plain>{{ $t("user.long_effective") }} </el-button>
                                </el-form-item>
                                <el-form-item :label="detail.identity_country_type === 'outland' ? $t('user.identity_photo_a2') : $t('user.identity_photo_a')" prop="identity_photo_a" ref="identity_photo_a">
                                    <UploadImgOnce
                                        :txt="detail.identity_country_type === 'outland' ? $t('user.upload_identity_photo_a2') : $t('user.upload_identity_photo_a')"
                                        size="sm"
                                        :disable="hold_edit"
                                        :img_url="fullImgUrl(detail.identity_photo_a_url)"
                                        @img="updateImg($event, 'identity_photo_a')"
                                        :img_url_demo="getPhotoDemoA()"
                                        :img_url_tip="setIdentityPhotoTipA()"
                                    ></UploadImgOnce>
                                </el-form-item>
                                <el-form-item
                                    v-show="detail.identity_country_type === 'inland' || (detail.identity_country_type === 'outland' && detail.personal_identity === 'identity_id')"
                                    :label="detail.identity_country_type === 'outland' ? $t('user.identity_photo_b2') : $t('user.identity_photo_b')"
                                    prop="identity_photo_b"
                                    ref="identity_photo_b"
                                >
                                    <UploadImgOnce
                                        :txt="detail.identity_country_type === 'outland' ? $t('user.upload_identity_photo_b2') : $t('user.upload_identity_photo_b')"
                                        size="sm"
                                        :disable="hold_edit"
                                        :img_url="fullImgUrl(detail.identity_photo_b_url)"
                                        @img="updateImg($event, 'identity_photo_b')"
                                        :img_url_demo="detail.identity_country_type === 'outland' ? null : identity_photo_b_demo_url"
                                        :img_url_tip="setIdentityPhotoTipB()"
                                    ></UploadImgOnce>
                                </el-form-item>
                                <el-form-item
                                    v-show="(detail.identity_account_type === 'personal' && detail.identity_country_type === 'inland') || (detail.identity_country_type === 'outland' && detail.personal_identity === 'identity_id')"
                                    :label="detail.identity_country_type === 'outland' ? $t('user.identity_photo_c2') : $t('user.identity_photo_c')"
                                    prop="identity_photo_c"
                                    ref="identity_photo_c"
                                >
                                    <UploadImgOnce
                                        :txt="detail.identity_country_type === 'outland' ? $t('user.upload_identity_photo_c2') : $t('user.upload_identity_photo_c')"
                                        size="sm"
                                        :disable="hold_edit"
                                        :img_url="fullImgUrl(detail.identity_photo_c_url)"
                                        @img="updateImg($event, 'identity_photo_c')"
                                        :img_url_demo="detail.identity_country_type === 'outland' ? null : identity_photo_c_demo_url"
                                        :img_url_tip="detail.identity_country_type === 'outland' ? $t('user.identity_photo_c_outland_tip') : $t('user.identity_photo_c_tip')"
                                    ></UploadImgOnce>
                                </el-form-item>
                                <!-- 董事授权书先不要了 -->
                                <!-- <el-form-item v-show="detail.identity_country_type === 'outland' && detail.identity_account_type === 'company' && detail.company_position === 'none'" :label="$t('user.chairman_authorization')" prop="chairman_authorization" ref="chairman_authorization">
                                    <UploadImgOnce
                                        :txt="$t('user.upload_chairman_authorization')"
                                        size="sm"
                                        :disable="hold_edit"
                                        :img_url="fullImgUrl(detail.chairman_authorization_url)"
                                        @img="updateImg($event, 'chairman_authorization')"
                                        :img_url_demo="detail.identity_country_type === 'outland' ? chairman_authorization_demo_url : chairman_authorization_demo_url"
                                        :img_url_tip="$t('user.chairman_authorization_tip')"
                                        :accept_pdf="true"
                                    ></UploadImgOnce>
                                </el-form-item> -->
                                <hr />
                            </div>
                            <!-- 境外企业 地址电话-->
                            <div v-show="detail.identity_country_type === 'outland' && detail.identity_account_type === 'company'">
                                <el-form-item :label="$t('user.company_register_address')" prop="company_register_address">
                                    <el-input v-model="detail.company_register_address"></el-input>
                                </el-form-item>

                                <el-form-item :label="$t('user.company_address')" prop="company_address">
                                    <el-input v-model="detail.company_address"></el-input>
                                </el-form-item>

                                <el-form-item :label="$t('user.company_phone')" prop="company_phone">
                                    <el-input v-model="detail.company_phone"></el-input>
                                </el-form-item>
                            </div>
                            <!-- 通用 -->
                            <el-form-item :label="$t('user.phone')" prop="phone">
                                <el-input v-model="detail.phone"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('user.email')" prop="email">
                                <el-input v-model="detail.email" type="email"></el-input>
                            </el-form-item>
                            <el-form-item v-show="detail.identity_account_type === 'personal'" :label="$t('user.address')" prop="address">
                                <el-input v-model="detail.address"></el-input>
                            </el-form-item>
                            <el-form-item v-show="detail.identity_country_type === 'inland' && detail.identity_account_type === 'company'" :label="$t('user.company_address')" prop="company_address">
                                <el-input v-model="detail.company_address"></el-input>
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

                            <el-form-item>
                                <el-button size="mini" type="primary" @click="submitDetail">
                                    {{ $t("comm.confirm_submit") }}
                                </el-button>
                            </el-form-item>
                            <el-form-item v-if="hold_edit">
                                <strong>{{ info.identity_status | identityStatus }}</strong>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>
<script>
    import configs from "@/configs";
    import user from "@/store/modules/user";
    import { mapState } from "vuex";
    import { getMerIdentity, getMerInfo, updateIdentity } from "@/service/merchantSer";
    import UploadImgOnce from "@/components/UploadImgOnce";
    import { isEmpty } from "@/utils/validate";
    import { i18n } from "element-ui/lib/locale";
    import { getAreaJsonData } from "@/service/riskAreaSer";
    export default {
        name: "merchant_identity",
        components: { UploadImgOnce },
        computed: {
            //watch跟踪数据变化, 重点user, configs
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
            var checkEmail = (rule, value, callback) => {
                //邮箱规范检查
                const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                this.validReg(reg, value, rule.field, callback);
            };
            var checkShopSite = (rule, value, callback) => {
                //域名
                const reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
                this.validReg(reg, value, rule.field, callback);
            };
            var checkInlandIdNum = (rule, value, callback) => {
                //18位身份证
                const reg = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
                this.validReg(reg, value, rule.field, callback);
            };
            var checkInlandPhone = (rule, value, callback) => {
                //11位手机号
                const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
                this.validReg(reg, value, rule.field, callback);
            };
            var checkOutlandIdNum = (rule, value, callback) => {
                //港澳,台湾通行证  护照
                const reghk = /^[a-zA-Z0-9]{5,21}$/;
                const reghz = /^[a-zA-Z0-9]{3,21}$/;
                if (this.detail.personal_identity === "hk_pass") {
                    this.validReg(reghk, value, rule.field, callback);
                } else {
                    this.validReg(reghz, value, rule.field, callback);
                }
            };
            return {
                loading: false,
                hold_edit: false,
                inland_disabled: false,
                outland_disabled: false,
                info: {},
                detail: {
                    identity_country_type: "inland",
                    identity_account_type: "company",
                    is_own_subsidiary: false,
                    select_country: null,
                },
                area_all_list: [], //所有国家数据
                company_identity_photo_demo_url: configs.template.settleBasePath + "营业执照.jpg",
                company_business_identity_photo_demo_url: configs.template.settleBasePath + "商业登记证.jpg",
                company_register_identity_photo_demo_url: configs.template.settleBasePath + "企业注册证书.jpg",
                company_annual_report_photo_demo_url: configs.template.settleBasePath + "法团成立表格-3.jpg",
                identity_photo_a_passport_demo_url: configs.template.settleBasePath + "护照.jpg",
                identity_photo_a_hk_demo_url: configs.template.settleBasePath + "港澳通行证.jpg",
                identity_photo_a_id_demo_url: configs.template.settleBasePath + "%E5%A2%83%E5%86%85_%E8%BA%AB%E4%BB%BD%E8%AF%81%E6%AD%A3%E9%9D%A2%2B.jpg",
                identity_photo_b_demo_url: configs.template.settleBasePath + "境内_身份证反面.jpg",
                identity_photo_c_demo_url: configs.template.settleBasePath + "境内_手持身份证.jpg",
                chairman_authorization_demo_url: configs.template.settleBasePath + "董事授权书.pdf",

                rules: {},
                //基础
                rulesA: {
                    email: [
                        {
                            required: true,
                            message: this.validMsg("user.email"),
                            trigger: "blur",
                        },
                        {
                            validator: checkEmail,
                            trigger: "blur",
                        },
                    ],
                    identity_name: [
                        {
                            required: true,
                            message: this.validMsg("user.identity_name"),
                            trigger: "blur",
                        },
                    ],
                    //identity_bank_photo: [{required: true, message: this.validMsg('user.identity_bank_photo'),trigger: 'change'},],
                    // company_address: [
                    //     {
                    //         required: true,
                    //         message: this.validMsg("user.company_address"),
                    //         trigger: "blur",
                    //     },
                    // ],
                    // profession: [
                    //     {
                    //         required: true,
                    //         message: this.validMsg("user.profession"),
                    //         trigger: "blur",
                    //     },
                    // ],
                    // sex: [
                    //     {
                    //         required: true,
                    //         message: this.validMsg("user.sex"),
                    //         trigger: "change",
                    //     },
                    // ],
                    zip_code: [
                        {
                            required: true,
                            message: this.validMsg("user.zip_code"),
                            trigger: "blur",
                        },
                    ],
                    shop_site: [
                        {
                            required: true,
                            message: this.validMsg("user.shop_site"),
                            trigger: "blur",
                        },
                        {
                            validator: checkShopSite,
                            trigger: "blur",
                        },
                    ],
                    identity_account_type: [
                        {
                            required: true,
                            message: this.validMsg("comm.type"),
                            trigger: "blur",
                        },
                    ],
                    //product_info: [{required: true, message: this.validMsg('user.product_info'), trigger: 'blur'},],
                },
                //境外
                rulesAOut: {
                    phone: [
                        {
                            required: true,
                            message: this.validMsg("user.phone"),
                            trigger: "blur",
                        },
                    ],
                    identity_start_date: [
                        {
                            required: true,
                            message: this.validMsg("user.identity_start_date2"),
                            trigger: "change",
                        },
                    ],
                    identity_expire_date: [
                        {
                            required: true,
                            message: this.validMsg("user.identity_expire_date2"),
                            trigger: "change",
                        },
                    ],
                    identity_number: [
                        {
                            required: true,
                            message: this.validMsg("user.identity_number2"),
                            trigger: "blur",
                        },
                        // { validator: checkOutlandIdNum, trigger: "blur" },
                    ],
                    identity_photo_a: [
                        {
                            required: true,
                            message: this.validMsg2("user.identity_photo_a2"),
                            trigger: "change",
                        },
                    ],
                    identity_photo_b: [
                        {
                            required: true,
                            message: this.validMsg2("user.identity_photo_b2"),
                            trigger: "change",
                        },
                    ],
                    identity_photo_c: [
                        {
                            required: true,
                            message: this.validMsg2("user.identity_photo_c2"),
                            trigger: "change",
                        },
                    ],
                },
                //境内
                rulesAIn: {
                    phone: [
                        {
                            required: true,
                            message: this.validMsg("user.phone"),
                            trigger: "blur",
                        },
                        { validator: checkInlandPhone, trigger: "blur" },
                    ],
                    identity_start_date: [
                        {
                            required: true,
                            message: this.validMsg("user.identity_start_date"),
                            trigger: "change",
                        },
                    ],
                    identity_expire_date: [
                        {
                            required: true,
                            message: this.validMsg("user.identity_expire_date"),
                            trigger: "change",
                        },
                    ],
                    identity_number: [
                        {
                            required: true,
                            message: this.validMsg("user.identity_number"),
                            trigger: "blur",
                        },
                        { validator: checkInlandIdNum, trigger: "blur" },
                    ],
                    identity_photo_a: [
                        {
                            required: true,
                            message: this.validMsg2("user.identity_photo_a"),
                            trigger: "change",
                        },
                    ],
                    identity_photo_b: [
                        {
                            required: true,
                            message: this.validMsg2("user.identity_photo_b"),
                            trigger: "change",
                        },
                    ],
                },
                //境内公司
                rulesB: {
                    company_name: [
                        {
                            required: true,
                            message: this.validMsg("user.company_name"),
                            trigger: "blur",
                        },
                    ],
                    company_identity_photo: [
                        {
                            required: true,
                            message: this.validMsg2("user.company_identity_photo"),
                            trigger: "change",
                        },
                    ],
                    company_identity_id: [
                        {
                            required: true,
                            message: this.validMsg("user.company_identity_id"),
                            trigger: "blur",
                        },
                    ],
                    company_start_date: [
                        {
                            required: true,
                            message: this.validMsg("user.company_start_date"),
                            trigger: "change",
                        },
                    ],
                    company_expire_date: [
                        {
                            required: true,
                            message: this.validMsg("user.company_expire_date"),
                            trigger: "change",
                        },
                    ],
                    company_scope: [
                        {
                            required: true,
                            message: this.validMsg("user.company_scope"),
                            trigger: "blur",
                        },
                    ],
                    company_phone: [
                        {
                            required: true,
                            message: this.validMsg("user.company_phone"),
                            trigger: "blur",
                        },
                    ],
                    company_register_address: [
                        {
                            required: true,
                            message: this.validMsg("user.company_register_address"),
                            trigger: "blur",
                        },
                    ],
                    company_address: [
                        {
                            required: true,
                            message: this.validMsg("user.company_address"),
                            trigger: "blur",
                        },
                    ],
                },
                //境内个人
                rulesC: {
                    identity_photo_c: [
                        {
                            required: true,
                            message: this.validMsg2("user.identity_photo_c"),
                            trigger: "change",
                        },
                    ],
                    address: [
                        {
                            required: true,
                            message: this.validMsg("user.address"),
                            trigger: "blur",
                        },
                    ],
                },
                //境外个人
                rulesD: {
                    select_country: [
                        {
                            required: true,
                            message: this.validMsg("user.belong_what_country"),
                            trigger: "change",
                        },
                    ],
                    personal_identity: [
                        {
                            required: true,
                            message: this.validMsg("user.personal_identity_tip"),
                            trigger: "change",
                        },
                    ],
                    address: [
                        {
                            required: true,
                            message: this.validMsg("user.address"),
                            trigger: "blur",
                        },
                    ],
                },
                //境外公司
                rulesE: {
                    company_name: [
                        {
                            required: true,
                            message: this.validMsg("user.company_name"),
                            trigger: "blur",
                        },
                    ],
                    company_register_country: [
                        {
                            required: true,
                            message: this.validMsg("user.company_register_country"),
                            trigger: "blur",
                        },
                    ],
                    is_own_subsidiary: [
                        {
                            required: true,
                            message: this.validMsg("user.is_own_subsidiary"),
                            trigger: "change",
                        },
                    ],
                    subsidiary_name: [
                        {
                            required: true,
                            message: this.validMsg("user.subsidiary_name"),
                            trigger: "blur",
                        },
                    ],
                    subsidiary_country: [
                        {
                            required: true,
                            message: this.validMsg("user.subsidiary_country"),
                            trigger: "blur",
                        },
                    ],
                    out_company_start_date: [
                        {
                            required: true,
                            message: this.validMsg("user.out_company_start_date"),
                            trigger: "change",
                        },
                    ],
                    out_company_expire_date: [
                        {
                            required: true,
                            message: this.validMsg("user.out_company_expire_date"),
                            trigger: "change",
                        },
                    ],
                    company_business_identity_photo: [
                        {
                            required: true,
                            message: this.validMsg2("user.company_business_identity_photo"),
                            trigger: "change",
                        },
                    ],
                    company_register_identity_photo: [
                        {
                            required: true,
                            message: this.validMsg2("user.company_register_identity_photo"),
                            trigger: "change",
                        },
                    ],
                    company_annual_report_photo: [
                        {
                            required: true,
                            message: this.validMsg2("user.company_annual_report_photo"),
                            trigger: "change",
                        },
                    ],
                    personal_identity: [
                        {
                            required: true,
                            message: this.validMsg("user.personal_identity_tip"),
                            trigger: "change",
                        },
                    ],
                    // chairman_authorization: [
                    //     {
                    //         required: true,
                    //         message: this.validMsg2("user.chairman_authorization"),
                    //         trigger: "change",
                    //     },
                    // ],
                    company_register_address: [
                        {
                            required: true,
                            message: this.validMsg("user.company_register_address"),
                            trigger: "blur",
                        },
                    ],
                    company_address: [
                        {
                            required: true,
                            message: this.validMsg("user.company_address"),
                            trigger: "blur",
                        },
                    ],
                    company_phone: [
                        {
                            required: true,
                            message: this.validMsg("user.company_phone"),
                            trigger: "blur",
                        },
                    ],
                },
                typeList: [
                    { value: "personal", text: "user.personal" },
                    { value: "company", text: "user.company" },
                ],
                typeCompanyList: [{ value: "company", text: "user.company" }],
                typePersonalList: [{ value: "personal", text: "user.personal" }],
                companyPositionList: [
                    { value: "chairman", text: "user.chairman" },
                    {
                        value: "shareholder",
                        text: "user.shareholder",
                    },
                    { value: "none", text: "user.none" },
                ],
                personalIdentityList: [
                    {
                        value: "identity_id",
                        text: "user.identity_id",
                    },
                    {
                        value: "passport",
                        text: "user.passport",
                    },
                    { value: "hk_pass", text: "user.hk_pass" },
                ],
                jobType: [],
                businessType: [],
                // professionList: [],
                dataLoaded: false,
            };
        },
        watch: {},
        mounted() {
            this.rules = this.rulesA;
            this.loadMerData();
        },
        methods: {
            personalIdentityChange() {
                //身份id时需要反面和手持照片，其余两种不需要
                if (this.detail.identity_country_type === "outland") {
                    if (this.detail.personal_identity === "passport" || this.detail.personal_identity === "hk_pass") {
                        this.resetRule("identity_photo_b", []);
                        this.resetRule("identity_photo_c", []);
                    } else {
                        this.resetRule("identity_photo_b", [
                            {
                                required: true,
                                message: this.validMsg2("user.identity_photo_b2"),
                                trigger: "change",
                            },
                        ]);
                        this.resetRule("identity_photo_c", [
                            {
                                required: true,
                                message: this.validMsg2("user.identity_photo_c2"),
                                trigger: "change",
                            },
                        ]);
                    }
                }
            },
            // companyPositionChange() {
            //     //以上都不是的情况需要董事授权书
            //     if (this.detail.company_position === "none") {
            //         this.resetRule("chairman_authorization", [
            //             {
            //                 required: true,
            //                 message: this.$i18n.t("user.chairman_authorization"),
            //                 trigger: "change",
            //             },
            //         ]);
            //     } else {
            //         this.resetRule("chairman_authorization", []);
            //     }
            // },
            showSubsidiary(val) {
                this.detail.is_own_subsidiary = val;
                if (this.detail.is_own_subsidiary === true && this.detail.identity_country_type === "outland" && this.detail.identity_account_type === "company") {
                    this.resetRule("subsidiary_name", [
                        {
                            required: true,
                            message: this.validMsg("user.subsidiary_name"),
                            trigger: "blur",
                        },
                    ]);
                    this.resetRule("subsidiary_country", [
                        {
                            required: true,
                            message: this.validMsg("user.subsidiary_country"),
                            trigger: "blur",
                        },
                    ]);
                } else {
                    this.resetRule("subsidiary_name", []);
                    this.resetRule("subsidiary_country", []);
                }
            },
            resetRule(prop, rule) {
                this.$set(this.rules, prop, rule);
            },
            getPhotoDemoA() {
                if (this.detail.identity_country_type === "outland") {
                    if (this.detail.personal_identity === "passport") {
                        return this.identity_photo_a_passport_demo_url;
                    } else if (this.detail.personal_identity === "hk_pass") {
                        return this.identity_photo_a_hk_demo_url;
                    } else {
                        return null;
                    }
                } else {
                    return this.identity_photo_a_id_demo_url;
                }
            },
            setIdentityPhotoTipA() {
                if (this.detail.identity_country_type === "outland") {
                    return this.$i18n.t("user.identity_photo_a_outland_tip");
                } else {
                    if (this.detail.identity_account_type === "company") {
                        return this.$i18n.t("user.identity_photo_a_company_tip");
                    } else {
                        return this.$i18n.t("user.identity_photo_a_person_tip");
                    }
                }
            },
            setIdentityPhotoTipB() {
                if (this.detail.identity_country_type === "outland") {
                    return this.$i18n.t("user.identity_photo_b_outland_tip");
                } else {
                    if (this.detail.identity_account_type === "company") {
                        return this.$i18n.t("user.identity_photo_b_company_tip");
                    } else {
                        return this.$i18n.t("user.identity_photo_b_person_tip");
                    }
                }
            },
            fullImgUrl(path) {
                if (isEmpty(path)) return null;
                return configs.imgBaseUrl + path;
            },
            selectCountry(val) {
                this.detail.belong_what_country = val.iso2;
            },
            getCountryJson() {
                if (isEmpty(this.area_all_list) || this.area_all_list.length <= 0) {
                    this.$data.loading = true;
                    getAreaJsonData()
                        .then(res => {
                            const { data } = res;
                            this.$data.area_all_list = data;
                        })
                        .finally(() => {
                            this.$data.loading = false;
                        });
                }
            },
            typeChange() {
                // console.log("identity_country_type:" + this.detail.identity_country_type);
                let detail = this.detail;
                if (!isEmpty(detail) && !isEmpty(detail.identity_account_type) && !isEmpty(detail.identity_country_type)) {
                    if (this.detail.identity_country_type === "outland") {
                        if (this.detail.identity_account_type === "company") {
                            this.rules = Object.assign(this.rulesE, this.rulesAOut, this.rulesA);
                            this.resetRule("identity_name", []);
                            if (this.detail.is_own_subsidiary === false) {
                                //参数默认是false 校验默认是true
                                this.resetRule("subsidiary_name", []);
                                this.resetRule("subsidiary_country", []);
                            }
                        } else {
                            this.rules = Object.assign(this.rulesD, this.rulesAOut, this.rulesA);
                            this.getCountryJson();
                        }
                    } else {
                        if (this.detail.identity_account_type === "company") {
                            this.rules = Object.assign(this.rulesB, this.rulesAIn, this.rulesA);
                            this.resetRule("identity_name", [
                                {
                                    required: true,
                                    message: this.validMsg("user.legal_person"),
                                    trigger: "blur",
                                },
                            ]);
                            // this.resetRule("identity_photo_c", []);
                            // this.resetRule("address", [
                            //     {
                            //         required: true,
                            //         message: this.validMsg(
                            //             "user.company_address"
                            //         ),
                            //         trigger: "blur",
                            //     },
                            // ]);
                        } else {
                            this.rules = Object.assign(this.rulesC, this.rulesAIn, this.rulesA);
                            this.resetRule("identity_name", [
                                {
                                    required: true,
                                    message: this.validMsg("user.identity_name"),
                                    trigger: "blur",
                                },
                            ]);
                            // this.resetRule("address", [
                            //     {
                            //         required: true,
                            //         message: this.validMsg("user.address"),
                            //         trigger: "blur",
                            //     },
                            // ]);
                        }
                    }
                    this.personalIdentityChange();
                    // this.companyPositionChange();
                } else {
                    this.rules = this.rulesA;
                }
            },
            validMsg(name) {
                return this.$i18n.t("valid.required_field", [this.$i18n.t(name)]);
            },
            validMsg2(name) {
                return this.$i18n.t("valid.uploaded_field", [this.$i18n.t(name)]);
            },
            validReg(reg, value, field, callback) {
                if (!reg.test(value)) {
                    return callback(this.$i18n.t("user." + field) + this.$i18n.t("user.incorrect_format"));
                } else {
                    callback();
                }
            },
            loadMerData() {
                this.loading = true;
                getMerInfo()
                    .then(res => {
                        const { data } = res;
                        this.$data.info = data.info;
                        this.$data.hold_edit = data.info.identity_validated || data.info.identity_status === 2;
                        this.loadIdentityData();
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            loadIdentityData() {
                this.loading = true;
                getMerIdentity()
                    .then(res => {
                        const { data } = res;
                        let detailData = data.detail;
                        detailData.identity_country_type = "inland"; // 初始值
                        detailData.identity_account_type = "company"; //初始值
                        detailData.is_own_subsidiary = false;
                        detailData.company_position = "chairman";
                        detailData.personal_identity = "identity_id";
                        if (detailData.qq === "null") detailData.qq = "";
                        this.$data.detail = detailData; //赋值
                        this.$data.jobType = data.job_type;
                        this.$data.businessType = data.business_type;
                        //
                        if (!isEmpty(this.$data.info.identity_account_type)) {
                            //type数据在info
                            if (this.$data.info.identity_account_type === "company") {
                                this.$data.detail.identity_account_type = "company";
                                this.typeList = this.typeCompanyList;
                            } else {
                                this.$data.detail.identity_account_type = "personal";
                                this.typeList = this.typePersonalList;
                            }
                        }
                        if (!isEmpty(this.$data.info.identity_country_type)) {
                            //type数据在info
                            if (this.$data.info.identity_country_type === "outland") {
                                this.$data.detail.identity_country_type = "outland";
                                this.inland_disabled = true;
                                this.outland_disabled = false;
                            } else {
                                this.$data.detail.identity_country_type = "inland";
                                this.inland_disabled = false;
                                this.outland_disabled = true;
                            }
                        } else {
                            this.inland_disabled = false;
                            this.outland_disabled = false;
                        }
                        this.typeChange();
                        this.dataLoaded = true;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            identityExpireForever() {
                this.detail.identity_expire_date = "9999-12-31";
            },
            companyExpireForever() {
                this.detail.company_expire_date = "9999-12-31";
            },
            outCompanyExpireForever() {
                this.detail.out_company_expire_date = "9999-12-31";
            },
            submitDetail() {
                if ((this.info.identity_country_type === "outland" && this.detail.identity_country_type !== "outland") || (this.info.identity_country_type === "inland" && this.detail.identity_country_type !== "inland")) {
                    this.$message.error("land type error!");
                    return;
                }
                this.$refs["detail"].validate(valid => {
                    if (!valid) {
                        return false;
                    } else {
                        this.loading = true;
                        let formData = new FormData();
                        let params = this.detail;
                        Object.keys(params).forEach(key => {
                            //把json转成FormData
                            formData.append(key, params[key]);
                            // console.log(key + ": " + params[key] + "; ");
                        });
                        updateIdentity(formData)
                            .then(() => {
                                this.$store.dispatch("user/loadUserInfo").then(() => {
                                    this.loadMerData();
                                });
                            })
                            .finally(() => {
                                this.loading = false;
                            });
                    }
                });
            },
            updateImg(e, k) {
                this.detail[k] = e;
                this.$refs.detail.validateField([k], formError => {
                    if (formError) {
                        return false;
                    }
                });
            },
        },
    };
</script>
<style scoped>
    ::v-deep .el-radio-button--medium .el-radio-button__inner {
        padding-left: 60px;
        padding-right: 60px;
    }
    .el-form-item {
        margin-bottom: 30px;
    }
    ::v-deep .el-form-item--medium .el-form-item__label {
        line-height: 1;
        padding-top: 8px;
    }
    ::v-deep .el-form-item--medium .el-form-item__content {
        line-height: 1;
    }
    ::v-deep label {
        margin-bottom: 0rem;
    }
</style>
