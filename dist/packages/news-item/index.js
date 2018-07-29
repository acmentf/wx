'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({
  properties: {
    newInfo: {
      type: Object,
      value: {}
    }
  },
  data: {},
  methods: {
    detail: function detail() {
      var chid = this.data.newInfo.news_column_id;
      var news_id = this.data.newInfo.news_id;
      wx.navigateTo({
        url: '/pages/news/detail?chid=' + chid + '&news_id=' + news_id
      });
    }
  }
});