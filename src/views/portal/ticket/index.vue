<template>
    <div>
        Ticket
        <h3>{{ user.name }}</h3>
    </div>
</template>

<script>
    import configs from '@/configs'
    import user from "@/store/modules/user";
    import {search} from '@/service/ticketSer'

    export default {
        name: "ticket",
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
                ticketList: []
            }
        },
        mounted() {
            //查询当前ticket 列表 this.ticketList = search({})
            // !!routerUtils, SearchBox, Pagination!! -> 参考 refund退款页面
        },
    }
</script>

<style scoped>

</style>
