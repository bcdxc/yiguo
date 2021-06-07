// pages/suggest/suggest.js
const { $Toast } = require('../../dist/base/index');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		areaValue: "",
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	submit() {
		console.log(this.data.areaValue);
		if (this.data.areaValue.trim() !== "") {
			const that = this;
			const app = getApp();
			wx.request({
				method: 'post',
				url: 'http://localhost:3006/suggest', // 地址
				data: {
					uid: app.globalData.user.id,
					user: app.globalData.user.user,
					content: that.data.areaValue,
					date: new Date().getTime()
				},
				success(res) {
					console.log(res.data);
					that.setData({
						areaValue: ""
					})
					$Toast({
						content: '提交成功！',
						type: 'success'
					});
				}
			})
		}

	},


	bindTextArea: function (e) {
		this.data.areaValue = e.detail.value;
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