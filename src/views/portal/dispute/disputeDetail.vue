<template>
    <div v-loading="loading">

        <el-card>
            <div slot="header">
                <el-page-header @back="goBack()" :content="$t('dispute.dispute_email_detail')"
                                :title="$t('comm.go_back')"></el-page-header>
            </div>
            <el-main class="bg-light" v-if="disputeDetail.list.length > 0">
                <el-row :gutter="20" class="mb-5">
                </el-row>
                <div style="overflow-y: scroll;height:800px;"
                     ref="disputeBody">
                    <div v-for="(dispute,index) in disputeDetail.list" :key="index">
                        <el-row :gutter="20" class="mb-2 ml-2 mr-2" v-if="dispute.is_system === '0'">
                            <div class="d-flex align-items-start justify-content-start">
                                <div class="mb-n1 mr-1" style="width: 50px; height: 50px;">
                                    <el-avatar icon="el-icon-s-custom" :size="40" class="bg-blue"></el-avatar>
                                </div>
                                <el-card style="border-radius: 18px;font-size: 20px;">
                                    <div><span
                                            style="color:rgba(75.5,178.5,255,20)">{{$t('dispute.guest_email')}} </span>{{dispute.email}}
                                    </div>
                                    <el-divider></el-divider>
                                    <div><span style="color:rgba(75.5,178.5,255,20)">{{$t('dispute.send_time')}} </span>{{dispute.created}}
                                    </div>
                                    <el-divider></el-divider>
                                    <span style="color:rgba(75.5,178.5,255,20)">{{$t('dispute.mail_content')}} </span>
                                    <p>{{dispute.complaint_content}}</p>
                                </el-card>
                            </div>
                        </el-row>
                        <el-row :gutter="20" class="mb-2 ml-2 mr-2" v-if="dispute.is_system === '1'">
                            <div class="d-flex align-items-start justify-content-end">
                                <el-card style="border-radius: 18px;font-size: 20px;">
                                    <div><span
                                            style="color:rgba(75.5,178.5,255,20)">{{$t('dispute.guest_email')}} </span>{{dispute.email}}
                                    </div>
                                    <el-divider></el-divider>
                                    <div><span
                                            style="color:rgba(75.5,178.5,255,20)">{{$t('dispute.send_time')}}  </span>{{dispute.created}}
                                    </div>
                                    <el-divider></el-divider>
                                    <span style="color:rgba(75.5,178.5,255,20)">{{$t('dispute.mail_content')}} </span>
                                    <p>{{dispute.complaint_content}}</p>
                                </el-card>
                                <div class="mb-n1 ml-3" style="width: 50px; height: 50px;">
                                    <el-avatar icon="el-icon-user-solid" class="bg-secondary" :size="40"></el-avatar>
                                </div>
                            </div>
                        </el-row>
                    </div>
                </div>
            </el-main>
        </el-card>

        <!--处理按钮-->
        <el-card ref="disposeCard" v-if="disputeDetail.list.length > 0">
            <div class="text-center mt-3" v-show="dispose.isClose">
                <el-button :type="dispose.disposeType" class="mb-3 col-3" @click="open()">{{dispose.status}}
                </el-button>
                <div class="mb-2"><strong>{{dispose.msg}}</strong></div>
                <div class="mb-2"><small class="opacity-65">{{$t('dispute.btr_explain_a')}}</small></div>
            </div>
            <div class="text-center mt-3" v-show="!dispose.isClose">
                <div class="mb-2"><i class="el-icon-check text-success mr-1"></i><strong>{{dispose.msg}}</strong></div>
                <div class="mb-2"><small class="opacity-65">{{$t('dispute.btr_explain_b')}}</small></div>
            </div>
        </el-card>

        <!--争议关闭及商户解决过程描述-->
        <el-card>
            <!--填写争议表单-->
            <el-dialog :visible="refundDialogVisible" :title="$t('dispute.handling_result')" :show-close="false"
                       :close-on-click-modal="false">
                <el-form :model="disputeSubmitParams" :rules="rules" ref="disputeSubmitParams" label-width="100px"
                         class="demo-ruleForm" id="disputeAppendForm">
                    <el-input type="hidden" v-model="disputeSubmitParams.type"></el-input>
                    <el-form-item :label="$t('dispute.task_response')" prop="content" class="col-12">
                        <el-input type="textarea" :placeholder="$t('dispute.prompt_solution_information')"
                                  maxlength="270" show-word-limit :rows="4"
                                  v-model="disputeSubmitParams.content"></el-input>
                    </el-form-item>
                    <el-form-item>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" v-loading="loading">
                    <el-button size="mini" @click="closeDialog()">{{$t('comm.cancel')}}</el-button>
                    <el-button size="mini" type="primary" @click="submitForm('disputeSubmitParams')">
                        {{$t('comm.submit')}}
                    </el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
    import configs from '@/configs'
    import {disputeDetail, finishDispute, updateDispute} from '@/service/disputeSer';
    import {isEmpty} from "@/utils/validate";

    export default {
        name: "dispute_detail",
        computed: { //watch跟踪数据变化, 重点user, configs
            configs() {
                return configs;
            },
        },
        data() {
            return {
                loading: false, //加载效果
                dispute: '', //争议号
                disputeInfo: [], //争议单信息
                refundDialogVisible: false, //对话框显隐
                disputeDetail: {
                    list: [],
                    info: {}
                },
                disputeStatusParam: {dp_id: ''},
                disputeSubmitParams: {
                    dp_id: '',
                    content: '',
                },
                closeDialog() {
                    this.refundDialogVisible = false
                    this.$refs.disputeSubmitParams.resetFields();//重置
                }
                ,
                rules: {
                    content: [
                        {required: true, message: this.validMsg('dispute.dispute_content_is_null'), trigger: 'blur'},
                        {min: 1, max: 270, message: this.validMsg('dispute.error_msg_content_size'), trigger: 'blur'}
                    ]
                },
                dispose: {
                    msg: '',
                    disposeType: '',
                    status: '',
                    isClose: true
                },
                open() {
                    if (this.disputeDetail.info.dispute_status === 'complete') {
                        return false;
                    }
                    if (this.disputeDetail.info.dispute_status === 'underway') {
                        this.refundDialogVisible = true;
                        return false;
                    }
                    this.$confirm(this.validMsg('dispute.dispute_explain'), this.validMsg('dispute.hint'), {
                        confirmButtonText: this.validMsg('comm.sure'),
                        cancelButtonText: this.validMsg('comm.cancel'),
                        type: 'warning'
                    }).then(() => {
                        this.updateDispute();
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: this.validMsg('dispute.operation_canceled')
                        });
                    });
                },
            }
        },
        mounted() {
            /*跳转路由后获取请求参数*/
            if (!isEmpty(this.$route.params)) {
                this.dispute = this.$route.params.id;
                this.disputeStatusParam.dp_id = this.$route.params.id;
                this.disputeSubmitParams.dp_id = this.$route.params.id;
                this.disputeDetailSearch();
            } else {
                this.$message.error(this.$i18n.t('comm.fail').toString())
            }
        },
        methods: {
            disputeDetailSearch() {
                this.loading = true;
                disputeDetail(this.dispute).then(res => {
                    this.disputeDetail = res.data;
                    this.disposeDispute(this.disputeDetail.info.dispute_status);
                }).finally(() => {
                    this.loading = false;
                })
            },
            validMsg(name) {
                return this.$i18n.t((name));
            },
            clickSearch(tab) {
                this.searchParams.dispute_status = tab.name;
                this.search();
            },
            goBack() {
                this.$router.go(-1)
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        finishDispute(this.disputeSubmitParams).then(() => {
                            this.refundDialogVisible = false;
                            this.disputeDetailSearch();
                        }).finally(() => {
                            this.loading = false;
                        })
                    } else {
                        return false;
                    }
                });
            },
            disposeDispute(disputeStatus) {
                switch (disputeStatus) {
                    case 'untreated':
                        this.dispose = {
                            msg: this.validMsg('dispute.msg_handling_of_dispute'),
                            disposeType: 'primary',
                            status: this.validMsg('dispute.start_processing'),
                            isClose: true
                        };
                        break;
                    case 'underway':
                        this.dispose = {
                            msg: this.validMsg('dispute.msg_end_the_dispute'),
                            disposeType: 'primary',
                            status: this.validMsg('dispute.end_processing'),
                            isClose: true
                        };
                        break;
                    case 'complete':
                        this.dispose = {msg: this.validMsg('dispute.dispute_settled'), isClose: false};
                        break;
                }
            },
            updateDispute() {
                this.loading = true;
                updateDispute(this.disputeStatusParam).then(() => {
                    this.disputeDetailSearch();
                }).finally(() => {
                    this.loading = false;
                })
            }
        }
    }
</script>

<style scoped>

</style>
