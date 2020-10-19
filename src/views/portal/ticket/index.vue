<template>
    <div v-loading="loading">
        <!--顶部卡片-->
        <el-card class="box-card mb-1">
            <div slot="header" class="clearfix">
                <span>{{$t('nav.support_ticket')}}</span>
            </div>
            <!--工单步骤栏-->
            <el-steps :active="active" finish-status="success">
                <el-step :title="$t('ticket.submit_a_question')"></el-step>
                <el-step :title="$t('ticket.fill_in_the_question')"></el-step>
                <el-step :title="$t('ticket.acceptance_of_question_sheet')"></el-step>
            </el-steps>

            <!--选取工单类型-->
            <div id="ticketCaseCard" class="box-card mb-1 mt-3" v-show="active=='1'">
                <div class="mb-3">
                    <el-select v-model="ticketFormParams.case_id" :placeholder="$t('ticket.select_question')">
                        <el-option
                                v-for="item in options"
                                :key="item.case_id"
                                :label="$t('ticket.' + item.label)"
                                :value="item.case_id">
                        </el-option>
                    </el-select>
                </div>
                <div class="mb-2"><strong>{{$t('ticket.ticket_subtitle')}}</strong></div>
                <div class="mb-2"><small class="opacity-65">{{$t('ticket.ticket_detail_description')}}</small></div>

                <el-button type="primary" style="margin-top: 12px;" @click="progressNext">{{$t('comm.setup_next')}}
                </el-button>
            </div>
        </el-card>
        <!--工单列表-->
        <el-card v-show="active=='1'">
            <div slot="header">
                <span>{{$t('ticket.my_ticket')}}</span>
            </div>
            <!--工单列表-->
            <el-table
                    :data="ticketDataRsp.list">
                <el-table-column
                        :label="$t('ticket.ticket_no')"
                        width="160"
                >
                    <template slot-scope="scope">
                        <router-link :to="{name:'ticket_detail',params:{id:scope.row.tk_id}}" class="btn-link">
                            {{scope.row.tk_id}}
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="title"
                        :label="$t('ticket.title')">
                </el-table-column>
                <el-table-column
                        prop="email"
                        :show-overflow-tooltip="true"
                        :label="$t('ticket.email')">
                </el-table-column>
                <el-table-column
                        :label="$t('ticket.question_type')">
                    <template v-slot="scope">
                        {{scope.row.question_value | ticketQuestionStatus }}
                    </template>
                </el-table-column>
                <el-table-column
                        :label="$t('ticket.status')">
                    <template v-slot="scope">
                        {{scope.row.ticket_value | ticketStatus }}
                    </template>
                </el-table-column>
                <el-table-column
                        :label="$t('ticket.priority')">
                    <template v-slot="scope">
                        {{scope.row.priority | ticketPriority }}
                    </template>
                </el-table-column>
                <el-table-column
                        :label="$t('comm.created')">
                    <template v-slot="scope">
                        {{scope.row.created | toDay}}
                    </template>
                </el-table-column>
                <el-table-column
                        :label="$t('comm.updated')">
                    <template v-slot="scope">
                        {{scope.row.updated | toDay}}
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <Pagination :page="ticketDataRsp.page" @change="pageChange"></Pagination>
            </div>
        </el-card>
        <!--返回上一步-->
        <el-card v-show="active=='2'">
            <el-page-header @back="goBack" :title="$t('comm.go_back')"></el-page-header>
        </el-card>
        <!--提交工单表单-->
        <el-card id="ticketForm" v-show="active=='2'" class="bg-light">
            <div slot="header">
                <span>{{$t('ticket.fill_in_the_ticket')}}</span>
            </div>
            <el-form :model="ticketFormParams" ref="ticketFormParams" :rules="rules" label-width="100px"
                     class="demo-ruleForm">
                <el-form-item :label="$t('ticket.priority')" prop="priority" class="col-9">
                    <el-radio class="ml-2" v-model="ticketFormParams.priority" label="1">{{$t("ticket.plain")}}
                    </el-radio>
                    <el-radio v-model="ticketFormParams.priority" label="2">{{$t("ticket.urgent")}}</el-radio>
                </el-form-item>
                <el-form-item :label="$t('ticket.email')" prop="email" class="col-5">
                    <el-input :placeholder="$t('ticket.hint_email')" disabled
                              v-model="ticketFormParams.email"></el-input>
                </el-form-item>
                <el-form-item :label="$t('ticket.title')" prop="title" class="col-5">
                    <el-input :placeholder="$t('ticket.hint_title')" v-model="ticketFormParams.title" maxlength="15"
                              show-word-limit></el-input>
                </el-form-item>
                <el-form-item :label="$t('ticket.content')" prop="content" class="col-9">
                    <el-input type="textarea" :placeholder="$t('ticket.hint_content')" maxlength="100" show-word-limit
                              :rows="4"
                              v-model="ticketFormParams.content"></el-input>
                </el-form-item>
                <el-form-item :label="$t('ticket.attach')" prop="attach" class="col-9">
                    <el-upload
                            :class="{uoloadSty:showBtnImg,disUoloadSty:noneBtnImg}"
                            id="accessory"
                            action="#"
                            :http-request="httpRequest"
                            name="attach"
                            list-type="picture-card"
                            :before-upload="beforeAvatarUpload"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove" :limit="1"
                            :multiple="false"
                            :on-change="imgChange"
                            :on-exceed="handleExceedNorm"
                            accept=".png,.jpg,.gif,.bmp,.tif"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-progress v-if="percentage >= 0" :percentage="percentage" status="success"></el-progress>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl">
                    </el-dialog>
                    <p class="col-9 ml-n3">
                        {{$t('ticket.affix_condition')}}
                    </p>
                </el-form-item>
                <el-form-item prop="attach" class="col-9 mt-n4">
                    <el-button type="primary" style="margin-top: 12px;"
                               @click="formSubmit('ticketFormParams')">{{$t('comm.submit')}}
                    </el-button>
                    <el-button @click="resetForm('ticketFormParams')">{{$t('comm.reset')}}</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <!--步骤三提交成功页面-->
        <el-card v-show="active=='3'">
            <div class="d-flex justify-content-center">
                <div class="m-md-5">
                    <p>
                        <el-icon class="el-icon-check"
                                 style="border:1px solid mediumseagreen;border-radius:50%;color:mediumseagreen;"></el-icon>
                        <span class="ml-1">{{$t('comm.submitted')}}</span></p>
                    <small>{{$t('ticket.hint_ticket_have_entertained')}}
                        <router-link :to="{name:'ticket_detail',params:{id:ticket_id}}" class="btn-link">
                            {{$t('comm.view_detail')}}&nbsp;<i class="el-icon-right"></i>
                        </router-link>
                    </small>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import configs from '@/configs'
    import user from "@/store/modules/user";
    import {search} from '@/service/ticketSer';
    import Pagination from "@/components/Pagination";
    import {ticketCreate} from '@/service/ticketSer';
    import {isEmpty} from "@/utils/validate";

    export default {
        name: "ticket",
        components: {Pagination},
        computed: { //watch跟踪数据变化, 重点user, configs
            configs() {
                return configs;
            },
            user() {
                return user.state.user;
            },
        },
        data() {
            return {
                ticket_id: '', //工单号
                loading: false,  //加载
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false,
                showBtnImg: true,
                noneBtnImg: false,
                limitCountImg: 1,   //上传图片的最大数量
                percentage: -1,  //上传进度条
                //表单验证
                rules: {
                    priority: [
                        {required: true, message: this.validMsg('ticket.error_msg_priority'), trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: this.validMsg('ticket.error_msg_email_is_null'), trigger: 'blur'},
                        {
                            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                            message: this.validMsg('ticket.error_msg_email_format'),
                            trigger: 'blur'
                        }
                    ],
                    title: [
                        {required: true, message: this.validMsg('ticket.error_msg_title_is_null'), trigger: 'blur'},
                        {min: 1, max: 15, message: this.validMsg('ticket.error_msg_title_size'), trigger: 'blur'}
                    ],
                    content: [
                        {required: true, message: this.validMsg('ticket.error_msg_content_is_null'), trigger: 'blur'},
                        {min: 1, max: 100, message: this.validMsg('ticket.error_msg_title_size'), trigger: 'blur'}
                    ]
                },
                ticketFormParams: {
                    priority: '1', //单选默认1,表示‘一般’
                    email: '',
                    title: '',
                    content: '',
                    case_id: '',
                    attach: ''
                },
                subParam: '', //工单提交参数
                fileList: [], //后期如果多文件上传扩展
                ticketParams: {
                    page: 1,
                },
                ticketDataRsp: {
                    list: [],
                    page: {
                        page_num: 0, //当前页
                        page_size: 0, //总页
                        total: 0, //工单总数
                    }
                },
                active: 1,   //控制进度&控制页面内容显隐
                options: [{
                    case_id: 'OTHER',
                    label: 'order'
                }, {
                    case_id: 'ORDER',
                    label: 'interface'
                }, {
                    case_id: 'INTERFACE',
                    label: 'settlement'
                }, {
                    case_id: 'SETTLEMENT',
                    label: 'other'
                }]
            }
        },
        mounted() {
            this.buildFormEmail();
            this.ticketSearch();
        },
        methods: {
            /*进入下一步骤*/
            progressNext() {
                //判断是否选择问题类型
                if (this.ticketFormParams.case_id == undefined || this.ticketFormParams.case_id == null || this.ticketFormParams.case_id == '') {
                    let errorMsg = this.validMsg('ticket.question_type_is_null');
                    this.$message.error(errorMsg);
                    return false;
                }
                //进入下一步骤
                if (this.active++ > 2) {
                    this.active = 0
                }

            },
            /*工单查询*/
            ticketSearch() {
                search(this.ticketParams).then(res => {
                    const {data} = res
                    this.$data.ticketDataRsp = data
                }).finally(() => {
                    this.loading = false
                })
            },
            validMsg(name) {
                return this.$i18n.t((name));
            },
            pageChange(page) {
                this.ticketParams.page = page.page_num
                this.ticketSearch()
            },
            imgChange(file, fileList) {
                //当前图片组数量大于限定上传图片数隐藏上传按钮
                this.noneBtnImg = fileList.length >= this.limitCountImg;
            },
            /*图片上传事件-删除*/
            handleRemove(file, fileList) {
                //触发删除事件检索图片组是否存在空余空间,并显示上传按钮
                this.noneBtnImg = fileList.length >= this.limitCountImg;
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            /*图片上传事件-验证*/
            beforeAvatarUpload(file) {
                const isPictureFormat = file.type === 'image/jpeg' || file.type === 'image/bmp' || file.type === 'image/tif' || file.type === 'image/gif' || file.type === 'image/png';
                const isLt5M = file.size / 1024 / 1024 < 5;
                if (!isPictureFormat) {
                    this.$message.error(this.validMsg('ticket.error_msg_img_format'));
                }
                if (!isLt5M) {
                    this.$message.error(this.validMsg('ticket.error_msg_img_size'));
                }
                return isPictureFormat && isLt5M;
            },
            /*图片上传事件-超过设置图片上传数*/
            handleExceedNorm() {
                this.$message.error(this.validMsg('ticket.error_msg_img_count'));
            },
            httpRequest(param) {
                this.fileList.push(param.file);
            },
            /*工单表单重置*/
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.buildFormEmail();
            },
            /*回退到上一步骤*/
            goBack() {
                this.active = this.active - 1;
            },
            /*绑定表单邮箱*/
            buildFormEmail() {
                if (!isEmpty(this.user.email)) {
                    this.ticketFormParams.email = this.user.email;
                } else {
                    this.$message.error(this.$i18n.t('comm.fail').toString())
                }
            },
            /*上传图片回调进度*/
            progressCallback(n) {
                this.percentage = n;
            }
            ,
            /*表单上传*/
            formSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //加载等待
                        this.loading = true;
                        let _this = this.ticketFormParams;
                        this.subParam = new FormData();
                        let images = [...this.fileList];
                        //遍历图片集合
                        images.forEach((img) => {
                            this.subParam.append(`file`, img) // 把单个图片重命名，存储起来（给后台）
                        })
                        this.subParam.append('email', _this.email);
                        this.subParam.append('content', _this.content);
                        this.subParam.append('title', _this.title);
                        this.subParam.append('case_id', _this.case_id);
                        this.subParam.append('priority', _this.priority);
                        ticketCreate(this.subParam, this.progressCallback).then(res => {
                            this.ticket_id = res.data.ticket_id;
                            //下一步
                            this.active++;
                        }).finally(() => {
                            this.percentage = -1;
                            this.loading = false
                        })
                    } else {
                        return false;
                    }
                });
            }
        }
    }


</script>

<style>
    .uoloadSty .el-upload--picture-card {
        width: 110px;
        height: 110px;
        line-height: 110px;
    }

    .disUoloadSty .el-upload--picture-card {
        display: none; /* 上传按钮隐藏 */
    }
</style>
