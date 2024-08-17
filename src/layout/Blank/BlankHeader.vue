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
                            <!-- <svg-icon icon-class="wintopay_word_black" class-name="home-logo mt-1"/> -->
                            <span v-if="!configs.isProEnv" class="test-env-info mr-2">{{$t('comm.test')}}</span>
                        </router-link>
                    </li>
                </ul>
                <div class="form-inline mr-lg-5 text-center ml-md-5 ml-sm-5">
                    <el-dropdown trigger="click" class="float-right" @command="handleLangChange">
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
                lang: state => state.app.lang,
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
            handleLangChange(lang){
                this.$i18n.locale = lang
                this.$store.dispatch('app/setLang', lang)
                this.updatePageTitle()
            },
            updatePageTitle: function () {
                reloadPageTitle(this.$route)
            },
        },
    }
</script>

<style scoped>
    .test-env-info{
        float: right;
        margin-top: 3px;
    }
</style>
