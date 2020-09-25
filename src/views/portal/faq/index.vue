<template>
    <div class="bg-white p-5">
        <div>
            <h4>{{ $t('nav.faq')}} </h4>
            <el-collapse v-model="activeNames">
                <el-collapse-item title="服务工单" name="1">
                    <div> 点击【服务工单】，可根据 商户提交问题—填写问 题内容—平台受理问题单，商户可在我的工单查看处理进度。
                    </div>
                </el-collapse-item>
                <el-collapse-item title="认证激活账户" name="2">
                    <div>
                        点击【激活您的账户】，请认真填写信息，认证后不可修改。<br/>
                        账户需要认证完成后才可添加结算银行卡，银行卡户住需与认证信息一致。
                    </div>
                </el-collapse-item>
                <el-collapse-item title="添加银行卡信息" name="3">
                    <div>
                        点击【账户管理】-> 【商户信息】，添加银行卡信息。<br/>
                        银行卡户住需与认证信息一致。请认真填写信息，认证后不可修改，如有改动需联系客服操作。
                    </div>
                </el-collapse-item>
                <el-collapse-item title="上传/填写订单物流信息" name="4">
                    <div>
                        点击【物流管理】，显示可还未填写物流信息的订单。<br/>
                        支持批量上传表格，根据表格列填写对应信息。 表格模板可在【物流管理】下载
                    </div>
                </el-collapse-item>
                <el-collapse-item title="订单申请结算" name="5">
                    <div>
                        点击【结算管理】-> 【结算申请】，显示可满足条件可结算的订单列表。<br/>
                        申请前需要操作填写订单物流信息【物流管理】，并且满足结算周期。
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
                activeNames: ['1', '2', '3', '4', '5']
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
