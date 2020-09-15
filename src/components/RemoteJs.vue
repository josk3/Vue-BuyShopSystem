<template>
    <div></div>
</template>

<script>
    export default {
        name: "RemoteJs",
        props: ['src'],
        mounted() {
            console.log('rJs')
            let script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = this.src
            document.getElementsByTagName('head')[0].appendChild(script);//加在head
        },
    }
</script>

<style scoped>

</style>
