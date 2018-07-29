"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
// 设置缓存
var cache = Object.create(null);
exports.default = Page({

  data: {
    wxParseData: [],
    article: {}
  },
  onLoad: function onLoad(options) {
    // 获取参数

    var chid = options.chid;
    var news_id = options.news_id;
    //缓存出来
    this.getDetailData(chid, news_id);
  },
  onShow: function onShow() {},
  getDetailData: function getDetailData(chid, news_id) {
    var _this = this;

    app.post('v2/news/detail.html', { news_id: news_id, chid: chid, "method": "POST" }).then(function (res) {
      console.log(res);
      if (res.data) {
        var data = res.data.newsDetail;
        var title = data.news_title,
            date = data.news_date,
            praise = data.news_praise_count,
            comment = data.news_comment_count,
            tag = data.news_source;

        var content = data.news_content;
        WxParse.wxParse('content', 'html', content, _this);
        _this.setData({
          article: { title: title, date: date, praise: praise, comment: comment, tag: tag }
        });
      } else {
        var content = "<div class=\"empty\">\u7CDF\u7CD5\uFF01\u9875\u9762\u627E\u4E0D\u5230\u4E86\u3002\u3002\u3002</div>";
        WxParse.wxParse('content', 'html', content, _this);
      }
    });
  }
});