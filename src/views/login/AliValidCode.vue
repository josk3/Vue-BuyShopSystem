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
                if (this.isAndroid()) {
                    //调安卓端方法,关闭dialog
                    window.$App.closeDialog();
                }
                if (this.isiOS()) {
                    //调用ios方法,关闭dialog
                    window.webkit.messageHandlers.closeDialog.postMessage({'message': 'close dialog'});
                }
            },
            validCodeCallback(data) {
                //data : csessionid, value ,sig
                this.$emit('callback', JSON.stringify(data))
                if (this.isAndroid()) {
                    //调安卓端方法,传输阿里云回调数据给到安卓端
                    window.$App.getSlideData(JSON.stringify(data));
                }
                if (this.isiOS()) {
                    //传输阿里云回调数据给ios
                    window.webkit.messageHandlers.getSlideData.postMessage(JSON.stringify(data));
                }
                //关闭dialog
                this.validCodeDialogVisible = false
            },
            validCodeDialogOpened() {
                AliImageValid(configs.aliImageValidAppKey, this.validCodeCallback, this.lang)
                this.$emit('opened')
            },
            isAndroid() {
                return navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
            },
            isiOS() {
                let device = navigator.userAgent;//设备
                let ios = !!device.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
                let iPad = device.indexOf('iPad') > -1;
                let iPhone = device.indexOf('iPhone') > -1 || device.indexOf('Mac') > -1;
                return ios || iPad || iPhone;
            }
        },

    }
</script>
<style scoped>
    .wtp_dialog {
        margin-top: -15vh;
    }
</style>