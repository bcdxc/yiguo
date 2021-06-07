// pages/address/address.js
const { $Toast } = require('../../dist/base/index');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		address: [],
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
		needDelId: 1,
		switch: false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const app = getApp();
		this.setData({
			address: [...app.globalData.user.address]
		})
	},


	handleOpen(e) {
		console.log("要删除的id ---> " + e.target.dataset.delid);
		this.setData({
			visible: true,
			needDelId: e.target.dataset.delid
		});
	},

	add() {
		wx.navigateTo({
			url: '/pages/addAddress/addAddress',
		})
	},

	delete({ detail }) {
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

			const app = getApp();
			app.globalData.user.address = app.globalData.user.address.filter(item => item.id !== this.data.needDelId);
			const that = this;
			wx.request({
				method: 'put',
				url: `http://localhost:3006/users/${app.globalData.user.id}`, // 地址
				data: app.globalData.user,
				success(res) {
					action[1].loading = false;
					that.setData({
						visible: false,
						actions: action
					});
					console.log(res.data);
					that.onLoad();
					$Toast({
						content: '已删除',
						type: 'success'
					});
				}
			})

		}
	},


	onChange(e) {
		const detail = e.detail;
		if (detail.value) {
			const exist = this.data.address.find(item => item.isDefault === true)
			if (exist) {
				const i = this.data.address.findIndex(item => item.isDefault === true)
				console.log(i);
				this.setData({
					[`address[${i}].isDefault`]: false
				})
			}
		}
		const index = this.data.address.findIndex(item => item.id === e.currentTarget.dataset.switchid)
		this.setData({
			[`address[${index}].isDefault`]: detail.value
		})
		const app = getApp();
		app.globalData.user.address = [...this.data.address]

		wx.request({
			method: 'put',
			url: `http://localhost:3006/users/${app.globalData.user.id}`, // 地址
			data: app.globalData.user,
			success(res) {
				console.log(res.data);
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