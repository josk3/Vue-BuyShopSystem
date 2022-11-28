<template>
    <div class="show-more">
        <div v-if="!is_show">
            {{ getHalf() }}
            <el-button v-show="!is_show" size="mini" @click="show" plain>{{$t('comm.click_show')}}</el-button>
        </div>
		<code v-else class="Md5code">
			{{ txt }})
		</code>
    </div>
</template>

<script>

    import {isEmpty} from "@/utils/validate";

    export default {
        name: "ShowMoreBtn",
        props: ['txt'],
        data() {
            return {
                loading: false,
                is_show: false,
            }
        },
        watch: {
            txt(newVal) {
                if (isEmpty(newVal) || newVal === '--') this.is_show = true
            }
        },
        mounted() {
        },
        methods: {
            getHalf() {
                if (isEmpty(this.txt)) {
                    return '--'
                } else {
                    return this.txt.substring(0, this.txt.length / 2)
                }
            },
            show() {
                this.is_show = true
            }
        },

    }
</script>

<style>
	.Md5code{
		 color: #303133;
	     -webkit-font-smoothing: antialiased;
	     text-rendering: optimizeLegibility;
	     font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
	     font-size: 13px;
	}
	
</style>