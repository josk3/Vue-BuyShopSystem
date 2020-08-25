<template>
    <div :class="classObj" class="wrap">
        <Header></Header>
        <div class="container wrap-main">
            <div class="row">
                <div class="wrap-side col-2">
                    <sidebar></sidebar>
                </div>
                <div class="wrap-content col-10 p-0">
                    <div class="content-main pt-2">
                        <router-view></router-view>
                    </div>
                </div>
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
