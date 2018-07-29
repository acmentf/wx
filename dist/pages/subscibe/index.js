'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = getApp();
var cache = Object.create(null);
exports.default = Page({

  data: {
    subList: []
  },
  onLoad: function onLoad() {},
  onShow: function onShow() {
    this.getSubList();
  },

  //获取订阅列表
  getSubList: function getSubList() {
    var _this = this;

    if (!cache['subList']) {
      app.get('v2/ding/good.html').then(function (res) {
        cache['subList'] = res.data.dingList;
        _this.setData({
          subList: res.data.dingList
        });
      });
    } else {
      this.setData({
        subList: cache['subList']
      });
    }
  }
});