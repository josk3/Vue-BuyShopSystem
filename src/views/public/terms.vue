<template>
    <div class="container-md" style="max-width: 750px">
        <div class="d-block">
            <el-button type="text" @click="goBack"><i class="el-icon-arrow-left"></i> {{$t('comm.go_back')}}</el-button>
        </div>
        <div class="p-1">
            <div class="mb-5">
                <h3 class="text-center">条款</h3>
                <div class="content">
                    1.x
                </div>
            </div>
            <div class="mb-3 text-center">
                <router-link :to="configs.loginPath"
                             class="btn btn-sm p-2 pl-1 pr-4 btn-link wpy-btn">
                    {{ $t('comm.login') }}
                </router-link>
                <router-link :to="configs.registerPath"
                             class="btn btn-sm p-2 pl-1 pr-4 btn-link wpy-btn">
                    {{ $t('comm.register') }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import configs from "@/configs";

    export default {
        name: "terms",
        computed: { //watch跟踪数据变化, 重点user, configs
            ...mapState({
                sidebar: state => state.app.sidebar,
                device: state => state.app.device,
            }),
            configs() {
                return configs;
            },
        },
        mounted() {
        },
        data() {
            return {}
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
        }
    }
</script>

<style scoped>

</style>
