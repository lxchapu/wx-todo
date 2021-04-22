// 自定义日期选择器组件
Component({
  options: {
    addGlobalClass: true
  },
  /* 组件的属性列表 */
  properties: {
    // 选中的日期
    value: {
      type: Object,
      value: {}
    },
    // 隐藏
    hidden: {
      type: Boolean,
      value: false
    }
  },
  /* 组件的初始数据 */
  data: {
    // 今天的日期
    current: {},
    // 日期选择器显示的日期
    show: {},
    // 某月日期列表
    dateList: [],
    // 月份列表
    monthList: [1,2,3,4,5,6,7,8,9,10,11,12],
    // 年份列表
    yearList: [],
    // 星期标签
    weekLabels: ["周日","周一","周二","周三","周四","周五","周六"],
    // 是否显示年月选择器
    showYearMonthPicker: false,
    // 年月选择器选中值
    yearMonthPickerValue: []
  },
  /* 组件实例进入页面节点树 */
  attached() {
    const current_date = new Date();
    const year = current_date.getFullYear();
    const month = current_date.getMonth() + 1;
    const day = current_date.getDate();
    var yearList = [];
    for (let y = year-1; y<=year+100; y++) {
      yearList.push(y);
    }
    this.setData({
      current: {
        year: year,
        month: month,
        day: day
      },
      show: {
        year: year,
        month: month
      },
      yearList: yearList
    });
    this.buildDateList(year, month);
  },
  /* 组件的方法列表 */
  methods: {
    // 生成日历
    buildDateList(year, month) {
      var date = new Date(year, month-1, 1);
      const monthFirstDayWeek = date.getDay();
      const monthDayNumber = new Date(year, month, 0).getDate();
      var dateList = [];
      for (let w=0; w<monthFirstDayWeek; w++) {
        dateList.push(null)
      }
      for (let w=1; w<=monthDayNumber; w++) {
        dateList.push(w)
      }
      this.setData({
        dateList: dateList
      })
    },
    // 选中日期
    handleDateTap(event) {
      const index = event.currentTarget.dataset.index;
      this.triggerEvent("change", {
        year: this.data.show.year,
        month: this.data.show.month,
        day: this.data.dateList[index]
      });
    },
    // 点击上个月
    handlePreMonthTap() {
      var year = this.data.show.year;
      var month = this.data.show.month - 1;
      if (month==0) {
        year -= 1;
        month = 12;
      }
      if (year>=this.data.current.year-1) {
        this.setData({
          show: {
            year: year,
            month: month
          }
        })
        this.buildDateList(year, month);
      }
    },
    // 点击下个月
    handleNextMonthTap() {
      var year = this.data.show.year;
      var month = this.data.show.month + 1;
      if (month==13) {
        year += 1;
        month = 1;
      }
      if (year<=this.data.current.year+100) {
        this.setData({
          show: {
            year: year,
            month: month
          }
        })
        this.buildDateList(year, month);
      }
    },
    // 年月选择器发生改变
    handleYearMonthPickerChange(event) {
      const value = event.detail.value;
      const year = this.data.yearList[value[0]];
      const month = this.data.monthList[value[1]];
      this.setData({
        yearMonthPickerValue: value,
        show: {
          year: year,
          month: month
        }
      })
    },
    // 点击显示年月选择器
    handleShowYearMonthPickerTap() {
      if (this.data.showYearMonthPicker) {
        this.setData({
          showYearMonthPicker: false
        })
        const year = this.data.show.year;
        const month = this.data.show.month;
        this.buildDateList(year, month);
      } else {
        const yearIndex = this.data.show.year - this.data.current.year + 1;
        const monthIndex = this.data.show.month - 1;
        this.setData({
          showYearMonthPicker: true,
          yearMonthPickerValue: [yearIndex, monthIndex]
        })
      }
    }
  }
})
