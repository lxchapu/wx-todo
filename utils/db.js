/* storage name */
const DB_TODO = "todos";
const DB_LIST = "lists";
const DB_GROUP = "groups";
/* 提醒事项 */
var Todo = {};
/* 获取所有提醒事项 */
Todo.queryAll = function() {
  var todos = wx.getStorageSync(DB_TODO) || [];
  return todos;
}
/* 根据 id 获取提醒事项 */
Todo.queryById = function(id) {
  var todos = Todo.queryAll();
  const index = todos.findIndex(item => {
    return item.id === id;
  })
  if (index === -1) {
    return null;
  } else {
    return todos[index];
  }
}
/* 根据 list_id 获取提醒事项 */
Todo.queryByListId = function(list_id) {
  var todos = Todo.queryAllTodo();
  return todos.filter(item => {
    return item.list_id === list_id;
  })
}
/* 根据 id 删除提醒事项 */
Todo.deleteById = function(id) {
  var todos = Todo.queryAllTodo();
  const index = todos.findIndex(item => {
    return item.id === id;
  })
  if (index !== -1) {
    todos.splice(index, 1);
    wx.setStorageSync(DB_TODO, todos)
  }
}
/* 添加提醒事项 */
Todo.insertOne = function(todo) {
  var todos = Todo.queryAllTodo();
  todos.push(todo);
  wx.setStorageSync(DB_TODO, todos)
}
/* 清空提醒事项 */
Todo.clear = function() {
  wx.removeStorageSync(DB_TODO);
}
/* 列表 */
var List = {};
/* 获取所有列表 */
List.queryAll = function() {
  var lists = wx.getStorageSync(DB_LIST) || [];
  return lists;
}
/* 根据 id 获取列表 */
List.queryById = function(id) {
  var lists = List.queryAll();
  const index = lists.findIndex(item => {
    return item.id === id;
  })
  if (index === -1) {
    return null;
  } else {
    return lists[index];
  }
}
/* 根据 id 删除列表 */
List.deleteById = function(id) {
  var lists = List.queryAll();
  const index = lists.findIndex(item => {
    return item.id === id;
  })
  if (index !== -1) {
    lists.splice(index, 1);
    var todos = Todo.queryAll();
    todos = todos.filter(item => {
      return item.list_id !== id;
    })
    wx.setStorageSync(DB_LIST, lists);
    wx.setStorageSync(DB_TODO, todos);
  }
}
/* 添加列表 */
List.insertOne = function(list) {
  var lists = List.queryAll();
  lists.push(list);
  wx.setStorageSync(DB_LIST, lists)
}
/* 清空列表 */
List.clear = function() {
  wx.removeStorageSync(DB_LIST);
  Todo.clear();
}
/* 更新群组 */
List.updateGroup = function(up_lists, group_id) {
  var lists = List.queryAll();
  up_lists.forEach(up_item => {
    var index = lists.findIndex(item => {
      return item.id === up_item.id;
    })
    if (index !== -1) {
      lists[index].group_id = group_id;
    }
  })
  wx.setStorageSync(DB_LIST, lists);
}
/* 群组 */
var Group = {};
/* 获取全部群组 */
Group.queryAll = function() {
  var groups = wx.getStorageSync(DB_GROUP) || [];
  return groups;
}
/* 添加群组 */
Group.insertOne = function(group) {
  var groups = Group.queryAll();
  groups.push(group);
  wx.setStorageSync(DB_GROUP, groups)
}

module.exports = {
  Todo,
  List,
  Group
}