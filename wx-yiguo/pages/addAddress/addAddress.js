// pages/addaddress/addaddress.js
const { $Message } = require('../../dist/base/index');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		name: '',
		phone: '',
		address: '',
		currentId: 1
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	inputChange(e) {
		let sign = e.currentTarget.dataset.sign;
		this.data[sign] = e.detail.detail.value;
	},

	submit() {
		console.log(this.data.name);
		console.log(this.data.phone);
		console.log(this.data.address);

		const phoneRegExp = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;

		if (this.data.name.trim().length < 1) {
			$Message({
				content: '请输入1-12位姓名',
				type: 'error'
			});
		} else if (!phoneRegExp.test(this.data.phone)) {
			$Message({
				content: '请输入11位有效手机号',
				type: 'error'
			});
		} else if (this.data.address.length < 8) {
			$Message({
				content: '请输入8位以上准确地址',
				type: 'error'
			});
		} else {
			const app = getApp()

			if (app.globalData.user.address.length) {
				let id = app.globalData.user.address[app.globalData.user.address.length - 1].id + 1;
				this.setData({
					currentId: id
				})
			}
			app.globalData.user.address.push({
				id: this.data.currentId,
				user: this.data.name,
				phone: this.data.phone,
				address: this.data.address,
				isDefault: false
			})
			wx.request({
				method: 'put',
				url: `http://localhost:3006/users/${app.globalData.user.id}`, // 地址
				data: app.globalData.user,
				success(res) {
					console.log(res.data);
					$Message({
						content: '添加成功',
						type: 'success'
					});
					wx.navigateBack({
						delta: 1
					})
				}
			})

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