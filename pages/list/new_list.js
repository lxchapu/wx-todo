Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 主题色列表
    colorList: ["red","orange","yellow","green","light-blue","blue","dark-blue","peach","purple","brown","slate-grey","rosy-brown"],
    // 图标列表
    iconList: ["emoji","list","bookmark","thumbpin","gift","birthday","school","backpack","penruler","file","book","wallet","creditcard","money","dumbbell","sport","dining","cup","medicine","stethoscope","chair","home","building","court","tent","tv","music","computer","game","headphone","leaf","carrot","oneperson","paw","bear","fish","basket","shapping","bag","box","soccer","baseball","basketbool","football","tennis","train","airplane","boat","car","vacation","sun","moon","water","snow","fire","work","tool","scissors","compass","bracket","bulb","dialog","sigh","asterisk","cube","circle","triangle","diamond","heart","star"],
    // 列表名称聚焦
    inputNameFocus: false,
    // 列表名称
    name: "",
    // 选择的颜色
    selectedColor: "blue",
    // 选择的图标
    selectedIcon: "list",
    // 列表
    lists: []
  },
  // 生命周期 页面加载
  onLoad(options) {
    wx.getStorage({
      key: "lists",
      success: res => {
        this.setData({
          lists: res.data
        })
      }
    })
  },
  // 点击颜色
  handleColorTap(event) {
    const value = event.currentTarget.dataset.value;
    this.setData({
      selectedColor: value
    })
  },
  // 点击图标
  handleIconTap(event) {
    const value = event.currentTarget.dataset.value;
    this.setData({
      selectedIcon: value
    })
  },
  // 列表名称聚焦
  handleInputNameFocus() {
    this.setData({
      inputNameFocus: true
    })
  },
  // 列表名称失焦
  handleInputNameBlur() {
    this.setData({
      inputNameFocus: false
    })
  },
  // 列表名称输入
  handleInputNameInput(event) {
    this.setData({
      name: event.detail.value
    })
  },
  // 点击完成
  handleConfirmTap() {
    const index = this.data.lists.findIndex(item => {
      return item.name == this.data.name;
    })
    if (index == -1) {
      this.data.lists.push({
        name: this.data.name,
        color: this.data.selectedColor,
        icon: this.data.selectedIcon
      })
      wx.setStorage({
        key: "lists",
        data: this.data.lists,
        success: res => {
          wx.navigateBack()
        }
      })
    } else {
      wx.showToast({
        title: "列表名称已存在",
        icon: "none"
      })
    }
  }
})