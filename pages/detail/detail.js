// pages/detail/detail.js
Page({
  //获取点击详情传递的数据
  onLoad: function (option) {
    console.log("option=", option, getApp().globalData.detailInfo)
    //从全局获取对象的值
    this.setData({
      desc: option.desc,
      detailInfo: getApp().globalData.detailInfo
    })
  },
  /**
   * 初始数据
   */
  data: {
    desc: "",
    detailInfo: null,
    scanResult:""
  },
  backToPrev() {
    wx.navigateBack({
      delta: 1,
    })
  }
})