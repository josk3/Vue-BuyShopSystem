<template>
    <div class="bg-white p-5">
        <div>
            <h4>{{ $t('nav.faq')}} </h4>
            <el-collapse v-model="activeNames">
                <el-collapse-item v-for="item in faq_list"
                                  :key="item.name"
                                  :name="item.name"
                                  :class="hashName === item.name ? 'active-hash' : ''"
                                  :title="item.title">
                    <div v-html="item.html"></div>
                </el-collapse-item>

            </el-collapse>
        </div>
    </div>
</template>

<script>
    import configs from '@/configs'
    import user from "@/store/modules/user";
    import {isEmpty} from "@/utils/validate";

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
        watch: {
            $route: {
                handler: function(){
                    this.handleHash()
                },
            }
        },
        mounted() {
            let fullNames = []
            this.faq_list.forEach(function (item) {
                if (!isEmpty(item) && !isEmpty(item.name)) {
                    fullNames.push(item.name)
                }
            })
            this.fullNames = fullNames;
            this.handleHash()
        },
        data() {
            return {
                hashName: '',
                activeNames: [],
                faq_list: [
                    {title: '服务工单', name: 'ticket', html: '点击【服务工单】，可根据 商户提交问题—填写问 题内容—平台受理问题单，商户可在我的工单查看处理进度。'},
                    {
                        title: '认证激活账户', name: 'identity',
                        html: '点击【激活您的账户】，请认真填写信息，认证后不可修改。<br/>\n' +
                            '账户需要认证完成后才可添加结算银行卡，银行卡户主需与认证信息一致。'
                    },
                    {
                        title: '添加银行卡信息', name: 'add_bank',
                        html: '点击【账户管理】-> 【商户信息】，添加银行卡信息。<br/>\n' +
                            '银行卡户主需与认证信息一致。请认真填写信息，认证后不可修改，如有改动需联系客服操作。'
                    },
                    {
                        title: '上传/填写订单物流信息', name: 'delivery',
                        html: '点击【物流管理】，显示可还未填写物流信息的订单。<br/>\n' +
                            '支持批量上传表格，根据表格列填写对应信息。 表格模板可在【物流管理】下载'
                    },
                    {
                        title: '订单申请结算', name: 'order_settle',
                        html: '点击【结算管理】-> 【结算申请】，显示满足条件可结算的订单列表。<br/>\n' +
                            '申请前需要操作填写订单物流信息【物流管理】，并且满足结算周期。'
                    },
                    {title: '查看拒付率', name: 'ecm', html: '点击【账户管理】-> 【商户信息】，显示拒付处理费、拒付率、拒付订单笔数等详细信息。'},
                    {
                        title: '订单退款', name: 'refund',
                        html: '点击【交易管理】 订单列表右边点击 【 <i class="el-icon-more"></i> 】<br/>\n' +
                            '还未审核的退款申请支持取消操作，点击【 退款查询 】订单列表【 <i class="el-icon-more"></i> 】'
                    },


                ],
            };
        },
        methods: {
            handleHash() {
                let hash = this.$route.hash
                if (!isEmpty(hash)) hash = hash.replace("#", "")
                if (!isEmpty(hash)) {
                    this.activeNames = [hash]
                    this.hashName = hash
                } else {
                    this.activeNames = this.fullNames
                    this.hashName = ''
                }
            }
        },

    }
</script>

<style>
    .active-hash .el-collapse-item__header {
        font-weight: bold;
        color: #267dd5;
    }
</style>
