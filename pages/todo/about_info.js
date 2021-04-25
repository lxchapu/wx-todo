/* 编辑todo详情 */
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
    dateText: null,
    // 字段
    date: null,
  },
  onLoad() {
    this.getOpenerEventChannel().once("setDetail", res => {
      this.setData(res)
    })
    this.setData({
      date: {
        year: new Date().getFullYear(),
        month: new Date().getMonth()+1,
        day: new Date().getDate()
      },
      dateText: "今天"
    })
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
  },
  handleDatePickerChange(event) {
    this.setData({
      date: event.detail,
      dateText: this.getDateText(event.detail)
    })
  },
  getDateText(date) {
    const textList = ["前天","昨天","今天","明天","后天"];
    var current = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate());
    var selected = new Date(date.year, date.month-1, date.day);
    var day = parseInt((selected - current) / 1000 / 60 / 60 / 24);
    if (day >=-2 && day <= 2) {
      return textList[day+2];
    } else {
      return `${date.year}年 ${date.month}月 ${date.day}日`
    }
  }
})