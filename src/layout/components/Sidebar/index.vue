<template>
    <div>
        <el-col>
            <el-menu
                    :default-active="activeMenu"
                    :collapse="isCollapse"
                    @open="handleOpen"
                    @close="handleClose" router>
                <div v-for="(route, i)  in menus" :key="i">
                    <el-menu-item v-if="!route.children" :index="route.path">
                        <span slot="title">{{ $t('nav.'+route.name) }}</span>
                    </el-menu-item>
                    <el-submenu v-if="route.children" :index="route.path">
                        <template slot="title">
                            <span>{{ route.name }}</span>
                        </template>
                        <el-menu-item v-for="(children, c)  in route.children" :key="c"
                                      :index="children.path">
                            <span slot="title">{{ children.name }}</span>
                        </el-menu-item>
                    </el-submenu>
                </div>
            </el-menu>
        </el-col>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import variables from '@/styles/variables.scss'
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
            variables() {
                return variables
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
