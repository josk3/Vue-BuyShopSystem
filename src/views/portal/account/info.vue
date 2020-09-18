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
                    <span>基础信息</span>
                </div>
                <div>
                    <div v-if="info" class="row info-control-list">
                        <div class="col-6">
                            <div class="row">
                                <label class="col-4">姓名/企业</label>
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
                                <label class="col-4">注册时间</label>
                                <div class="col-8"><span>{{info.created | toDay}}</span></div>
                            </div>
                            <div class="row">
                                <label class="col-4">开通时间</label>
                                <div class="col-8"><span>{{info.online_date | toDay }}</span></div>
                            </div>
                            <div class="row"><label class="col-4">过期时间</label>
                                <div class="col-8"><span>{{info.expire_date | nullToLine}}</span></div>
                            </div>
                            <div class="row"><label class="col-4">结算日</label>
                                <div class="col-8"><span>{{info.settlement_cycle | settleCycle}}</span></div>
                            </div>
                            <div class="row"><label class="col-4">风控处理率</label>
                                <div class="col-8"><span>USD{{info.fixed_fees | nullToLine}}</span>
                                </div>
                            </div>
                            <div class="row"><label class="col-4">交易手续率</label>
                                <div class="col-8"><span>{{info.fees_rate | tradeFeeStr}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="row"><label class="col-4">拒付率(当前月份)</label>
                                <div class="col-8"><span>{{info.monitor_ecm | nullToLine}}</span></div>
                            </div>
                            <div class="row"><label class="col-4">当月拒付笔数</label>
                                <div class="col-8"><span>{{info.total_declined_num | nullToLine}}</span></div>
                            </div>
                            <div class="row"><label class="col-4">拒付率(总交易)</label>
                                <div class="col-8"><span>{{info.total_ecm | nullToLine}}</span></div>
                            </div>
                            <div class="row"><label class="col-4">总拒付笔数</label>
                                <div class="col-8"><span>{{info.declined_num | nullToLine}}</span></div>
                            </div>
                            <div class="row"><label class="col-4">拒付率(上个月)</label>
                                <div class="col-8"><span>{{info.last_monthly_ecm | nullToLine}}</span></div>
                            </div>
                            <div class="row"><label class="col-4">拒付处理费</label>
                                <div class="col-8"><span>{{info.chargeback_fees | nullToLine}}美元, 每个自然月1号更新</span>
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
                            <div class="row"><label class="col-4">{{$t('comm.status')}}</label>
                                <div class="col-8"><span>{{bank.status | validStatus}}</span></div>
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

        </div>

        <!--    d    -->
        <el-dialog custom-class="wpy-dialog md-dialog bg-body"
                   @close="closeBankDialog"
                   :show-close="false" :close-on-click-modal="false"
                   :title="$t('bank.add_bank')"
                   :visible.sync="addBankDialogVisible">
            <div>
                <el-form ref="add_bank"
                         :model="add_bank"
                         :show-message="false"
                         status-icon
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
                                   filterable clearable>
                            <el-option
                                    v-for="item in cardType"
                                    :key="item.value"
                                    :label="item.text"
                                    :value="item.value">
                                <span style="float: left">{{ item.text }}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('bank.bank_card_mobile')" prop="bank_card_mobile">
                        <el-input v-model="add_bank.bank_card_mobile"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('bank.bank_swift_no_option')" prop="bank_swift_no">
                        <el-input v-model="add_bank.bank_swift_no"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer" v-loading="loading">
                <el-button size="mini" @click="closeBankDialog()">取消</el-button>
                <el-button size="mini" type="primary" @click="submitAddBank">确认提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import configs from '@/configs'
    import user from "@/store/modules/user";
    import {mapState} from "vuex";
    import ShowMoreBtn from "@/components/ShowMoreBtn";
    import {addBank, getMerInfo} from "@/service/merchantSer";

    export default {
        name: "merchant_info",
        components: {ShowMoreBtn},
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

            }
        },
        mounted() {
            this.loadMerInfo();
            this.add_bank.name = this.user.full_name
        },
        methods: {
            loadMerInfo() {
                this.loading = true
                getMerInfo().then(res => {
                    const {data} = res
                    this.$data.info = data.info
                    this.$data.bank = data.bank
                }).finally(() => {
                    this.loading = false
                })
            },
            cardTypeList() {
                return [
                    {value: "00", text: "借记卡"},
                    {value: "05", text: "基本户"},
                    {value: "06", text: "一般户"},
                ]
            },
            addBankBtn() {
                if (this.user.identifier_status !== 1) {
                    this.$alert('请先完成账户激活认证', '', {
                        confirmButtonText: '确定',
                    });
                } else {
                    this.openBankDialog('add', null)
                }
            },
            openBankDialog(action) {
                this.initBankForm()
                this.add_bank.action = action
                this.addBankDialogVisible = true
            },
            initBankFormObj() {
                return {
                    action: '',
                    name: '',
                    bank_name: '',
                    card_no: '',
                    card_type: '',
                    bank_card_mobile: '',
                    bank_swift_no: '',
                    file: ''
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
                        if (this.add_bank.action === 'add') {
                            this.$data.loading = true
                            addBank(this.add_bank).then(() => {
                                this.$message.success(this.$i18n.t('comm.success').toString())
                                this.loadMerInfo()
                                this.closeBankDialog()
                            }).finally(() => {
                                this.$data.loading = false
                            })
                        }
                    }
                });
            },
            //-------
        },
    }
</script>

<style scoped>

</style>
