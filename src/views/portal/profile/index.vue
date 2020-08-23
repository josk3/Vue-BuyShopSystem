<template>
    <div>
        profile111
        {{ user.name }}
        <h3>{{ user.name }}</h3>
    </div>
</template>

<script>
    import request from '@/utils/request'
    import configs from '@/configs'
    import user from "@/store/modules/user";

    export default {
        name: "profile",
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
