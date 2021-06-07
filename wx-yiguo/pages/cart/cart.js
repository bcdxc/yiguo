// pages/cart/cart.js
const { $Message } = require('../../dist/base/index');
const { $Toast } = require('../../dist/base/index');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		// 存放购物车所有商品的数组
		cartList: [],
		// 存放购物车商品的id 和 数量
		goodsArr: [],
		// 存放选中的商品 id
		checkArr: [],
		visible: false,
		actions: [
			{
				name: '取消'
			},
			{
				name: '删除',
				color: '#ed3f14',
				loading: false
			}
		],
		needDel: null,
		// 控制总结的显示
		allPrice: 0,
		// 控制删除选中的出现
		delAllSel: false,
		actions1: [
			{
				name: '取消'
			},
			{
				name: '确认',
				color: '#ed3f14',
				loading: false
			}
		],
		visible1: false,
		visible2: false,
		actions2: [],
		address: {}
	},

	onLoad: function (options) {
		const app = getApp();
		this.setData({
			goodsArr: app.globalData.user.cart,
			checkArr: [],
			allPrice: 0,
			delAllSel: false
		})
		const that = this;
		wx.request({
			method: 'get',
			url: 'http://localhost:3006/goods', // 地址
			success(res) {
				let cartList = [];
				let needArr = [];
				that.data.goodsArr.forEach(ele => {
					cartList.push(res.data.filter(item => item.id === ele.goodsId))
				})
				cartList.flat(1).forEach(item => {
					needArr.push({
						goodsId: item.id,
						goodsName: item.goodsName,
						price: item.price,
						quantity: that.data.goodsArr.find(ele => ele.goodsId === item.id).quantity,
						imgUrl: item.imgUrl[1].imgName,
						stock: item.stock,
						checked: false
					})
				})
				that.setData({
					cartList: needArr
				})
				console.log(that.data.cartList);
			}
		})

	},

	// 数量加减的方法
	handleChange(e) {
		let id = e.currentTarget.dataset.key;
		console.log(e);
		// 找到要更改的对象的索引
		const index = this.data.cartList.findIndex(item => item.goodsId === id);
		this.setData({
			// 动态获取索引值arr[index].name 写法：
			[`cartList[${index}].quantity`]: e.detail.value
		})
		this.changeGoodsArr();
		console.log(this.data.goodsArr);
		this.update()
		this.calcPrice();
	},

	changeGoodsArr() {
		const subArr = []
		this.data.cartList.forEach(item => {
			subArr.push({
				goodsId: item.goodsId,
				quantity: item.quantity,
				price: item.price
			})
		})
		this.setData({
			goodsArr: subArr,
		})
	},

	update() {
		const app = getApp();
		const temObj = { ...app.globalData.user };
		temObj.cart = this.data.goodsArr;
		// const that = this;
		wx.request({
			method: 'put',
			url: `http://localhost:3006/users/${temObj.id}`, // 地址
			data: temObj,
			success(res) {
				console.log(res.data);
			}
		})
	},

	// 向 user 发送 put 请求更新数据
	// requestUser(id, data) {
	// 	wx.request({
	// 		method: 'put',
	// 		url: `http://localhost:3006/users/${id}`, // 地址
	// 		data: data,
	// 		success(res) {
	// 			console.log(res.data);
	// 		}
	// 	})
	// },

	checkChange(e) {
		let temArr = [...this.data.checkArr];
		let checkId = e.target.dataset.checkid;
		const index = this.data.cartList.findIndex(item => item.goodsId === checkId)
		this.setData({
			[`cartList[${index}].checked`]: !this.data.cartList.find(item => item.goodsId === checkId).checked
		})

		if (temArr.includes(checkId)) {
			this.setData({
				checkArr: temArr.filter(item => item !== checkId)
			})
		} else {
			temArr.push(checkId);
			this.setData({
				checkArr: temArr
			})
		}
		console.log(this.data.checkArr);
		console.log(this.data.cartList);
		if (this.data.checkArr.length >= 2) {
			this.setData({
				delAllSel: true
			})
		} else {
			this.setData({
				delAllSel: false
			})
		}
		this.calcPrice();
	},

	// 计算总价
	calcPrice() {
		let allPrice = 0;
		this.data.checkArr.forEach(item => {
			let temObj = this.data.goodsArr.find(ele => ele.goodsId === item);
			allPrice += temObj.quantity * temObj.price;
		})
		this.setData({
			allPrice,
		})
	},

	handleOpen(e) {
		// console.log(e.target.dataset.delid);
		// this.setData 可以同时设置多个属性
		this.setData({
			visible: true,
			needDel: e.target.dataset.delid
		});
	},

	// 删除商品
	delete({ detail }) {
		console.log(detail);
		if (detail.index === 0) {
			// 点击取消
			this.setData({
				visible: false
			});
		} else {
			// 点击确认
			const action = [...this.data.actions];
			action[1].loading = true;
			console.log(action);
			this.setData({
				actions: action
			});
			const app = getApp();
			console.log(app.globalData.user);
			// 需要判断删除单个还是选出选中
			if (this.data.needDel === "删除选中") {
				console.log(111);
				let selArr = this.data.checkArr;
				// 将各个数组里与选中的数据相对应的id 全部删掉

				let temCartList = [...this.data.cartList];
				let temGoodsArr = [...this.data.goodsArr];
				let temCheckArr = [...this.data.checkArr];
				selArr.forEach(item => {
					app.globalData.user.cart.splice(app.globalData.user.cart.findIndex(ele => ele.goodsId === item), 1);
					temCartList.splice(temCartList.findIndex(ele => ele.goodsId === item), 1);
					temGoodsArr.splice(temGoodsArr.findIndex(ele => ele.goodsId === item), 1);
					temCheckArr.splice(temCheckArr.findIndex(ele => ele.goodsId === item), 1);
				})
				this.setData({
					cartList: temCartList,
					goodsArr: temGoodsArr,
					checkArr: temCheckArr,
					allPrice: 0,
					delAllSel: false
				})

			} else {
				console.log(222);
				app.globalData.user.cart = app.globalData.user.cart.filter(item => item.goodsId !== this.data.needDel)
				// 在点击删除的时候，我们需要先将 cartList 和 goodsArr清空掉，再调用 update 方法
				// 并且需要判断它是否被选中，如果被选中，删除时也应把它从 checkArr 删除

				this.setData({
					cartList: [...this.data.cartList].filter(item => item.goodsId !== this.data.needDel),
					goodsArr: [...this.data.goodsArr].filter(item => item.goodsId !== this.data.needDel),
					checkArr: [...this.data.checkArr].filter(item => item !== this.data.needDel)
				})
				this.calcPrice()
			}

			console.log(this.data.checkArr);
			// 发送更新
			this.update();

			action[1].loading = false;
			this.setData({
				visible: false,
				actions: action
			});

			$Message({
				content: '删除成功！',
				type: 'success'
			});
		}
	},

	skipGoods(e) {
		console.log(e.currentTarget.dataset.skipid);
		wx.navigateTo({
			url: `/pages/goods/goods?goodsId=${e.currentTarget.dataset.skipid}`,
		})
	},

	stopBubbling() {
		// 阻止事件冒泡
	},

	handleCancel2() {
		this.setData({
			visible2: false
		});
	},


	handleOpen1() {
		if (this.data.checkArr.length > 0) {
			const app = getApp();
			if (app.globalData.user.address.find(item => item.isDefault === true)) {
				// 有默认地址
				console.log("有默认地址 --> 直接付款");
				this.setData({
					visible1: true,
					address: { ...app.globalData.user.address.find(item => item.isDefault === true) }
				});
			} else {
				// 没有默认地址 去选择
				const app = getApp()
				let optionsAddress = [];

				app.globalData.user.address.forEach(item => {
					optionsAddress.push({
						name: `${item.user} -- ${item.address} -- ${item.phone}`
					})
				})

				this.setData({
					actions2: optionsAddress,
					visible2: true
				})

			}

		} else {
			// 轻提示 未选择商品

			$Toast({
				content: '请选择商品',
				type: 'error'
			});
		}
	},

	handleClickItem2({ detail }) {
		const index = detail.index;
		const app = getApp();
		console.log(detail);


		this.setData({
			visible2: false,
			address: { ...app.globalData.user.address[index] },
			visible1: true
		});

		console.log(this.data.address);

	},

	// 结账
	checkout({ detail }) {
		if (detail.index === 0) {
			this.setData({
				visible1: false
			});
		} else {
			const action = [...this.data.actions1];
			const app = getApp();
			action[1].loading = true;

			this.setData({
				actions1: action
			});
			const that = this;
			if (this.data.address.address.includes('秦皇岛') && this.data.address.address.includes('海港')) {
				if (this.data.checkArr.length) {
					let buyGoods = [];

					this.data.checkArr.forEach(item => {
						buyGoods.push({
							...this.data.goodsArr.find(ele => ele.goodsId === item),
							imgUrl: this.data.cartList.find(ele => ele.goodsId === item).imgUrl,
							goodsName: this.data.cartList.find(ele => ele.goodsId === item).goodsName
						})
					})

					// 用户购买后 应该使商品的库存相应减少
					buyGoods.forEach(item => {
						wx.request({
							method: 'get',
							url: `http://localhost:3006/goods/${item.goodsId}`,
							success(res) {
								let needModifyGoods = {};
								needModifyGoods = { ...res.data }
								needModifyGoods.stock -= item.quantity;
								needModifyGoods.purchase += item.quantity;
								wx.request({
									method: 'put',
									url: `http://localhost:3006/goods/${item.goodsId}`,
									data: needModifyGoods,
									success(res) {
										console.log(res.data);
									}
								})
							}
						})
					})

					let order = {
						address: this.data.address.address,
						user: this.data.address.user,
						phone: this.data.address.phone,
						createTime: new Date().getTime(),
						uid: app.globalData.user.id,
						goodsList: buyGoods,
						cost: this.data.allPrice,
						orderStatus: 1,
						isEvaluate: false,
					};


					wx.request({
						method: 'post',
						url: `http://localhost:3006/order`, // 地址
						data: order,
						success() {
							const app = getApp();
							action[1].loading = false;

							let temCartList = [...that.data.cartList];
							let temGoodsArr = [...that.data.goodsArr];
							that.data.checkArr.forEach(item => {
								temCartList.splice(temGoodsArr.findIndex(ele => ele.goodsId === item));
								temGoodsArr.splice(temGoodsArr.findIndex(ele => ele.goodsId === item));
								app.globalData.user.cart.splice(app.globalData.user.cart.findIndex(ele => ele.goodsId === item))
							})

							that.setData({
								visible1: false,
								actions1: action,
								cartList: temCartList,
								goodsArr: temGoodsArr,
								checkArr: [],
								allPrice: 0,
								delAllSel: false
							});

							wx.request({
								method: 'put',
								url: `http://localhost:3006/users/${app.globalData.user.id}`, // 地址
								data: app.globalData.user,
							})
						}
					})

					$Message({
						content: '付款成功，订单待发货',
						type: 'success'
					});
				} else {
					action[1].loading = false;
					that.setData({
						visible1: false,
						actions1: action,
					});
					$Message({
						content: '付款失败，您还没有选择商品',
						type: 'error'
					});
				}
			} else {
				action[1].loading = false;
				that.setData({
					visible1: false,
					actions1: action,
				});
				$Message({
					content: '抱歉，目前只能配送到秦皇岛市海港区',
					type: 'error'
				});
			}


		}

	},

	onShow() {
		this.onLoad();
		this.data.checkArr = [];
	}

})