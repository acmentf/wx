'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var app = getApp();
var cache = Object.create(null);
exports.default = Page({
  isLoading: false,
  data: {
    newList: [],
    headerInfo: {},
    chid: ''
  },
  onLoad: function onLoad(option) {
    this.setData({
      chid: option.chid
    });
    this.getSubList(option.chid, 0);
  },
  onReachBottom: function onReachBottom() {
    this.getSubList(this.data.chid, 1);
  },
  onShow: function onShow() {
    this.setData({
      headerInfo: wx.getStorageSync('subInfo')
    });
  },

  //获取订阅列表
  getSubList: function getSubList() {
    var _this = this;

    var chid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (!cache[chid]) {
      cache[chid] = { slides: [], news: [], page: 0, time: Date.now() };
    }
    var info = cache[chid];
    if (type) {
      //正在加载中 
      if (this.isLoading) {
        return false;
      }
      info.page += 1;
    } else {
      // 直接从缓存中取出
      if (info.news.length) {
        this.setData({
          newsBanner: info.slides,
          newList: info.news
        });
        return false;
      }
    }
    this.isLoading = true;

    app.post('v2/news/list.html', { chid: chid, page: info.page }).then(function (res) {
      var _info$news;

      _this.isLoading = false;
      var data = res.data;
      info.slides = data.newsBanner;
      (_info$news = info.news).push.apply(_info$news, _toConsumableArray(data.newsList));
      _this.setData({
        newList: info.news,
        newsBanner: info.slides
      });
    });
  }
});