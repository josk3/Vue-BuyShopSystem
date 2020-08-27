<template>
    <footer class="footer mt-auto py-3">
        <div class="container">
            <div class="text-center">
                <ul class="list-unstyled list-inline">
                    <li class="list-inline-item mr-1 small">
                        <a :href="configs.aboutUsUrl" target="_blank"
                           class="btn btn-light btn-sm mr-2">{{ $t('comm.about_company') }}</a>
                    </li>
                    <li class="list-inline-item mr-1 small">
                        <router-link :to="configs.faqPath" class="btn btn-light btn-sm mr-2">
                            {{ $t('comm.faq') }}
                        </router-link>
                    </li>
                    <li class="list-inline-item mr-1 small">
                        <a :href="configs.contactUsUrl" target="_blank"
                           class="btn btn-light btn-sm mr-2">{{ $t('comm.contact_us') }}</a>
                    </li>
                    <li class="text-muted">
                        <small>Content protected Copyright © 2020 All Rights Reserved Wintopay.com</small>
                        <el-dropdown trigger="click" class="float-right">
                            <span class="el-dropdown-link text-blue">
                                <font-awesome-icon icon="language" size="2x"/>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <a href="javascript:void(0)" class="btn btn-link btn-sm mr-2" @click="goLangEn">English</a>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <a href="javascript:void(0)" class="btn btn-link btn-sm " @click="goLangZh">中文</a>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</template>

<script>
    import {mapState} from "vuex";
    import configs from "@/configs";
    import user from "@/store/modules/user";
    import {reloadPageTitle} from "@/utils/get-page-title";

    export default {
        name: "Footer",
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
        methods: {
            goLangEn: function () {
                this.$i18n.locale = 'en'
                this.$store.dispatch('app/setLang', 'en')
                this.updatePageTitle()
            },
            goLangZh: function () {
                this.$i18n.locale = 'zh'
                this.$store.dispatch('app/setLang', 'zh')
                this.updatePageTitle()
            },
            updatePageTitle: function() {
                reloadPageTitle(this.$route)
            },
        }
    }
</script>

<style scoped>

</style>
