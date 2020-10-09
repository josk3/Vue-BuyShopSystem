<template>
    <div v-loading="loading">
        <div class="delivery-list">
            <SearchBox :params="searchParams" @search="search"></SearchBox>
            <div class="wrap-tab p-0">
                <el-card class="box-card box-pane" shadow="never" :body-style="{ padding: '0px' }">
                    <div class="row">
                        <div class="col-8 pr-0" style="background-color: #F5F7FA">
                            <el-tabs type="border-card">
                            </el-tabs>
                        </div>
                        <div class="col-4 text-right p-0" style="background-color: #F5F7FA">
                            <div class="mr-5 mt-1 mb-1">
                                <el-button icon="el-icon-upload2" size="mini" class="mr-3"
                                           @click="uploadTrackDialogVisible = true" plain>{{$t('comm.batch_upload')}}
                                </el-button>
                                <el-button icon="el-icon-download" size="mini"
                                           @click="downDelivery" plain>{{ $t('comm.download') }}
                                </el-button>
                            </div>
                        </div>
                    </div>
                    <el-table
                            :class="tabData.list.length ? '' : 'wpy-z-table'"
                            :data="tabData.list"
                            :header-row-style="{background:'#2C2E2F'}"
                            style="width: 100%">
                        <el-table-column
                                prop="trade_id"
                                :label="$t('comm.trade_id')" width="210px">
                        </el-table-column>
                        <el-table-column
                                prop="customer.email"
                                :show-overflow-tooltip="true"
                                :label="$t('comm.email')">
                        </el-table-column>
                        <el-table-column
                                prop="merchant_order_no"
                                :show-overflow-tooltip="true"
                                :label="$t('comm.merchant_order_no')">
                        </el-table-column>
                        <el-table-column
                                prop="payment_time"
                                :label="$t('comm.payment_time')">
                            <template v-slot="scope">
                                {{scope.row.payment_time | toDay }}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="pay_status"
                                :label="$t('comm.status')">
                            <template v-slot="scope">
                            <span class="pay-status" :class="['ps-' + scope.row.pay_status]">
                                {{scope.row.pay_status | payStatus}}
                            </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="track_number"
                                :show-overflow-tooltip="true"
                                :label="$t('comm.track_number')">
                            <template v-slot="scope">
                                <div v-if="scope.row.track_number">
                                    {{scope.row.track_number }}
                                </div>
                                <div v-else>
                                    <el-button type="text" @click="addTrackDialog(scope.$index, scope.row)">
                                        {{$t('shipment.add_shop')}}
                                    </el-button>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column width="50" fixed="right">
                            <template v-slot="scope">
                                <el-dropdown trigger="click">
                                      <span class="el-dropdown-link">
                                          <i class="el-icon-more"></i>
                                      </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item v-if="scope.row.track_number">
                                            <el-button type="text"
                                                       @click="editTrackDialog(scope.$index, scope.row)">
                                                {{$t('comm.update')}} {{scope.row.track_number}}
                                            </el-button>
                                        </el-dropdown-item>
                                        <el-dropdown-item v-if="!scope.row.track_number">
                                            <el-button type="text"
                                                       @click="addTrackDialog(scope.$index, scope.row)">
                                                {{$t('shipment.add_shop')}}
                                            </el-button>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>

                    <Pagination :page="tabData.page" @change="pageChange"></Pagination>
                </el-card>

                <!--                -->


                <!--                -->
            </div>
            <el-dialog custom-class="wpy-dialog sm-dialog"
                       :show-close="false" :close-on-click-modal="false"
                       :title="$t('shipment.add_track_info')"
                       @close="closeDialog"
                       :visible.sync="trackNumberDialogVisible">
                <div>
                    <el-form ref="track_form"
                             :model="track_form"
                             :rules="rules" label-width="80px">
                        <el-form-item :label="$t('comm.trade_id')">
                            <el-input :value="track_form.trade_id" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('shipment.track_brand')" prop="track_brand">
                            <el-select v-model="track_form.track_brand" ：placeholder="$t('shipment.track_brand')" filterable>
                                <el-option v-for="brand in track_brand_all" :key="brand.value"
                                           :label="brand.text" :value="brand.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('shipment.track_number')" prop="track_number">
                            <el-input v-model="track_form.track_number"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div slot="footer" class="dialog-footer" v-loading="loading">
                    <el-button size="mini" @click="closeDialog">{{$t('comm.cancel')}}</el-button>
                    <el-button size="mini" type="primary" @click="submitTrackNumber">{{$t('comm.submit')}}</el-button>
                </div>
            </el-dialog>

            <el-dialog custom-class="wpy-dialog sm-dialog bg-body"
                       :show-close="false" :close-on-click-modal="false"
                       :title="$t('shipment.batch_upload_track_info')"
                       @close="closeUploadExcelDialog"
                       :visible.sync="uploadTrackDialogVisible">
                <div>
                    <el-card shadow="hover" class="box-card p-3 mb-3"
                             :body-style="{ padding: '0px' }">
                        <div class="text-muted p-0">
                            <i class="el-icon-info text-blue"></i> {{$t('shipment.upload_excel_file_info')}}
                        </div>
                    </el-card>
                    <div class="text-center">
                        <el-form ref="track_upload" label-width="80px">
                            <!--   accept="image/*" , :http-request="upload"  -->
                            <el-upload
                                    class="text-center m-auto track_excel pb-3"
                                    :class="trackExcelUploadEnable ? 'showFileBox' : 'hideFileBox'"
                                    ref="track_excel"
                                    drag
                                    action=""
                                    name="track_excel"
                                    accept=".xls,.xlsx"
                                    :limit="1"
                                    :on-change="changeTrackExcelFile"
                                    :on-remove="removeTrackExcelFile"
                                    :auto-upload="false">
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text" >{{$t('comm.upload_file_drag_click[0]')}}<em>{{$t('comm.upload_file_drag_click[1]')}}</em></div>
                                <div class="el-upload__tip" slot="tip">{{$t('shipment.upload_excel_max_500')}}</div>
                            </el-upload>
                        </el-form>
                        <el-progress v-if="percentage >= 0" :percentage="percentage" status="success"></el-progress>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer" v-loading="loading">
                    <el-button size="mini" @click="closeUploadExcelDialog">{{$t('comm.cancel')}}</el-button>
                    <el-button size="mini" type="primary" @click="uploadTrackFile">{{$t('comm.upload')}}</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import configs from '@/configs'
    import SearchBox from "@/components/SearchBox";
    import Pagination from "@/components/Pagination";
    import {deliveryAdd, deliveryDownload, deliverySearch, deliveryUpload, getTrackBrands} from "@/service/deliverySer";
    import {isEmpty} from "@/utils/validate";

    export default {
        name: "delivery",
        components: {SearchBox, Pagination},
        computed: { //watch跟踪数据变化, 重点user, configs
            configs() {
                return configs;
            },
        },
        data() {
            return {
                loading: false,
                trackNumberDialogVisible: false,
                track_form: this.initFormObj(),
                track_brand_all: [],
                rules: {
                    track_number: [
                        {required: true, message: '请输入物流单号', trigger: 'blur'},
                    ],
                    track_brand: [
                        {required: true, message: '请选择物流公司', trigger: 'blur'},
                    ],
                },
                searchParams: {
                    title: 'nav.delivery_manage', page: 1,
                    trade_id: '', merchant_order_no: '', email: '',
                },
                tabData: {list: [], page: {count: 0, page_num: 0, total: 0}},
                percentage: -1,
                trackExcelFile: '',
                uploadTrackDialogVisible: false,
                trackExcelUploadEnable: true,
            }
        },
        mounted() {
            this.search();
        },
        methods: {
            closeUploadExcelDialog() {
                this.trackExcelFile = null
                this.trackExcelUploadEnable = true
                this.uploadTrackDialogVisible = false
                this.$refs.track_excel.clearFiles();//重置
            },
            removeTrackExcelFile() {
                this.trackExcelFile = null
                this.trackExcelUploadEnable = true
            },
            changeTrackExcelFile(e) {
                //this.$refs.upload_img.uploadFiles //all file list
                this.trackExcelFile = e.raw
                this.trackExcelUploadEnable = false //只上传一个文件
            },
            progressCallback(n) {
                this.percentage = n
            },
            uploadTrackFile() {
                if (isEmpty(this.trackExcelFile)) {
                    this.$message.error('请先选择上传文件')
                } else {
                    let formData = new FormData();
                    formData.append("action", "upload_track_excel_file");
                    formData.append("file", this.trackExcelFile);
                    this.loading = true
                    deliveryUpload(formData, this.progressCallback).then(() => {
                        this.closeUploadExcelDialog()
                        this.$message.success(this.$i18n.t('comm.success').toString())
                        this.search();//reload page
                    }).finally(() => {
                        this.percentage = - 1
                        this.loading = false
                    })
                }
            },
            initFormObj() {
                return {action: '', index: '', trade_id: '', track_number: '', track_brand: ''};
            },
            closeDialog() {
                this.trackNumberDialogVisible = false
                this.$refs['track_form'].resetFields();//重置
                this.$refs['track_form'].clearValidate();//重置
            },
            pageChange(page) {
                this.searchParams.page = page.page_num
                this.search()
            },
            search() {
                this.loading = true
                deliverySearch(this.searchParams).then(res => {
                    const {data} = res
                    this.$data.tabData = data
                }).finally(() => {
                    this.loading = false
                })
            },
            showTrackDialog(action, index, row) {
                if (isEmpty(this.track_brand_all) || this.track_brand_all.length <= 0) {
                    this.$data.loading = true
                    getTrackBrands().then(res => {
                        const {data} = res
                        this.$data.track_brand_all = data.list
                    }).finally(() => {
                        this.$data.loading = false
                    })
                }
                this.trackNumberDialogVisible = true
                this.$nextTick(() => {
                    if (row.trade_id !== this.$data.track_form.trade_id) {
                        this.initTrackFormData()
                    }
                    this.track_form.action = action
                    this.track_form.index = index
                    this.track_form.trade_id = row.trade_id
                    if (action === 'edit') {
                        this.track_form.track_brand = row.track_brand
                        this.track_form.track_number = row.track_number
                    }
                });
            },
            editTrackDialog(index, row) {
                this.showTrackDialog('edit', index, row)
            },
            addTrackDialog(index, row) {
                this.showTrackDialog('add', index, row)
            },
            initTrackFormData() {
                this.track_form = this.initFormObj()
            },
            submitTrackNumber() {
                this.$refs['track_form'].validate((valid) => {
                    if (!valid) {
                        return false;
                    } else {
                        //
                        this.$data.loading = true
                        let row = this.$data.tabData.list[this.$data.track_form.index]
                        deliveryAdd(this.$data.track_form).then(() => {
                            row.track_number = this.$data.track_form.track_number
                            row.track_brand = this.$data.track_form.track_brand
                            this.initTrackFormData()
                            this.closeDialog()
                            this.$message.success(this.$i18n.t('comm.success').toString())
                        }).finally(() => {
                            this.$data.loading = false
                        })
                    }
                });
            },
            downDelivery() {
                this.$data.loading = true
                deliveryDownload(this.track_form).then(() => {
                    this.$message.success(this.$i18n.t('comm.success').toString())
                }).finally(() => {
                    this.$data.loading = false
                })
            },
        },
    }
</script>

<style>
    .track_excel .el-upload-dragger{
        width: 280px;
        height: 150px;
    }
</style>
