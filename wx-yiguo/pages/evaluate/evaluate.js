// pages/evaluate/evaluate.js
const { $Toast } = require('../../dist/base/index');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		areaValue: "",
		goodsIdArr: [],
		orderNum: 1,
		goods: {},
		commont: [],
		orderId: 1,
		// allGoods:[]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log(options);
		this.setData({
			goodsIdArr: options.goodsIdArr.split(',').map(item => Number(item)),
			orderNum: Number(options.orderNum),
			orderId: Number(options.orderId)
		})

		console.log(this.data.goodsIdArr);
		console.log(this.data.orderNum);
	},


	bindTextArea: function (e) {
		this.data.areaValue = e.detail.value;
	},

	submit() {
		console.log(this.data.areaValue);

		if (this.data.areaValue.trim() !== "") {

			const that = this;
			const app = getApp();

			wx.request({
				method: 'get',
				url: `http://localhost:3006/order/${this.data.orderId}`, // 地址
				success(res) {
					console.log(res.data);
					let temObj = { ...res.data };
					temObj.isEvaluate = true;
					temObj.orderStatus = 4;
					wx.request({
						method: 'put',
						url: `http://localhost:3006/order/${that.data.orderId}`, // 地址
						data: temObj,
						success(res) {
							console.log(res.data);
						}
					})
				}
			})

			wx.request({
				method: 'get',
				url: `http://localhost:3006/goods`, // 地址
				success(res) {
					console.log(res.data);
					const temData = res.data;
					const commentObj = {
						uid: app.globalData.user.id,
						orderNum: that.data.orderNum,
						user: app.globalData.user.user,
						evaluate: that.data.areaValue,
					}

					that.data.goodsIdArr.forEach(item => {
						const needObj = temData.find(ele => ele.id === item);
						needObj.comment.push(commentObj);
						setTimeout(() => {
							wx.request({
								method: 'put',
								url: `http://localhost:3006/goods/${item}`, // 地址
								data: needObj,
								success(res) {
									console.log(res.data);
								}
							})
						}, item * 100)

					})
				}
			});


			// this.data.goodsIdArr.forEach(item => {
			// 	wx.request({
			// 		method: 'get',
			// 		url: `http://localhost:3006/goods/${item}`, // 地址
			// 		success(res) {
			// 			const goods = res.data;
			// 			const comment = [];
			// 			comment.push({
			// 				uid: app.globalData.user.id,
			// 				orderNum: that.data.orderNum,
			// 				user: app.globalData.user.user,
			// 				evaluate: that.data.areaValue,
			// 			})

			// 			goods.comment = comment;

			// 			wx.request({
			// 				method: 'put',
			// 				url: `http://localhost:3006/goods/${item}`, // 地址
			// 				data: goods,
			// 				success(res) {
			// 					console.log(res.data);
			// 				}
			// 			})
			// 		}
			// 	})
			// })

			$Toast({
				content: '提交成功！',
				type: 'success'
			});

			setTimeout(() => {
				wx.navigateBack({
					delta: 1
				})
			}, 300)

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