<template>
	<view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
		  <swiper-item v-for="(item, index) in goods_info.pics" :key="index">
		    <image :src="item.pics_big" @click="preview(index)"></image>
		  </swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 商品详情对象
				goods_info: {}
			}
		},
		methods: {
			// 定义请求商品详情数据的方法
			async getGoodsDetail(goods_id) {
				const { data: res } = await uni.$http.get('/api/public/v1/goods/detail', { goods_id })
			    if (res.meta.status !== 200) return uni.$showMsg()
			    // 为 data 中的数据赋值
			    this.goods_info = res.message
			},
			// 点击轮播图预览
			preview(index) {
				// 调用 uni.previewImage() 方法预览图片
				uni.previewImage({
				    // 预览时，默认显示图片的索引
				    current: index,
				    // 所有图片 url 地址的数组
				    urls: this.goods_info.pics.map(x => x.pics_big)
				  })
			}
			
		},
		onLoad(options) {
			console.log(options);
		  // 获取商品 Id
		  const goods_id = options.goods_id
		  // 调用请求商品详情数据的方法
		  this.getGoodsDetail(goods_id)
		}
	}
</script>

<style lang="scss">
/* 轮播图样式 */
swiper {
  height: 750rpx;

  image {
    width: 100%;
    height: 100%;
  }
}
</style>
