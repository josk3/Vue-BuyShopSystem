<template>
    <div v-loading="loading">
        <div class="delivery-list">
            <div class="wrap-tab p-0">
                <el-card class="search-box wpy-card box-card mb-2" :body-style="{ padding: '0px' }" shadow="hover">
                    <div slot="header" class="clearfix">
                        <span>{{ $t('nav.fast_pay') }}</span>
                    </div>
                    <div>
                        <el-alert v-if="errorMsg" :title="errorMsg"
                                  type="error"
                                  center show-icon :closable="false">
                        </el-alert>
                        <el-row v-if="showCreate" class="pl-3 mt-2">
                            <el-col :span="12">
                                <el-form ref="form" :model="newFastPay" size="small" label-width="130px"
                                         @submit.native.prevent="submitCreateFastPay">
                                    <el-form-item label="订单金额*">
                                        <el-col :span="7">
                                            <el-input v-model="newFastPay.amount"></el-input>
                                        </el-col>
                                        <el-col class="line" :span="1"></el-col>
                                        <el-col :span="5">
                                            <el-select v-model="newFastPay.currency" placeholder="币种*">
                                                <el-option
                                                        v-for="item in supportCurrency"
                                                        :key="item"
                                                        :label="item"
                                                        :value="item">
                                                </el-option>
                                            </el-select>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item label="订单号*">
                                        <el-input v-model="newFastPay.orderId"></el-input>
                                        <small>用于您的订单记录与查询</small>
                                    </el-form-item>
                                    <el-form-item label="已经绑定的网站*">
                                        <el-select
                                                v-model="newFastPay.siteId"
                                                filterable
                                                clearable
                                                remote
                                                placeholder="请输入域名"
                                                :remote-method="ajaxSelectSite"
                                                :loading="siteLoading">
                                            <el-option
                                                    v-for="item in merSiteLists"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                        <small> [账户管理] -> 网址绑定</small>
                                    </el-form-item>
                                    <el-form-item label="支付页面标题">
                                        <el-input v-model="newFastPay.orderTitle"></el-input>
                                        <el-link type="info" @click="showTitleHelp = true"><i
                                                class="el-icon-question"></i>
                                            点击查看说明
                                        </el-link>
                                    </el-form-item>
                                    <el-form-item label="订单描述">
                                        <el-input type="textarea" v-model="newFastPay.orderDescription"></el-input>
                                    </el-form-item>
                                    <el-table v-if="newProducts.length > 0"
                                              :data="newProducts"
                                              style="width: 100%" class="pl-1">
                                        <el-table-column
                                                label="产品名">
                                            <template slot-scope="scope">
                                                <span>{{ scope.row.name }}</span>
                                                <span v-if="scope.row.sku"><br/>{{ scope.row.sku }}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                label="数量"
                                                width="50">
                                            <template slot-scope="scope">
                                                {{ scope.row.quantity }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                label="价格"
                                                width="90">
                                            <template slot-scope="scope">
                                                {{ scope.row.amount }} {{ scope.row.currency }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="操作" width="90">
                                            <template slot-scope="scope">
                                                <el-button
                                                        size="mini"
                                                        type="danger"
                                                        @click="handleDelete(scope.$index, scope.row)">删除
                                                </el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <el-form-item label="填写产品信息" class="mb-3">
                                        <el-button type="primary" size="mini" @click="showAddItem" plain>增加产品信息
                                        </el-button>
                                    </el-form-item>
                                    <el-button type="primary" style="margin-left: 130px" @click="submitCreateFastPay">
                                        生成链接
                                    </el-button>
                                </el-form>
                            </el-col>
                            <el-col :span="12" v-if="showTitleHelp">
                                <img src="../../../assets/images/fast_pay_demo_help.png" alt="help" class="img-fluid">
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
                <!--                -->
                <el-card class="box-card box-pane" shadow="never" :body-style="{ padding: '0px' }">
                    <div class="row">
                        <div class="col-6 pr-0" style="background-color: #F5F7FA">
                            <el-tabs type="border-card">
                            </el-tabs>
                        </div>
                    </div>
                    <el-table
                            :class="tabData.list.length ? '' : 'wpy-z-table'"
                            :data="tabData.list"
                            :header-row-style="{background:'#2C2E2F'}"
                            style="width: 100%">
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-table v-if="props.row.products.length > 0"
                                          :data="props.row.products"
                                          style="width: 100%" class="pl-1">
                                    <el-table-column
                                            label="产品名">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.name }}</span>
                                            <span v-if="scope.row.sku"><br/>{{ scope.row.sku }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="数量"
                                            width="50">
                                        <template slot-scope="scope">
                                            {{ scope.row.quantity }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="价格"
                                            width="90">
                                        <template slot-scope="scope">
                                            {{ scope.row.amount }} {{ scope.row.currency }}
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="链接">
                            <template v-slot="scope">
                                <el-link :href="scope.row.fy_token | fastPayUrl" target="_blank" type="primary">打开链接
                                </el-link>
                                <span class="ml-1 tr-id btn clipboard-btn"
                                      :data-clipboard-text="scope.row.fy_token | fastPayUrl"
                                      @click="copy">
                                复制链接
                                <font-awesome-icon :icon="['far', 'clipboard']"/>
                            </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="order_id"
                                label="订单号" width="170px">
                        </el-table-column>
                        <el-table-column
                                label="订单金额">
                            <template v-slot="scope">
                                {{scope.row.amount}} {{scope.row.currency}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="订单描述">
                            <template v-slot="scope">
                                <p v-if="scope.row.order_title" class="m-0"><b>{{scope.row.order_title}}</b></p>
                                <p v-if="scope.row.order_description" class="m-0">{{scope.row.order_description}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="时间">
                            <template v-slot="scope">
                                {{ scope.row.created | toMinuteTime}}
                            </template>
                        </el-table-column>
                    </el-table>

                    <Pagination :page="tabData.page" @change="pageChange"></Pagination>
                </el-card>

                <!--                -->
                <!--                -->
                <el-dialog custom-class="wpy-dialog md-dialog"
                           :show-close="false" :close-on-click-modal="false"
                           title="增加产品信息"
                           @close="closeDialog"
                           :visible.sync="addItemDialogVisible">
                    <div>
                        <el-form ref="track_form"
                                 :model="addItemForm"
                                 :label-width="lang === 'zh' ? '80px' : '130px'">
                            <el-form-item label="产品名*" prop="name">
                                <el-input v-model="addItemForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="金额*" prop="amount">
                                <el-input v-model="addItemForm.amount"></el-input>
                            </el-form-item>
                            <el-form-item label="币种*" prop="currency">
                                <el-select v-model="addItemForm.currency" placeholder="币种*">
                                    <el-option
                                            v-for="item in supportCurrency"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="数量*" prop="quantity">
                                <el-input v-model="addItemForm.quantity"></el-input>
                            </el-form-item>
                            <el-form-item label="SKU" prop="sku">
                                <el-input v-model="addItemForm.sku"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div slot="footer" class="dialog-footer" v-loading="loading">
                        <el-button size="mini" @click="closeDialog">{{$t('comm.cancel')}}</el-button>
                        <el-button size="mini" type="primary" @click="addItem">{{$t('comm.submit')}}</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
    import configs from '@/configs'
    import Pagination from "@/components/Pagination";
    import {fastPayAdd, fastPaySearch} from "@/service/fastPaySer";
    import {isArray, isEmpty} from "@/utils/validate";
    import {mapState} from "vuex";
    import newClipboard from "@/utils/clipboard";
    import {getLastValid50, shopSearch} from "@/service/shopSer";

    export default {
        name: "fast_pay",
        components: {Pagination},
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
                errorMsg: '',
                supportCurrency: ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'RUB'],
                showCreate: true,
                showTitleHelp: false,
                addItemDialogVisible: false,
                addItemForm: this.initAddItemForm(),
                searchParams: {
                    title: 'nav.fast_pay', page: 1,
                },
                newProducts: [],
                newFastPay: {
                    'action': 'add',
                    'amount': '', 'currency': '', 'orderId': '', 'siteId': '',
                    'orderDescription': '', 'orderTitle': '', 'products': ''
                },
                tabData: {list: [], page: {count: 0, page_num: 0, total: 0}},
                //
                siteLoading: false,
                merSiteLists: [],
                merSiteLast50: [],
                siteOptions: [],
            }
        },
        mounted() {
            getLastValid50().then(res => {
                const {data} = res
                this.convertSiteListData(data)
                this.merSiteLast50 = this.merSiteLists
            }).finally(() => {
                this.loading = false
            })
            this.search();
        },
        methods: {
            convertSiteListData(data) {
                if (data.list !== undefined && isArray(data.list)) {
                    this.merSiteLists = data.list.map(item => {
                        return {value: item.site_id, label: item.site_url};
                    });
                } else {
                    this.merSiteLists = this.merSiteLast50;
                }
            },
            ajaxSelectSite(query) {
                if (query !== '') {
                    this.siteLoading = true;
                    setTimeout(() => {
                        this.siteLoading = false;
                        let list = this.merSiteLists.filter(item => {
                            return item.label.toLowerCase()
                                .indexOf(query.toLowerCase()) > -1;
                        });
                        if (list === undefined || list.length === 0) {
                            this.siteLoading = true
                            let searchParams = {'status': 'enable', 'siteUrl': query}
                            shopSearch(searchParams).then(res => {
                                const {data} = res
                                this.convertSiteListData(data)
                            }).finally(() => {
                                this.siteLoading = false
                            })
                        }
                        this.siteOptions = list
                    }, 200);
                } else {
                    this.siteOptions = [];
                }
            },
            copy() {
                newClipboard('.clipboard-btn')
            },
            initAddItemForm() {
                return {'sku': '', 'name': '', 'amount': '', 'currency': '', 'quantity': '1'};
            },
            addItem() {
                this.newProducts.push(this.addItemForm)
                this.closeDialog()
            },
            showAddItem() {
                this.addItemDialogVisible = true
            },
            closeDialog() {
                this.addItemDialogVisible = false
                this.addItemForm = this.initAddItemForm();
            },
            handleDelete(index) {
                this.newProducts.splice(index, 1)
            },
            submitCreateFastPay() {
                this.errorMsg = ''
                if (this.newProducts.length === 0) {
                    this.$data.errorMsg = '请增加产品信息'
                    return '';
                }
                this.newFastPay.products = JSON.stringify(this.newProducts)
                this.loading = true
                fastPayAdd(this.newFastPay).then(res => {
                    this.search();
                    this.$message.success(res.message)
                }).finally(() => {
                    this.loading = false
                })
            },
            validMsg(name) {
                return this.$i18n.t('valid.required_field', [this.$i18n.t(name)]);
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
                fastPaySearch(this.searchParams).then(res => {
                    const {data} = res
                    this.$data.tabData = data
                }).finally(() => {
                    this.loading = false
                })
            },

        },
    }
</script>

<style>
    .track_excel .el-upload-dragger {
        width: 280px;
        height: 150px;
    }
</style>
