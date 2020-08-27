<template>
    <div id="head-nav" class="d-flex flex-column flex-md-row align-items-center shadow-sm">
        <div class="container-lg p-1 head-main">
            <div class="row d-flex">
                <div class="col-2">
                    <h5 class="my-0 mr-md-auto font-weight-normal">
                        <router-link :to="configs.homePath">
                            <svg-icon icon-class="wintopay_logo_white" class-name="home-logo" />
                        </router-link>
                    </h5>
                </div>
                <div class="col-10">
                    <nav class="my-2 my-md-0 mr-md-3 float-right">
                        <el-popover
                                placement="bottom"
                                width="360"
                                trigger="click" @show="loadNotice">
                            <el-table :data="noticeList">
                                <el-table-column width="150" property="date" label="日期"></el-table-column>
                                <el-table-column width="100" property="name" label="姓名"></el-table-column>
                            </el-table>

                            <el-button type="text" class="p-0 pl-2 pr-2" slot="reference">
                                <el-badge :value="noticeCount" :max="99"
                                          :hidden="(noticeCount <= 0)"
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
        </div>
    </div>
</template>

<script>
    import configs from "@/configs";
    import user from "@/store/modules/user";
    import {mapState} from "vuex";
    import {isEmpty} from "@/utils/validate";

    export default {
        name: "Header",
        computed: { //watch跟踪数据变化, 重点user, configs
            ...mapState({
                sidebar: state => state.app.sidebar,
                device: state => state.app.device,
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
                noticeCount: 0,
                noticeList: [],
            }
        },
        mounted() {
            if(!isEmpty(this.user)) {
                this.noticeCount = this.user.notice_count
                if (this.user.notice_count > 0) {
                    this.changeNoticeIco();
                }else {
                    this.resetIco()
                }
            }
        },
        methods: {
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
            loadNotice: function() {
                console.log('loadNotice')
                //list and ico
            }
        },
    }
</script>

<style scoped>

</style>
