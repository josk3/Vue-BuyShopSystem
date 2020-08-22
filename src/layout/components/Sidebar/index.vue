<template>
    <div>
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                    :default-active="activeMenu"
                    :collapse="isCollapse"
                    :unique-opened="false"
                    :collapse-transition="false"
                    mode="vertical"
            >
                <sidebar-item v-for="route in menus" :key="route.path" :item="route"
                              :base-path="route.path"/>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import variables from '@/styles/variables.scss'
    import SidebarItem from './SidebarItem'

    export default {
        name: 'Sidebar',
        components: { SidebarItem },
        computed: {
            ...mapGetters([
                'menus',
                'sidebar'
            ]),
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
        }
    }
</script>
