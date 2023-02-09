<template>
  <view>
    <view class="goods-list">
      <block v-for="(item, i) in goodsList" :key="i">
         <my-goods :goods="item"></my-goods>
      </block>
    </view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				// 请求参数对象
				queryObj: {
					// 查询关键词
				    query: '',
				    // 商品分类Id
				    cid: '',
				    // 页码值
				    pagenum: 1,
				    // 每页显示多少条数据
				    pagesize: 10
				},
				// 商品列表的数据
				goodsList: [],
				// 总数量，用来实现分页
				total: 0,
			};
		},
		onLoad(options) {
			// 将页面参数转存到 this.queryObj 对象中
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			// 获取数据
			this.getGoodsList()
		},
		methods:{
			async getGoodsList() {
				const {data:res} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				if(res.meta.status !== 200) return uni.$showMsg
				this.goodsList = res.message.goods
				this.total = res.message.total
			}
		}
	}
</script>

<style lang="scss">

</style>
