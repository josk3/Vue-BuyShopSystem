<template>
  <div>
    <SearchBox :params="searchParams" @search="search"></SearchBox>
    <el-alert class="mb-2 rm-1 url-review-remind"
              type="remind"
              :close-text="$t('shop.remindClose')"
              @close=close()
              show-icon>
      <div slot="title" v-html="$t('shop.site_url_review_help_info')">
      </div>
    </el-alert>
    <div class="wrap-tab p-0">
      <el-skeleton :rows="6" animated :loading="loading">
        <template>
          <el-card class="box-card box-pane" shadow="never" :body-style="{ padding: '0px' }">
            <div class="row">
              <div class="col-8 pr-0">
                <el-tabs v-model="paneName" type="border-card" class="progress-tab"
                         @tab-click="paneClick">
                  <el-tab-pane :label="$t('comm.all')" name="all"></el-tab-pane>
                  <el-tab-pane :label="$t('comm.wait_review')" name="wait_review"></el-tab-pane>
                  <el-tab-pane :label="$t('comm.enable')" name="enable"></el-tab-pane>
                  <el-tab-pane :label="$t('comm.close')" name="close"></el-tab-pane>
                  <el-tab-pane :label="$t('comm.review_reject')" name="review_reject"></el-tab-pane>
                </el-tabs>
              </div>
              <div class="col-4 text-right p-0" style="background-color: #F5F7FA">
                <div class="mr-5 mt-1">
                  <el-button :type="tabData.page.total > 0 ? '' : 'success'"
                             @click="addShopBtn" size="small" class="float-right mr-2" plain>
                    <i class="el-icon-plus"></i> {{ $t('shop.add_site') }}
                  </el-button>
                </div>
              </div>
            </div>
            <el-table
                :class="tabData.page.total ? '' : 'wpy-z-table'"
                :data="tabData.list"
                :header-row-style="{background:'#2C2E2F'}"
                style="width: 100%">
              <el-table-column
                  prop="url_protocol"
                  width="80px"
                  :label="$t('shop.protocol')">
              </el-table-column>
              <el-table-column
                  prop="site_url"
                  :label="$t('shop.site_url')">
              </el-table-column>
              <el-table-column
                  prop="site_system"
                  width="90px"
                  :show-overflow-tooltip="true"
                  :label="$t('shop.site_system')">
              </el-table-column>
              <el-table-column
                  prop="return_url"
                  :show-overflow-tooltip="true"
                  :label="$t('shop.return_url')">
              </el-table-column>
              <el-table-column
                  prop="status"
                  :label="$t('comm.status')">
                <template v-slot="scope">
                            <span v-if="scope.row.status === 3">
                                <el-popover
                                    placement="top"
                                    width="240"
                                    trigger="hover"
                                    :content="scope.row.review_reason">
                                    <span slot="reference"><i class="el-icon-warning-outline text-red"></i> {{
                                        scope.row.status | shopStatus
                                      }} ?</span>
                                </el-popover>
                            </span>
                  <span v-else>{{ scope.row.status | shopStatus }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  prop="created"
                  :label="$t('comm.apply_time')">
                <template v-slot="scope">
                  {{ scope.row.created | toDay }}
                </template>
              </el-table-column>
              <el-table-column
                  prop="is_virtual"
                  width="80px"
                  :label="$t('shop.is_a_virtual')">
                <template v-slot="scope">
                  {{ scope.row.is_virtual | yesOrNo }}
                </template>
              </el-table-column>
              <el-table-column
                  prop="operator"
                  :show-overflow-tooltip="true"
                  :label="$t('comm.operator')">
              </el-table-column>
              <el-table-column width="50" fixed="right">
                <template v-slot="scope">
                  <el-dropdown v-show="scope.row.status !== 2" trigger="click" @command="handleCommand">
                                      <span class="el-dropdown-link">
                                          <i class="el-icon-more"></i>
                                      </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-show="scope.row.status === 3"
                                        :command="commandVal('edit', scope.row, scope.$index)">
                        <i class="el-icon-edit"></i> {{ $t('comm.edit') }}
                      </el-dropdown-item>
                      <el-dropdown-item v-if="scope.row.status === 1"
                                        :command="commandVal('close', scope.row, scope.$index)">
                        <i class="el-icon-turn-off"></i> {{ $t('comm.close') }}
                      </el-dropdown-item>
                      <el-dropdown-item v-else-if="scope.row.status === 4"
                                        :command="commandVal('open', scope.row, scope.$index)">
                        <i class="el-icon-turn-off"></i> {{ $t('comm.open') }}
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>
            <Pagination :page="tabData.page" @change="pageChange"></Pagination>
          </el-card>
        </template>
      </el-skeleton>
    </div>
    <!--    d    -->
    <el-dialog custom-class="wpy-dialog md-dialog bg-body"
               @close="closeShopDialog"
               :show-close="false" :close-on-click-modal="false"
               :title="$t('shop.add_site')"
               :loading="loading"
               :visible.sync="addShopDialogVisible">
      <div>
        <el-card shadow="hover" class="box-card p-2"
                 :body-style="{ padding: '0px' }">
          <div class="text-muted p-0">
            <i class="el-icon-info text-blue"></i> {{ $t('shop.site_url_www_help_info') }}
          </div>
        </el-card>
        <el-form ref="add_shop"
                 :model="add_shop"
                 :rules="rules" label-width="110px" class="p-1 pt-3 pb-0">
          <el-form-item prop="site_url">
            <template slot="label">
              <el-popover
                  placement="top-start"
                  width="260"
                  trigger="hover"
                  :content="$t('shop.choose_http_or_https')">
                                <span slot="reference">{{ $t('shop.site_url') }}
                                    <i class="el-icon-warning-outline"></i></span>
              </el-popover>
            </template>
            <el-input v-model="add_shop.site_url" :placeholder="$t('shop.domain')"
                      class="input-with-select add_web_site">
              <el-select v-model="add_shop.url_protocol" slot="prepend"
                         :placeholder="$t('shop.http_protocol')"
                         filterable>
                <el-option label="http" value="http"><span style="float: left">http</span></el-option>
                <el-option label="https" value="https"><span style="float: left">https</span>
                </el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('shop.site_system')" prop="site_system">
            <el-select v-model="add_shop.site_system" :placeholder="$t('shop.site_system')"
                       filterable>
              <el-option
                  v-for="item in site_sys_list"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value">
                <span style="float: left">{{ item.text }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-show="customer_return_url.includes(add_shop.site_system)"
                        prop="return_url">
            <template slot="label">
              <el-popover
                  placement="top-start"
                  width="260"
                  trigger="hover"
                  :content="$t('shop.callback_url_info')">
                                <span slot="reference">{{ $t('shop.return_url') }}
                                    <i class="el-icon-warning-outline"></i></span>
              </el-popover>
            </template>
            <el-input v-model="add_shop.return_url" :placeholder="$t('shop.return_url')">
              <template slot="prepend">{{ add_shop.url_protocol }}://</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="is_virtual" class="virtualStyle">
            <el-checkbox :label="$t('shop.is_virtual')"
                         :checked="add_shop.is_virtual === 1 || add_shop.is_virtual === '1'"
                         v-model="add_shop.is_virtual"
                         true-label="1"
                         false-label="0"
                         name="is_virtual"
                         class="remarkStyle"></el-checkbox>
          </el-form-item>
          <el-form-item prop="is_restricted" class="restrictedStyle">
            <el-checkbox :label="$t('shop.is_restricted')"
                         :checked="add_shop.is_restricted === 1 || add_shop.is_restricted === '1'"
                         v-model="add_shop.is_restricted"
                         true-label="1"
                         false-label="0"
                         name="is_restricted"
                         class="remarkStyle"
                         @change="noteDisable"></el-checkbox>
            <el-popover
                placement="top-start"
                width="300"
                trigger="hover"
                :content="$t('shop.virtual_notes')">
              <span slot="reference">
                <i class="el-icon-warning-outline"></i>
              </span>
            </el-popover>
          </el-form-item>
          <el-form-item prop="mer_remark" :label="$t('shop.mer_remark')" v-show="has_remark">
            <el-input v-model="add_shop.mer_remark" :placeholder="$t('shop.input_account')"
                      class="input-with-select add_web_site">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <div class="text-muted p-0 url-review-help-remind">
          <i class="el-icon-info text-blue"></i> <span v-html="$t('shop.site_url_review_help_info')"></span>
        </div>
        <el-button size="mini" @click="closeShopDialog()">{{ $t('comm.cancel') }}</el-button>
        <el-button size="mini" type="primary" @click="submitAddShop">{{ $t('shop.submit_site') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import configs from '@/configs'
import SearchBox from "@/components/SearchBox";
import Pagination from "@/components/Pagination";
import {addShop, closeShop, getSiteSystemList, openShop, resubmit, shopSearch, updateShop} from "@/service/shopSer";
import {isEmpty} from "@/utils/validate";

export default {
  name: "merchant_shop",
  components: {SearchBox, Pagination},
  computed: { //watch跟踪数据变化, 重点user, configs
    configs() {
      return configs;
    },
  },
  data() {
    var checkReturnUrl = (rule, value, callback) => {
      if (this.$data.customer_return_url.includes(this.$data.add_shop.site_system) && isEmpty(value)) {
        callback(new Error(this.$i18n.t('shop.return_url').toString()));
      }
      callback();
    };
    return {
      loading: false,
      searchParams: {
        title: 'nav.merchant_shop', page: 1,
        site_url: '',
      },
      tabData: {list: [], page: {count: 0, page_num: 0, total: 0}},
      paneName: 'all', //默认
      add_shop: this.initShopFormObj(),
      addShopDialogVisible: false,
      site_sys_list: [],
      customer_return_url: ['Other', 'Java', 'Php', 'Asp', 'PHP'],
      has_remark: false,
      rules: {
        site_url: [
          {required: true, message: this.validMsg('shop.domain'), trigger: 'blur'},
        ],
        url_protocol: [
          {required: true, message: this.validMsg('shop.http_protocol'), trigger: 'blur'},
        ],
        site_system: [
          {required: true, message: this.validMsg('shop.site_system'), trigger: 'blur'},
        ],
        return_url: [
          {validator: checkReturnUrl, trigger: ['blur']},
        ],
      },
    }
  },
  mounted() {
    this.searchParams.status = this.paneName
    this.search();
  },
  methods: {
    validMsg(name) {
      return this.$i18n.t('valid.required_field', [this.$i18n.t(name)]);
    },
    paneClick(tab) {
      this.searchParams.page = 1;//重置页码
      this.paneName = tab.name
      this.searchParams.status = tab.name //搜索对应status
      this.search('pane')
    },
    pageChange(page) {
      this.searchParams.page = page.page_num
      this.search('page')
    },
    search(source) {
      if (isEmpty(source)) {//搜索网址时-搜索所有状态
        this.paneName = 'all'
        this.searchParams.status = this.paneName
      }
      this.loading = true
      shopSearch(this.searchParams).then(res => {
        const {data} = res
        this.$data.tabData = data
      }).finally(() => {
        this.loading = false
      })
    },
    commandVal(action, row, index) {
      return {action: action, row: row, index: index}
    },
    handleCommand(command) {
      let row = command.row
      switch (command.action) {
        case 'edit':
          this.openShopDialog('edit', row)
          break;
        case 'close':
          this.$data.loading = true
          closeShop(row).then(() => {
            this.$message.success(this.$i18n.t('comm.success').toString())
            this.search()
          }).finally(() => {
            this.$data.loading = false
          })
          break;
        case 'open':
          this.$data.loading = true
          openShop(row).then(() => {
            this.$message.success(this.$i18n.t('comm.success').toString())
            this.search()
          }).finally(() => {
            this.$data.loading = false
          })
          break;
        case 'resubmit':
          this.$data.loading = true
          resubmit(row).then(() => {
            this.$message.success(this.$i18n.t('comm.success').toString())
            this.search()
          }).finally(() => {
            this.$data.loading = false
          })
          break;
      }
    },
    //-
    addShopBtn() {
      this.openShopDialog('add', null)
    },
    openShopDialog(action, item) {
      this.$data.loading = true
      getSiteSystemList().then(res => {
        const {data} = res
        this.$data.site_sys_list = data.list
        this.renderShopDialog(action, item)
      }).finally(() => {
        this.$data.loading = false
      })
    },
    renderShopDialog(action, data) {
      this.initShopForm()
      if (!isEmpty(data)) {
        this.add_shop.site_id = data.site_id
        this.add_shop.site_url = data.site_url
        this.add_shop.site_system = data.site_system
        this.add_shop.return_url = data.return_url
        this.add_shop.is_virtual = data.is_virtual
        this.add_shop.url_protocol = data.url_protocol
        this.add_shop.is_restricted = data.is_restricted
        this.add_shop.mer_remark = data.mer_remark
      }
      this.add_shop.action = action
      this.addShopDialogVisible = true
      this.has_remark = false
    },
    initShopFormObj() {
      return {
        action: '',
        site_id: '',
        site_url: '',
        url_protocol: '',
        site_system: '',
        return_url: '',
        is_virtual: '',
        mer_remark: '',
        is_restricted: ''
      }
    },
    initShopForm() {
      this.add_shop = this.initShopFormObj()
    },
    closeShopDialog() {
      this.addShopDialogVisible = false
      this.$refs.add_shop.resetFields();//重置
    },
    submitAddShop() {
      this.$refs['add_shop'].validate((valid) => {
        if (isEmpty(this.add_shop.url_protocol)) {
          this.$message.error(this.validMsg('shop.http_protocol'))
        }
        if (!valid) {
          return false;
        } else {
          //
          if (this.add_shop.action === 'add') {
            this.$data.loading = true
            addShop(this.add_shop).then(() => {
              this.$message.success(this.$i18n.t('shop.site_success').toString())
              this.closeShopDialog()
              this.search()
            }).finally(() => {
              this.$data.loading = false
            })
          } else if (this.add_shop.action === 'edit') {
            this.$data.loading = true
            updateShop(this.add_shop).then(() => {
              resubmit(this.add_shop)
              this.$message.success(this.$i18n.t('shop.site_success').toString())
              this.closeShopDialog()
              this.search('pane')
            }).finally(() => {
              this.$data.loading = false
            })
          }
        }
      });
    },
    noteDisable(val) {
        this.add_shop.is_restricted = val
        if (val === "1" ) {
          this.has_remark = true
          this.resetRule("mer_remark", [{required: true, message: this.validMsg('shop.mer_remark'), trigger: 'blur'}])
        } else {
          this.has_remark = false
          this.resetRule("mer_remark", [])
        }
    },
    resetRule(prop, rule) {
      this.$set(this.rules, prop, rule);
    },
  },
}
</script>

<style>
.input-with-select .el-select .el-input {
  width: 100px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.el-popover--plain {
  word-break: keep-all;
}

.url-review-remind {
  background-color: #fbf0f0;
  color: #e4827f;
}

.url-review-help-remind {
  text-align: left;
  font-size: 14px;
  float: left;
}

.md-dialog {
  width: 520px;
}
.add_web_site {
  width: 330px;
}
.virtualStyle {
  margin-bottom: 0px;
}
.restrictedStyle {
  margin-bottom: 15px;
}
.remarkStyle {
  line-height: 19px;
}
.el-icon-warning-outline {
  margin-left: 2px;
}
</style>
