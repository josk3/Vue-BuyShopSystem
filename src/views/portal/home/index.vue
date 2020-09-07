<template>
    <div v-loading="loading">
        <div class="row p-0">
            <div class="col-12 mt-1 mb-2" style="font-size: 80%;">
                <span class="float-left pl-3">您好, {{ user.name }}</span>
                <span class="float-right pr-3">最近登录: {{ user.second_login }}</span>
            </div>
            <div class="col-12 mb-2">
                <el-card shadow="hover" class="box-card p-3"
                         :body-style="{ padding: '0px' }">
                    <div class="row p-0">
                        <div class="col-11 row">
                            <div class="col-4">
                                <i class="el-icon-info text-blue"></i> 您有1笔拒付交易未处理
                            </div>
                            <div class="col-4">
                                <i class="el-icon-info text-blue"></i> 您有1笔拒付交易未处理
                            </div>
                            <div class="col-4">
                                <i class="el-icon-info text-blue"></i> 您有1笔拒付交易未处理
                            </div>
                        </div>
                        <div class="col-1">
                            <el-button class="float-right" type="text" size="mini">
                                查看更多
                            </el-button>
                        </div>
                    </div>
                </el-card>
            </div>
            <div class="col-12 mb-2">
                <el-card shadow="hover" class="box-card p-3 bg-white"
                         :body-style="{ padding: '0px' }">
                    <div class="home-last-trade-report">
                        <LastTimeReport></LastTimeReport>
                    </div>
                </el-card>
            </div>

        </div>
    </div>
</template>

<script>
    import configs from '@/configs'
    import user from "@/store/modules/user";
    import LastTimeReport from "@/components/LastTimeReport";

    export default {
        name: "home",
        components: {LastTimeReport},
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
                loading: false,
            }
        },
        methods: {},
    }
</script>

<style>
    .home-last-trade-report {
    }
</style>
