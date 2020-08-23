<template>
    <footer class="pt-4 my-md-5 pt-md-5 border-top">
        <div class="row">
            <div class="col-12 col-md">
                <small class="d-block mb-3 text-muted">&copy; 2020</small>
            </div>
            <div class="col-6 col-md">
                <h5>Features</h5>
                <ul class="list-unstyled text-small">
                    <li><a class="text-muted" href="#">Cool stuff</a></li>
                    <li><a class="text-muted" href="#">Random feature</a></li>
                    <li><a class="text-muted" href="#">Team feature</a></li>
                    <li><a class="text-muted" href="#">Stuff for developers</a></li>
                    <li><a class="text-muted" href="#">Another one</a></li>
                    <li><a class="text-muted" href="#">Last time</a></li>
                </ul>
            </div>
            <div class="col-6 col-md">
                <h5>Resources</h5>
                <ul class="list-unstyled text-small">
                    <li><a class="text-muted" href="#">Resource</a></li>
                    <li><a class="text-muted" href="#">Resource name</a></li>
                    <li><a class="text-muted" href="#">Another resource</a></li>
                    <li><a class="text-muted" href="#">Final resource</a></li>
                </ul>
            </div>
            <div class="col-6 col-md">
                <h5>About</h5>
                <ul class="list-unstyled text-small">
                    <li><a class="text-muted" href="#">Team</a></li>
                    <li><a class="text-muted" href="#">Locations</a></li>
                    <li><a class="text-muted" href="#">Privacy</a></li>
                    <li>
                        <a href="javascript:void(0)" class="btn btn-link btn-sm mr-2" @click="goLangZh">中文</a>
                        <a href="javascript:void(0)" class="btn btn-link btn-sm" @click="goLangEn">En</a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</template>

<script>
    import {mapState} from "vuex";
    import configs from "@/configs";
    import user from "@/store/modules/user";

    export default {
        name: "Footer",
        computed: { //watch跟踪数据变化, 重点user, configs
            ...mapState({
                sidebar: state => state.app.sidebar,
                device: state => state.app.device,
            }),
            configs() {
                return configs;
            },
            user() {
                return user.state.user;
            },
        },
        methods: {
            goLangEn: function () {
                this.$i18n.locale = 'en'
                this.$store.dispatch('app/setLang', 'en')
            },
            goLangZh: function () {
                this.$i18n.locale = 'zh'
                this.$store.dispatch('app/setLang', 'zh')
            },
        }
    }
</script>

<style scoped>

</style>
