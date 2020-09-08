<template>
    <div id="head-nav" class="d-flex flex-column flex-md-row align-items-center shadow-sm">
        <div class="container-lg p-1 head-main">
            <div class="row d-flex">
                <div class="col-2">
                    <h5 class="my-0 mr-md-auto font-weight-normal">
                        <router-link :to="configs.homePath">
                            <svg-icon icon-class="wintopay_logo_white" class-name="home-logo"/>
                        </router-link>
                    </h5>
                </div>
                <div class="col-10">
                    <nav class="my-2 my-md-0 mr-md-3 float-right">
                        <el-dropdown trigger="click"
                                     class="mr-4"
                                     @command="handleLangChange">
                            <span class="el-dropdown-link text-white">
                                <font-awesome-icon icon="language" size="lg"/>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="en">
                                    <i v-if="lang === 'en'" class="el-icon-check"></i>
                                    English
                                </el-dropdown-item>
                                <el-dropdown-item command="zh">
                                    <i v-if="lang === 'zh'" class="el-icon-check"></i>
                                    简体中文
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-popover
                                placement="bottom"
                                width="350"
                                trigger="click" @show="loadNotice">
                            <el-table v-loading="noticeLoading"
                                      class="wpy-table pointer"
                                      :show-header="false"
                                      @row-click="goNoticeDetail"
                                      :data="noticeList">
                                <el-table-column
                                        :show-overflow-tooltip="true"
                                        width="220px"
                                        label="title">
                                    <template v-slot="scope">
                                        {{scope.row.title }}
                                    </template>
                                </el-table-column>
                                <el-table-column property="created" label="time">
                                    <template v-slot="scope">
                                        {{scope.row.created | toDay }}
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div>
                                <router-link :to="configs.msgCenterPath" class="p-3 btn-link wpy-btn d-block">
                                    {{ $t('comm.view_more') }}
                                </router-link>
                            </div>

                            <el-button type="text" class="p-0 pl-2 pr-2" slot="reference">
                                <el-badge :value="user.notice_count" :max="99"
                                          :hidden="(user.notice_count <= 0)"
                                          class="item mr-4 text-white ">
                                    <font-awesome-icon :icon="['far', 'bell']"/>
                                </el-badge>
                            </el-button>
                        </el-popover>
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link text-white">
                                {{ user.email }}<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item class="p-1 pl-3 pr-3">
                                    <router-link :to="configs.profilePath">
                                        <i class="el-icon-user-solid"></i>{{ $t('comm.profile') }}
                                    </router-link>
                                </el-dropdown-item>
                                <el-dropdown-item class="p-1 pl-3 pr-3">
                                    <router-link :to="configs.faqPath">
                                        <i class="el-icon-help"></i>{{ $t('comm.faq') }}
                                    </router-link>
                                </el-dropdown-item>
                                <el-dropdown-item divided>
                                    <router-link :to="configs.logoutPath">
                                        <font-awesome-icon icon="sign-out-alt"/>
                                        {{ $t('comm.logout') }}
                                    </router-link>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </nav>
                </div>
            </div>
            <el-dialog v-if="popupData"
                       custom-class="wpy-dialog sm-dialog"
                       :show-close="false" :close-on-click-modal="false"
                       :title="popupData.title"
                       :visible.sync="popupDialogVisible">
                <div class="p-1 mb-2">
                    <div>
                        <div v-html="popupData.message"></div>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer text-center" v-loading="popupLoading">
                    <el-button size="mini" @click="popupDialogVisible = false">关闭</el-button>
                    <el-button size="mini" type="primary" @click="readPopupDialog">已查看</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import configs from "@/configs";
    import user from "@/store/modules/user";
    import {mapState} from "vuex";
    import {isEmpty} from "@/utils/validate";
    import {reloadPageTitle} from "@/utils/get-page-title";
    import {getUnReadLast5Notice, markRead} from "@/service/noticeSer";

    export default {
        name: "Header",
        computed: { //watch跟踪数据变化, 重点user, configs
            ...mapState({
                sidebar: state => state.app.sidebar,
                device: state => state.app.device,
                lang: state => state.app.lang,
            }),
            configs() {
                return configs;
            },
            user() {
                return user.state.user;
            },
        },
        data() {
            return {
                noticeList: [],
                noticeLoading: false,
                popupDialogVisible: false,
                popupLoading: false,
                popupData: null,
            }
        },
        mounted() {
            if (!isEmpty(this.user)) {
                this.reloadIco()
            }
            this.showPopup()
        },
        watch: {
            user(newVal, oldVal) {
                if (newVal.notice_count !== oldVal.notice_count) {
                    this.reloadIco()
                }
                if (!isEmpty(newVal.popup) && !isEmpty(newVal.popup.nid)) {
                    this.showPopup()
                }
            }
        },
        methods: {
            showPopup(){
                if (!isEmpty(this.user.popup)) {
                    this.popupData = this.user.popup
                    this.popupDialogVisible = true
                }
            },
            readPopupDialog() {
                if (!isEmpty(this.popupData.nid)) {
                    this.popupLoading = true
                    markRead(this.popupData.nid).then(() => {
                        this.popupDialogVisible = false
                        this.$store.dispatch('user/loadUserInfo')
                    }).finally(() => {
                        this.$data.popupLoading = false
                    })
                }
            },
            reloadIco() {
                if (this.user.notice_count > 0) {
                    this.changeNoticeIco();
                } else {
                    this.resetIco()
                }
            },
            handleLangChange(lang) {
                this.$i18n.locale = lang
                this.$store.dispatch('app/setLang', lang)
                this.updatePageTitle()
            },
            updatePageTitle: function () {
                reloadPageTitle(this.$route)
            },
            changeNoticeIco: function () {
                let ico = document.getElementById('favicon');
                if (!isEmpty(ico) && !isEmpty(ico.href)) {
                    ico.href = ico.href.replace("favicon.ico", "favicon_n.ico")
                }
            },
            resetIco: function () {
                let ico = document.getElementById('favicon');
                if (!isEmpty(ico) && !isEmpty(ico.href)) {
                    ico.href = ico.href.replace("favicon_n.ico", "favicon.ico")
                }
            },
            loadNotice: function () {
                this.noticeLoading = true
                getUnReadLast5Notice().then(res => {
                    const {data} = res
                    this.noticeList = data.list
                    this.user.notice_count = data.notice_count
                    this.reloadIco()
                }).finally(() => {
                    this.$data.noticeLoading = false
                })
            },
            goNoticeDetail(row) {
                if (row.type === 'announce') {
                    this.$router.push({name: 'announce_detail', params: {id: row.nid}})
                } else {
                    this.$router.push({name: 'notify_detail', params: {id: row.nid}})
                }
            },
        },
    }
</script>

<style scoped>

</style>
