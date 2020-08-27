<template>
    <div class="container-md" style="max-width: 750px">
        <div class="p-5">
            <div class="mb-5">
                条款
            </div>
            <div class="mb-3 text-center">
                <router-link :to="configs.loginPath"
                             class="btn btn-sm p-2 pl-1 pr-4 btn-link btn-mp">
                    {{ $t('comm.login') }}
                </router-link>
                <router-link :to="configs.registerPath"
                             class="btn btn-sm p-2 pl-1 pr-4 btn-link btn-mp">
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
        }
    }
</script>

<style scoped>

</style>
