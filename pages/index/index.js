// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  JumpTodoList() {
    wx.navigateTo({
      url: '../todolist/todolist',
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  jumpToDoList() {
    wx.navigateTo({
      url: '../todolist/todolist',
    })
  },
  jumpCallApi() {
    wx.navigateTo({
      url: '../systemapi/systemapi',
    })
  },
  //onLoad -----onShow-----onReady 
  //点击隐藏-----onHide  显示--onShow

  onLoad() {
    console.log("Do some initialize when page load.")
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  //页面显示的时候触发
  onShow: function() {
    console.log("Do something when page show.")
  },
  onReady: function() {
    console.log("Do something when page ready.")
  },
  //页面隐藏的时候触发
  onHide: function() {
    console.log("Do something when page hide.")
  },
  onUnload: function() {
    console.log("Do something when page close.")
  },
  //下拉触发下拉刷新
  onPullDownRefresh: function() {
    console.log("Do something when pull down.")
  },
  //滑动底部
  onReachBottom: function() {
    console.log("onReachBottom")
  },
  //点击...  触发分享
  onShareAppMessage: function () {
    console.log("onShareAppMessage")
  },
  //滑动的时候触发
  onPageScroll: function() {
    console.log("onPageScroll")
  },
  //屏幕旋转的时候触发-真机演示
  onResize: function() {
    console.log("onResize")
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
