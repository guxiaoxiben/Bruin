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
			async getGoodsList(cb) {
				// 打开节流
				this.isloading = true
				const {data:res} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				// 关闭节流
				this.isloading = false
				// 数据请求完 调用cb函数
				cb && cb()
				if(res.meta.status !== 200) return uni.$showMsg
				this.goodsList = [...res.message.goods, ...res.message.goods]
				this.total = res.message.total
			}
		},
		// 触底的事件
		onReachBottom() {
			// 判断是否显示下一页
			if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('已经到底了！')
			// 判断是否正在请求其它数据，如果是，则不发起额外的请求
			if (this.isloading) return
			// 让页码值自增 +1
			this.queryObj.pagenum += 1
			// 重新获取列表数据
			this.getGoodsList()
		},
		// 下拉刷新
		onPullDownRefresh() {
			// 重置数据 页码数 总数据 节流阀 商品列表数据
			this.queryObj.pagenum = 1
			this.total = 0
			this.isloading = false
			this.goodsList = []
			// 重新发起请求
			this.getGoodsList(()=>{uni.stopPullDownRefresh()})
		}
	}
</script>

<style lang="scss">

</style>
