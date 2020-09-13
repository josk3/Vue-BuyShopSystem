<template>
    <div class="bg-white p-5">
        <div>
            <h4>{{ $t('nav.faq')}} </h4>
            <el-collapse v-model="activeNames">
                <el-collapse-item title="服务工单" name="1">
                    <div> 点击【服务工单】，可根据 商户提交问题—填写问 题内容—平台受理问题单，商户可在我的工单查看处理进度。
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
    import configs from '@/configs'
    import user from "@/store/modules/user";

    export default {
        name: "faq",
        computed: { //watch跟踪数据变化, 重点user, configs
            configs() {
                return configs;
            },
            user() {
                return user.state.user;
            },
        },
        data() {
            return {
                activeNames: ['1', '2', '3']
            };
        },
        methods: {
        },
        mounted() {
            // request({
            //     url: '/faq',
            //     method: 'get'
            // })
        },
    }
</script>

<style scoped>

</style>
