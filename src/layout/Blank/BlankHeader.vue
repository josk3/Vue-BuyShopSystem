<template>
    <header>
        <nav class="navbar navbar-expand-md bg-white shadow-sm fixed-top">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                    aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <font-awesome-icon icon="bars"/>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav mr-auto pl-lg-5 ml-md-5 ml-sm-3">
                    <li class="nav-item active">
                        <router-link :to="configs.homePath">
                            <svg-icon icon-class="wintopay_word_black" class-name="home-logo mt-1"/>
                        </router-link>
                    </li>
                </ul>
                <div class="form-inline mr-lg-5 text-center ml-md-5 ml-sm-5">
                    <el-dropdown trigger="click" class="float-right">
                            <span class="el-dropdown-link text-blue">
                                <font-awesome-icon icon="language" size="2x"/>
                            </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <a href="javascript:void(0)" class="btn btn-link btn-sm mr-2"
                                   @click="goLangEn">English</a>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <a href="javascript:void(0)" class="btn btn-link btn-sm " @click="goLangZh">中文</a>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
    import configs from "@/configs";
    import {mapState} from "vuex";
    import {reloadPageTitle} from "@/utils/get-page-title";

    export default {
        name: "BlankHeader",
        computed: { //watch跟踪数据变化, 重点user, configs
            ...mapState({
                sidebar: state => state.app.sidebar,
                device: state => state.app.device,
            }),
            configs() {
                return configs;
            },
        },
        data() {
            return {}
        },
        mounted() {
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
            updatePageTitle: function () {
                reloadPageTitle(this.$route)
            },
        },
    }
</script>

<style scoped>

</style>
