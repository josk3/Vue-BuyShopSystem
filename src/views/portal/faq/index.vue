<template>
    <div>
        faq
    </div>
</template>

<script>
    import request from '@/utils/request'
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
            }
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
