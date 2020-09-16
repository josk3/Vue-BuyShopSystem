<template>
    <div v-loading="loading">

        <el-card>
            <div slot="header">
                <el-page-header @back="goBack()" content="投诉邮件详情" title="返回"></el-page-header>
            </div>
            <el-main class="bg-light ">
                <el-row :gutter="20" class="mb-5">
                    <!-- <el-col :span="12" :offset="6">
                         <div class="text-center mb-2" @click="showSpillContent()">
                             <i class="el-icon-time"></i>
                             <el-link style="color: rgb(76, 179, 255);">下拉可查看历史消息
                             </el-link>
                         </div>
                         <div class="text-center"><span
                                 style="border:1px solid #CFD6E0;background-color:#CFD6E0;color:rgba(115,131,137,18);border-radius: 30px;padding:3px 6px;">2020年12月18日 15:56:23</span>
                         </div>
                     </el-col>-->
                </el-row>
                <div style="overflow-y: scroll;height:800px;"
                     ref="disputeBody">
                    <div v-for="(dispute,index) in disputeDetail" :key="index">
                        <el-row :gutter="20" class="mb-2 ml-2 mr-2" v-if="dispute.is_system === '0'">
                            <div class="d-flex align-items-start justify-content-start">
                                <div class="mb-n1 mr-1" style="width: 50px; height: 50px;">
                                    <el-avatar icon="el-icon-s-custom" :size="40" class="bg-blue"></el-avatar>
                                </div>
                                <el-card style="border-radius: 18px;font-size: 20px;">
                                    <div><span style="color:rgba(75.5,178.5,255,20)">商户邮件E-mail: </span>{{dispute.email}}
                                    </div>
                                    <el-divider></el-divider>
                                    <div><span style="color:rgba(75.5,178.5,255,20)">发送时间: </span>{{dispute.created}}
                                    </div>
                                    <el-divider></el-divider>
                                    <span style="color:rgba(75.5,178.5,255,20)">邮件内容: </span>
                                    <p>{{dispute.complaint_content}}</p>
                                </el-card>
                            </div>
                        </el-row>
                        <el-row :gutter="20" class="mb-2 ml-2 mr-2" v-if="dispute.is_system === '1'">
                            <div class="d-flex align-items-start justify-content-end">
                                <el-card style="border-radius: 18px;font-size: 20px;">
                                    <div><span style="color:rgba(75.5,178.5,255,20)">持卡人邮件E-mail: </span>{{dispute.email}}
                                    </div>
                                    <el-divider></el-divider>
                                    <div><span style="color:rgba(75.5,178.5,255,20)">发送时间: </span>{{dispute.created}}
                                    </div>
                                    <el-divider></el-divider>
                                    <span style="color:rgba(75.5,178.5,255,20)">邮件内容: </span>
                                    <p>{{dispute.complaint_content}}</p>
                                </el-card>
                                <div class="mb-n1 ml-3" style="width: 50px; height: 50px;">
                                    <el-avatar icon="el-icon-user-solid" :size="40"></el-avatar>
                                </div>
                            </div>
                        </el-row>
                    </div>
                </div>
            </el-main>
        </el-card>

        <!--处理按钮-->
        <el-card ref="disposeCard">
            <div class="text-center mt-3">
                <el-button :type="dispose.disposeType" class="mb-3 col-3" @click="open()">{{dispose.status}}
                </el-button>
                <div class="mb-2"><strong>{{dispose.msg}}</strong></div>
                <div class="mb-2"><small class="opacity-65">此处按钮利于跟进投诉进度,望如实操作</small></div>
            </div>
        </el-card>

        <!--投诉关闭及商户解决过程描述-->
        <el-card>
            <!--<div slot="header" class="clearfix">
                <strong></strong>
            </div>-->
            <!--填写投诉表单-->
            <el-dialog :visible="refundDialogVisible" title="处理结果描述" :show-close="false" :close-on-click-modal="false">
                <el-form :model="disputeSubmitParams" :rules="rules" ref="disputeSubmitParams" label-width="100px"
                         class="demo-ruleForm" id="disputeAppendForm">
                    <el-input type="hidden" v-model="disputeSubmitParams.type"></el-input>
                    <el-form-item label="商户邮箱" prop="email" class="col-10">
                        <el-input placeholder="请填写邮箱,为方便后续及时联系" v-model="disputeSubmitParams.email"></el-input>
                    </el-form-item>
                    <el-form-item label="完成情况" prop="content" class="col-12">
                        <el-input type="textarea" placeholder="请输入解决情况" maxlength="270" show-word-limit :rows="4"
                                  v-model="disputeSubmitParams.content"></el-input>
                    </el-form-item>
                    <el-form-item>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" v-loading="loading">
                    <el-button size="mini" @click="closeDialog()">取消</el-button>
                    <el-button size="mini" type="primary" @click="submitForm('disputeSubmitParams')">提交</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
    import {disputeDetail, appendDispute, disputeInfo, updateDispute} from '@/service/disputeSer';

    export default {
        name: "index",
        data() {
            return {
                loading: false, //加载效果
                dispute: this.$route.query.id, //投诉号
                currentDisputeStatus: '', //当前投诉状态值
                refundDialogVisible: false, //对话框显隐
                disputeDetail: [],
                disputeSubmitParams: {
                    type: 'appendDetail',
                    email: '',
                    content: '',
                },
                closeDialog() {
                    this.refundDialogVisible = false
                    this.$refs.disputeSubmitParams.resetFields();//重置
                }
                ,
                rules: {
                    email: [
                        {required: true, message: '请填写邮箱', trigger: 'blur'},
                        {
                            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                            message: '邮箱格式不正确,请重新填写',
                            trigger: 'blur'
                        }
                    ],
                    content: [
                        {required: true, message: '投诉内容不能为空', trigger: 'blur'},
                        {min: 1, max: 270, message: '内容限制270字以下,请酌情精简内容', trigger: 'blur'}
                    ]
                },
                dispose: {
                    msg: '',
                    disposeType: '',
                    status: ''
                },
                open() {
                    if (this.currentDisputeStatus === 'COMPLETE') {
                        return false;
                    }
                    if (this.currentDisputeStatus === 'UNDERWAY') {
                        this.refundDialogVisible = true;
                        return false;
                    }
                    this.$confirm('根据实际投诉进度,确认是否进入下阶段?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.updateDispute();
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '操作已取消'
                        });
                    });
                },
            }
        },
        mounted() {
            this.disputeStatus();
            this.disputeDetailSearch();
        },
        methods: {
            disputeDetailSearch() {
                this.loading = true;
                disputeDetail(this.dispute).then(res => {
                    console.log(res);
                    this.disputeDetail = res.data;
                }).finally(() => {
                    this.loading = false;
                })
            }, clickSearch(tab) {
                this.searchParams.dispute_status = tab.name;
                this.search();
            }, goBack() {
                this.$router.go(-1)
            }, submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        appendDispute(this.disputeSubmitParams).then(() => {
                            this.disputeDetailSearch();
                        }).finally(() => {
                            this.loading = false;
                        })
                    } else {
                        return false;
                    }
                });
            }, disposeDispute(disputeStatus) {
                switch (disputeStatus) {
                    case 'UNTREATED':
                        this.dispose = {msg: '尊敬商户如您已知悉投诉内容,请点击\'处理投诉\'按钮', disposeType: 'info', status: '开始处理'};
                        break;
                    case 'UNDERWAY':
                        this.dispose = {msg: '尊敬商户如您已联系客户并解决问题,请点击\'结束处理\'按钮', disposeType: 'primary', status: '结束处理'};
                        break;
                    case 'COMPLETE':
                        this.dispose = {msg: '投诉已处理!', disposeType: 'success', status: '处理完成'};
                        break;
                }
            }, disputeStatus() {
                this.loading = true;
                disputeInfo().then(res => {
                    let status = res.data.statusValue;
                    this.currentDisputeStatus = status;
                    this.disposeDispute(status);
                }).finally(() => {
                    this.loading = false;
                })
            }, updateDispute() {
                this.loading = true;
                updateDispute().then(() => {
                    this.disputeStatus();
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