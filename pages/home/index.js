// pages/home/index.js
const util = require("../../utils/util.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 搜索框聚焦
    searchFocus: false,
    // 隐藏搜索框清除按钮
    searchClearHide: true,
    // 搜索框内容
    searchText: "",
    // 编辑状态
    editstatus: false,
    // 滚动页面
    scroll: false,
    todoType: [
      {
        icon: "/images/today.png",
        name: "今天",
        number: 0,
        show: true
      }, {
        icon: "/images/plain.png",
        name: "计划",
        number: 0,
        show: true
      }, {
        icon: "/images/all.png",
        name: "全部",
        number: 0,
        show: true
      }, {
        icon: "/images/flag.png",
        name: "旗标",
        number: 0,
        show: true
      }
    ],
    todoGroup: [
      {
        icon: "/images/important.png",
        name: "重要",
        number: 0
      }, {
        icon: "/images/default.png",
        name: "默认",
        number: 0
      }, {
        icon: "/images/temp.png",
        name: "暂缓",
        number: 0
      }
    ]
  },
  handleSearchFocus() {
    this.setData({
      searchFocus: true
    });
    wx.setNavigationBarColor({
      backgroundColor: "#ffffff",
      frontColor: "#000000",
    });
  },
  handleSearchBlur(event) {
    this.setData({
      searchFocus: false
    });
    wx.setNavigationBarColor({
      backgroundColor: "#f2f2f7",
      frontColor: "#000000",
    });
  },
  handleSearchInput(event) {
    const inputText = event.detail.value;
    this.setData({
      searchClearHide: inputText == ""
    })
  },
  handleSearchClearTap(event) {
    this.setData({
      searchText: "",
      searchClearHide: true
    })
  },
  handleSearchCancelTap(event) {
    this.setData({
      searchText: "",
      searchClearHide: true
    })
  },
  handleEditTap() {
    this.setData({
      editstatus: !this.data.editstatus
    })
  },
  // 页面滚动
  onPageScroll(event) {
    const toupper = event.scrollTop > 10+43;
    this.setData({
      scroll: toupper
    })
    if (toupper) {
      wx.setNavigationBarColor({
        backgroundColor: "#ffffff",
        frontColor: "#000000",
      });
    } else {
      wx.setNavigationBarColor({
        backgroundColor: "#f2f2f7",
        frontColor: "#000000",
      });
    }
  },
  handleShowTypeTap(event) {
    const index = event.target.dataset.index;
    this.data.todoType[index].show = !this.data.todoType[index].show;
    this.setData({
      todoType: this.data.todoType
    })
  },
  handleDeleteGroupTap(event) {
    const index = event.target.dataset.index;
    wx.showModal({
      title: "提示",
      content: "是否删除该列表",
      confirmColor: "#3478f6",
      success: res => {
        if (res.confirm) {
          this.data.todoGroup.splice(index, 1);
          this.setData({
            todoGroup: this.data.todoGroup
          })
        }
      }
    });
  },
  handleNavigatorTap(event) {
    const index = event.currentTarget.dataset.index;
    const url = util.buildURL("/pages/todo/detail", {
      name: this.data.todoType[index].name
    })
    wx.navigateTo({
      url: url,
    })
  }
})