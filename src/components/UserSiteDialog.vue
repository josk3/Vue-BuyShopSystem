<template>
    <div class="clearfix">
        <!--    d    -->
        <el-dialog custom-class="wpy-dialog no-px-table"
                   :show-close="false" :close-on-click-modal="false"
                   top="2vh"
                   :title="$t('nav.merchant_users')"
                   :visible.sync="userSiteDialogVisible">
            <div>
                <p>
                    注: 结算管理、财务中心明细与结算显示的是所有网站交易情况、争议订单与消息通知为所有网站订单。
                </p>
                <el-alert v-if="!onlySomeSite"
                          title="可查看所有网站交易"
                          type="success"
                          effect="dark">
                </el-alert>
                <el-alert v-if="canViewSiteCount"
                          :title="'可查看网站数' + canViewSiteCount +'个'"
                          type="success">
                </el-alert>
                <el-table
                        ref="userSiteTable"
                        :data="userSiteData.list"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
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
                            prop="is_virtual"
                            width="80px"
                            :label="$t('shop.is_a_virtual')">
                        <template v-slot="scope">
                            {{scope.row.is_virtual | yesOrNo }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="operator"
                            :show-overflow-tooltip="true"
                            :label="$t('comm.operator')">
                    </el-table-column>
                </el-table>
                <Pagination v-if="userSiteData.page" :page="userSiteData.page" @change="pageChange"></Pagination>
            </div>
            <div slot="footer" class="dialog-footer" v-loading="loading">
                <small>*设置分组 (<b>{{searchParams.role_name}}</b>) 仅查看部分网站交易。</small>
                <el-button size="mini" @click="closeDialog()">{{$t('comm.cancel')}}</el-button>
                <el-button size="mini" type="primary" @click="saveUserSite" class="ml-3">{{$t('comm.save')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    import {mapState} from "vuex";
    import configs from "@/configs";
    import Pagination from "@/components/Pagination";
    import {roleUserSiteSearch, saveUserSite} from "@/service/merchantSer";

    export default {
        name: "UserSiteDialog",
        components: {Pagination},
        props: [],
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
                role: {'role_uid': '', 'role_name': '', 'remark': ''},
                searchParams: {'role_uid': '', 'page': ''},
                userSiteData: {'list': [], 'total': 0},
                onlySomeSite: false,
                canViewSiteCount: 0,
                userSiteDialogVisible: false,
                multipleSelection: [],
                selected: [],
                siteIdsCheckStatus: [],
            }
        },
        watch: {},
        mounted() {
        },
        methods: {
            validMsg(name) {
                return this.$i18n.t('valid.required_field', [this.$i18n.t(name)]);
            },
            closeDialog() {
                this.userSiteDialogVisible = false
            },
            initData(){
                this.multipleSelection = []
                this.selected = []
                this.siteIdsCheckStatus = []
                this.userSiteData = {}
                this.onlySomeSite = false
                this.canViewSiteCount = 0
            },
            show(role) {
                this.role = {}
                this.searchParams = {}
                this.initData()
                this.role = role
                this.searchParams.role_uid = role.role_uid
                this.searchParams.role_name = role.role_name
                this.userSiteDialogVisible = true
                this.search()
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            loadSiteData(data) {
                this.initData()
                this.userSiteData = data
                this.onlySomeSite = data.only_some_site
                this.canViewSiteCount = data.can_view_site_count
                this.$nextTick(() => {
                    this.userSiteData.list.forEach(row => {
                        if (row.checked) {
                            this.$refs.userSiteTable.toggleRowSelection(row);
                        }
                    });
                })
            },
            pageChange(page) {
                this.searchParams.page = page.page_num
                this.search()
            },
            search() {
                roleUserSiteSearch(this.searchParams).then((resp) => {
                    this.loadSiteData(resp.data)
                }).finally(() => {
                    this.$data.loading = false
                })
            },
            saveUserSite() {
                this.multipleSelection.forEach(row => {
                    this.selected.push(row.site_id)
                });
                this.userSiteData.list.forEach(row => {
                    let check = (this.selected.indexOf(row.site_id) !== -1);
                    this.siteIdsCheckStatus.push({'site_id': row.site_id, 'check': check})
                });
                saveUserSite({
                    'role_uid': this.role.role_uid,
                    'site_ids': JSON.stringify(this.siteIdsCheckStatus)
                }).then(() => {
                    this.$message.success(this.$i18n.t('comm.success').toString())
                    this.search()
                }).finally(() => {
                    this.$data.loading = false
                })
            },

        },

    }
</script>
