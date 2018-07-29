'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = getApp();
//数据缓存

exports.default = Page({

  data: {
    allCategorys: []
  },
  onLoad: function onLoad() {},
  onShow: function onShow() {
    this.getAllCategorys();
  },

  // 获取全部栏目列表
  getAllCategorys: function getAllCategorys() {
    var _this = this;

    app.utils.getCategorys().then(function (res) {
      _this.setData({
        allCategorys: res
      });
    });
  },

  // 切换栏目增加删除
  add_detele_item: function add_detele_item(data, boolean) {
    var _this2 = this;

    var allCategorys = this.data.allCategorys;
    var index = data.target.dataset.index;
    allCategorys.forEach(function (item, i) {
      if (index === i && index !== 0) {
        item.selected = boolean;
      }
    });
    this.setData({
      allCategorys: allCategorys
    }, function () {
      // 存入缓存
      var likeList = _this2.data.allCategorys.filter(function (item) {
        return item.selected;
      });
      wx.setStorageSync('USER_COLLECT', likeList);
    });
  },

  // 删除栏目
  deteleItem: function deteleItem(data) {
    this.add_detele_item(data, false);
  },

  // 增加栏目
  addItem: function addItem(data) {
    this.add_detele_item(data, true);
  },

  // 全部选择
  selectAll: function selectAll() {
    var _this3 = this;

    var allCategorys = this.data.allCategorys;
    allCategorys.forEach(function (item) {
      item.selected = true;
    });
    this.setData({
      allCategorys: allCategorys
    }, function () {
      wx.setStorageSync('USER_COLLECT', _this3.data.allCategorys);
    });
  },

  // 返回首页
  backIndex: function backIndex() {
    wx.navigateBack();
  }
});