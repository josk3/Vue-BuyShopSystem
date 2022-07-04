<template>
    <div v-loading="loading">
        <SearchBox :params="searchParams" @search="search"></SearchBox>
        <el-alert v-if="isSettleDay && paneName === 'reject'" class="mb-2 rm-1 isSettleDay-remind"
                  type="remind"
                  :closable="false"
                  :title="$t('payout.delivery_reject_submit_help_info')"
                  show-icon>
        </el-alert>
        <div class="wrap-tab p-0">
            <el-card class="box-card box-pane" shadow="never" :body-style="{ padding: '0px' }">
                <div class="row">
                    <div class="col-8 pr-0">
                        <el-tabs v-model="paneName" type="border-card"
                                 @tab-click="paneClick">
                            <el-tab-pane :label="$t('comm.submitted')" name="submitted"></el-tab-pane>
                            <el-tab-pane :label="$t('payout.delivery_reject')" name="reject"></el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="col-4 text-right p-0" style="background-color: #F5F7FA">
                        <div class="mr-5 mt-1">
                            <el-button icon="el-icon-upload2" size="mini" class="mr-3"
                                       @click="uploadTrackDialogVisible = true" plain v-if="paneName === 'reject'">{{$t('comm.batch_upload')}}
                            </el-button>
                            <el-button icon="el-icon-download" size="mini"
                                       @click="downApplicantHistory" plain>{{ $t('comm.download') }}
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
                            prop="order_amount,order_currency"
                            :label="$t('comm.order_amount')">
                        <template v-slot="scope">
                            {{scope.row.order_amount}} {{scope.row.order_currency}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="pay_status"
                            width="90px"
                            :label="$t('comm.status')">
                        <template v-slot="scope">
                            <span class="pay-status" :class="['ps-' + scope.row.pay_status]">
                                {{scope.row.pay_status | payStatus }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="apply_time"
                            :show-overflow-tooltip="true"
                            :label="$t('comm.apply_time')">
                        <template v-slot="scope">
                            {{scope.row.apply_time | toDay }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="track_number"
                            :show-overflow-tooltip="true"
                            :label="$t('comm.track_number')">
                        <template v-slot="scope">
                            <div v-if="scope.row.virtual_ship">
                                <small v-if="scope.row.virtual_ship === '1'">{{ $t('shop.is_a_virtual') }}</small>
                                <small v-else></small>
                            </div>
                            <div v-else>
                                <div v-if="paneName === 'reject'">
                                    <el-button type="text"
                                               @click="editTrackDialog(scope.$index, scope.row)">
                                        {{$t('comm.update')}} {{scope.row.track_number}}
                                    </el-button>
                                </div>
                                <div v-else>{{ scope.row.track_number }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="shipment_reason"
                            :show-overflow-tooltip="true"
                            :label="$t('comm.remark')">
                        <template v-slot="scope">
                            {{scope.row.shipment_reason | shipReason}}
                        </template>
                    </el-table-column>
                </el-table>

                <Pagination :page="tabData.page" @change="pageChange"></Pagination>
            </el-card>
        </div>

        <el-dialog custom-class="wpy-dialog sm-dialog"
                   :show-close="false" :close-on-click-modal="false"
                   :title="$t('shipment.add_track_info')"
                   @close="closeDialog"
                   :visible.sync="trackNumberDialogVisible">
            <div>
                <el-form ref="track_form"
                         :model="track_form"
                         :rules="rules"
                         :label-width="lang === 'zh' ? '80px' : '130px'">
                    <el-form-item :label="$t('comm.trade_id')">
                        <el-input :value="track_form.trade_id" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('shipment.track_brand')" prop="track_brand">
                        <el-select v-model="track_form.track_brand" :placeholder="$t('shipment.track_brand')"
                                   filterable>
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
                <div v-if="isSettleDay" style="text-align: left;font-size: 12px;" class="text-muted p-0 mb-2">
                  <i class="el-icon-info text-blue"></i><b v-html="$t('payout.delivery_reject_submit_help_info')"></b>
                </div>
                <el-button size="mini" @click="closeDialog">{{$t('comm.cancel')}}</el-button>
                <el-button size="mini" type="primary" @click="submitTrackNumber">{{$t('comm.submit')}}</el-button>
            </div>
        </el-dialog>

        <el-dialog custom-class="wpy-dialog sm-dialog bg-body"
                   :show-close="false" :close-on-click-modal="false"
                   :title="$t('settle.batch_upload_reject')"
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
                            <div class="el-upload__text">{{$t('comm.upload_file_drag_click[0]')}} <em>{{$t('comm.upload_file_drag_click[1]')}}</em>
                            </div>
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
</template>

<script>
    import configs from '@/configs'
    import SearchBox from "@/components/SearchBox";
    import Pagination from "@/components/Pagination";
    import {payoutSearch, applicantHistoryDownload} from "@/service/payoutSer";
    import {deliveryAdd, deliveryUpload, getTrackBrands, getIsSettleDay} from "@/service/deliverySer";
    import {isEmpty} from "@/utils/validate";
    import {mapState} from "vuex";

    export default {
        name: "payout_history",
        components: {SearchBox, Pagination},
        computed: { //watch跟踪数据变化, 重点user, configs
            ...mapState({
                lang: state => state.app.lang,//多语言
            }),
            configs() {
                return configs;
            },
        },
        data() {
            return {
                loading: false,
                searchParams: {
                    title: 'nav.payout_history', page: 1,
                    trade_id: '', merchant_order_no: '', site_url: ''
                },
                tabData: {list: [], page: {count: 0, page_num: 0, total: 0}},
                paneName: 'submitted', //默认
                //物流
                trackNumberDialogVisible: false,
                track_form: this.initFormObj(),
                track_brand_all: [],
                rules: {
                    track_number: [
                        {required: true, message: this.validMsg('shipment.track_number'), trigger: 'blur'},
                    ],
                    track_brand: [
                        {required: true, message: this.validMsg('shipment.track_brand'), trigger: 'blur'},
                    ],
                },
                uploadTrackDialogVisible: false,
                trackExcelUploadEnable: true,
                percentage: -1,
                isSettleDay: false,
            }
        },
        mounted() {
            this.searchParams.payout_status = this.paneName
            this.search();
            getIsSettleDay().then(res => {
              const {data} = res
              this.$data.isSettleDay = data.is_settle_day
            })
        },
        methods: {
            validMsg(name) {
                return this.$i18n.t('valid.required_field', [this.$i18n.t(name)]);
            },
            paneClick(tab) {
                this.searchParams.page = 1;//重置页码
                this.paneName = tab.name
                this.searchParams.payout_status = tab.name //搜索对应status
                this.search()
            },
            pageChange(page) {
                this.search(page.page_num)
            },
            search(pageNum) {
                if (pageNum === undefined || isEmpty(pageNum)) {
                    pageNum = 1
                } else if (!isEmpty(pageNum) && pageNum === 'keep') {
                    //keep 可能只是重载数据页面
                    pageNum = this.searchParams.page
                }
                this.searchParams.page = pageNum
                this.loading = true
                payoutSearch(this.searchParams).then(res => {
                    const {data} = res
                    this.$data.tabData = data
                }).finally(() => {
                    this.loading = false
                })
            },
            //
            initFormObj() {
                return {action: '', index: '', trade_id: '', track_number: '', track_brand: ''};
            },
            closeDialog() {
                this.trackNumberDialogVisible = false
                this.$refs['track_form'].resetFields();//重置
                this.$refs['track_form'].clearValidate();//重置
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
                            //更新问题单列表
                            this.search();//reload page
                        }).finally(() => {
                            this.$data.loading = false
                        })
                    }
                });
            },
            downApplicantHistory() {
                this.loading = true
                applicantHistoryDownload(this.searchParams).then(() => {
                    this.$message.success(this.$i18n.t('comm.success').toString())
                }).catch((res) => {
                  if (!isEmpty(res.response) && !isEmpty(res.response.headers['x-error-msg'])) {
                    this.$message.error((decodeURIComponent(res.response.headers['x-error-msg'])))
                  }
                }).finally(() => {
                    this.loading = false
                })
            },
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
            uploadTrackFile() {
                if (isEmpty(this.trackExcelFile)) {
                    this.$message.error('请先选择上传文件')
                } else {
                    let formData = new FormData();
                    formData.append("action", "upload_track_excel_file");
                    formData.append("file", this.trackExcelFile);
                    this.loading = true
                    deliveryUpload(formData, this.progressCallback).then(res => {
                        this.closeUploadExcelDialog()
                        this.$message.success(res.message)
                        this.search();//reload page
                    }).finally(() => {
                        this.percentage = -1
                        this.loading = false
                    })
                }
            },
        },
    }
</script>

<style scoped>
.isSettleDay-remind {
  background-color: #fbf0f0;
  color: #e4827f;
}
</style>
