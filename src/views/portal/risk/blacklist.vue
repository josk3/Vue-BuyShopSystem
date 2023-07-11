<template>
  <div>
    <div class="delivery-list">
      <SearchBox :params="searchParams" @search="search"></SearchBox>
      <div class="wrap-tab p-0" v-loading="loading">
        <el-card class="box-card box-pane" shadow="never" :body-style="{ padding: '0px' }">
          <div class="row">
            <div class="col-12 text-left p-0" style="background-color: #F5F7FA">
              <div class="ml-5 mt-1 mb-1">
                <el-button icon="el-icon-plus" size="small"
                           @click="showBlacklistDialog" plain>{{ $t('risk.add_blacklist') }}
                </el-button>
                <el-button icon="el-icon-upload2" size="small"
                           @click="showUploadDialog" plain>{{ $t('comm.batch_upload') }}
                </el-button>
                <el-button icon="el-icon-download" size="mini"
                           @click="downBlacklist" plain>{{ $t('comm.download') }}
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
                :label="$t('comm.trade_id')">
              <template v-slot="scope">
                {{ scope.row.trade_id | nullToLine }}
              </template>
            </el-table-column>
            <el-table-column
                prop="kind"
                :label="$t('comm.blacklist_type')">
              <template v-slot="scope">
                <strong>{{ scope.row.kind | blacklistKind }}</strong>
              </template>
            </el-table-column>
            <el-table-column
                prop="value"
                :label="$t('comm.blacklist_value')">
              <template v-slot="scope">
                {{ scope.row.value }}
              </template>
            </el-table-column>
            <el-table-column
                prop="status"
                :label="$t('comm.status')">
              <template v-slot="scope">
                {{ scope.row.status | numberStatus }}
              </template>
            </el-table-column>
            <el-table-column
                prop="operator_name"
                :label="$t('comm.operator')">
              <template v-slot="scope">
                {{ scope.row.operator_name }}
              </template>
            </el-table-column>
            <el-table-column
                prop="updated"
                :label="$t('comm.created')">
              <template v-slot="scope">
                {{ scope.row.updated |toDay }}
              </template>
            </el-table-column>
            <el-table-column
                prop="remark"
                :show-overflow-tooltip="true"
                :label="$t('comm.remark')">
              <template v-slot="scope">
                {{ scope.row.remark | nullToLine }}
              </template>
            </el-table-column>
            <el-table-column width="50" fixed="right">
              <template v-slot="scope">
                <el-dropdown trigger="click" :data-row="scope.row" @command="handleCommand">
                                      <span class="el-dropdown-link">
                                          <i class="el-icon-more"></i>
                                      </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-if="scope.row.status === 1" icon="el-icon-turn-off"
                                      :command="commandVal('disable', scope.row, scope.$index)">
                      {{ $t('comm.disable') }}
                    </el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.status === 0" icon="el-icon-open"
                                      :command="commandVal('enable', scope.row, scope.$index)">
                      {{ $t('comm.enable') }}
                    </el-dropdown-item>
                    <el-dropdown-item icon="el-icon-delete" divided
                                      :command="commandVal('delete', scope.row, scope.$index)">
                      {{ $t('comm.del') }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
          <Pagination :page="tabData.page" @change="pageChange"></Pagination>
        </el-card>
      </div>
      <el-dialog custom-class="wpy-dialog sm-dialog bg-body"
                 :show-close="false" :close-on-click-modal="false"
                 :title="$t('risk.add_blacklist')"
                 top="5vh"
                 :visible.sync="blacklistDialogVisible">
        <div>
          <el-tabs v-model="paneName" @tab-click="paneClick">
            <el-tab-pane :label="$t('risk.add_black_by_trade_id')" name="byTradeId">
              <el-card shadow="hover" class="box-card p-3 mb-3"
                       :body-style="{ padding: '0px' }">
                <div class="text-muted p-0">
                  <el-form ref="search_order" :model="formByTradeId" :rules="rules" :inline="true"
                           class="form form-inline">
                    <el-form-item :label="$t('comm.trade_id')" prop="trade_id" class="mb-0">
                      <el-input size="mini" v-model="formByTradeId.trade_id"
                                :placeholder="$t('comm.trade_id')"
                                @clear="initByTradeIdData"
                                clearable></el-input>
                    </el-form-item>
                    <el-form-item class="mb-0">
                      <el-button size="mini" type="primary"
                                 @click="handleByTradeId">{{ $t('comm.search') }}
                      </el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </el-card>
              <el-form v-if="formByTradeId.email" :model="formByTradeId" label-width="110px"
                       class="pr-4 clear-mb-form">
                <el-form-item :label="$t('risk.email')">
                  <el-input v-model="formByTradeId.email" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item :label="$t('risk.ip')">
                  <el-input v-model="formByTradeId.ip" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item :label="$t('risk.address')">
                  <el-input v-model="formByTradeId.address" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item :label="$t('risk.full_name')">
                  <el-input v-model="formByTradeId.full_name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item :label="$t('risk.phone')">
                  <el-input v-model="formByTradeId.phone" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item :label="$t('risk.card_no')">
                  <el-input v-model="formByTradeId.card_no" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item :label="$t('comm.remark')">
                  <el-input type="textarea" v-model="formByTradeId.remark"></el-input>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane :label="$t('risk.add_black_by_data')" name="byData">
              <el-card shadow="hover" class="box-card p-3 mb-3"
                       :body-style="{ padding: '0px' }">
                <div class="text-muted p-0">
                  <i class="el-icon-info text-blue"></i> {{ $t('risk.support_input_one_or_more') }}
                </div>
              </el-card>
              <el-form ref="by_data_form"
                       :model="formByData"
                       :rules="rules" label-width="110px" class="pr-4 clear-mb-form">
                <el-form-item :label="$t('risk.email')">
                  <el-input v-model="formByData.email"></el-input>
                </el-form-item>
                <el-form-item :label="$t('risk.ip')">
                  <el-input v-model="formByData.ip"></el-input>
                </el-form-item>
                <el-form-item :label="$t('risk.address')">
                  <el-input v-model="formByData.address"></el-input>
                </el-form-item>
                <el-form-item :label="$t('risk.full_name')">
                  <el-input v-model="formByData.full_name"></el-input>
                </el-form-item>
                <el-form-item :label="$t('risk.phone')">
                  <el-input v-model="formByData.phone"></el-input>
                </el-form-item>
                <el-form-item :label="$t('risk.card_no')">
                  <el-input v-model="formByData.card_no"></el-input>
                </el-form-item>
                <el-form-item :label="$t('risk.card_bin')">
                  <el-input v-model="formByData.card_bin"></el-input>
                </el-form-item>
                <el-form-item :label="$t('comm.remark')">
                  <el-input type="textarea" v-model="formByData.remark"></el-input>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div slot="footer" class="dialog-footer" v-loading="loading">
          <el-button size="mini" @click="blacklistDialogVisible = false">{{ $t('comm.cancel') }}</el-button>
          <el-button size="mini" type="primary" @click="submitTrackNumber">{{ $t('comm.submit') }}</el-button>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="uploadDialogVisible" width="450px" :title="$t('risk.upload_black_model')"
                 custom-class="wpy-dialog sm-dialog bg-body"
                 @close="closeUploadExcelDialog">
        <div class="pt-3 pb-3 bg-light">
          <el-upload
              class="upload-demo text-center"
              ref="black_excel"
              name="black_excel"
              :class="blackListExcelUploadEnable ? 'showFileBox' : 'hideFileBox'"
              drag
              action=""
              accept=".xls,.xlsx"
              :limit="1"
              :auto-upload="false"
              :on-change="changeBlackListExcelFile"
              :on-remove="removeBlackListExcelFile"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">{{ $t('risk.drag_the_file_here_or') }}<em>{{ $t('risk.click_on_upload') }}</em>
            </div>
            <div class="el-upload__tip" slot="tip" style="font-size: 14px;">
              {{ $t('shipment.upload_excel_max_500') }}
              <div class="d-block">
                <el-button icon="el-icon-download" size="small"
                           @click="downloadBackListTemplate" type="primary" plain>{{ $t('comm.template_download') }}
                </el-button>
              </div>
              <div class="d-block text-dark">
                1.下载模板表格并填写对应黑名单数据。<br/>
                2.上传表格，完成。
              </div>
            </div>
          </el-upload>
        </div>
        <span slot="footer" class="dialog-footer">
                    <el-button @click="uploadDialogVisible=false"
                               @close="closeUploadExcelDialog">{{ $t('comm.cancel') }}</el-button>
                    <el-button type="primary" @click="uploadBlackList">{{ $t('risk.click_on_upload') }}</el-button>
                  </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import configs from '@/configs'
import SearchBox from "@/components/SearchBox";
import Pagination from "@/components/Pagination";
import {
  blacklistAdd,
  blacklistDel,
  blacklistDisable, blacklistDownload,
  blacklistEnable,
  blacklistSearch,
  downloadTemplate,
  uploadBlackList
} from "@/service/blacklistSer";
import {isEmpty} from "@/utils/validate";
import {getOrder} from "@/service/orderSer";
import qs from "qs";

export default {
  name: "blacklist",
  components: {SearchBox, Pagination},
  computed: { //watch跟踪数据变化, 重点user, configs
    configs() {
      return configs;
    },
  },
  data() {
    return {
      loading: false,
      blacklistDialogVisible: false,
      uploadDialogVisible: false, //对话框显隐
      paneName: 'byTradeId',
      blackListExcelUploadEnable: true, //黑名单模板是否已经上传
      blackListFile: '',  //黑名单excel模板
      formByTradeId: this.initByTradeIdObj(),
      formByData: this.initByDataObj(),
      track_brand_all: [],
      rules: {
        trade_id: [
          {required: true, message: this.validMsg('comm.trade_id'), trigger: 'blur'},
        ],
      },
      searchParams: {
        title: 'nav.blacklist', page: 1,
        trade_id: '', blacklist_type: '', blacklist_value: '',
      },
      tabData: {list: [], page: {count: 0, page_num: 0, total: 0}},
    }
  },
  mounted() {
    this.search();
  },
  methods: {
    validMsg(name) {
      return this.$i18n.t('valid.required_field', [this.$i18n.t(name)]);
    },
    closeUploadExcelDialog() {
      this.blackListFile = null;
      this.blackListExcelUploadEnable = true;
      this.uploadTrackDialogVisible = false;
      this.$refs.black_excel.clearFiles();//重置
    },
    initByTradeIdData() {
      this.formByTradeId = this.initByTradeIdObj()
    },
    initByTradeIdObj() {
      return {
        action: 'byTradeId',
        trade_id: null,
        email: '',
        ip: '',
        address: '',
        full_name: '',
        phone: '',
        card_no: '',
        remark: '',
      };
    },
    /*上传图片回调进度*/
    progressCallback(n) {
      this.percentage = n;
    },
    initByDataObj() {
      return {
        action: 'byData',
        email: '',
        ip: '',
        address: '',
        full_name: '',
        phone: '',
        card_no: '',
        card_bin: '',
        remark: '',
      };
    },
    paneClick(tab) {
      this.paneName = tab.name
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
      blacklistSearch(this.searchParams).then(res => {
        const {data} = res
        this.$data.tabData = data
      }).finally(() => {
        this.loading = false
      })
    },
    showBlacklistDialog() {
      this.blacklistDialogVisible = true
    },
    // 显示批量上传对话框
    showUploadDialog() {
      this.uploadDialogVisible = true;
    },
    handleByTradeId() {
      this.$refs['search_order'].validate((valid) => {
        if (!valid) {
          return false;
        } else {
          this.loading = true
          getOrder(this.formByTradeId.trade_id).then(res => {
            const {data} = res
            this.initByTradeIdData()
            this.formByTradeId.trade_id = data.trade_id
            this.formByTradeId.email = data.customer.email
            this.formByTradeId.ip = data.ip
            this.formByTradeId.address = data.customer.shipping_address
            this.formByTradeId.full_name = data.customer.shipping_first_name + ' ' + data.customer.shipping_last_name
            this.formByTradeId.phone = data.customer.shipping_phone
            this.formByTradeId.card_no = '•••• ' + data.card.last4
          }).finally(() => {
            this.$data.loading = false
          })
        }
      });
    },
    submitTrackNumber() {
      let formData;
      if (this.paneName === 'byTradeId') {
        if (isEmpty(this.formByTradeId.trade_id)) {
          this.$message.error(this.validMsg('comm.trade_id'))
          return false;
        }
        formData = this.formByTradeId
      } else if (this.paneName === 'byData') {
        this.$refs['by_data_form'].validate((valid) => {
          if (!valid) {
            return false;
          } else {
            formData = this.formByData
          }
        });
      } else {
        return false;
      }
      formData.action = this.paneName
      this.$data.loading = true
      blacklistAdd(formData).then(() => {
        this.$data.blacklistDialogVisible = false
        this.$message.success(this.$i18n.t('comm.success').toString())
        this.initByTradeIdData()
        this.search()
      }).finally(() => {
        this.$data.loading = false
      })
    },
    commandVal(action, row, index) {
      return {action: action, row: row, index: index}
    },
    handleCommand(command) {
      let row = command.row
      switch (command.action) {
        case 'enable':
          this.loading = true
          blacklistEnable(row).then(() => {
            row.status = 1
            this.$message.success(this.$i18n.t('comm.success').toString())
          }).finally(() => {
            this.$data.loading = false
          })
          break;
        case 'disable':
          this.loading = true
          blacklistDisable(row).then(() => {
            row.status = 0
            this.$message.success(this.$i18n.t('comm.success').toString())
          }).finally(() => {
            this.$data.loading = false
          })
          break;
        case 'delete':
          this.loading = true
          blacklistDel({mri: row.mri}).then(() => {
            this.search()
            this.$message.success(this.$i18n.t('comm.success').toString())
          }).finally(() => {
            this.$data.loading = false
          })
          break;
      }
    },
    changeBlackListExcelFile(file) {
      this.blackListFile = file.raw;
      this.blackListExcelUploadEnable = false;
    },
    removeBlackListExcelFile() {
      this.blackListExcelUploadEnable = true;
      this.blackListFile = null;
    },
    // 黑名单上传
    uploadBlackList: function () {
      //是否选择上传文件
      if (isEmpty(this.blackListFile)) {
        this.$message.error(this.$i18n.t('risk.please_upload_file').toString())
      } else {
        this.loading = true;
        let formData = new FormData();
        formData.append("file", this.blackListFile);
        uploadBlackList(formData, this.progressCallback).then(() => {
          //取消对话框
          this.uploadDialogVisible = false;
          //查询黑名单
          this.search();
          //处理结果
          this.$message.success(this.$i18n.t('comm.success').toString())
        }).finally(() => {
          this.loading = false;
        })
      }
    },
    //黑名单模板下载
    downloadBackListTemplate: function () {
      this.loading = true;
      downloadTemplate().then(() => {
        this.search()
        this.$message.success(this.$i18n.t('comm.success').toString())
      }).finally(() => {
        this.$data.loading = false
      })
    },

    //黑名单导出下载
    downBlacklist() {
      this.loading = true
      blacklistDownload(qs.stringify(this.searchParams)).then(() => {
        this.$message.success(this.$i18n.t('comm.success').toString())
      }).finally(() => {
        this.loading = false
      })
    },
  },
}
</script>

<style scoped>

</style>
