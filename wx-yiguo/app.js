// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    // user: {
    //   "id": 1,
    //   "user": "xc",
    //   "username": "user1",
    //   "password": "666666",
    //   "orderNum": [],
    //   "collect": [
    //     {
    //       "goodsId": 3,
    //       "goodsName": "酱香锅底",
    //       "imgUrl": {
    //         "imgName": "ia_1600000705.jpg",
    //         "imgId": 1618543916545
    //       }
    //     }
    //   ],
    //   "cart": [
    //     {
    //       "goodsId": 1,
    //       "quantity": 2,
    //       "price": 188
    //     },
    //     {
    //       "goodsId": 2,
    //       "quantity": 3,
    //       "price": 288
    //     }
    //   ],
    //   "phone": "15231909039",
    //   "address": [
    //     {
    //       "id": 1,
    //       "user": "xc",
    //       "phone": "15231909039",
    //       "address": "河北省秦皇岛市海港区河北大街",
    //       "isDefault": false
    //     },
    //     {
    //       "id": 2,
    //       "user": "xc",
    //       "phone": "15231909039",
    //       "address": "河北省秦皇岛市海港区河北大街1111",
    //       "isDefault": false
    //     }
    //   ],
    //   "suggest": [
    //     {
    //       "id": 1,
    //       "uid": 1,
    //       "user": "xc",
    //       "content": "",
    //       "date": 1618842755450
    //     }
    //   ]
    // }
  }
})
