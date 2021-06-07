// pages/collect/collect.js
const { $Message } = require('../../dist/base/index');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		collect: [],
		visible: false,
		actions: [
			{
				name: '取消'
			},
			{
				name: '确定',
				color: '#ed3f14',
				loading: false
			}
		],
		needDelId: 1
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const app = getApp();
		this.setData({
			collect: app.globalData.user.collect
		})
	},

	handleOpen(e) {
		console.log("要删除的id ---> " + e.target.dataset.deleteid);
		this.setData({
			visible: true,
			needDelId: e.target.dataset.deleteid
		});
	},

	cancelCollect({ detail }) {
		if (detail.index === 0) {
			this.setData({
				visible: false
			});
		} else {
			const action = [...this.data.actions];
			action[1].loading = true;

			this.setData({
				actions: action
			});

			// 将 全局 data 的收藏列表清除该项，之后向服务器put 数据
			const app = getApp();
			app.globalData.user.collect = app.globalData.user.collect.filter(item => item.goodsId !== this.data.needDelId);

			const that = this;

			wx.request({
				method: 'put',
				url: `http://localhost:3006/users/${app.globalData.user.id}`, // 地址
				data: app.globalData.user,
				success(res) {
					console.log(res.data);
					action[1].loading = false;
					that.setData({
						visible: false,
						actions: action,
						collect: that.data.collect.filter(item => item.goodsId !== that.data.needDelId),
					});
					$Message({
						content: '已取消收藏',
						type: 'success'
					});
				}
			})
		}
	},

	skipGoods(e) {
		console.log(e.target.dataset.skipid);
		wx.navigateTo({
			url: `/pages/goods/goods?goodsId=${e.target.dataset.skipid}`,
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
		this.onLoad();
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