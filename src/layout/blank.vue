<template>
    <div id="blank-w" class="wrap d-flex flex-column h-100">
        <BlankHeader></BlankHeader>
        <main role="main" class="flex-shrink-0">
            <div class="container wrap-main">
                <router-view></router-view>
            </div>
        </main>
        <!--   F    -->
        <BlankFooter></BlankFooter>
    </div>
</template>

<script>
    import BlankFooter from "@/layout/Blank/BlankFooter";
    import BlankHeader from "@/layout/Blank/BlankHeader";
    import {mapState} from 'vuex'
    import configs from '@/configs'

    export default {
        name: "Blank",
        components: {
            BlankFooter, BlankHeader
        },
        computed: {
            ...mapState({
                sidebar: state => state.app.sidebar,
                device: state => state.app.device,
            }),
            configs() {
                return configs;
            },
        },
        data() {
            return {};
        }
    }
</script>

<style scoped>

</style>
