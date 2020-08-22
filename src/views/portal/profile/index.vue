<template>
    <div>
        profile111
    </div>
</template>

<script>
    import request from '@/utils/request'
    export default {
        name: "profile",
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
