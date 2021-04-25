const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const buildURL = (base, query) => {
  const queryUrl = Object.keys(query).map(key => {
    return [encodeURIComponent(key), encodeURIComponent(query[key])].join("=")
  }).join("&");
  return base + "?" + queryUrl;
}

// 更新统计数据
const updateStatistics = () => {
  var todoItems = wx.getStorageSync("todoItems");
  var lists = wx.getStorageSync("lists");
}
/* 根据 id 从列表获取下标 */
const findIndexFromList = (id, list) => {
  const index = list.findIndex(item => {
    return item.id === id;
  })
  return index;
}

module.exports = {
  buildURL,
  findIndexFromList
}
