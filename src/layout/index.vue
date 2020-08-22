<template>
    <div :class="classObj" class="wrap">
        <Header :configs="configs"></Header>
        <div class="container wrap-main">
            <sidebar></sidebar>
            <div class="content-main">
                <router-view></router-view>
            </div>

            <!--   F    -->
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
    import {Sidebar, Header, Footer} from './components'
    import {mapState} from 'vuex'
    import configs from '@/configs'

    export default {
        name: "Layout",
        components: {
            Sidebar, Header, Footer
        },
        computed: {
            ...mapState({
                sidebar: state => state.app.sidebar,
                device: state => state.app.device,
            }),
            configs() {
                return configs;
            },
            classObj() {
                return {
                    hideSidebar: !this.sidebar.opened,
                    openSidebar: this.sidebar.opened,
                    withoutAnimation: this.sidebar.withoutAnimation,
                    mobile: this.device === 'mobile'
                }
            }
        },
        data() {
            return {};
        }
    }
</script>

<style scoped>

</style>
