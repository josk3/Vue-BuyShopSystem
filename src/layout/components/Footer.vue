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
                        <small>Content protected Copyright © 2021 All Rights Reserved Wintopay.com</small>
                        <el-dropdown trigger="hover" class="float-right" @command="handleLangChange">
                            <span class="el-dropdown-link text-blue">
                                <font-awesome-icon icon="language" size="2x"/>
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
                lang: state => state.app.lang,
            }),
            configs() {
                return configs;
            },
            user() {
                return user.state.user;
            },
        },
        methods: {
            handleLangChange(lang){
                this.$i18n.locale = lang
                this.$store.dispatch('app/setLang', lang)
                this.updatePageTitle()
            },
            updatePageTitle: function () {
                reloadPageTitle(this.$route)
            },
        }
    }
</script>

<style scoped>

</style>
