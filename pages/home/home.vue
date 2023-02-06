<template>
	<view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		
		<!-- 分类导航 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navClickHandler(item)">
				<image :src="item.image_src"  class="nav-img"></image>
			</view>
		</view>
		
		<!-- 楼层区域 -->
		<view class="floor-list">
			<!-- item -->
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<!-- 标题 -->
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<!-- 图片盒子 -->
				<view class="floor-img-box">
					<!-- 左侧 -->
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</navigator>
					<!-- 右侧 -->
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(item2, index2) in item.product_list" :key="index2" v-if="index2 !== 0" :url="item2.url">
						    <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播图数据
				swiperList:[],
				// 分类导航数据
				navList: [],
				// 楼层数据
				floorList:[]
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods:{
			// 获取轮播图数据
			async getSwiperList(){
				const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
				if(res.meta.status !== 200) return uni.$showMsg()
				this.swiperList = res.message
			},
			// 获取分类导航数据
			async getNavList() {
				 const { data: res } = await uni.$http.get('/api/public/v1/home/catitems')
				 if (res.meta.status !== 200) return uni.$showMsg()
				 this.navList = res.message
			},
			// 导航分类 点击 切换
			navClickHandler(item) {
				console.log(item)
				if(item.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			// 获取楼层数据
			async getFloorList(){
				const {data:res} = await uni.$http.get('/api/public/v1/home/floordata')
				if(res.meta.status !== 200) return uni.$showMsg()
				// forEach循环处理url地址 
				res.message.forEach(floor => {
				   floor.product_list.forEach(prod => {
				     prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
				   })
				})
				this.floorList = res.message
			}
		}庀
	}
</script>

<style lang="scss">
// 轮播图样式
swiper {
 height: 330rpx;

 .swiper-item,
 image {
   width: 100%;
   height: 100%;
 }
}
// 导航分类样式
.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;

  .nav-img {
    width: 128rpx;
    height: 140rpx;
  }
}
// 楼层样式
.floor-title {
	height: 60rpx;
	width: 100%;
	display: flex;
}
.right-img-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.floor-img-box {
  display: flex;
  padding-left: 10rpx;
}
</style>
