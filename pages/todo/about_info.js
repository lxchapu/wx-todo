// pages/todo/about_info.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 显示日期选择器
    showDatePicker: false,
    // 设置日期
    setDate: false,
    // 设置时间
    setTime: false,
    // 设置位置
    setLocation: false,
    // 设置信息
    setMessage: false,
    // 设置旗标
    setFlag: false,
    // 提醒事项详细信息
    dateText: "今天",
    // 选择的日期
    date: null
  },
  handleSetDateSwitchChange(event) {
    this.setData({
      showDatePicker: event.detail.value
    })
  },
  handleShowSetDateTap(e) {
    if (e.target.dataset.type != "switch") {
      this.setData({
        showDatePicker: !this.data.showDatePicker
      })
    }
  }
})