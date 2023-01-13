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
                esId: '',
                detail: {},
            }
        },
        mounted() {
            if(!isEmpty(this.$route.params) && !isEmpty(this.$route.params.sId)){
                this.sid = this.$route.params.sId
                //查询签署情况
                this.findSignatureInfo();
            }else if (!isEmpty(this.$route.params) && !isEmpty(this.$route.params.id)) {
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
                this.loading = true
                getSignatureInfo(this.sid).then(res => {
                    const {data} = res
                    this.$data.detail = data
                    //完成签署,提示后跳回主界面
                    this.$message.success(res.message)
                }).finally(() => {
                    this.loading = false
                    this.$router.push({name: 'dashboard'})
                })
            }
        },
    }
</script>

