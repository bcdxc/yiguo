// pages/login/login.js
const { $Message } = require('../../dist/base/index');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		username: '',
		password: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	register() {
		wx.reLaunch({
			url: '/pages/register/register',
		})
	},
	inputChange(e) {
		let sign = e.currentTarget.dataset.sign;
		this.data[sign] = e.detail.detail.value;
	},
	login() {
		let that = this;
		if ((this.data.username.length >= 5) && (this.data.password.length >= 6)) {
			wx.request({
				method: 'get',
				url: 'http://localhost:3006/users', // 地址
				success(res) {
					let checkMes = res.data.find(item => item.username === that.data.username && item.password === that.data.password)
					if (checkMes) {
						// 登录成功 设置全局数据 跳转首页
						let app = getApp();
						console.log(res.data);
						app.globalData.user = res.data.find(item => (item.username === that.data.username) && (item.password === that.data.password));
						wx.switchTab({
							url: '/pages/index/index',
							success() {
								console.log("登录成功");
							}
						})
						// console.log(res.data);
					} else {
						$Message({
							content: '账号或密码有误',
							type: 'error'
						});
					}
				}
			})
		} else {
			$Message({
				content: '请检查用户名和密码',
				type: 'error'
			});
		}

	}
})