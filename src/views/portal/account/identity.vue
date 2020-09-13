<template>
    <div v-loading="loading">
        <div class="row">
            <div class="col-12 mb-2">
                <el-card shadow="always" class="box-card p-3"
                         :body-style="{ padding: '0px' }">
                    <div class="text-muted p-0">
                        <i class="el-icon-info text-blue"></i> {{$t('comm.status')}} : {{ user.identifier_status | validStatus}}
                    </div>
                </el-card>
            </div>
        </div>
        <div class="wrap-tab p-0">
            <el-card class="box-card wpy-card" shadow="never" :body-style="{ padding: '0px' }">
                <div slot="header" class="clearfix">
                    <span>认证信息</span>
                </div>
                <div>
                    <div class="info-control-list">
                        <div class="row"><label class="col-sm-3">Md5Key</label>
                            <div class="col-sm-9"><span>swGFERew</span></div>
                        </div>
                        <div class="row"><label class="col-sm-3">注册时间</label>
                            <div class="col-sm-9"><span>--</span></div>
                        </div>
                        <div class="row"><label class="col-sm-3">过期时间</label>
                            <div class="col-sm-9"><span>--</span></div>
                        </div>
                    </div>
                </div>
            </el-card>

        </div>
    </div>
</template>

<script>
    import configs from '@/configs'
    import user from "@/store/modules/user";
    import {mapState} from "vuex";

    export default {
        name: "merchant_identity",
        components: {},
        computed: { //watch跟踪数据变化, 重点user, configs
            ...mapState({
                menus: state => state.user.menus,
            }),
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
        mounted() {
        },
        methods: {},
    }
</script>

<style scoped>

</style>
