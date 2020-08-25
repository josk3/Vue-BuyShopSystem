<template>
    <div id="head-nav" class="d-flex flex-column flex-md-row align-items-center shadow-sm">
        <div class="container-lg p-1 head-main">
            <div class="row d-flex">
                <div class="col-2">
                    <h5 class="my-0 mr-md-auto font-weight-normal">
                        <router-link :to="configs.homePath">
                            <img src="../../assets/images/wintopay_logo_white.svg" height="25" alt="Home">
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
                                <el-dropdown-item icon="el-icon-user-solid" class="p-1 pl-3 pr-3">{{ $t('comm.profile')
                                    }}
                                </el-dropdown-item>
                                <el-dropdown-item icon="el-icon-help" class="p-1 pl-3 pr-3">{{ $t('comm.faq') }}
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
                noticeCount: 35,
                noticeList: [],
            }
        },
        methods: {
            loadNotice() {
                console.log('loadNotice')
            }
        },
    }
</script>

<style scoped>

</style>
