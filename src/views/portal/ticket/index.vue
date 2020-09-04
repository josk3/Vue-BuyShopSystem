<template>
    <div v-loading="loading">
        <!--顶部卡片-->
        <el-card class="box-card mb-1">
            <div slot="header" class="clearfix">
                <span>技术工单</span>
            </div>
            <!--工单步骤栏-->
            <el-steps :active="active" finish-status="success">
                <el-step title="提交问题"></el-step>
                <el-step title="填写问题内容"></el-step>
                <el-step title="受理问题单"></el-step>
            </el-steps>

            <!--选取工单类型-->
            <div id="ticketCaseCard" class="box-card mb-1 mt-3" v-show="active=='1'">
                <div class="mb-3">
                    <el-select v-model="ticketFormParams.caseId" placeholder="选择问题">
                        <el-option
                                v-for="item in options"
                                :key="item.caseId"
                                :label="item.label"
                                :value="item.caseId">
                        </el-option>
                    </el-select>
                </div>
                <div class="mb-2"><strong>订单 、退款 、拒付等相关问题</strong></div>
                <div class="mb-2"><small class="opacity-65">专项问题由专项人员答疑,快速帮你解决遇到的问题</small></div>

                <el-button type="primary" style="margin-top: 12px;" @click="progressNext">下一步</el-button>
            </div>
        </el-card>
        <!--工单列表-->
        <el-card v-show="active=='1'">
            <div slot="header">
                <span>我的工单</span>
            </div>
            <!--工单列表-->
            <el-table
                    :data="ticketDataRsp.list">
                <el-table-column
                        label="工单编号"
                >
                    <template slot-scope="scope">
                        <router-link target="_blank" :to="{path:'/ticketDetail',query:{tk_id:scope.row.ticket_no}}">
                            <span style="color:deepskyblue;">{{scope.row.ticket_no}}</span>
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="标题">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="邮箱">
                </el-table-column>
                <el-table-column
                        prop="case_question"
                        label="问题分类">
                    <template v-slot="scope">
                        {{scope.row.case_question | ticketQuestionStatus }}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="ticket_status"
                        label="工单状态">
                    <template v-slot="scope">
                        {{scope.row.ticket_status | ticketStatus }}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="priority"
                        label="优先级">
                    <template v-slot="scope">
                        {{scope.row.priority | ticketPriority }}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="create_time"
                        label="创建时间">
                </el-table-column>
                <el-table-column
                        prop="update_time"
                        label="修改时间">
                </el-table-column>
            </el-table>
            <div class="block">
                <Pagination :page="ticketDataRsp.page" @change="pageChange"></Pagination>
            </div>
        </el-card>
        <!--返回上一步-->
        <el-card v-show="active=='2'">
            <el-page-header @back="goBack" title="上一步"></el-page-header>
        </el-card>
        <!--提交工单表单-->
        <el-card id="ticketForm" v-show="active=='2'" class="bg-light">
            <div slot="header">
                <span>填写工单</span>
            </div>
            <el-form :model="ticketFormParams" ref="ticketFormParams" :rules="rules" label-width="100px"
                     class="demo-ruleForm">
                <el-form-item label="优先级:" prop="priority" class="col-9">
                    <el-radio class="ml-2" v-model="ticketFormParams.priority" label="1">一般</el-radio>
                    <el-radio v-model="ticketFormParams.priority" label="2">紧急</el-radio>
                </el-form-item>
                <el-form-item label="邮箱:" prop="email" class="col-5">
                    <el-input placeholder="请填写邮箱,为方便后续及时联系到您" v-model="ticketFormParams.email"></el-input>
                </el-form-item>
                <el-form-item label="标题:" prop="title" class="col-5">
                    <el-input placeholder="请拟标题" v-model="ticketFormParams.title" maxlength="15"
                              show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="问题描述:" prop="content" class="col-9">
                    <el-input type="textarea" placeholder="请输入内容" maxlength="100" show-word-limit :rows="2"
                              v-model="ticketFormParams.content"></el-input>
                </el-form-item>
                <el-form-item label="附件:" prop="attach" class="col-9">
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
                    <el-button type="primary" style="margin-top: 12px;"
                               @click="formSubmit('ticketFormParams')">提交
                    </el-button>
                    <el-button @click="resetForm('ticketFormParams')">重置</el-button>
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
                        <span class="ml-1">提交成功！</span></p>
                    <small>您提交的问题已经受理.
                        <router-link target="_blank" :to="{path:'/ticketDetail',query:{tk_id:ticket_id}}">查看详情&nbsp;<i
                                class="el-icon-right"></i></router-link>
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
                //表单验证
                rules: {
                    priority: [
                        {required: true, message: '请依实际情况选择处理优先级', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请填写邮箱', trigger: 'blur'},
                        {
                            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                            message: '邮箱格式不正确,请重新填写',
                            trigger: 'blur'
                        }
                    ],
                    title: [
                        {required: true, message: '标题不能为空', trigger: 'blur'},
                        {min: 1, max: 15, message: '标题限制15字以下,请酌情精简', trigger: 'blur'}
                    ],
                    content: [
                        {required: true, message: '内容不能为空', trigger: 'blur'},
                        {min: 1, max: 100, message: '内容限制100字以下,请酌情精简内容', trigger: 'blur'}
                    ]
                },
                ticketFormParams: {
                    priority: '1', //单选默认1,表示‘一般’
                    email: '',
                    title: '',
                    content: '',
                    caseId: '',
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
                    caseId: 'OTHER',
                    label: '订单问题'
                }, {
                    caseId: 'ORDER',
                    label: '对接接口'
                }, {
                    caseId: 'INTERFACE',
                    label: '财务结算'
                }, {
                    caseId: 'SETTLEMENT',
                    label: '其他'
                }]
            }
        },
        mounted() {
            this.ticketSearch();
        },
        methods: {
            /*进入下一步骤*/
            progressNext() {
                //判断是否选择问题类型
                if (this.ticketFormParams.caseId == undefined || this.ticketFormParams.caseId == null || this.ticketFormParams.caseId == '') {
                    this.$message.error('请选择要咨询的问题类型!');
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
            },
            /*工单表单重置*/
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            /*回退到上一步骤*/
            goBack() {
                this.active = this.active - 1;
                console.log('go back');
            },
            /*表单上传*/
            formSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //加载等待
                        this.loading = true;
                        let _this = this.ticketFormParams;
                        if (this.subParam == undefined || this.subParam == '' || this.subParam == null) {
                            this.subParam = new FormData();
                        }
                        this.subParam.append('email', _this.email);
                        this.subParam.append('content', _this.content);
                        /*// 赋予提交请求头，格式为：'multipart/form-data'（必填）
                        let config = {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }*/
                        // 然后通过下面的方式把内容通过axios来传到后台
                        /* axios.post('/ApiUrl?s=/api/sudoku/uploadClock', this.subParam, config).then(function (result) {
                             console.log(result)
                         })*/
                        ticketCreate(this.subParam).then(res => {
                            this.ticket_id = res.data.ticket_id;
                            //下一步
                            this.active++;
                        }).finally(() => {
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
