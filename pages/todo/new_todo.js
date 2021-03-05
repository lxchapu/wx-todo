// pages/todo/new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    remark: "",
    URL: "",
    detail: {
      date: {},
      time: {},
      repeat: {}, 
      location: {},
      isSendMessage: false,
      isFlag: false,
      level: 0
    },
    belongList: {
      name: "默认",
      themeColor: "red"
    },
    // 本页面不会使用到
    children: []
  },
  handleSetMoreTap(event) {
    wx.navigateTo({
      url: "./about_info",
    })
  },
  // 点击添加
  handleAddTap() {

  }
})