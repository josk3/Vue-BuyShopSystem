<template>
    <div v-loading="loading">

        <el-card>
            <!--工单对话栏-->
            <div slot="header" class="clearfix">
                <span>工单详情</span>
            </div>
            <div class="card-header" v-if="ticketDetailRsp">
                <!--聊天框头部-->
                <div class="chat-header border-bottom py-4 py-lg-6 px-lg-8 mb-3">
                    <div class="container-xxl">
                        <div class="row align-items-center">
                            <!-- Close chat(mobile) -->
                            <div class="col-3 d-xl-none">
                                <ul class="list-inline mb-0">
                                    <li class="list-inline-item">
                                        <a class="text-muted px-0" href="#" data-chat="open">
                                            <i class="icon-md fe-chevron-left"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-6 col-xl-6">
                                <div class="media text-center text-xl-left">
                                    <div class="mr-4 ml-1">
                                    </div>

                                    <div class="media-body align-self-center text-truncate">
                                        <h6 class="text-truncate">商户4008</h6>
                                        <small class="text-muted">4008</small>
                                        <small class="text-muted mx-2"> • </small>
                                        <small class="text-muted">结算问题</small>
                                    </div>
                                </div>
                            </div>

                            <!-- Chat toolbar -->
                            <div class="col-3 col-xl-6 text-right">
                                <ul class="nav justify-content-end">
                                    <li class="nav-item list-inline-item d-none d-xl-block mr-5">
                                        <a class="nav-link text-muted px-3" data-toggle="collapse"
                                           data-target="#chat-1-search" href="#" title="Search this chat">
                                            <i class="icon-md fe-search"></i>
                                        </a>
                                    </li>

                                    <li class="nav-item list-inline-item d-none d-xl-block mr-3">
                                        <a class="nav-link text-muted px-3" href="#"
                                           data-chat-sidebar-toggle="#chat-1-members" title="Add People">
                                            <i class="icon-md fe-user-plus"></i>
                                        </a>
                                    </li>

                                    <li class="nav-item list-inline-item d-none d-xl-block mr-0">
                                        <a class="nav-link text-muted px-3" href="#"
                                           data-chat-sidebar-toggle="#chat-1-info" title="Details">
                                            <i class="icon-md fe-more-vertical"></i>
                                        </a>
                                    </li>

                                    <!-- Mobile nav -->
                                    <li class="nav-item list-inline-item d-block d-xl-none">
                                        <div class="dropdown">
                                            <a class="nav-link text-muted px-0" href="#" data-toggle="dropdown"
                                               aria-haspopup="true" aria-expanded="false">
                                                <i class="icon-md fe-more-vertical"></i>
                                            </a>
                                            <div class="dropdown-menu">
                                                <a class="dropdown-item d-flex align-items-center"
                                                   data-toggle="collapse" data-target="#chat-1-search" href="#">
                                                    Search <span class="ml-auto pl-5 fe-search"></span>
                                                </a>

                                                <a class="dropdown-item d-flex align-items-center" href="#"
                                                   data-chat-sidebar-toggle="#chat-1-info">
                                                    Chat Info <span class="ml-auto pl-5 fe-more-horizontal"></span>
                                                </a>

                                                <a class="dropdown-item d-flex align-items-center" href="#"
                                                   data-chat-sidebar-toggle="#chat-1-members">
                                                    Add Members <span class="ml-auto pl-5 fe-user-plus"></span>
                                                </a>
                                            </div>
                                        </div>
                                    </li>
                                    <!-- Mobile nav -->
                                </ul>
                            </div>
                        </div><!-- .row -->

                    </div>
                </div>
                <!--聊天框主体-->
                <div class="py-6 py-lg-10 mb-3" v-for="(detailInfo,index) in ticketDetailRsp" :key="index">
                    <div class="d-flex align-items-start justify-content-start" v-if="detailInfo.is_system === 0 ">
                        <div class="group text-center mr-1 mr-lg-4">
                            <div class="mb-n1" style="width: 50px; height: 50px;"><i
                                    class="el-icon-user fa-3x "></i></div>
                            <div class="" style="font-size: 12px;">{{detailInfo.operator}}</div>
                        </div>
                        <div class="message-body">
                            <div class="message-row rounded">
                                <div class="d-flex align-items-center ">
                                    <div>
                                        <!--管理者文字内容部分-->
                                        <div class="bg-white p-4 mb-2"
                                             style="border-radius:2px .625rem .625rem  .625rem;">
                                            <div class="text-bold">{{detailInfo.content}}
                                            </div>
                                            <div class="mt-1">
                                                <small class="opacity-65">{{detailInfo.create_time}}</small>
                                            </div>
                                            <div class="mt-1">
                                                <small class="opacity-65">{{detailInfo.current_dist}}</small>
                                            </div>
                                        </div>
                                        <!--管理者图片部分-->
                                        <div class="d-flex align-items-center bg-light p-4 justify-content-start"
                                             v-if="detailInfo.attach">
                                            <div>
                                                <h6 class="mb-2">附件(点击图片查看详情):</h6>
                                                <div class="form-row py-3">
                                                    <div class="col">
                                                        <el-image
                                                                style="width:220px;"
                                                                class="img-fluid rounded"
                                                                :src="detailInfo.attach"
                                                                :preview-src-list="[detailInfo.attach]"
                                                        >
                                                            <div slot="error" style="display: flex;justify-content: center; align-items: center;width: 100%;height: 100%;background: #CCCCCC;
                                                               color: #000000;font-size: 14px;">
                                                                <i class="el-icon-picture-outline"></i>
                                                            </div>
                                                        </el-image>
                                                    </div>
                                                </div>

                                                <div class="mt-1">
                                                    <small class="opacity-65">{{detailInfo.current_dist}}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="message message-right">
                        <!-- Message: body -->
                        <div class="message-body">
                            <!-- Message: row -->
                            <div class="message-row">
                                <div class="d-flex align-items-start justify-content-end"
                                     v-if="detailInfo.is_system === 1 ">
                                    <div>
                                        <!--商户文字内容部分-->
                                        <div class="text-gray p-4 mb-2"
                                             style="border-radius: .625rem .625rem 2px .625rem;">
                                            <div>{{detailInfo.content}}
                                            </div>
                                            <div class="mt-1">
                                                <small class="opacity-65">{{detailInfo.create_time}}</small>
                                            </div>
                                            <div class="mt-1">
                                                <small class="opacity-65">{{detailInfo.current_dist}}</small>
                                            </div>
                                        </div>
                                        <!--商户图片部分-->
                                        <div class="d-flex align-items-center bg-light p-4 justify-content-end"
                                             v-if="detailInfo.attach">
                                            <div>
                                                <h6 class="mb-2">附件(点击图片查看详情):</h6>
                                                <div class="form-row py-3">
                                                    <div class="col">
                                                        <el-image
                                                                style="width:220px;"
                                                                class="img-fluid rounded"
                                                                :src="detailInfo.attach"
                                                                :preview-src-list="[detailInfo.attach]"
                                                        >
                                                            <div slot="error" style="display: flex;justify-content: center; align-items: center;width: 100%;height: 100%;background: #CCCCCC;
                                                               color: #000000;font-size: 14px;">
                                                                <i class="el-icon-picture-outline"></i>
                                                            </div>
                                                        </el-image>
                                                    </div>
                                                </div>

                                                <div class="mt-1">
                                                    <small class="opacity-65">{{detailInfo.current_dist}}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="group ml-1 ml-lg-4 text-center">
                                        <div class="mb-n1" style="width: 50px; height: 50px;"><i
                                                class="el-icon-s-custom fa-3x "></i><!----></div>
                                        <div style="font-size: 12px;">{{detailInfo.user_name}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--回复工单-->
            <el-card id="ticketForm" v-show="isCloseTicket" class="bg-light">
                <div slot="header">
                    <span>回复工单</span>
                </div>
                <el-form :model="ticketFormParams" ref="ticketFormParams" :rules="rules" label-width="100px"
                         class="demo-ruleForm">
                    <el-form-item class="ml-4">
                        <el-popconfirm @onConfirm="closeTicket()" title="您确定关闭工单吗？关闭后不可恢复">
                            <el-button type="info" slot="reference">关闭工单</el-button>
                        </el-popconfirm>
                    </el-form-item>
                    <el-form-item label="内容:" prop="content" class="col-9">
                        <el-input class="ml-2" type="textarea" placeholder="请输入内容" maxlength="100" show-word-limit
                                  :rows="2"
                                  v-model="ticketFormParams.content"></el-input>
                    </el-form-item>
                    <el-divider></el-divider>
                    <el-form-item label="附件:" prop="attach" class="col-9">
                        <el-upload
                                class="ml-2"
                                :class="{uoloadSty:showBtnImg,disUoloadSty:noneBtnImg}"
                                id="accessory"
                                action="#"
                                :http-request="httpRequest"
                                name="attach"
                                list-type="picture-card"
                                :before-upload="beforeAvatarUpload"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove"
                                :limit="limitCountImg"
                                :multiple="false"
                                :on-change="imgChange"
                                :on-exceed="handleExceedNorm">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="附件">
                        </el-dialog>
                        <p class="col-9 ">
                            可上传<span> 1 </span>个附件<br/>
                            每个附件大小不得超过<span> 5 </span>MB,<br/>
                            附件支持的格式有:<span>'JPG','BMP','PNG','GIF','TIF'</span>
                        </p>
                    </el-form-item>
                    <el-form-item prop="attach" class="col-9">
                        <el-button class="ml-2" type="primary" style="margin-top: 12px;"
                                   @click="formSubmit('ticketFormParams')">提交
                        </el-button>
                        <el-button @click="resetForm('ticketFormParams')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-card>
    </div>
</template>

<script>
    import {ticketReply, ticketDetailInfo} from '@/service/ticketDetailSer';

    export default {
        name: "ticket_detail",
        data() {
            return {
                ticket_id: this.$route.query.id,
                showBtnImg: true,
                noneBtnImg: false,
                limitCountImg: 1,   //上传图片的最大数量
                loading: false,
                dialogVisible: false,
                isCloseTicket: true, //当前工单状态
                subParam: '', //工单提交参数
                fileList: [], //后期如果多文件上传扩展
                //表单验证
                rules: {
                    content: [
                        {required: true, message: '内容不能为空', trigger: 'blur'},
                        {min: 1, max: 100, message: '内容限制100字以下,请酌情精简内容', trigger: 'blur'}
                    ]
                },
                dialogImageUrl: '',
                ticketFormParams: {
                    content: '',
                    attach: ''
                },
                ticketDetailRsp: []
            }
        },
        mounted() {
            this.getTicketDetail();
        },
        methods: {
            /*工单详情信息*/
            getTicketDetail() {
                ticketDetailInfo(this.ticket_id).then(res => {
                    const {data} = res;
                    console.log(data);
                    this.ticketDetailRsp = data.list;
                }).finally(() => {
                    this.loading = false;
                })
            },
            /*图片组变更事件*/
            imgChange(file, fileList) {
                //如果当前图片组数量等于或大于限定上传图片数就隐藏上传按钮
                this.noneBtnImg = fileList.length >= this.limitCountImg;
            },
            /*图片上传事件-删除*/
            handleRemove(file, fileList) {
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
                    this.$message.error('上传图片只能是 JPG、BMP、TIF、GIF、PNG 格式!');
                }
                if (!isLt5M) {
                    this.$message.error('上传图片大小不能超过 5MB!');
                }
                return isPictureFormat && isLt5M;
            },
            /*图片上传事件-超过设置图片上传数*/
            handleExceedNorm() {
                this.$message.error(`超过图片限制,最多只可上传 1 张图片!`);
            },
            httpRequest(param) {
                this.subParam = new FormData();
                this.fileList.push(param.file);
                let images = [...this.fileList];
                //遍历图片集合
                images.forEach((img, index) => {
                    this.subParam.append(`img_${index}`, img) // 把单个图片重命名，存储起来（给后台）
                })
            }, formSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        if (this.subParam == undefined || this.subParam == '' || this.subParam == null) {
                            this.subParam = new FormData();
                        }
                        this.subParam.append('content', this.ticketFormParams.content);
                        ticketReply(this.$data.track_form).then(() => {
                            this.$message.success(this.$i18n.t('comm.success').toString())
                        }).finally(() => {
                            this.$data.loading = false
                        });
                        //回复完刷新聊天框列表
                        this.getTicketDetail();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }, closeTicket() {
                this.isCloseTicket = false; //已关闭回复表单
                this.$message.success(`工单已成功关闭!`);
            },
            /*工单表单重置*/
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
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