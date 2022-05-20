<template>
    <div v-loading="loading">
        <div class="row">
            <div class="col-12 mb-2">
                <el-card
                    shadow="always"
                    class="box-card"
                    :body-style="{ padding: '0px' }"
                >
                    <div class="text-muted p-0 p-3">
                        <i class="el-icon-info text-blue"></i>
                        {{ $t("comm.status") }} :
                        <strong>{{
                            info.identity_status | identityStatus
                        }}</strong>
                    </div>
                    <div
                        v-if="info.identity_status !== 1"
                        class="d-flex align-items-start justify-content-start p-3"
                        style="background-color: rgb(253, 241, 217)"
                    >
                        <div class="mb-n1 mr-1">
                            <small class="text-danger"
                                >{{ $t("dispute.warm_prompt") }}：</small
                            >
                        </div>
                        <div class="media-body align-self-center text-truncate">
                            <div class="text-truncate">
                                <small>{{
                                    $t(
                                        "user.hint_Supplementary_account_information"
                                    )
                                }}</small>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
        <div class="wrap-tab p-0" v-if="dataLoaded">
            <el-card
                class="box-card wpy-card"
                shadow="never"
                :body-style="{ padding: '0px' }"
            >
                <div slot="header" class="clearfix">
                    <span>{{ $t("user.identity_info") }}</span>
                </div>
                <div class="row">
                    <el-alert
                        v-if="
                            detail &&
                                detail.identity_reason &&
                                info.identity_status === 3
                        "
                        :title="detail.identity_reason"
                        center
                        show-icon
                        type="warning"
                    >
                    </el-alert>
                    <div class="col-2"></div>
                    <div class="col-8">
                        <div style="display:flex;justify-content:center;">
                            <el-radio-group
                                :disabled="hold_edit"
                                v-model="detail.identity_country_type"
                                @change="typeChange"
                                style="margin-top:20px;"
                            >
                                <el-radio-button label="inland">
                                    {{ $t("user.inland") }}
                                </el-radio-button>
                                <el-radio-button label="outland">{{
                                    $t("user.outland")
                                }}</el-radio-button>
                            </el-radio-group>
                        </div>

                        <el-form
                            ref="detail"
                            :model="detail"
                            :disabled="hold_edit"
                            :rules="rules"
                            :validate-on-rule-change="true"
                            label-width="170px"
                            class="pl-1 pr-3 pt-3 pb-0"
                        >
                            <el-form-item prop="identity_account_type">
                                <template slot="label">
                                    {{ $t("comm.category") }}
                                </template>
                                <el-select
                                    v-model="detail.identity_account_type"
                                    :placeholder="$t('user.select_type')"
                                    @change="typeChange"
                                    filterable
                                >
                                    <el-option
                                        v-for="item in typeList"
                                        :key="item.value"
                                        :label="item.text"
                                        :value="item.value"
                                    >
                                        <span style="float: left">{{
                                            item.text
                                        }}</span>
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <!-- 境内企业 -->
                            <div
                                class="company-inland"
                                v-show="
                                    detail.identity_account_type !==
                                        'personal' &&
                                        detail.identity_country_type ===
                                            'inland'
                                "
                            >
                                <el-form-item
                                    :label="$t('user.company_name')"
                                    prop="company_name"
                                >
                                    <el-input
                                        v-model="detail.company_name"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    :label="$t('user.company_identity_id')"
                                    prop="company_identity_id"
                                >
                                    <el-input
                                        v-model="detail.company_identity_id"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    :label="$t('user.company_start_date')"
                                    prop="company_start_date"
                                >
                                    <el-date-picker
                                        v-model="detail.company_start_date"
                                        value-format="yyyy-MM-dd"
                                        type="date"
                                        :placeholder="
                                            $t('comm.select') +
                                                $t('user.company_start_date')
                                        "
                                    >
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item
                                    :label="$t('user.company_expire_date')"
                                    prop="company_expire_date"
                                >
                                    <el-date-picker
                                        v-model="detail.company_expire_date"
                                        value-format="yyyy-MM-dd"
                                        type="date"
                                        :placeholder="
                                            $t('comm.select') +
                                                $t('user.company_expire_date')
                                        "
                                    >
                                    </el-date-picker>
                                    <el-button
                                        size="mini"
                                        @click="companyExpireForever"
                                        type="text"
                                        plain
                                        >{{ $t("user.long_effective") }}
                                    </el-button>
                                </el-form-item>
                                <el-form-item
                                    :label="$t('user.company_identity_photo')"
                                    prop="company_identity_photo"
                                >
                                    <UploadImgOnce
                                        :txt="
                                            $t('comm.upload') +
                                                $t(
                                                    'user.company_identity_photo'
                                                )
                                        "
                                        size="sm"
                                        :disable="hold_edit"
                                        :img_url="
                                            fullImgUrl(
                                                detail.company_identity_photo_url
                                            )
                                        "
                                        :img_url_demo="
                                            detail.company_identity_photo_demo_url
                                        "
                                        :img_url_tip="
                                            $t(
                                                'user.upload_company_identity_photo_tip'
                                            )
                                        "
                                        @img="
                                            updateImg(
                                                $event,
                                                'company_identity_photo'
                                            )
                                        "
                                    ></UploadImgOnce>
                                </el-form-item>
                                <hr />

                                <el-form-item
                                    :label="$t('user.company_scope')"
                                    prop="company_scope"
                                >
                                    <el-input
                                        type="textarea"
                                        :rows="2"
                                        v-model="detail.company_scope"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    v-show="
                                        detail.identity_account_type ===
                                            'company' &&
                                            detail.identity_country_type ===
                                                'inland'
                                    "
                                    :label="$t('user.company_register_address')"
                                    prop="company_register_address"
                                >
                                    <el-input
                                        v-model="
                                            detail.company_register_address
                                        "
                                    ></el-input>
                                </el-form-item>

                                <!-- <el-form-item
                                    :label="$t('user.company_address')"
                                    prop="company_address"
                                >
                                    <el-input
                                        v-model="detail.company_address"
                                    ></el-input>
                                </el-form-item> -->

                                <el-form-item
                                    :label="$t('user.company_phone')"
                                    prop="company_phone"
                                >
                                    <el-input
                                        v-model="detail.company_phone"
                                    ></el-input>
                                </el-form-item>
                            </div>
                            <!-- 境外企业 -->
                            <div
                                class="company-outland"
                                v-show="
                                    detail.identity_account_type !==
                                        'personal' &&
                                        detail.identity_country_type ===
                                            'outland'
                                "
                            >
                                <el-form-item
                                    :label="$t('user.company_name')"
                                    prop="company_name"
                                >
                                    <el-input
                                        v-model="detail.company_name"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    :label="$t('user.company_register_country')"
                                    prop="company_register_country"
                                >
                                    <el-input
                                        v-model="
                                            detail.company_register_country
                                        "
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    :label="$t('user.is_own_subsidiary')"
                                    prop="is_own_subsidiary"
                                >
                                    <el-radio-group
                                        v-model="detail.is_own_subsidiary"
                                        @change="showSubsidiary"
                                    >
                                        <el-radio :label="true">{{
                                            $t("status.yes")
                                        }}</el-radio>
                                        <el-radio :label="false">{{
                                            $t("status.no")
                                        }}</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item
                                    v-show="detail.is_own_subsidiary === true"
                                    prop="subsidiary_name"
                                >
                                    <el-input
                                        :placeholder="
                                            $t('user.enter_subsidiary_name')
                                        "
                                        v-model="detail.subsidiary_name"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    v-show="detail.is_own_subsidiary === true"
                                    prop="subsidiary_country"
                                >
                                    <el-input
                                        :placeholder="
                                            $t('user.enter_subsidiary_country')
                                        "
                                        v-model="detail.subsidiary_country"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    :label="
                                        $t(
                                            'user.company_business_identity_photo'
                                        )
                                    "
                                    prop="company_business_identity_photo"
                                >
                                    <UploadImgOnce
                                        :txt="
                                            $t('comm.upload') +
                                                $t(
                                                    'user.company_business_identity_photo'
                                                )
                                        "
                                        size="sm"
                                        :disable="hold_edit"
                                        :img_url="
                                            fullImgUrl(
                                                detail.company_business_identity_photo_url
                                            )
                                        "
                                        :img_url_demo="
                                            detail.company_business_identity_photo_demo_url
                                        "
                                        :img_url_tip="
                                            $t(
                                                'user.company_business_identity_photo_tip'
                                            )
                                        "
                                        @img="
                                            updateImg(
                                                $event,
                                                'company_business_identity_photo'
                                            )
                                        "
                                    ></UploadImgOnce>
                                </el-form-item>
                                <el-form-item
                                    :label="
                                        $t(
                                            'user.company_register_identity_photo'
                                        )
                                    "
                                    prop="company_register_identity_photo"
                                >
                                    <UploadImgOnce
                                        :txt="
                                            $t('comm.upload') +
                                                $t(
                                                    'user.company_register_identity_photo'
                                                )
                                        "
                                        size="sm"
                                        :disable="hold_edit"
                                        :img_url="
                                            fullImgUrl(
                                                detail.company_register_identity_photo_url
                                            )
                                        "
                                        :img_url_demo="
                                            detail.company_register_identity_photo_demo_url
                                        "
                                        :img_url_tip="
                                            $t(
                                                'user.company_register_identity_photo_tip'
                                            )
                                        "
                                        @img="
                                            updateImg(
                                                $event,
                                                'company_register_identity_photo'
                                            )
                                        "
                                    ></UploadImgOnce>
                                </el-form-item>
                                <el-form-item
                                    :label="
                                        $t('user.company_annual_report_photo')
                                    "
                                    prop="company_annual_report_photo"
                                >
                                    <UploadImgOnce
                                        :txt="
                                            $t('comm.upload') +
                                                $t(
                                                    'user.company_annual_report_photo'
                                                )
                                        "
                                        size="sm"
                                        :disable="hold_edit"
                                        :img_url="
                                            fullImgUrl(
                                                detail.company_annual_report_photo_url
                                            )
                                        "
                                        :img_url_demo="
                                            detail.company_annual_report_photo_demo_url
                                        "
                                        :img_url_tip="
                                            $t(
                                                'user.company_annual_report_photo_tip'
                                            )
                                        "
                                        @img="
                                            updateImg(
                                                $event,
                                                'company_annual_report_photo'
                                            )
                                        "
                                    ></UploadImgOnce>
                                </el-form-item>
                                <hr />

                                <el-form-item prop="company_position">
                                    <template slot="label">
                                        {{ $t("user.company_position") }}
                                    </template>
                                    <el-select
                                        v-model="detail.company_position"
                                        :placeholder="$t('user.select_type')"
                                        @change="companyPositionChange"
                                        filterable
                                    >
                                        <el-option
                                            v-for="item in companyPositionList"
                                            :key="item.value"
                                            :label="item.text"
                                            :value="item.value"
                                        >
                                            <span style="float: left">{{
                                                item.text
                                            }}</span>
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <!-- 个人信息 -->
                            <div class="personal">
                                <el-form-item
                                    v-show="
                                        detail.identity_country_type ===
                                            'inland' ||
                                            detail.identity_account_type ===
                                                'personal'
                                    "
                                    :label="
                                        detail.identity_account_type ===
                                        'company'
                                            ? $t('user.legal_person')
                                            : $t('user.identity_name')
                                    "
                                    prop="identity_name"
                                >
                                    <el-input
                                        v-model="detail.identity_name"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    v-show="
                                        detail.identity_country_type ===
                                            'outland' &&
                                            detail.identity_account_type ===
                                                'personal'
                                    "
                                    :label="$t('user.belong_what_country')"
                                    prop="belong_what_country"
                                >
                                    <el-input
                                        v-model="detail.belong_what_country"
                                    ></el-input>
                                </el-form-item>

                                <el-form-item
                                    prop="personal_identity"
                                    v-show="
                                        detail.identity_country_type ===
                                            'outland'
                                    "
                                >
                                    <template slot="label">
                                        {{ $t("user.personal_identity") }}
                                    </template>
                                    <el-select
                                        v-model="detail.personal_identity"
                                        :placeholder="$t('user.select_type')"
                                        @change="personalIdentityChange"
                                        filterable
                                    >
                                        <el-option
                                            v-for="item in personalIdentityList"
                                            :key="item.value"
                                            :label="item.text"
                                            :value="item.value"
                                        >
                                            <span style="float: left">{{
                                                item.text
                                            }}</span>
                                        </el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item
                                    :label="
                                        detail.identity_country_type ===
                                        'outland'
                                            ? $t('user.identity_number2')
                                            : $t('user.identity_number')
                                    "
                                    prop="identity_number"
                                >
                                    <el-input
                                        v-model="detail.identity_number"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    :label="
                                        detail.identity_country_type ===
                                        'outland'
                                            ? $t('user.identity_start_date2')
                                            : $t('user.identity_start_date')
                                    "
                                    prop="identity_start_date"
                                >
                                    <el-date-picker
                                        v-model="detail.identity_start_date"
                                        value-format="yyyy-MM-dd"
                                        type="date"
                                        :placeholder="
                                            detail.identity_country_type ===
                                            'outland'
                                                ? $t('comm.select') +
                                                  $t(
                                                      'user.identity_start_date2'
                                                  )
                                                : $t('comm.select') +
                                                  $t('user.identity_start_date')
                                        "
                                    >
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item
                                    :label="
                                        detail.identity_country_type ===
                                        'outland'
                                            ? $t('user.identity_expire_date2')
                                            : $t('user.identity_expire_date')
                                    "
                                    prop="identity_expire_date"
                                >
                                    <el-date-picker
                                        v-model="detail.identity_expire_date"
                                        value-format="yyyy-MM-dd"
                                        type="date"
                                        :placeholder="
                                            detail.identity_country_type ===
                                            'outland'
                                                ? $t('comm.select') +
                                                  $t(
                                                      'user.identity_expire_date2'
                                                  )
                                                : $t('comm.select') +
                                                  $t(
                                                      'user.identity_expire_date'
                                                  )
                                        "
                                    >
                                    </el-date-picker>
                                    <el-button
                                        size="mini"
                                        @click="identityExpireForever"
                                        type="text"
                                        plain
                                        >{{ $t("user.long_effective") }}
                                    </el-button>
                                </el-form-item>
                                <el-form-item
                                    :label="
                                        detail.identity_country_type ===
                                        'outland'
                                            ? $t('user.identity_photo_a2')
                                            : $t('user.identity_photo_a')
                                    "
                                    prop="identity_photo_a"
                                >
                                    <UploadImgOnce
                                        :txt="
                                            detail.identity_country_type ===
                                            'outland'
                                                ? $t('comm.upload') +
                                                  $t('user.identity_photo_a2')
                                                : $t('comm.upload') +
                                                  $t('user.identity_photo_a')
                                        "
                                        size="sm"
                                        :disable="hold_edit"
                                        :img_url="
                                            fullImgUrl(
                                                detail.identity_photo_a_url
                                            )
                                        "
                                        @img="
                                            updateImg(
                                                $event,
                                                'identity_photo_a'
                                            )
                                        "
                                        :img_url_demo="getPhotoDemoA()"
                                        :img_url_tip="setIdentityPhotoTipA()"
                                    ></UploadImgOnce>
                                </el-form-item>
                                <el-form-item
                                    v-show="
                                        detail.identity_country_type ===
                                            'inland' ||
                                            (detail.identity_country_type ===
                                                'outland' &&
                                                detail.personal_identity ===
                                                    'identity_id')
                                    "
                                    :label="
                                        detail.identity_country_type ===
                                        'outland'
                                            ? $t('user.identity_photo_b2')
                                            : $t('user.identity_photo_b')
                                    "
                                    prop="identity_photo_b"
                                >
                                    <UploadImgOnce
                                        :txt="
                                            detail.identity_country_type ===
                                            'outland'
                                                ? $t('comm.upload') +
                                                  $t('user.identity_photo_b2')
                                                : $t('comm.upload') +
                                                  $t('user.identity_photo_b')
                                        "
                                        size="sm"
                                        :disable="hold_edit"
                                        :img_url="
                                            fullImgUrl(
                                                detail.identity_photo_b_url
                                            )
                                        "
                                        @img="
                                            updateImg(
                                                $event,
                                                'identity_photo_b'
                                            )
                                        "
                                        :img_url_demo="
                                            fullImgUrl(
                                                detail.identity_photo_b_demo_url
                                            )
                                        "
                                        :img_url_tip="setIdentityPhotoTipB()"
                                    ></UploadImgOnce>
                                </el-form-item>
                                <el-form-item
                                    v-show="
                                        (detail.identity_account_type ===
                                            'personal' &&
                                            detail.identity_country_type ===
                                                'inland') ||
                                            (detail.identity_country_type ===
                                                'outland' &&
                                                detail.personal_identity ===
                                                    'identity_id')
                                    "
                                    :label="
                                        detail.identity_country_type ===
                                        'outland'
                                            ? $t('user.identity_photo_c2')
                                            : $t('user.identity_photo_c')
                                    "
                                    prop="identity_photo_c"
                                >
                                    <UploadImgOnce
                                        :txt="
                                            detail.identity_country_type ===
                                            'outland'
                                                ? $t('comm.upload') +
                                                  $t('user.identity_photo_c2')
                                                : $t('comm.upload') +
                                                  $t('user.identity_photo_c')
                                        "
                                        size="sm"
                                        :disable="hold_edit"
                                        :img_url="
                                            fullImgUrl(
                                                detail.identity_photo_c_url
                                            )
                                        "
                                        @img="
                                            updateImg(
                                                $event,
                                                'identity_photo_c'
                                            )
                                        "
                                        :img_url_demo="
                                            fullImgUrl(
                                                detail.identity_photo_c_demo_url
                                            )
                                        "
                                        :img_url_tip="
                                            detail.identity_country_type ===
                                            'outland'
                                                ? $t(
                                                      'user.identity_photo_c_outland_tip'
                                                  )
                                                : $t(
                                                      'user.identity_photo_c_tip'
                                                  )
                                        "
                                    ></UploadImgOnce>
                                </el-form-item>
                                <el-form-item
                                    v-show="
                                        detail.identity_country_type ===
                                            'outland' &&
                                            detail.identity_account_type ===
                                                'company' &&
                                            detail.company_position === 'none'
                                    "
                                    :label="$t('user.chairman_authorization')"
                                    prop="chairman_authorization"
                                >
                                    <UploadImgOnce
                                        :txt="
                                            $t('comm.upload') +
                                                $t(
                                                    'user.chairman_authorization'
                                                )
                                        "
                                        size="sm"
                                        :disable="hold_edit"
                                        :img_url="
                                            fullImgUrl(
                                                detail.chairman_authorization_url
                                            )
                                        "
                                        @img="
                                            updateImg(
                                                $event,
                                                'chairman_authorization'
                                            )
                                        "
                                        :img_url_demo="
                                            fullImgUrl(
                                                detail.chairman_authorization_demo_url
                                            )
                                        "
                                        :img_url_tip="
                                            $t(
                                                'user.chairman_authorization_tip'
                                            )
                                        "
                                    ></UploadImgOnce>
                                </el-form-item>
                                <hr />
                            </div>
                            <!-- 境外企业 地址电话-->
                            <div
                                v-show="
                                    detail.identity_country_type ===
                                        'outland' &&
                                        detail.identity_account_type ===
                                            'company'
                                "
                            >
                                <el-form-item
                                    :label="$t('user.company_register_address')"
                                    prop="company_register_address"
                                >
                                    <el-input
                                        v-model="
                                            detail.company_register_address
                                        "
                                    ></el-input>
                                </el-form-item>

                                <el-form-item
                                    :label="$t('user.company_address')"
                                    prop="company_address"
                                >
                                    <el-input
                                        v-model="detail.company_address"
                                    ></el-input>
                                </el-form-item>

                                <el-form-item
                                    :label="$t('user.company_phone')"
                                    prop="company_phone"
                                >
                                    <el-input
                                        v-model="detail.company_phone"
                                    ></el-input>
                                </el-form-item>
                            </div>
                            <!-- 通用 -->
                            <el-form-item
                                :label="$t('user.phone')"
                                prop="phone"
                            >
                                <el-input v-model="detail.phone"></el-input>
                            </el-form-item>
                            <el-form-item
                                :label="$t('user.email')"
                                prop="email"
                            >
                                <el-input
                                    v-model="detail.email"
                                    type="email"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                v-show="
                                    detail.identity_account_type === 'personal'
                                "
                                :label="$t('user.address')"
                                prop="address"
                            >
                                <el-input v-model="detail.address"></el-input>
                            </el-form-item>
                            <el-form-item
                                v-show="
                                    detail.identity_country_type === 'inland' &&
                                        detail.identity_account_type ===
                                            'company'
                                "
                                :label="$t('user.company_address')"
                                prop="company_address"
                            >
                                <el-input
                                    v-model="detail.company_address"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                :label="$t('user.zip_code')"
                                prop="zip_code"
                            >
                                <el-input v-model="detail.zip_code"></el-input>
                            </el-form-item>
                            <el-form-item
                                :label="$t('user.shop_site')"
                                prop="shop_site"
                            >
                                <el-input v-model="detail.shop_site"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('user.qq')" prop="qq">
                                <el-input v-model="detail.qq"></el-input>
                            </el-form-item>

                            <el-form-item>
                                <el-button
                                    size="mini"
                                    type="primary"
                                    @click="submitDetail"
                                >
                                    {{ $t("comm.confirm_submit") }}
                                </el-button>
                            </el-form-item>
                            <el-form-item v-if="hold_edit">
                                <strong>{{
                                    info.identity_status | identityStatus
                                }}</strong>
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
    import {
        getMerIdentity,
        getMerInfo,
        updateIdentity,
    } from "@/service/merchantSer";
    import UploadImgOnce from "@/components/UploadImgOnce";
    import { isEmpty } from "@/utils/validate";
    import { i18n } from "element-ui/lib/locale";
    export default {
        name: "merchant_identity_all",
        components: { UploadImgOnce },
        computed: {
            //watch跟踪数据变化, 重点user, configs
            ...mapState({
                menus: (state) => state.user.menus,
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
                detail: {
                    identity_country_type: "",
                    identity_account_type: "",
                    is_own_subsidiary: false,
                },
                rules: {},
                //基础
                rulesA: {
                    phone: [
                        {
                            required: true,
                            message: this.validMsg("user.phone"),
                            trigger: "blur",
                        },
                    ],
                    email: [
                        {
                            required: true,
                            type: "email",
                            message: this.validMsg("user.email"),
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
                    identity_start_date: [
                        {
                            required: true,
                            message: this.validMsg("user.identity_start_date2"),
                            trigger: "blur",
                        },
                    ],
                    identity_expire_date: [
                        {
                            required: true,
                            message: this.validMsg(
                                "user.identity_expire_date2"
                            ),
                            trigger: "blur",
                        },
                    ],
                    identity_number: [
                        {
                            required: true,
                            message: this.validMsg("user.identity_number2"),
                            trigger: "blur",
                        },
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
                    identity_start_date: [
                        {
                            required: true,
                            message: this.validMsg("user.identity_start_date"),
                            trigger: "blur",
                        },
                    ],
                    identity_expire_date: [
                        {
                            required: true,
                            message: this.validMsg("user.identity_expire_date"),
                            trigger: "blur",
                        },
                    ],
                    identity_number: [
                        {
                            required: true,
                            message: this.validMsg("user.identity_number"),
                            trigger: "blur",
                        },
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
                    identity_photo_c: [
                        {
                            required: true,
                            message: this.validMsg2("user.identity_photo_c"),
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
                            message: this.validMsg2(
                                "user.company_identity_photo"
                            ),
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
                            trigger: "blur",
                        },
                    ],
                    company_expire_date: [
                        {
                            required: true,
                            message: this.validMsg("user.company_expire_date"),
                            trigger: "blur",
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
                            message: this.validMsg(
                                "user.company_register_address"
                            ),
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
                    belong_what_country: [
                        {
                            required: true,
                            message: this.validMsg("user.belong_what_country"),
                            trigger: "blur",
                        },
                    ],
                    personal_identity: [
                        {
                            required: true,
                            message: this.validMsg(
                                "user.personal_identity_tip"
                            ),
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
                            message: this.validMsg(
                                "user.company_register_country"
                            ),
                            trigger: "blur",
                        },
                    ],
                    is_own_subsidiary: [
                        {
                            required: true,
                            message: this.$i18n.t("user.is_own_subsidiary"),
                            trigger: "change",
                        },
                    ],
                    subsidiary_name: [
                        {
                            required: true,
                            message: this.$i18n.t("user.enter_subsidiary_name"),
                            trigger: "blur",
                        },
                    ],
                    subsidiary_country: [
                        {
                            required: true,
                            message: this.$i18n.t(
                                "user.enter_subsidiary_country"
                            ),
                            trigger: "blur",
                        },
                    ],
                    company_business_identity_photo: [
                        {
                            required: true,
                            message: this.validMsg2(
                                "user.company_business_identity_photo"
                            ),
                            trigger: "change",
                        },
                    ],
                    company_register_identity_photo: [
                        {
                            required: true,
                            message: this.validMsg2(
                                "user.company_register_identity_photo"
                            ),
                            trigger: "change",
                        },
                    ],
                    company_annual_report_photo: [
                        {
                            required: true,
                            message: this.validMsg2(
                                "user.company_annual_report_photo"
                            ),
                            trigger: "change",
                        },
                    ],
                    personal_identity: [
                        {
                            required: true,
                            message: this.validMsg(
                                "user.personal_identity_tip"
                            ),
                            trigger: "change",
                        },
                    ],
                    chairman_authorization: [
                        {
                            required: true,
                            message: this.validMsg2(
                                "user.chairman_authorization"
                            ),
                            trigger: "change",
                        },
                    ],
                    company_register_address: [
                        {
                            required: true,
                            message: this.validMsg(
                                "user.company_register_address"
                            ),
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
                    { value: "personal", text: this.$i18n.t("user.personal") },
                    { value: "company", text: this.$i18n.t("user.company") },
                ],
                companyPositionList: [
                    { value: "chairman", text: this.$i18n.t("user.chairman") },
                    {
                        value: "shareholder",
                        text: this.$i18n.t("user.shareholder"),
                    },
                    { value: "none", text: this.$i18n.t("user.none") },
                ],
                personalIdentityList: [
                    {
                        value: "identity_id",
                        text: this.$i18n.t("user.identity_id"),
                    },
                    {
                        value: "passport",
                        text: this.$i18n.t("user.passport"),
                    },
                    { value: "hk_pass", text: this.$i18n.t("user.hk_pass") },
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
                if (
                    this.detail.personal_identity === "passport" ||
                    this.detail.personal_identity === "hk_pass"
                ) {
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
            },
            companyPositionChange() {
                //以上都不是的情况需要董事授权书
                if (this.detail.company_position === "none") {
                    this.resetRule("chairman_authorization", [
                        {
                            required: true,
                            message: this.$i18n.t(
                                "user.chairman_authorization"
                            ),
                            trigger: "change",
                        },
                    ]);
                } else {
                    this.resetRule("chairman_authorization", []);
                }
            },
            showSubsidiary(val) {
                this.detail.is_own_subsidiary = val;
                if (
                    this.detail.is_own_subsidiary === true &&
                    this.detail.identity_country_type === "outland" &&
                    this.detail.identity_account_type === "company"
                ) {
                    this.resetRule("subsidiary_name", [
                        {
                            required: true,
                            message: this.$i18n.t("user.enter_subsidiary_name"),
                            trigger: "blur",
                        },
                    ]);
                    this.resetRule("subsidiary_country", [
                        {
                            required: true,
                            message: this.$i18n.t(
                                "user.enter_subsidiary_country"
                            ),
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
                        return this.fullImgUrl(
                            this.detail.identity_photo_a_passport_demo_url
                        );
                    } else if (this.detail.personal_identity === "hk_pass") {
                        return this.fullImgUrl(
                            this.detail.identity_photo_a_hk_demo_url
                        );
                    } else {
                        return this.fullImgUrl(
                            this.detail.identity_photo_a_id_demo_url
                        );
                    }
                } else {
                    return this.fullImgUrl(
                        this.detail.identity_photo_a_id_demo_url
                    );
                }
            },
            setIdentityPhotoTipA() {
                if (this.detail.identity_country_type === "outland") {
                    return this.$i18n.t("user.identity_photo_a_outland_tip");
                } else {
                    if (this.detail.identity_account_type === "company") {
                        return this.$i18n.t(
                            "user.identity_photo_a_company_tip"
                        );
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
                        return this.$i18n.t(
                            "user.identity_photo_b_company_tip"
                        );
                    } else {
                        return this.$i18n.t("user.identity_photo_b_person_tip");
                    }
                }
            },
            fullImgUrl(path) {
                if (isEmpty(path)) return null;
                return configs.imgBaseUrl + path;
            },
            typeChange() {
                console.log(
                    "identity_country_type:" + this.detail.identity_country_type
                );
                let detail = this.detail;
                if (
                    !isEmpty(detail) &&
                    !isEmpty(detail.identity_account_type) &&
                    !isEmpty(detail.identity_country_type)
                ) {
                    if (this.detail.identity_country_type === "outland") {
                        if (this.detail.identity_account_type === "company") {
                            this.rules = Object.assign(
                                this.rulesE,
                                this.rulesAOut,
                                this.rulesA
                            );
                            this.resetRule("identity_name", []);
                            if (this.detail.is_own_subsidiary === false) {
                                //参数默认是false 校验默认是true
                                this.resetRule("subsidiary_name", []);
                                this.resetRule("subsidiary_country", []);
                            }
                        } else {
                            this.rules = Object.assign(
                                this.rulesD,
                                this.rulesAOut,
                                this.rulesA
                            );
                        }
                    } else {
                        if (this.detail.identity_account_type === "company") {
                            this.rules = Object.assign(
                                this.rulesB,
                                this.rulesAIn,
                                this.rulesA
                            );
                            this.resetRule("identity_name", [
                                {
                                    required: true,
                                    message: this.validMsg("user.legal_person"),
                                    trigger: "blur",
                                },
                            ]);
                            this.resetRule("identity_photo_c", []);
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
                            this.rules = Object.assign(
                                this.rulesC,
                                this.rulesAIn,
                                this.rulesA
                            );
                            this.resetRule("identity_name", [
                                {
                                    required: true,
                                    message: this.validMsg(
                                        "user.identity_name"
                                    ),
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
                    this.companyPositionChange();
                } else {
                    this.rules = this.rulesA;
                }
            },
            validMsg(name) {
                return this.$i18n.t("valid.required_field", [
                    this.$i18n.t(name),
                ]);
            },
            validMsg2(name) {
                return this.$i18n.t("valid.uploaded_field", [
                    this.$i18n.t(name),
                ]);
            },
            loadMerData() {
                this.loading = true;
                getMerInfo()
                    .then((res) => {
                        const { data } = res;
                        this.$data.info = data.info;
                        this.$data.hold_edit =
                            data.info.identity_validated ||
                            data.info.identity_status === 2;
                        this.loadIdentityData();
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            loadIdentityData() {
                this.loading = true;
                getMerIdentity()
                    .then((res) => {
                        const { data } = res;
                        let detailData = data.detail;
                        detailData.identity_country_type = "outland"; // 初始值
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
                            if (
                                this.$data.info.identity_account_type ===
                                "company"
                            ) {
                                this.$data.detail.identity_account_type =
                                    "company";
                            } else {
                                this.$data.detail.identity_account_type =
                                    "personal";
                            }
                        }
                        if (!isEmpty(this.$data.info.identity_country_type)) {
                            //type数据在info
                            if (
                                this.$data.info.identity_country_type ===
                                "inland"
                            ) {
                                this.$data.detail.identity_country_type =
                                    "inland";
                            } else {
                                this.$data.detail.identity_country_type =
                                    "outland";
                            }
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
            submitDetail() {
                this.$refs["detail"].validate((valid) => {
                    if (!valid) {
                        return false;
                    } else {
                        this.loading = true;
                        let formData = new FormData();
                        let params = this.detail;
                        Object.keys(params).forEach((key) => {
                            //把json转成FormData
                            formData.append(key, params[key]);
                            console.log(key + ": " + params[key] + "; ");
                        });
                        // updateIdentity(formData)
                        //     .then(() => {
                        //         this.$store
                        //             .dispatch("user/loadUserInfo")
                        //             .then(() => {
                        //                 this.loadMerData();
                        //             });
                        //     })
                        //     .finally(() => {
                        //         this.loading = false;
                        //     });
                    }
                });
            },
        },
    };
</script>
<style scoped></style>
