<template>
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
        <h5 class="my-0 mr-md-auto font-weight-normal">Company name</h5>
        <nav class="my-2 my-md-0 mr-md-3">
            <a class="p-2 text-dark" href="#">Features</a>
            <a class="p-2 text-dark" href="#">{{ user.name }}</a>
            <a class="p-2 text-dark" href="#">{{ user.email }}</a>
        </nav>
        <router-link :to="configs.logoutPath" class="btn btn-outline-primary">
            <span>{{ $t('comm.logout') }}</span>
        </router-link>
        <router-link :to="configs.homePath">
            <el-button type="primary">
                home
            </el-button>
        </router-link>
    </div>
</template>

<script>
    import configs from "@/configs";
    import user from "@/store/modules/user";
    import {mapState} from "vuex";

    export default {
        name: "Header",
        computed: { //watch跟踪数据变化, 重点user, configs
            ...mapState({
                sidebar: state => state.app.sidebar,
                device: state => state.app.device,
            }),
            configs() {
                return configs;
            },
            user() {
                return user.state.user;
            },
        },
        data() {
            return {}
        }
    }
</script>

<style scoped>

</style>
