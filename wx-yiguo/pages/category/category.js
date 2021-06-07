// pages/category/category.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		category: [],
		goods: [],
		icon: {
			"火锅": 'huoguo',
			"套餐": 'FastFood-',
			"小料": 'tiaoliao',
			"酒水": 'jiushui',
			"菜品": 'MadebyMade-Vector-LineIcons-Nautical-Outline-',
			"主食": 'zhushi',
			"通用": 'icon-'
		},
		className: "火锅",
		goodsByClassName: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const that = this;
		// 请求获取到所有的商品
		wx.request({
			method: 'get',
			url: 'http://localhost:3006/goods', // 地址
			success(res) {
				that.setData({
					goods: res.data
				});

				// 请求获取到所有的类别
				wx.request({
					method: 'get',
					url: 'http://localhost:3006/classify', // 地址
					success(res) {
						let category = [];
						console.log(res.data);
						res.data.forEach(item => {
							category.push(item.className)
						})
						that.setData({
							category,
							className: res.data[0].className
						})
						that.filterGoods();
					}
				});
			}
		});

	},

	filterGoods() {
		this.setData({
			goodsByClassName: this.data.goods.filter(item => item.className === this.data.className)
		})
	},

	handlerCategory(e) {
		this.setData({
			className: e.currentTarget.dataset.sign
		})
		this.filterGoods();
		console.log(this.data.goodsByClassName);
	},

	bindGoodsList(e) {
		wx.navigateTo({
			url: `/pages/goods/goods?goodsId=${e.currentTarget.dataset.goodsid}`,
		})
	},

	onPullDownRefresh: function () {
		this.onLoad();
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},
})