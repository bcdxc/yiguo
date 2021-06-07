// pages/myComment/myComment.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		comment: [],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const that = this;
		wx.request({
			method: 'get',
			url: `http://localhost:3006/goods`, // 地址
			success(res) {
				console.log(res.data);
				let temArr = [];
				res.data.forEach(item => {
					temArr.push(item.comment)
				})
				let allComment = temArr.flat(1)
				const app = getApp();
				let temComment = allComment.filter(item => item.uid === app.globalData.user.id);

				console.log(temComment);
				let result = {};
				let temComment2 = temComment.reduce((res, cur) => {
					result[cur.orderNum] ? '' : result[cur.orderNum] = true && res.push(cur);
					return res;
				}, []);

				that.setData({
					comment: temComment2
				})
			}
		})
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