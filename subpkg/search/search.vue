<template>
	<view class="search-box">
	  <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			input(e) {
			    // e.value 是最新的搜索内容
			    console.log(e)
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
</style>
