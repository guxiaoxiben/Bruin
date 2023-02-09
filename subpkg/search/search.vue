<template>
	<view >
		<!-- 搜索框 -->
		<view class="search-box">
		  <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
		</view>
		
		<!-- 搜索推荐列表 -->
		<view class="sugg-list" v-if="searchResults.length !== 0">
			<view class="sugg-item" v-for="(item,index) in searchResults" :key="index" @click="gotoDetail(item)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
		    <!-- 标题区域 -->
				<view class="history-title">
					<text>搜索历史</text>
					<uni-icons type="trash" size="17"></uni-icons>
				</view>
		  <!-- 列表区域 -->
				<view class="history-list">
					<uni-tag :text="item" v-for="(item, i) in historys" :key="i"></uni-tag>
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
				searchResults: [],
				// 搜索关键词的历史记录
				historyList: ['a', 'app', 'apple']
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
				// 查询后保存到历史记录
				this.saveSearchHistory()
			},
			// 点击详情跳转
			gotoDetail(item) {
			  uni.navigateTo({
			    // 指定详情页面的 URL 地址，并传递 goods_id 参数
			    url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
			  })
			},
			saveSearchHistory() {
				this.historyList.push(this.kk)
			}
		},
		computed:{
			historys() {
				// reverse() 使数组翻转 例如[1,2,3] ===> [3,2,1]
				return [...this.historyList].reverse()
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
// 搜索历史样式
.history-box {
  padding: 0 5px;

  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
  }

  .history-list {
	margin-top: 13rpx;
    display: flex;
    flex-wrap: wrap;

    .uni-tag {
      margin-top: 5px;
      margin-right: 5px;
    }
  }
}
</style>
