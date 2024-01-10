<template>
    <div v-loading="loading">
        <div class="row p-0">
            <div class="col-12 mb-2">
                <el-card shadow="hover" class="wpy-card box-card p-3"
                         :body-style="{ padding: '0px' }">
                    <div slot="header" class="clearfix text-left">
                        <el-button type="text" @click="goMsgCenter"><i class="el-icon-arrow-left"></i></el-button>
                        {{ detail.title | noticeKindStr }}
                    </div>
                    <div>
                        <div class="d-block text-right p-2">{{ detail.created | toFullTime }}</div>
                        <div class="p-4">
                            <div v-if="detail.kind == 'chargeback'" class="mb-3">
                                <strong v-if="detail.target_id">
                                    {{ $t('comm.trade_id') }}:
                                    <router-link :to="configs.orderDetailPath + detail.target_id" class="btn-link">
                                        {{ detail.target_id }}
                                    </router-link>
                                </strong>
                                <router-link :to="configs.chargebackPath" class="btn-link d-block mt-2">
                                    {{ $t('nav.decline_manage') }}
                                </router-link>
                            </div>
                            <div v-if="detail.kind == 'declineWarn'" class="mb-3">
                                <strong v-if="detail.target_id">
                                    {{ $t('comm.trade_id') }}:
                                    <router-link :to="configs.orderDetailPath + detail.target_id" class="btn-link">
                                        {{ detail.target_id }}
                                    </router-link>
                                </strong>
                                <router-link :to="configs.chargebackPath" class="btn-link d-block mt-2">
                                    {{ $t('nav.decline_manage') }}
                                </router-link>
                            </div>
                            <div v-else-if="detail.kind == 'dispute'" class="mb-3">
                                <strong v-if="detail.target_id">
                                    {{ $t('dispute.dispute_no') }}:
                                    <router-link :to="configs.disputeDetailPath + detail.target_id" class="btn-link">
                                        {{ detail.target_id }}
                                    </router-link>
                                </strong>
                                <router-link :to="configs.disputePath" class="btn-link d-block mt-2">
                                    {{ $t('nav.dispute_manage') }}
                                </router-link>
                            </div>
                            <div v-else-if="detail.kind == 'manualCharge'" class="mb-3">
                                <p>{{ detail.kind | noticeKindStr }}</p>
                                <strong v-if="detail.target_id">
                                    {{ $t('comm.trade_id') }}:
                                    <router-link :to="configs.orderDetailPath + detail.target_id" class="btn-link">
                                        {{ detail.target_id }}
                                    </router-link>
                                </strong>
                            </div>
                            <div v-html="detail.message" class="html-content-detail"></div>
                        </div>
                        <div class="mt-3 mb-3">
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
                    this.$store.dispatch('user/loadUserInfo') //reload userInfo未读数据
                }).finally(() => {
                    this.loading = false
                })
            },
            goMsgCenter() {
                this.$router.push({name: 'message_center_type', params: {type: 'notify'}})
            },

        },
    }
</script>

