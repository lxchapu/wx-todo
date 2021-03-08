Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 群组名称
    name: "",
    // 群组
    groups: [],
    // 更多列表
    more: [],
    // 包含列表
    include: []
  },
  // 生命周期 页面加载
  onLoad(options) {
    var lists = wx.getStorageSync("lists");
    var groups = [];
    lists.forEach(item => {
      if (item.group) {
        const index = groups.findIndex(g => {
          return g == item.group
        })
        if (index == -1) {
          groups.push(item.group);
        }
      }
    });
    this.setData({
      groups: groups,
      more: lists
    })
  },
  // 点击创建 
  handleCreateTap() {
    const index = this.data.groups.findIndex(g => {
      return g == this.data.name;
    })
    if (index == -1) {
      this.data.include.forEach(item => {
        item.group = this.data.name;
      })
      var lists = this.data.include.concat(this.data.more);
      wx.setStorage({
        key: "lists",
        data: lists,
        success: res => {
          wx.navigateBack();
        }
      })
    } else {
      wx.showToast({
        title: "群组名称已存在",
        icon: "none"
      })
    }
  },
  // 输入名称 
  handleNameInput(event) {
    this.setData({
      name: event.detail.value
    })
  },
  // 点击包含
  handleContainTap() {
    wx.navigateTo({
      url: "include_list",
      events: {
        include: (data) => {
          this.setData({
            include: data.include,
            more: data.more
          })
        }
      },
      success: (res) => {
        res.eventChannel.emit("include", {
          include: this.data.include,
          more: this.data.more
        });
      }
    })
  }
})