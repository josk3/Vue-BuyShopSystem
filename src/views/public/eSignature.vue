<template>
    <div v-loading="loading"></div>
</template>

<script>
    import configs from '@/configs'
    import {getSignatureLink,getSignatureInfo} from "@/service/signatureSer";
    import {isEmpty} from "@/utils/validate";

    export default {
        name: "e_signature",
        computed: { //watch跟踪数据变化, 重点user, configs
            configs() {
                return configs;
            },
        },
        data() {
            return {
                loading: false,
                sid: '',
                detail: {},
            }
        },
        mounted() {
            if(this.$route.path === '/e_signature/sign_success'){
                this.sid = this.$route.params.id
                //查询签署情况
                this.findSignatureInfo();
            }else if (!isEmpty(this.$route.params)) {
                this.sid = this.$route.params.id
                this.loadSignature();
            }  else {
                this.$message.error(this.$i18n.t('comm.fail').toString())
            }
        },
        methods: {
            loadSignature() {
                this.loading = true
                getSignatureLink(this.sid).then(res => {
                    const {data} = res
                    window.location.replace(data);
                }).finally(() => {
                    this.loading = false
                })
            },
            findSignatureInfo(){
                getSignatureInfo(this.sid).then(res => {
                    const {data} = res
                    this.$data.detail = data
                    //完成签署,提示后跳回主界面
                    this.$message.success(res.message)
                    this.$router.push({name: 'dashboard'})
                }).finally(() => {
                    this.loading = false
                })
            }
        },
    }
</script>

