<template>
    <div :class="classObj" class="wrap d-flex flex-column h-100">
        <Header></Header>
        <main role="main" class="flex-shrink-0">
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
            </div>
        </main>
        <!--   F    -->
        <Footer></Footer>
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
                lang: state => state.app.lang,
            }),
            configs() {
                return configs;
            },
            classObj() {
                return {
                    hideSidebar: !this.sidebar.opened,
                    openSidebar: this.sidebar.opened,
                    withoutAnimation: this.sidebar.withoutAnimation,
                    mobile: this.device === 'mobile',
                    lang_en: this.lang === 'en',
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
