<template>
    <footer class="footer mt-auto py-3">
        <div class="container">
            <div class="text-center">
                <ul class="list-unstyled list-inline">
                    <li class="list-inline-item mr-1 small">
                        <a :href="configs.aboutUsUrl" target="_blank"
                           class="btn btn-light btn-sm mr-2">{{ $t('comm.about_company') }}</a>
                    </li>
                    <li class="list-inline-item mr-1 small">
                        <a :href="configs.contactUsUrl" target="_blank"
                           class="btn btn-light btn-sm mr-2">{{ $t('comm.contact_us') }}</a>
                    </li>
                    <li class="text-muted">
                        <small>Content protected Copyright © 2020 All Rights Reserved Wintopay.com</small>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</template>

<script>
    import {mapState} from "vuex";
    import configs from "@/configs";
    import {isEmpty} from "@/utils/validate";

    export default {
        name: "BlankFooter",
        computed: { //watch跟踪数据变化, 重点user, configs
            ...mapState({
                sidebar: state => state.app.sidebar,
                device: state => state.app.device,
            }),
            configs() {
                return configs;
            },
        },
        methods: {
        },
        mounted() {
            //
            if (!isEmpty(this.$route.query)) {
                let rf = this.$route.query.rf;
                if (!isEmpty(rf)) {
                    this.$store.dispatch('app/setRf', rf)
                }
            }
        },
    }
</script>

<style scoped>
</style>
