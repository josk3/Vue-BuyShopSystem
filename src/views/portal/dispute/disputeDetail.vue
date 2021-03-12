<template>
    <div v-loading="loading">

        <el-card class="mb-3 mt-1" body-style="background-color: rgb(253,241,217)">
            <!-- 返回-->
            <div slot="header">
                <el-page-header @back="goBack()" :content="$t('dispute.dispute_email_detail')"
                                :title="$t('comm.go_back')"></el-page-header>
            </div>
            <div class="d-flex align-items-start justify-content-start">
                <div class="mb-n1 mr-1">
                    <small class="text-danger">温馨提示：</small>
                </div>
                <div class="media-body align-self-center text-truncate">
                    <div class="text-truncate"><small>1.后台不具备邮件转发功能,请商户自行联系持卡人,并将回复内容添加到投诉后台,方便我司人员跟进。</small></div>
                    <div class="text-truncate"><small>2.为了减少拒付给商户带来的不必要损失和影响通道使用,超过2个工作日未处理的投诉订单，将会做强制退款处理,请悉知！</small>
                    </div>
                </div>
            </div>
        </el-card>

        <el-card style="border-top: 3px rgb(233,109,99) solid">
            <el-main v-if="disputeDetail.list.length > 0">
                <!--工单步骤栏-->
                <el-steps :active="dispose.progress" finish-status="finish" process-status="process">
                    <el-step :title="$t('dispute.first_step_handling_complaint_mail')"
                             :description="disputeDetail.info.created_fmt"></el-step>
                    <el-step :title="$t('dispute.second_step_in_communicating')"
                             :description="disputeDetail.info.created_fmt"></el-step>
                    <el-step :title="$t('dispute.third_step_submit_solved_case')"
                             :description="disputeDetail.info.updated_fmt"></el-step>
                </el-steps>

                <div ref="disputeBody">
                    <div v-for="(dispute,index) in disputeDetail.list" :key="index">
                        <el-divider></el-divider>
                        <el-row :gutter="20" class="mb-2 ml-2 mr-2" v-if="dispute.is_system === '0'">
                            <div>
                                <div class="d-flex align-items-center justify-content-start">
                                    <div class="mb-n1 mr-1" style="width: 50px; height: 50px;">
                                        <el-avatar icon="el-icon-s-custom" :size="40" class="bg-blue"></el-avatar>
                                    </div>
                                    <div class="media-body align-self-center text-truncate">
                                        <h6 class="text-truncate">持卡人投诉邮件</h6>
                                        <small class="text-muted">{{dispute.email}}</small>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-end text-muted">
                                        <i class="el-icon-time mr-2 text-gray"></i> {{dispute.created}}
                                    </div>
                                </div>
                                <el-divider></el-divider>
                                <div style="font-size: 14px;">
                                    <p style="overflow-wrap: break-word;">{{dispute.complaint_content}}</p>
                                </div>
                                <!-- 是否有下载文件-->
<!--                                <div class="mt-4">-->
<!--                                    <el-button>-->
<!--                                        <div class="d-flex align-items-center justify-content-start p-2"-->
<!--                                             style="background-color: #F2F8FF">-->
<!--                                            <div style="width: 50px; height: 50px;">-->
<!--                                                <el-avatar icon="el-icon-document"-->
<!--                                                           style="font-size: 24px;background-color: #468FF7;"-->
<!--                                                           shape="square" :size="50"></el-avatar>-->
<!--                                            </div>-->
<!--                                            <div class="media-body align-self-center col-6 text-center">-->
<!--                                                <div class="text-primary"><small>文件名称</small></div>-->
<!--                                                <small class="text-muted">246KB</small>-->
<!--                                            </div>-->
<!--                                            <div class="d-flex align-items-center col-3 justify-content-end"><i-->
<!--                                                    class="el-icon-download" style="font-size: 22px;"></i></div>-->
<!--                                        </div>-->
<!--                                    </el-button>-->
<!--                                </div>-->
                            </div>
                        </el-row>
                        <el-row :gutter="20" class="mb-2 ml-2 mr-2" v-if="dispute.is_system === '1'">
                            <div>
                                <div class="d-flex align-items-center justify-content-start">
                                    <div class="mb-n1 mr-1" style="width: 50px; height: 50px;">
                                        <el-avatar icon="el-icon-user-solid" :size="40"
                                                   class="bg-secondary"></el-avatar>
                                    </div>
                                    <div class="media-body align-self-center text-truncate">
                                        <h6 class="text-truncate">商户回复持卡人邮件</h6>
                                        <small class="text-muted">{{dispute.email}}</small>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-end text-muted">
                                        <i class="el-icon-time mr-2 text-gray"></i> {{dispute.created}}
                                    </div>
                                </div>

                                <el-divider></el-divider>
                                <div style="font-size: 14px;">
                                    <p>{{dispute.complaint_content}}</p>
                                </div>
                                <!-- 是否有下载文件-->
                                <div class="mt-4">
                                    <el-button>
                                        <div class="d-flex align-items-center justify-content-start p-2"
                                             style="background-color: #F2F8FF">
                                            <div style="width: 50px; height: 50px;">
                                                <el-avatar icon="el-icon-document"
                                                           style="font-size: 24px;background-color: #468FF7;"
                                                           shape="square" :size="50"></el-avatar>
                                            </div>
                                            <div class="media-body align-self-center col-6 text-center">
                                                <div class="text-primary"><small>文件名称</small></div>
                                                <small class="text-muted">246KB</small>
                                            </div>
                                            <div class="d-flex align-items-center col-3 justify-content-end"><i
                                                    class="el-icon-download" style="font-size: 22px;"></i></div>
                                        </div>
                                    </el-button>
                                </div>
                            </div>
                        </el-row>
                    </div>
                </div>
                <el-divider></el-divider>

                <!-- 投诉解决栏-->
                <el-card v-show="dispose.isClose !== 'complete'">
                    <div class="media-body align-self-center" style="color: #468FF7;">
                        <div class="text-truncate"><small>{{dispose.msg}}</small></div>
                    </div>

                    <!--处理按钮-->
                    <div ref="disposeCard" v-if="disputeDetail.list.length > 0">
                        <div class="mt-3" v-show="dispose.isClose==='untreated'">
                            <el-button :type="dispose.disposeType" class="mb-3 " @click="open()">联系持卡人</el-button>
                            <small class="ml-2">链接：<a href="http://www.hao123.com/mail" target="_blank"
                                                      style="color:#468FF7;">http://www.hao123.com/mail</a></small>
                        </div>
                        <div class="text-center mt-3" v-show="dispose.isClose==='underway'">
                            <el-form :model="disputeSubmitParams" :rules="rules" ref="disputeSubmitParams"
                                     label-width="100px"
                                     class="demo-ruleForm" id="disputeAppendForm">
                                <el-input type="hidden" v-model="disputeSubmitParams.type"></el-input>
                                <el-input type="textarea" :placeholder="$t('dispute.prompt_solution_information')"
                                          maxlength="1000" show-word-limit :rows="6"
                                          v-model="disputeSubmitParams.content"></el-input>
                                <el-form-item>
                                </el-form-item>
                            </el-form>
                            <div class="dialog-footer text-right" v-loading="loading">
                                <el-button type="primary" @click="submitForm('disputeSubmitParams')">
                                    {{$t('comm.submit')}}
                                </el-button>
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-main>
        </el-card>

        <!--争议关闭及商户解决过程描述-->
        <el-card>
            <!--填写争议表单-->
            <el-dialog :visible="refundDialogVisible" title="温馨提醒说明" :show-close="false"
                       custom-class="wpy-dialog sm-dialog"
                       :close-on-click-modal="false" width="25%">
                <p>请商户自行联系持卡人，并将您与持卡人沟通的详细内容描述出来，提交到我司后台,方便我司后台工单人员对您的订单的一个跟进跟维护，给您的生意起到保驾护航的作用。</p>
                <div slot="footer" class="dialog-footer" v-loading="loading">
                    <el-button size="mini" @click="closeDialog()">{{$t('comm.cancel')}}</el-button>
                    <el-button size="mini" type="primary" @click="updateDispute">
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
                        {min: 1, max: 1000, message: this.validMsg('dispute.error_msg_content_size'), trigger: 'blur'}
                    ]
                },
                dispose: {
                    msg: '',
                    disposeType: '',
                    status: '',
                    isClose: '',
                    progress: 0
                },
                open() {
                    if (this.disputeDetail.info.dispute_status === 'untreated') {
                        this.refundDialogVisible = true;
                    }
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
                            msg: this.validMsg('您可点击按钮去处理投诉邮件'),
                            disposeType: 'primary',
                            status: this.validMsg('dispute.start_processing'),
                            isClose: 'untreated',
                            progress: 1
                        };
                        break;
                    case 'underway':
                        this.dispose = {
                            msg: this.validMsg('请您描述处理的投诉结果（描述的是真实有效的）并提交到我司后台,方便我司人员跟进。'),
                            disposeType: 'primary',
                            status: this.validMsg('dispute.end_processing'),
                            isClose: 'underway',
                            progress: 2
                        };
                        break;
                    case 'complete':
                        this.dispose = {
                            msg: this.validMsg('dispute.dispute_settled'),
                            isClose: 'complete',
                            progress: 3
                        };
                        break;
                }
            },
            updateDispute() {
                this.loading = true;
                updateDispute(this.disputeStatusParam).then(() => {
                    this.refundDialogVisible = false;
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
