<template>
	<view class="login-container">
		<!-- 提示登录的图标 -->
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<!-- 登录按钮 -->
		<button type="primary" class="btn-login" open-type="getUserInfo" @click="getUserInfo">一键登录</button>
		<!-- 登录提示 -->
		<view class="tips-text">登录后尽享更多权益</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'

	export default {
		name: "my-login",
		data() {
			return {

			};
		},
		methods: {
			...mapMutations('m_user', ['updateUserInfo', 'updateToken']),
			getUserInfo(e) {
				// =========由于登录不了 模拟一下==========================
				// 判断是否获取用户信息成功
				// if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
				// 获取用户信息成功， e.detail.userInfo 就是用户的基本信息
				// console.log(e.detail.userInfo)
				// this.updateUserInfo(e.detail.userInfo)
				// this.getToken(e.detail)
				// =========由于登录不了 模拟一下==========================
				uni.getUserProfile({
					desc: '登录后可同步数据',
					lang: 'zh_CN',
					success: (res) => {
						console.log(res);
						this.updateUserInfo(res.userInfo)
						this.getToken(res)
					},
					fail: (err) => {
						console.log(err);
						if (err.errMsg === 'getUserProfile:fail auth deny') return uni.$showMsg('您取消了登录授权！')
					}
				})
			},
			// 调用登录接口，换取永久的 token
			async getToken(info) {
				// 调用微信登录接口
				const [err, res] = await uni.login().catch(err => err)
				// 判断是否 uni.login() 调用失败
				if (err || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败！')

				// 准备参数对象
				const query = {
					code: res.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				}

				// 换取 token
				// =========由于登录不了 模拟一下==========================
				// const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
					// console.log(loginResult);
				// =========由于登录不了 模拟一下==========================
					let loginResult = {meta:{status:200},message:{token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEyLCJpYXQiOjE1MjU0MDIyMjMsImV4cCI6MTUyNTQ4ODYyM30.g-4GtEQNPwT_Xs0Pq7Lrco_9DfHQQsBiOKZerkO-O-o"}}
					if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
					// uni.$showMsg('登录成功')
					// 更新 vuex 中的 token
					this.updateToken(loginResult.message.token)
				}
			}
		}
</script>

<style lang="scss">
	.login-container {
		// 登录盒子的样式
		height: 750rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #f8f8f8;
		position: relative;
		overflow: hidden;

		// 绘制登录盒子底部的半椭圆造型
		&::after {
			content: ' ';
			display: block;
			position: absolute;
			width: 100%;
			height: 40px;
			left: 0;
			bottom: 0;
			background-color: white;
			border-radius: 100%;
			transform: translateY(50%);
		}

		// 登录按钮的样式
		.btn-login {
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
			background-color: #c00000;
		}

		// 按钮下方提示消息的样式
		.tips-text {
			font-size: 12px;
			color: gray;
		}
	}
</style>
