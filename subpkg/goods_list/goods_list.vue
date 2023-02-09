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
				// 是否正在请求数据
				isloading: false
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
				// 打开节流
				this.isloading = true
				const {data:res} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				// 关闭节流
				 this.isloading = false
				if(res.meta.status !== 200) return uni.$showMsg
				this.goodsList = [...res.message.goods, ...res.message.goods]
				this.total = res.message.total
			}
		},
		// 触底的事件
		onReachBottom() {
			// 判断是否正在请求其它数据，如果是，则不发起额外的请求
			if (this.isloading) return
			// 让页码值自增 +1
			this.queryObj.pagenum += 1
			// 重新获取列表数据
			this.getGoodsList()
		}
	}
</script>

<style lang="scss">

</style>
