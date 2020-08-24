<template>
	<div class="page">
		<el-pagination ref="a" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
		 :page-sizes="list" :page-size="pageSize" layout="total, sizes" :total="pageData.total">
		</el-pagination>
		<div class="show-flex">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
			 :page-sizes="list" :page-size="pageSize" layout="slot" :total="pageData.total">
				<el-button @click='firstPage' plain style="border-radius: 4px; border:1px solid #DDDEE1; text-align: center;min-width: 60px;">
					{{$t('pageTemplate.firstPage')}}
				</el-button>
			</el-pagination>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
			 :page-sizes="list" :page-size="pageSize" layout="prev,slot, next" :total="pageData.total" :prev-text="$t('pageTemplate.prePage')"
			 :next-text="$t('pageTemplate.nextPage')">
				<span style="border-radius: 4px; border:1px solid #DDDEE1; text-align: center;min-width: 60px;">{{currentPage4}}/{{allPage}}</span>
			</el-pagination>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
			 :page-sizes="list" :page-size="pageSize" layout="slot" :total="pageData.total">
				<el-button @click='lastPage' plain style="border-radius: 4px; border:1px solid #DDDEE1; text-align: center;min-width: 60px;">
					{{$t('pageTemplate.lastPage')}}
				</el-button>
			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Pagination',
		methods: {
			handleSizeChange(val) {
				// console.log(`每页 ${val} 条`);
				this.allPage = Math.ceil(this.$props.pageData.total / val);
				this.pageSize = val;
				this.$emit('func', {
					pageSize: val
				})
			},
			handleCurrentChange(val) {
				// console.log(`当前页: ${val}`);
				this.currentPage4 = val;
				this.$emit('func', {
					pageNum: val
				})
			},
			firstPage() {
				this.currentPage4 = 1;
				this.$emit('func', {
					pageNum: 1
				})
			},
			lastPage() {
				this.currentPage4 = this.allPage;
				this.$emit('func', {
					pageNum: this.allPage
				})
			}

		},
		data() {
			return {
				list: [10, 20, 50, 100],
				// all: this.$props.pageData.total,
				currentPage4: 1,
				allPage: 1,
				pageSize: 10,


			};
		},
		props: {
			pageData: Object
		},
		mounted() {
		},
		watch: {
			'pageData.total': function() {
				this.currentPage4 = 1;
				this.allPage = Math.ceil(this.$props.pageData.total / this.pageSize);
				this.$refs.a.$children[0].$vnode.elm.textContent = this.$t('pageTemplate.totalRecords') + this.$props.pageData.total +
					this.$t('pageTemplate.item');
			}
		}

	}
</script>

<style scoped>
	.page {
		background-color: white;
		display: -webkit-box;
		/* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */
		display: -moz-box;
		/* Firefox 17- */
		display: -webkit-flex;
		/* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */
		display: -moz-flex;
		/* Firefox 18+ */
		display: -ms-flexbox;
		/* IE 10 */
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		padding: 22px 13px;
	}

	.page>>>.btn-prev {
		border: 1px solid #DDDEE1;
		border-radius: 4px;
		text-align: center;
		padding-left: 12px;
		padding-right: 12px;
		margin-right: 5px;
	}

	.page>>>.btn-next {
		border: 1px solid #DDDEE1;
		border-radius: 4px;
		text-align: center;
		padding-left: 12px;
		padding-right: 12px;
		margin-left: 5px;
	}
</style>
