<template>
    <div class="ali-valid-code">
        <el-dialog custom-class="wpy-dialog mini-dialog"
                   :close-on-click-modal="false"
                   title="机器人验证"
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
        props: ['visible'],
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
        watch: {
            visible(newVal) {
                if (newVal === true) {
                    this.openValidCodeDialog()
                }
            },
        },
        mounted() {
        },
        methods: {
            //---
            openValidCodeDialog() {
                this.validCodeDialogVisible = true
            },
            closeValidCodeDialog() {
                this.validCodeDialogVisible = false
                this.$emit('close')
            },
            validCodeCallback(data) {
                this.closeValidCodeDialog()
                //data : csessionid, value ,sig
                this.$emit('callback', JSON.stringify(data))
            },
            validCodeDialogOpened() {
                AliImageValid(configs.aliImageValidAppKey, this.validCodeCallback, this.lang)
                this.$emit('opened')
            },
        },

    }
</script>
