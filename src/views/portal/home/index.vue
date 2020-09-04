<template>
    <div v-loading="loading">
        <div class="row p-0">
            <div class="col-12 mt-1 mb-2" style="font-size: 80%;">
                <span class="float-left pl-3">早上好, 张三</span>
                <span class="float-right pr-3">最近登录: 2020-09-09 00:00:00</span>
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
            <el-card class="col-12 mb-2">
                <el-card shadow="hover" class="box-card p-3 bg-white"
                         :body-style="{ padding: '0px' }">
                    <div class="home-last-trade-report">
                        <LastTimeReport :data="lastTimeData"></LastTimeReport>
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
                lastTimeData: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
            }
        },
        methods: {},
    }
</script>

<style>
    .home-last-trade-report {
    }
</style>
