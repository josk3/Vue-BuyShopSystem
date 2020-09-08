<template>
    <div v-loading="loading">
        <div class="wrap-tab p-0">
            <div class="mb-2"></div>
            <el-card class="box-card box-pane" shadow="never" :body-style="{ padding: '0px' }">
                <div class="row">
                    <div class="col-8 pr-0" style="background-color: #F5F7FA">
                        <el-tabs v-model="paneName" type="border-card"
                                 @tab-click="paneClick">
                            <el-tab-pane :label="$t('comm.announce')" name="announce"></el-tab-pane>
                            <el-tab-pane :label="$t('comm.notify')" name="notify"></el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="col-4 text-right p-0" style="background-color: #F5F7FA">
                        <div class="mr-5 mt-1">
                            <el-button type="text" size="mini"
                                       @click="markAllRead" plain>标记全部为已读
                            </el-button>
                        </div>
                    </div>
                </div>
                <el-table
                        class="hide-table-title pointer"
                        :class="tabData.list ? '' : 'wpy-z-table'"
                        :data="tabData.list"
                        :show-header="false"
                        :highlight-current-row="true"
                        @row-click="goNoticeDetail"
                        :header-row-style="{background:'#2C2E2F'}"
                        style="width: 100%">
                    <el-table-column
                            prop="title"
                            :show-overflow-tooltip="true"
                            :label="$t('comm.title')">
                        <template v-slot="scope">
                            <span v-if="scope.row.has_read === 1">{{scope.row.title}}</span>
                            <span v-else><strong>{{scope.row.title}}</strong></span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="created"
                            class="text-right"
                            label="时间">
                        <template v-slot="scope">
                            {{scope.row.created | toDay }}
                        </template>
                    </el-table-column>
                </el-table>

                <Pagination :page="tabData.page" @change="pageChange"></Pagination>
            </el-card>
        </div>
    </div>
</template>

<script>
    import configs from '@/configs'
    import Pagination from "@/components/Pagination";
    import {markAllRead, searchNotice} from "@/service/noticeSer";
    import {isEmpty} from "@/utils/validate";

    export default {
        name: "notice",
        components: {Pagination},
        computed: { //watch跟踪数据变化, 重点user, configs
            configs() {
                return configs;
            },
        },
        data() {
            return {
                loading: false,
                searchParams: {
                    title: 'nav.message_center', page: 1, type: '',
                },
                tabData: {list: [], page: {count: 0, page_num: 0, total: 0}},
                paneName: 'announce', //默认
            }
        },
        mounted() {
            if (!isEmpty(this.$route.params) && !isEmpty(this.$route.params.type)) {
                this.paneName = this.$route.params.type
            }
            this.searchParams.type = this.paneName
            this.search();
        },
        methods: {
            paneClick(tab) {
                this.searchParams.page = 1;//重置页码
                this.paneName = tab.name
                this.searchParams.announce = tab.name
                this.search()
            },
            pageChange(page) {
                this.searchParams.page = page.page_num
                this.search()
            },
            search() {
                this.loading = true
                searchNotice(this.searchParams).then(res => {
                    const {data} = res
                    this.$data.tabData = data
                }).finally(() => {
                    this.loading = false
                })
            },
            goNoticeDetail(row){
                if (this.paneName === 'announce') {
                    this.$router.push({name: 'announce_detail',params:{id:row.nid}})
                }else {
                    this.$router.push({name: 'notify_detail',params:{id:row.nid}})
                }
            },
            markAllRead(){
                this.loading = true
                markAllRead(this.searchParams).then(() => {
                    this.$message.success(this.$i18n.t('comm.success').toString())
                    this.search()
                    this.$store.dispatch('user/loadUserInfo') //用户的未读数量更新
                }).finally(() => {
                    this.loading = false
                })
            },
        },
    }
</script>

<style scoped>

</style>
