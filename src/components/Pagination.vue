<template>
    <div class="pagination-links mt-3 row">
        <div class="col-6 text-left">
            <div class="pl-3">
                {{ $t('comm.record_total') }}: {{ page.total }}
            </div>
        </div>
        <div class="col-6 text-right">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :current-page="page.page_num"
                    :page-size="page.page_size"
                    :total="page.total"
                    @current-change="change" >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {isEmpty} from "@/utils/validate";

    /**
     * //total总记录条数, size每页多少条, page_num当前页码, count共分成多少页
     */
    export default {
        name: 'Pagination',
        props: {
            page: Object
        },
        data() {
            return {};
        },
        mounted() {
            if (isEmpty(this.page)) {
                this.page = {total: 0, page_size: 20, page_num: 0, count: 0}
            }
        },
        methods: {
            change(val) {
                this.$emit('change', {page_num: val})
            }
        },

    }
</script>

<style scoped>

</style>
