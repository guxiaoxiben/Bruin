<template>
	<view>
		<!-- 使用自定义的搜索组件 -->
		<my-search @click=gotoSearch></my-search>
		<view class="scroll-view-container">
		    <!-- 左侧 -->
		    <scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
				<block v-for="(item,index) in cateList" :key="index">
					<view class="" :class="['left-scroll-view-item', index=== active ? 'active' :'']" @click="activeChanged(index)">{{item.cat_name}}</view>
				</block>
		    </scroll-view>
		    <!-- 右侧 -->
		    <scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item2,index2) in cateLevel2" :key="index2">
					<!-- 二级分类 -->
					<view class="cate-lv2-title">{{item2.cat_name}}</view>
					<!-- 三级分类 -->
					<view class="cate-lv3-list">
						<view class="cate-lv3-item" v-for="(item3,index3) in item2.children" :key="index3" @click="gotoGoodsList(item3)">
							<image :src="item3.cat_icon"></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
		    </scroll-view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	
	export default {
		mixins:[badgeMix],
		data() {
			return {
				// 窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabBar 高度
				wh: 0,
				// 分类数据
				cateList:[],
				active:0,
				// 二级分类数据
				cateLevel2:[],
				// 回滚到顶部
				scrollTop:0
		};
    },
    onLoad() {
	// 获取当前系统的信息
      const sysInfo = uni.getSystemInfoSync()
      // 为 wh 窗口可用高度动态赋值
      this.wh = sysInfo.windowHeight  - 50
	  // 获取分类数据
	  this.getCateList()
    },
	methods:{
		async getCateList (){
			const { data:res }= await uni.$http.get('/api/public/v1/categories')
			if(res.meta.status !== 200) return uni.$showMsg()
			this.cateList = res.message
			// 二级数据
			this.cateLevel2 = res.message[0].children
		},
		// 切换选择高亮
		activeChanged(index) {
			this.active = index
			// 点击切换二级数据
			this.cateLevel2 = this.cateList[index].children
			// 回滚到顶部
			this.scrollTop = this.scrollTop === 0 ? 1 :0
		},
		// 点击三级分类跳转
		gotoGoodsList(item){
			uni.navigateTo({
				url:'/subpkg/goods_list/goods_list?cid=' + item.cat_id
			})
		},
		// 点击跳转搜索
		gotoSearch() {
			uni.navigateTo({
				url:'/subpkg/search/search'
			})
		}
	}
  }
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;

  .left-scroll-view {
    width: 120px;

    .left-scroll-view-item {
      line-height: 60px;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 12px;

      // 激活项的样式
      &.active {
        background-color: #ffffff;
        position: relative;

        // 渲染激活项左侧的红色指示边线
        &::before {
          content: ' ';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
// 二级分类
.cate-lv2-title {
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  padding: 15px 0;
}
// 三级分类
.cate-lv3-list {
  display: flex;
  flex-wrap: wrap;

  .cate-lv3-item {
    width: 33.33%;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    image {
      width: 60px;
      height: 60px;
    }

    text {
      font-size: 12px;
    }
  }
}
</style>
