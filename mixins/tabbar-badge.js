import { mapGetters } from 'vuex'

export default {
	computed: {
	    // 将 m_cart 模块中的 total 映射为当前页面的计算属性
	    ...mapGetters('m_cart', ['total']),
	},
	watch:{
		total() {
			this.setBadge()
		}
	},
	onShow() {
	   // 在页面刚展示的时候，设置数字徽标
	   this.setBadge()
	},
	methods:{
		setBadge() {
			uni.setTabBarBadge({
				index:2,
				text: this.total + ''
			})
		}
	}
}