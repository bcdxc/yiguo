// pages/order/order.js
const { $Message } = require('../../dist/base/index');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		order: [],
		// 待发货
		toBeDelivered: [],
		// 待收货
		toBeReceived: [],
		// 待评价
		toBeEvaluated: [],
		receivedId: 1,
		current: 'tab1',
		visible: false,
		delId: 1,
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
		visible2: false,
		actions2: [
			{
				name: '取消'
			},
			{
				name: '确认',
				color: '#ed3f14',
				loading: false
			}
		]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const app = getApp();
		const that = this;
		wx.request({
			method: 'get',
			url: `http://localhost:3006/order?uid=${app.globalData.user.id}`,
			success(res) {
				console.log(res.data);
				console.log('数据重新请求了');
				// 待发货的状态码为1，待收货的状态码为2，待评价的状态码为3，已评价的状态码为4
				let temDel = [...res.data.filter(item => item.orderStatus === 1)].sort((a, b) => b.createTime - a.createTime);
				let temRec = [...res.data.filter(item => item.orderStatus === 2)].sort((a, b) => b.createTime - a.createTime);
				let temEva = [...res.data.filter(item => item.orderStatus === 3)].sort((a, b) => b.createTime - a.createTime);
				that.setData({
					order: res.data.sort((a, b) => b.createTime - a.createTime),
					toBeDelivered: temDel,
					toBeReceived: temRec,
					toBeEvaluated: temEva
				})
			}
		})

	},

	handleChange({ detail }) {
		this.setData({
			current: detail.key
		});
	},


	handleOpen(e) {
		console.log(e.currentTarget.dataset.delid);
		this.setData({
			visible: true,
			delId: e.currentTarget.dataset.delid
		});
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

			const that = this;
			console.log(this.data.delId);
			let temObj = this.data.order.find(item => item.id === this.data.delId);
			temObj.uid = 0;
			console.log(temObj);
			wx.request({
				method: 'put',
				url: `http://localhost:3006/order/${this.data.delId}`, // 地址
				data: temObj,
				success(res) {
					console.log(res.data);
					action[1].loading = false;
					that.setData({
						visible: false,
						actions: action
					});
					that.onLoad();
					$Message({
						content: '删除成功！',
						type: 'success'
					});

				}
			})

		}
	},

	goEvaluate(e) {
		console.log(e.currentTarget);
		let obtainGoodsId = [];
		obtainGoodsId = e.currentTarget.dataset.goods.map(item => item.goodsId);
		console.log(obtainGoodsId);
		wx.navigateTo({
			url: `/pages/evaluate/evaluate?goodsIdArr=${obtainGoodsId}&orderNum=${e.currentTarget.dataset.ordernum}&orderId=${e.currentTarget.dataset.orderid}`,
		})
	},


	handleOpen2(e) {
		this.setData({
			visible2: true,
			receivedId: e.currentTarget.dataset.resid
		});
	},

	// 去收货
	collectGoods({ detail }) {

		if (detail.index === 0) {
			this.setData({
				visible2: false
			});
		} else {
			const action = [...this.data.actions2];
			action[1].loading = true;

			this.setData({
				actions2: action
			});

			let temObj = { ...this.data.toBeReceived.find(item => item.id === this.data.receivedId) };
			temObj.orderStatus = 3;
			const that = this;
			wx.request({
				method: 'put',
				url: `http://localhost:3006/order/${this.data.receivedId}`, // 地址
				data: temObj,
				success(res) {
					console.log(res.data);
					action[1].loading = false;
					that.setData({
						visible2: false,
						actions2: action
					});
					that.onLoad();
					$Message({
						content: '已完成收货',
						type: 'success'
					});

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
		this.onLoad();
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