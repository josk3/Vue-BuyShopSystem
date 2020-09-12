<template>
    <div v-loading="loading">
        <SearchBox :params="searchParams" @search="search"></SearchBox>
        <div class="wrap-tab p-0">
            <el-card class="box-card box-pane" shadow="never" :body-style="{ padding: '0px' }">
                <div class="row">
                    <div class="col-8 pr-0">
                        <el-tabs v-model="paneName" type="border-card" class="progress-tab"
                                 @tab-click="paneClick">
                            <el-tab-pane :label="$t('comm.all')" name="all"></el-tab-pane>
                            <el-tab-pane :label="$t('comm.wait_review')" name="wait_review"></el-tab-pane>
                            <el-tab-pane :label="$t('comm.review_reject')" name="review_reject"></el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="col-4 text-right p-0" style="background-color: #F5F7FA">
                        <div class="mr-5 mt-1">
                            <el-button :type="tabData.page.total > 0 ? '' : 'success'"
                                       @click="addShopBtn" size="small" class="float-right mr-2">
                                <i class="el-icon-plus"></i> {{$t('shop.add_site')}}
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
                            prop="site_url"
                            :label="$t('shop.site_url')">
                    </el-table-column>
                    <el-table-column
                            prop="site_system"
                            :label="$t('shop.site_system')">
                    </el-table-column>
                    <el-table-column
                            prop="return_url"
                            :show-overflow-tooltip="true"
                            :label="$t('shop.return_url')">
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            :show-overflow-tooltip="true"
                            :label="$t('comm.status')">
                        <template v-slot="scope">
                            {{scope.row.status | shopStatus }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="created"
                            :label="$t('comm.apply_time')">
                        <template v-slot="scope">
                            {{scope.row.created | toDay }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="is_virtual"
                            :label="$t('shop.is_virtual')">
                        <template v-slot="scope">
                            {{scope.row.is_virtual | yesOrNo }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="operator_name"
                            :show-overflow-tooltip="true"
                            label="操作者">
                    </el-table-column>
                    <el-table-column width="50" fixed="right">
                        <template v-slot="scope">
                            <el-dropdown v-show="scope.row.status !== 1"
                                         trigger="click" @command="handleCommand">
                                      <span class="el-dropdown-link">
                                          <i class="el-icon-more"></i>
                                      </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :command="commandVal('edit', scope.row, scope.$index)">
                                        {{$t('comm.edit')}}
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                    </el-table-column>
                </el-table>

                <Pagination :page="tabData.page" @change="pageChange"></Pagination>
            </el-card>
        </div>
        <!--    d    -->
        <el-dialog custom-class="wpy-dialog sm-dialog bg-body"
                   @close="closeShopDialog"
                   :show-close="false" :close-on-click-modal="false"
                   :title="$t('shop.add_site')"
                   :visible.sync="addShopDialogVisible">
            <div>
                <el-form ref="add_shop"
                         :model="add_shop"
                         :rules="rules" label-width="80px" class="p-1 pt-3 pb-0">
                    <el-form-item :label="$t('shop.site_url')" prop="site_url">
                        <el-input v-model="add_shop.site_url" placeholder="请输入网站域名"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('shop.site_system')" prop="site_system">
                        <el-select v-model="add_shop.site_system" placeholder="请选择网站系统"
                                   filterable clearable>
                            <el-option
                                    v-for="item in site_sys_list"
                                    :key="item.value"
                                    :label="item.text"
                                    :value="item.value">
                                <span style="float: left">{{ item.text }}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-show="add_shop.site_system === 'Other'" :label="$t('shop.return_url')"
                                  prop="return_url">
                        <el-input v-model="add_shop.return_url" placeholder="请输入返回网址"></el-input>
                    </el-form-item>
                    <el-form-item prop="is_virtual">
                        <el-checkbox :label="$t('shop.is_virtual')"
                                     :checked="add_shop.is_virtual === 1 || add_shop.is_virtual === '1'"
                                     v-model="add_shop.is_virtual"
                                     name="is_virtual"></el-checkbox>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer" v-loading="loading">
                <el-button size="mini" @click="closeShopDialog()">取消</el-button>
                <el-button size="mini" type="primary" @click="submitAddShop">提交退款</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import configs from '@/configs'
    import SearchBox from "@/components/SearchBox";
    import Pagination from "@/components/Pagination";
    import {addShop, getSiteSystemList, shopSearch, updateShop} from "@/service/shopSer";
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
                if (this.$data.add_shop.site_system === 'Other' && isEmpty(value)) {
                    callback(new Error('请输入返回网址'));
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
                rules: {
                    site_url: [
                        {required: true, message: '请输入网址', trigger: 'blur'},
                    ],
                    site_system: [
                        {required: true, message: '请选择网站系统', trigger: 'blur'},
                    ],
                    return_url: [
                        {validator: checkReturnUrl, trigger: ['blur']},
                    ],
                },
            }
        },
        mounted() {
            this.searchParams.stauts = this.paneName
            this.search();
        },
        methods: {
            paneClick(tab) {
                this.searchParams.page = 1;//重置页码
                this.paneName = tab.name
                this.searchParams.stauts = tab.name //搜索对应status
                this.search('pane')
            },
            pageChange(page) {
                this.searchParams.page = page.page_num
                this.search('page')
            },
            search(source) {
                if (isEmpty(source)) {//搜索网址时-搜索所有状态
                    this.paneName = 'all'
                    this.searchParams.stauts = this.paneName
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
                }
            },
            //-
            addShopBtn() {
                this.openShopDialog('add', null)
            },
            openShopDialog(action, data){
                if (isEmpty(this.site_sys_list) || this.site_sys_list.length <= 0) {
                    this.$data.loading = true
                    getSiteSystemList().then(res => {
                        const {data} = res
                        this.$data.site_sys_list = data.list
                    }).finally(() => {
                        this.$data.loading = false
                    })
                }
                this.initShopForm()
                if (!isEmpty(data)) {
                    this.add_shop.site_id = data.site_id
                    this.add_shop.site_url = data.site_url
                    this.add_shop.site_system = data.site_system
                    this.add_shop.return_url = data.return_url
                    this.add_shop.is_virtual = data.is_virtual
                }
                this.add_shop.action = action
                this.addShopDialogVisible = true
            },
            initShopFormObj() {
                return {action: '', site_id: '', site_url: '', site_system: '', return_url: '', is_virtual: ''}
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
                    if (!valid) {
                        return false;
                    } else {
                        //
                        if (this.add_shop.action === 'add') {
                            this.$data.loading = true
                            addShop(this.add_shop).then(() => {
                                this.$message.success(this.$i18n.t('comm.success').toString())
                                this.closeShopDialog()
                            }).finally(() => {
                                this.$data.loading = false
                            })
                        } else if (this.add_shop.action === 'edit') {
                            this.$data.loading = true
                            updateShop(this.add_shop).then(() => {
                                this.$message.success(this.$i18n.t('comm.success').toString())
                                this.closeShopDialog()
                            }).finally(() => {
                                this.$data.loading = false
                            })
                        }
                    }
                });
            },

        },
    }
</script>

<style scoped>

</style>
