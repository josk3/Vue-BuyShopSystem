<template>
    <div class="ali-valid-code">
        <el-dialog custom-class="wpy-dialog mini-dialog"
                   :close-on-click-modal="false"
                   :title="$t('login.robot_valid')"
                   class="wtp_dialog"
                   @opened="validCodeDialogOpened"
                   @close="closeValidCodeDialog"
                   :visible.sync="validCodeDialogVisible">
            <div>
                <div id="__nc" class="m-auto pt-2 pb-3">
                    <div id="nc"></div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    import AliImageValid from "@/utils/AliImageValid";
    import configs from "@/configs";
    import {mapState} from "vuex";

    export default {
        name: "AliValidCode",
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
                validCodeDialogVisible: false,
            }
        },
        watch: {}
        ,
        mounted() {
            window.openValidCodeDialog = this.openValidCodeDialog;
        },
        methods: {
            //安卓原生访问验证码页面
            //---vue.js调用安卓方法
            // 将vue项目放到一个内网地址或者外网地址中，然后安卓端通过“webView.loadUrl()”将vue项目引入。安卓端将要调用的方法名暴露在window对象中，由vue直接在methods中调用并携带参数。
            //---安卓调用vue.js中的方法
            //同样的vue也需要把方法添加到window中去，再由安卓端去调取方法。
            openValidCodeDialog() {
                this.validCodeDialogVisible = true
            },
            closeValidCodeDialog() {
                this.validCodeDialogVisible = false
                this.$emit('close')
                //调安卓端方法,关闭dialog
                window.$App.closeDialog();
            },
            validCodeCallback(data) {
                this.closeValidCodeDialog()
                //data : csessionid, value ,sig
                this.$emit('callback', JSON.stringify(data))
                //调安卓端方法,传输阿里云回调数据给到安卓端
                window.$App.getSlideData(JSON.stringify(data));
            },
            validCodeDialogOpened() {
                AliImageValid(configs.aliImageValidAppKey, this.validCodeCallback, this.lang)
                this.$emit('opened')
            },
        },

    }
</script>
<style scoped>
    .wtp_dialog {
        margin-top: -15vh;
    }
</style>