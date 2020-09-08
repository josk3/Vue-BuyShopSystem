<template>
    <div v-loading="loading">
        <div class="row p-0">
            <div class="col-12 mb-2">
                <el-card shadow="hover" class="wpy-card box-card p-3"
                         :body-style="{ padding: '0px' }">
                    <div slot="header" class="clearfix text-left">
                        <el-button type="text" @click="goMsgCenter"><i class="el-icon-arrow-left"></i></el-button>
                        {{ detail.title }}
                    </div>
                    <div>
                        <div class="d-block text-right p-2">{{ detail.created | toFullTime }}</div>
                        <div class="p-4">
                            <div v-html="detail.message"></div>
                        </div>
                        <div class="mt-5 mb-3">
                            <el-button class="ml-4 pl-3 pr-4" @click="goMsgCenter">
                                <i class="el-icon-arrow-left"></i> {{ $t('comm.go_back') }}
                            </el-button>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
    import configs from '@/configs'
    import {getNotify} from "@/service/noticeSer";
    import {isEmpty} from "@/utils/validate";

    export default {
        name: "notify_detail",
        computed: { //watch跟踪数据变化, 重点user, configs
            configs() {
                return configs;
            },
        },
        data() {
            return {
                loading: false,
                nid: '',
                detail: {},
            }
        },
        mounted() {
            if (!isEmpty(this.$route.params)) {
                this.nid = this.$route.params.id
                this.loadNotice();
            } else {
                this.$message.error(this.$i18n.t('comm.fail').toString())
            }
        },
        methods: {
            loadNotice() {
                this.loading = true
                getNotify(this.nid).then(res => {
                    const {data} = res
                    this.$data.detail = data
                }).finally(() => {
                    this.loading = false
                })
            },
            goMsgCenter() {
                this.$router.push({name: 'message_center_type', params:{ type: 'notify'} })
            },

        },
    }
</script>

