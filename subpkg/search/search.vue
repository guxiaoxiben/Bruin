<template>
	<view >
		<!-- 搜索框 -->
		<view class="search-box">
		  <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
		</view>
		
		<!-- 搜索推荐列表 -->
		<view class="sugg-list">
			<view class="sugg-item" v-for="(item,index) in searchResults" :key="index" @click="gotoDetail(item)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 延时器
				timer:null,
				// 关键词
				kk:'',
				// 搜索列表
				searchResults: []
			};
		},
		methods:{
			input(e) {
			  // 清除 timer 对应的延时器
			  clearTimeout(this.timer)
			  // 重新启动一个延时器，并把 timerId 赋值给 this.timer
			  this.timer = setTimeout(() => {
			    // 如果 500 毫秒内，没有触发新的输入事件，则为搜索关键词赋值
			    this.kk = e
				// 调用方法获取数据
				this.getSearchList()
			  }, 500)
			},
			async getSearchList() {
				if(this.kk === '') {
					this.searchResults = []
					return
				}
				const { data:res } = await uni.$http.get('/api/public/v1/goods/qsearch',{ query: this.kk })
				if (res.meta.status !== 200) return uni.$showMsg()
				this.searchResults = res.message
			},
			// 点击详情跳转
			gotoDetail(item) {
			  uni.navigateTo({
			    // 指定详情页面的 URL 地址，并传递 goods_id 参数
			    url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
			  })
			}
		}
	}
</script>

<style lang="scss">
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}
// 推荐列表样式
.sugg-list {
  padding: 0 5px;

  .sugg-item {
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .goods-name {
      // 文字不允许换行（单行文本）
      white-space: nowrap;
      // 溢出部分隐藏
      overflow: hidden;
      // 文本溢出后，使用 ... 代替
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
}
</style>
