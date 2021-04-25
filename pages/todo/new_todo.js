/* 新建提醒事项 */
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    title: null,
    remark: null,
    detail: {
      url: null,
      date: null,
      time: null,
      repeat: null, 
      location: null,
      isSendMessage: false,
      isFlag: false,
      level: 0
    },
    belongList: {}
  },
  // 生命周期 页面加载
  onLoad() {
    var lists = wx.getStorageSync("lists") || [];
    this.setData({
      belongList: lists[0]
    });
  },
  // 点击详细信息
  handleDetailTap() {
    wx.navigateTo({
      url: "./about_info",
      event: {
        setDetail: res => {
          this.setData(res)
        }
      },
      success: res => {
        res.eventChannel.emit("setDetail", this.data.detail)
      }
    })
  },
  // 点击列表
  handleBelongListTap() {
    wx.navigateTo({
      url: "./belong_list",
      events: {
        setBelongList: res => {
          this.setData(res)
        }
      },
      success: res => {
        res.eventChannel.emit("setBelongList", {
          belongList: this.data.belongList
        })
      }
    })
  },
  // 点击添加
  handleAddTap() {
    var todoItem = {
      id: Date.now().toString(36),
      title: this.data.title,
      remark: this.data.remark,
      url: this.data.detail.url,
      dateline: {...this.data.detail.date, ...this.data.detail.time},
      repeat: this.data.detail.repeat, 
      location: this.data.detail.location,
      isSendMessage: this.data.detail.isSendMessage,
      isFlag: this.data.detail.isFlag,
      level: this.data.detail.level,
      list_id: this.data.belongList.id
    }
    var list = [];
    wx.getStorage({
      key: "todos",
      success: res=> {
        list = res.data;
        list.push(todoItem)
      },
      fail: err=> {
        list = [todoItem]
      },
      complete: () => {
        wx.setStorage({
          key: "todos",
          data: list
        }).then(() => {
          wx.navigateBack({
            delta: 0
          });
        })
      }
    })
  },
  // 输入标题
  handleTitleInput(event) {
    this.setData({
      title: event.detail.value
    })
  },
  // 输入备注
  handleRemarkInput(event) {
    this.setData({
      remark: event.detail.value
    })
  }
})