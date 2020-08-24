<template>
    <div>
        <SearchBox></SearchBox>
        {{ $t('nav.chargeback_select') }}
    </div>
</template>

<script>
    import request from '@/utils/request'
    import configs from '@/configs'
    import user from "@/store/modules/user";
    import SearchBox from "@/components/SearchBox";
    import Pagination from "@/components/Pagination";

    export default {
        name: "chargeback",
        components: {
            SearchBox
        },
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
            }
        },
        mounted() {
            request({
                url: '/profile',
                method: 'get'
            })
        },

    }
</script>

<style scoped>

</style>
