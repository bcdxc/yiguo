// pages/goods/goods.js
const { $Toast } = require('../../dist/base/index');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		goodsId: '',
		goodsData: {},
		indicatorDots: true,
		autoplay: true,
		interval: 3000,
		duration: 500,
		isDetails: 'details',
		isActive: false,
		visible: false,
		actions: [
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
		const that = this;
		that.setData({
			goodsId: Number(options.goodsId)
		})
		wx.request({
			method: 'get',
			url: `http://localhost:3006/goods/${that.data.goodsId}`, // 地址
			success(res) {
				console.log(res.data);
				that.setData({
					goodsData: res.data
				})
				const app = getApp();
				console.log(that.data.goodsId);
				if (app.globalData.user.collect.find(item => item.goodsId === that.data.goodsId)) {
					that.setData({
						isActive: true
					})
					console.log(that.data.isActive);
				}
				console.log(that.data.goodsData);
			}
		})
	},

	changeTag(e) {
		console.log(e);
		this.setData({
			isDetails: e.currentTarget.dataset.tag
		})
	},


	// 加入购物车
	addCart() {
		const app = getApp();
		console.log("当前用户id --> " + app.globalData.user.id);
		console.log(this.data.goodsData);

		if (app.globalData.user.cart.find(item => item.goodsId === this.data.goodsData.id)) {
			console.log("购物车存在");

			app.globalData.user.cart.find(item => item.goodsId === this.data.goodsData.id).quantity++;
		} else {
			console.log("购物车不存在");
			app.globalData.user.cart.push({
				goodsId: this.data.goodsData.id,
				price: this.data.goodsData.price,
				quantity: 1
			})
		}


		wx.request({
			method: 'put',
			url: `http://localhost:3006/users/${app.globalData.user.id}`, // 地址
			data: app.globalData.user,
			success(res) {
				$Toast({
					content: '已加入购物车',
					type: 'success'
				});
				console.log(res.data);
			}
		})
	},

	collectOpen() {
		if (this.data.isActive) {
			this.setData({
				visible: true
			});
		} else {
			console.log(this.data.goodsData);
			const app = getApp();
			app.globalData.user.collect.push({
				goodsId: this.data.goodsData.id,
				goodsName: this.data.goodsData.goodsName,
				imgUrl: this.data.goodsData.imgUrl[1]
			})
			const that = this;
			wx.request({
				method: 'put',
				url: `http://localhost:3006/users/${app.globalData.user.id}`, // 地址
				data: app.globalData.user,
				success(res) {
					$Toast({
						content: '已收藏',
						type: 'success'
					});
					console.log(res.data);
					that.setData({
						isActive: true
					})
				}
			})
		}
	},

	changeCollectStatus({ detail }) {
		const action = [...this.data.actions];
		action[1].loading = true;

		this.setData({
			actions: action
		});
		if (detail.index === 0) {
			const action = [...this.data.actions];
			action[1].loading = false;
			this.setData({
				visible: false,
				actions: action
			});
		} else {
			const action = [...this.data.actions];
			action[1].loading = true;

			this.setData({
				actions: action
			});

			const app = getApp();
			app.globalData.user.collect = app.globalData.user.collect.filter(item => item.goodsId !== this.data.goodsData.id)

			console.log(app.globalData.user.collect);
			const that = this;
			wx.request({
				method: 'put',
				url: `http://localhost:3006/users/${app.globalData.user.id}`, // 地址
				data: app.globalData.user,
				success(res) {
					action[1].loading = false;
					that.setData({
						visible: false,
						actions: action,
						isActive: false
					});
					$Toast({
						content: '已取消收藏',
						type: 'success'
					});
					console.log(res.data);
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

	}
})