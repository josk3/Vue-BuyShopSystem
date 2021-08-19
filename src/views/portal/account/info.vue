<template>
    <div v-loading="loading">
        <div class="row">
            <div class="col-12 mb-2">
                <el-card shadow="always" class="box-card p-3"
                         :body-style="{ padding: '0px' }">
                    <div class="text-muted p-0">
                        <i class="el-icon-info text-blue"></i> {{$t('user.mer_no')}}: <strong>{{ user.mer_no }}</strong>
                    </div>
                </el-card>
            </div>
        </div>
        <div class="wrap-tab p-0">
            <el-card class="box-card wpy-card mb-2" shadow="never" :body-style="{ padding: '0px' }">
                <div slot="header" class="clearfix">
                    <span>{{$t('account.base_info')}}</span>
                </div>
                <div>
                    <div v-if="info" class="row info-control-list">
                        <div class="col-6">
                            <div class="row">
                                <label class="col-4">{{$t('account.name_and_company')}}</label>
                                <div class="col-8"><span>{{info.name}}</span></div>
                            </div>
                            <div class="row">
                                <label class="col-4">
                                    <el-popover
                                            placement="top-start"
                                            width="200"
                                            trigger="hover"
                                            content="对接接口配置要使用">
                                        <span slot="reference">Md5Key <i class="el-icon-warning-outline"></i></span>
                                    </el-popover>
                                </label>
                                <div class="col-8">
                                    <ShowMoreBtn :txt="info.md5_key"></ShowMoreBtn>
                                </div>
                            </div>
                            <div class="row">
                                <label class="col-4">{{$t('account.register_time')}}</label>
                                <div class="col-8"><span>{{info.created | toDay}}</span></div>
                            </div>
                            <div class="row">
                                <label class="col-4">{{$t('account.online_time')}}</label>
                                <div class="col-8"><span>{{info.online_date | toDay }}</span></div>
                            </div>
                            <div class="row"><label class="col-4">{{$t('account.expire_time')}}</label>
                                <div class="col-8"><span>{{info.expire_date | toDay}}</span></div>
                            </div>
                            <div class="row"><label class="col-4">{{$t('account.settle_cycle')}}</label>
                                <div class="col-8"><span>{{info.settlement_cycle | settleCycle}}</span></div>
                            </div>
                            <div class="row"><label class="col-4">{{$t('comm.processing_fees')}}</label>
                                <div class="col-8"><span>{{info.fixed_fees | nullToLine}}USD</span>
                                </div>
                            </div>
                            <div class="row"><label class="col-4">{{$t('comm.fees')}}</label>
                                <div class="col-8"><span>{{info.fees_rate | tradeFeeStr}}</span>
                                </div>
                            </div>
                            <div class="row" v-if="other_info"><label class="col-4">{{$t('comm.currency')}}</label>
                                <div class="col-8"><span>{{other_info.trade_currencies}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="row"><label class="col-4">{{$t('account.ecm_current_month')}}</label>
                                <div class="col-8"><span>{{info.monitor_ecm | nullToLine}}</span></div>
                            </div>
                            <div class="row"><label class="col-4">{{$t('account.chargeback_count_current_month')}}</label>
                                <div class="col-8"><span>{{info.total_declined_num | nullToLine}}</span></div>
                            </div>
                            <div class="row"><label class="col-4">{{$t('account.ecm_account')}}</label>
                                <div class="col-8"><span>{{info.total_ecm | nullToLine}}</span></div>
                            </div>
                            <div class="row"><label class="col-4">{{$t('account.chargeback_count_account')}}</label>
                                <div class="col-8"><span>{{info.declined_num | nullToLine}}</span></div>
                            </div>
                            <div class="row"><label class="col-4">{{$t('account.ecm_last_month')}}</label>
                                <div class="col-8"><span>{{info.last_monthly_ecm | nullToLine}}</span></div>
                            </div>
                            <div class="row mb-0"><label class="col-4">{{$t('account.chargeback_fees')}}</label>
                                <div class="col-8"><span>{{info.chargeback_fees | nullToLine}}{{$t('account.chargeback_fees_info')}}</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-10 pl-1 pr-2 pb-2" v-if="ecmRuleData">
                                    <el-table class="ecm-list-table"
                                              :data="ecmRuleData"
                                              :show-header="false"
                                              :row-class-name="ecmMatchClass">
                                        <el-table-column
                                                prop="amount"
                                                width="90">
                                            <template v-slot="scope">
                                                {{scope.row.amount}}$/{{$t('account.per_order')}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column>
                                            <template v-slot="scope">
                                                <span v-if="scope.row.condition_ecm_l">
                                                    {{scope.row.condition_ecm_l}} &lt;
                                                </span>
                                                {{$t('account.ecm_condition_info[0]')}}
                                                <span v-if="scope.row.condition_ecm_r">
                                                    ≤ {{scope.row.condition_ecm_r}}
                                                </span>
                                                <span v-if="scope.row.condition_order_count">
                                                    Or
                                                   {{$t('account.ecm_condition_info[1]')}}≤
                                                {{scope.row.condition_order_count}}
                                                </span>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </el-card>
            <!--            -->
            <el-card class="box-card wpy-card mb-2" shadow="never" :body-style="{ padding: '0px' }">
                <div slot="header" class="clearfix">
                    <span>{{$t('bank.settle_bank')}}</span>
                </div>
                <div class="row">
                    <div class="col-7">
                        <div v-if="bank" class="info-control-list">
                            <div class="row"><label class="col-4">{{$t('bank.card_type')}}</label>
                                <div class="col-8"><span>{{bank.card_type_str}}</span></div>
                            </div>
                            <div class="row"><label class="col-4">{{$t('bank.name')}}</label>
                                <div class="col-8"><span>{{bank.card_account_name}}</span></div>
                            </div>
                            <div class="row"><label class="col-4">{{$t('bank.bank_name')}}</label>
                                <div class="col-8"><span>{{bank.bank_name}}</span></div>
                            </div>
                            <div class="row"><label class="col-4">{{$t('bank.card_no')}}</label>
                                <div class="col-8">
                                    <ShowMoreBtn :txt="bank.card_no"></ShowMoreBtn>
                                </div>
                            </div>
                            <div class="row"><label class="col-4">{{$t('bank.bank_card_mobile')}}</label>
                                <div class="col-8"><span>{{bank.bank_card_mobile}}</span></div>
                            </div>
                            <div class="row"><label class="col-4">{{$t('comm.created')}}</label>
                                <div class="col-8"><span>{{bank.created | toDay}}</span></div>
                            </div>
                        </div>
                        <div v-else>
                            <div class="p-3">
                                <el-button type="primary" plain @click="addBankBtn">
                                    {{$t('bank.add_bank')}}
                                </el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </el-card>
            <!--            -->
            <el-card class="box-card wpy-card mb-2" shadow="never" :body-style="{ padding: '0px' }">
                <div slot="header" class="clearfix">
                    <span>Api KEY</span>
                </div>
                <div class="row">
                    <div class="col-12 api-feature-soon">
                        <div class="feature-soon-lay">Api 功能很快将开放使用。</div>
                        <table class="table table-borderless">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Api Key</th>
                                <th scope="col">Api Secret</th>
                                <th scope="col">创建时间</th>
                                <th scope="col">最近使用</th>
                                <th scope="col">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>pok_xi3nf8sj1108yy</td>
                                <td><ShowMoreBtn txt="sti1ei31108yy"></ShowMoreBtn></td>
                                <td> -- </td>
                                <td> -- </td>
                                <td>
                                    <el-button size="mini">删除</el-button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </el-card>
            <!--    e   -->
        </div>

        <!--    d    -->
        <el-dialog custom-class="wpy-dialog md-dialog bg-body"
                   v-loading="loading"
                   top="20px"
                   @close="closeBankDialog"
                   :show-close="false" :close-on-click-modal="false"
                   :title="$t('bank.add_bank')"
                   :visible.sync="addBankDialogVisible">
            <div>
                <GroupNav v-show="info.identity_account_type === 'company'"
                          :list="bankTypeList" :active="activeName" @nav-click="bankTypeClick($event)"></GroupNav>
                <el-form ref="add_bank"
                         :model="add_bank"
                         :show-message="false"
                         :rules="rules" label-width="140px" class="pl-1 pr-3 pt-3 pb-0">
                    <el-form-item prop="name">
                        <template slot="label">
                            <el-popover
                                    placement="top-start"
                                    width="240"
                                    trigger="hover"
                                    content="银行卡所属于的姓名或公司名">
                                <span slot="reference">{{ $t('bank.name') }} <i
                                        class="el-icon-warning-outline"></i></span>
                            </el-popover>
                        </template>
                        <el-input v-model="add_bank.name" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item prop="bank_name">
                        <template slot="label">
                            <el-popover
                                    placement="top-start"
                                    width="240"
                                    trigger="hover"
                                    content="例如: 工商银行上海某某支行">
                                <span slot="reference">{{ $t('bank.bank_name') }} <i
                                        class="el-icon-warning-outline"></i></span>
                            </el-popover>
                        </template>
                        <el-input v-model="add_bank.bank_name"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('bank.card_no')" prop="card_no">
                        <el-input v-model="add_bank.card_no"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('bank.card_type')" prop="card_type">
                        <el-select v-model="add_bank.card_type" placeholder="请选择类型"
                                   filterable >
                            <el-option
                                    v-for="item in cardType"
                                    :key="item.value"
                                    :label="item.text"
                                    :value="item.value"
                                    :disabled="item.disabled">
                                <span style="float: left">{{ item.text }}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('bank.bank_card_mobile')" prop="bank_card_mobile">
                        <el-input v-model="add_bank.bank_card_mobile"></el-input>
                    </el-form-item>
                    <el-form-item v-show="add_bank.need_authorize"
                                  :label="$t('bank.authorize_photo')" prop="authorize_photo">
                        <UploadImgOnce txt="*企业授权书相关说明请联系客服" size="md"
                                       @img="updateAuthorizePhoto($event)"></UploadImgOnce>
                    </el-form-item>
                    <el-form-item :label="$t('bank.bank_swift_no_option')" prop="bank_swift_no">
                        <el-input v-model="add_bank.bank_swift_no"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="closeBankDialog()">{{$t('comm.cancel')}}</el-button>
                <el-button size="mini" type="primary" @click="submitAddBank">{{$t('comm.confirm_submit')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import configs from '@/configs'
    import user from "@/store/modules/user";
    import {mapState} from "vuex";
    import ShowMoreBtn from "@/components/ShowMoreBtn";
    import {addBank, getMerIdentity, getMerInfo} from "@/service/merchantSer";
    import {isEmpty} from "@/utils/validate";
    import GroupNav from "@/components/GroupNav";
    import UploadImgOnce from "@/components/UploadImgOnce";

    export default {
        name: "merchant_info",
        components: {UploadImgOnce, GroupNav, ShowMoreBtn},
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
                info: {},
                bank: {},
                detail: {},
                other_info: {},
                //-
                addBankDialogVisible: false,
                cardType: this.cardTypeList(),
                add_bank: this.initBankFormObj(),
                rules: {
                    name: [{required: true, message: '', trigger: 'blur'},],
                    bank_name: [{required: true, trigger: 'blur'},],
                    card_no: [{required: true, trigger: 'blur'},],
                    card_type: [{required: true, trigger: 'blur'},],
                    bank_card_mobile: [{required: true, trigger: 'blur'},],
                },
                //
                ecmRuleData: [],
                bankTypeList:[
                    {label: '对公', name: 'company'},
                    {label: '个人(法人)', name: 'personal'},
                ],
                activeName: 'company',
            }
        },
        mounted() {
            this.loadMerInfo();
        },
        methods: {
            ecmMatchClass(row) {
                if (!isEmpty(row) && !isEmpty(row.row.amount)
                    && row.row.amount === this.info.chargeback_fees) {
                    return 'ecm-current-row';
                }
                return '';
            },
            loadMerInfo() {
                this.loading = true
                getMerInfo().then(res => {
                    const {data} = res
                    this.$data.info = data.info
                    this.$data.other_info = data.other_info
                    this.$data.bank = data.bank
                    this.$data.ecmRuleData = data.ecm_rule
                    if (isEmpty(data.bank)) {
                        this.loadIdentity()
                    }
                }).finally(() => {
                    this.loading = false
                })
            },
            loadIdentity(){
                this.loading = true
                getMerIdentity().then(res => {
                    const {data} = res
                    this.$data.detail = data.detail
                }).finally(() => {
                    this.loading = false
                })
            },
            cardTypeList() {
                return [
                    {value: "00", text: "借记卡", disabled: true},
                    {value: "05", text: "基本户"},
                    {value: "06", text: "一般户"},
                ]
            },
            addBankBtn() {
                if (this.user.identity_status !== 1) {
                    this.$alert( this.$i18n.t('account.need_valid_identity_before').toString(), '', {
                        confirmButtonText: this.$i18n.t('comm.sure').toString(),
                    });
                } else {
                    this.openBankDialog('add', null)
                }
            },
            openBankDialog(action) {
                this.initBankForm()
                this.loadMerInfo()
                //
                this.typeChangeUpdateBank(this.info.identity_account_type)
                this.add_bank.action = action
                this.addBankDialogVisible = true
            },
            typeChangeUpdateBank(name){
                if (isEmpty(name)) return
                if (name === 'personal') {
                    this.add_bank.card_type = '00'
                    this.add_bank.name = this.detail.identity_name
                    this.cardType[0].disabled = false
                    this.cardType[1].disabled = true
                    this.cardType[2].disabled = true
                    this.add_bank.need_authorize = this.info.identity_account_type === 'company'; //认证企业但结算到个人
                }else {
                    this.cardType[0].disabled = true
                    this.cardType[1].disabled = false
                    this.cardType[2].disabled = false
                    this.add_bank.card_type = ''
                    this.add_bank.name = this.detail.company_name
                    this.add_bank.need_authorize = false
                }
                this.add_bank.mid_type = name
            },
            bankTypeClick(name){
                if (isEmpty(name)) return
                this.typeChangeUpdateBank(name)
                this.activeName = name
            },
            updateAuthorizePhoto(v) {
                this.add_bank.authorize_photo = v
            },
            initBankFormObj() {
                return {
                    mid_type: '',
                    action: '',
                    name: '',
                    bank_name: '',
                    card_no: '',
                    card_type: '',
                    bank_card_mobile: '',
                    bank_swift_no: '',
                    authorize_photo: '',
                    need_authorize: false,
                }
            },
            initBankForm() {
                this.add_bank = this.initBankFormObj()
            },
            closeBankDialog() {
                this.addBankDialogVisible = false
                this.$refs.add_bank.resetFields();//重置
            },
            submitAddBank() {
                this.$refs['add_bank'].validate((valid) => {
                    if (!valid) {
                        return false;
                    } else {
                        //
                        if (this.add_bank.need_authorize && isEmpty(this.add_bank.authorize_photo)) {
                            this.$message.error('请上传企业授权书')
                        }else {
                            if (this.add_bank.action === 'add') {//暂时不得修改，只能人工修改
                                this.$data.loading = true
                                let formData = new FormData();
                                let params = this.add_bank;
                                Object.keys(params).forEach((key) => { //把json转成FormData
                                    formData.append(key, params[key]);
                                });
                                addBank(formData).then(() => {
                                    this.$message.success(this.$i18n.t('comm.success').toString())
                                    this.loadMerInfo()
                                    this.closeBankDialog()
                                }).finally(() => {
                                    this.$data.loading = false
                                })
                            }
                        }
                    }
                });
            },
            //-------
        },
    }
</script>

<style>
    .ecm-list-table tr {
        border: 0;
    }
    .ecm-list-table::before{
        display: none;
    }

    .ecm-list-table td {
        border: 0;
        padding: 2px 0;
        font-size: 13px;
    }

    .ecm-list-table .ecm-current-row {
        font-weight: bold;
        font-size: 15px;
    }
    .api-feature-soon{
        position: relative;
    }
    .api-feature-soon table{
        opacity: 0.3;
        color: #666;
    }
    .feature-soon-lay{
        position: absolute;
        top: 0;
        width: 100%;
        background: rgba(105,105,105 ,0.5);
        height: 100%;
        text-align: center;
        padding-top: 40px;
        color: #fff;
        font-size: 19px;
        z-index: 2;
    }
</style>
