// pages/register/register.js
const { $Message } = require('../../dist/base/index');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		user: "",
		username: "",
		password: "",
		phone: "",
		allUsers: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const that = this;
		wx.request({
			method: 'get',
			url: 'http://localhost:3006/users', // 地址
			success(res) {
				// const temArr = [];
				const temArr = res.data.map(item => item.username);
				that.setData({
					allUsers: temArr
				})
			}
		})
	},


	inputChange(e) {
		let sign = e.currentTarget.dataset.sign;
		this.data[sign] = e.detail.detail.value;
	},


	submit() {
		let that = this;
		// let user = {
		// 	"user": this.data.user,
		// 	"username": this.data.username,
		// 	"password": this.data.password,
		// 	"phone": this.data.phone,
		// 	"collect": [],
		// 	"cart": [],
		// 	"address": [],
		// 	"suggest": [],
		// }

		// if (this.data.allUsers.trim().length) {
		// 	if (this.data.allUsers.includes(user.username)) {
		// 		$Message({
		// 			content: '账号重复，请重新输入',
		// 			type: 'warning'
		// 		});
		// 		return;
		// 	}
		const phoneRegExp = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
		console.log(phoneRegExp.test(this.data.phone));
		if (this.data.user.trim().length < 2) {
			$Message({
				content: '请填写2到10位用户名',
				type: 'error'
			});
		} else if (this.data.username.trim().length < 5) {
			$Message({
				content: '请填写5到10位账号',
				type: 'error'
			});
		} else if (this.data.password.trim().length < 6) {
			$Message({
				content: '请填写6到12位密码',
				type: 'error'
			});
		} else if (!phoneRegExp.test(this.data.phone)) {
			$Message({
				content: '请填写11位有效手机号',
				type: 'error'
			});
		} else {
			if (this.data.allUsers.includes(this.data.username)) {
				$Message({
					content: '账号重复，请重新输入',
					type: 'warning'
				});
			} else {
				let user = {
					"user": this.data.user.trim(),
					"username": this.data.username.trim(),
					"password": this.data.password.trim(),
					"phone": this.data.phone.trim(),
					"collect": [],
					"cart": [],
					"address": [],
					"suggest": [],
				}
				wx.request({
					method: 'post',
					url: 'http://localhost:3006/users', // 地址
					data: user,
					success(res) {
						console.log(res.data);
						$Message({
							content: '注册成功',
							type: 'success'
						});
						setTimeout(() => {
							wx.reLaunch({
								url: '/pages/login/login',
								success() {
									console.log("跳转成功");
								}
							})
						}, 1000)

					}
				})
			}

			// const temArr = [];
			// wx.request({
			// 	method: 'get',
			// 	url: 'http://localhost:3006/users', // 地址
			// 	success(res) {
			// 		console.log(res.data);
			// 		res.data.forEach(item => {
			// 			temArr.push(item.username);
			// 		})
			// 		that.setData({
			// 			allUsers: temArr
			// 		})
			// 		console.log(that.data.allUsers);
			// 		if (that.data.allUsers.includes(user.username)) {
			// 			$Message({
			// 				content: '账号重复，请重新输入',
			// 				type: 'warning'
			// 			});
			// 			return;
			// 		} else {
			// 			wx.request({
			// 				method: 'post',
			// 				url: 'http://localhost:3006/users', // 地址
			// 				data: user,
			// 				success(res) {
			// 					console.log(res.data);
			// 					$Message({
			// 						content: '注册成功',
			// 						type: 'success'
			// 					});
			// 					wx.reLaunch({
			// 						url: '/pages/login/login',
			// 						success() {
			// 							console.log("跳转成功");
			// 						}
			// 					})
			// 				}
			// 			})
			// 		}
			// 	}
			// })

		}

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})