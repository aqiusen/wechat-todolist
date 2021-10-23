// pages/systemapi/systemapi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageSrc:"",
    scanResult:"",
    position:'front',
  },
  changCameraPosition:function() {
    this.setData({
      position:this.data.position === 'back'?'front':'back'
    })
  },
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          imageSrc: res.tempImagePath
        })
      }
    })
  },
  scanCode: function () {
    const that = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success(res) {
        console.log(res)
        that.setData({
          scanResult: res.result
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})