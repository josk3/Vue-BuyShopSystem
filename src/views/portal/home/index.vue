<template>
    <div>
        home
        <h3>{{ user.name }}</h3>

    </div>
</template>

<script>
    import configs from '@/configs'
    import user from "@/store/modules/user";

    export default {
        name: "home",
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
    }
</script>

<style scoped>

</style>
