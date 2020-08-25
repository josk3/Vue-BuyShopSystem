<template>
    <div id="sidebar-nav">
        <el-col>
            <el-menu
                    :default-active="activeMenu"
                    :collapse="isCollapse"
                    @open="handleOpen"
                    @close="handleClose" router>
                <div v-for="(route, i)  in menus" :key="i" class="menu-m">
                    <div v-if="!route.hidden">
                        <el-menu-item v-if="!route.have_show_child" :index="route.path" class="menu-item">
                            <div>
                                <span slot="title">
                                    <svg-icon icon-class="home"/>
                                    {{ $t('nav.'+route.name) }}
                                </span>
                            </div>
                        </el-menu-item>
                        <el-submenu v-if="route.have_show_child" :index="route.path">
                            <template slot="title">
                                <div>
                                    <span>
                                        <svg-icon icon-class="home"/>
                                        {{ $t('nav.'+route.name) }}
                                    </span>
                                </div>
                            </template>
                            <el-menu-item v-for="(children, c)  in route.children" :key="c"
                                          :index="children.path"
                                          class="menu-item"
                                          v-if="!children.hidden">
                                <div>
                                    <span slot="title">
                                        <svg-icon icon-class="home"/>
                                        {{ $t('nav.'+children.name) }}
                                    </span>
                                </div>
                            </el-menu-item>
                        </el-submenu>
                    </div>
                </div>
            </el-menu>
        </el-col>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import configs from "@/configs";
    import user from "@/store/modules/user";

    export default {
        name: 'Sidebar',
        computed: { //watch跟踪数据变化, 重点user, configs
            ...mapState({
                sidebar: state => state.app.sidebar,
                device: state => state.app.device,
                menus: state => state.user.menus,
            }),
            configs() {
                return configs;
            },
            user() {
                return user.state.user;
            },
            activeMenu() {
                const route = this.$route
                const {meta, path} = route
                // if set path, the sidebar will highlight the path you set
                if (meta.activeMenu) {
                    return meta.activeMenu
                }
                return path
            },
            isCollapse() {
                return !this.sidebar.opened
            }
        },
        data() {
            return {
                router: true
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>
