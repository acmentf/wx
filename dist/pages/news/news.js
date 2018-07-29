'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var app = getApp();
//数据缓存
var cache = Object.create(null);

exports.default = Page({
  _isLoading: false,
  data: {
    newsBanner: [],
    current: 0,
    categorysList: [],
    newsList: [],
    currentTab: 0
  },
  onReady: function onReady() {
    this.fetchNewsData();
  },
  onShow: function onShow() {
    var _this = this;

    app.utils.getCategorys().then(function (res) {
      _this.setData({
        categorysList: res
      });
    });
  },

  // 到达底部请求下一页数据
  onReachBottom: function onReachBottom() {
    this.fetchNewsData(this.data.currentTab, 1);
  },

  // 获取数据
  fetchNewsData: function fetchNewsData() {
    var _this2 = this;

    var chid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    // 判断是更新下一页或初次加载
    //新增数据
    if (!cache[chid]) {
      cache[chid] = { slides: [], news: [], page: 0, time: Date.now() };
    }
    var info = cache[chid];
    //获取下一页
    if (type) {
      //数据加载中 无法翻页
      if (this._isLoading) {
        return false;
      }
      info.page += 1;
    } else {
      // 直接从缓存中取出
      if (info.news.length) {
        this.setData({
          newsBanner: info.slides,
          newsList: info.news
        });
        return false;
      }
    }
    //设置开关
    this._isLoading = true;
    app.post('v2/news/list.html', { "chid": chid, "page": info.page, "method": "POST" }).then(function (res) {
      var _info$news;

      _this2._isLoading = false;
      info.slides = res.data.newsBanner ? res.data.newsBanner : [];
      (_info$news = info.news).push.apply(_info$news, _toConsumableArray(res.data.newsList));
      _this2.setData({
        newsBanner: info.slides,
        newsList: info.news
      });
    });
  },
  tabChange: function tabChange(data) {
    var chid = data.target.dataset.chid;
    if (this.data.currentTab === chid) {
      return false;
    }
    this.setData({ currentTab: chid });
    this.fetchNewsData(chid, 0);
  },

  // 跳转喜好选择页面
  likeSelect: function likeSelect() {
    wx.navigateTo({
      url: '/pages/news/like'
    });
  }
});