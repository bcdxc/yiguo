// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    current: 'index',
    carousel: [],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    allGoods: [],
    showGoods: [],
    isActive: 1
  },
  onLoad() {
    let that = this;
    console.log(app.globalData.user);
    wx.request({
      method: 'get',
      url: 'http://localhost:3006/goods', // 地址
      success(res) {
        let carouselArr = res.data.filter(item => item.isCarousel
          === "是");
        let needArr = [];
        carouselArr.forEach(item => {
          needArr.push(item.imgUrl[0].imgName);
        })
        that.setData({
          carousel: needArr,
          allGoods: res.data,
          showGoods: res.data.filter(item => item.className === "火锅"),
          isActive: 1
        })
        console.log(that.data.allGoods);
      }
    })
  },

  filterHotPot() {
    if (this.data.isActive !== 1) {
      this.setData({
        showGoods: this.data.allGoods.filter(item => item.className === "火锅"),
        isActive: 1
      })
    }
  },
  filterDish() {
    if (this.data.isActive !== 2) {
      this.setData({
        showGoods: this.data.allGoods.filter(item => item.className === "菜品"),
        isActive: 2
      })
    }
  },
  filterSetMeal() {
    if (this.data.isActive !== 3) {
      this.setData({
        showGoods: this.data.allGoods.filter(item => item.className === "套餐"),
        isActive: 3
      })
    }
  },

  skipGoods(e) {
    console.log(e.currentTarget.dataset.skipid);
    wx.navigateTo({
      url: `/pages/goods/goods?goodsId=${e.currentTarget.dataset.skipid}`,
    })
  },
  onPullDownRefresh: function () {
    this.onLoad();
  },
})
