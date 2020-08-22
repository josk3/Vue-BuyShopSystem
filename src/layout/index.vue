<template>
    <div :class="classObj" class="wrap">
        <Header></Header>
        <div class="wrap-main">
            <sidebar class="sidebar-container"></sidebar>
            <div class="content-main">
                <router-view></router-view>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import {Sidebar, Header, Footer} from './components'
    import {mapState} from 'vuex'

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
