<template>
	<view>
		首页
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播图数据
				swiperList:[]
			};
		},
		onLoad() {
			this.getSwiperList()
		},
		methods:{
			async getSwiperList(){
				const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
				if(res.meta.status!==200){
					return uni.showToast({
						title:'数据获取失败！',
						duration:1500,
						icon:'none'
					})
				}
				this.swiperList = res.message
			}
		}
	}
</script>

<style lang="scss">

</style>
