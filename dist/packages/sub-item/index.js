'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({
  properties: {
    subItem: {
      type: Object,
      default: {}
    }
  },
  data: {},
  onShow: function onShow() {},

  methods: {
    subDetail: function subDetail() {
      var subItem = this.data.subItem;
      // 设置缓存
      wx.setStorageSync('subInfo', {
        name: subItem.ding_name,
        pic: subItem.ding_pic,
        remark: subItem.ding_remark
      });
      wx.navigateTo({
        url: '/pages/subscibe/subList?chid=' + subItem.ding_id
      });
    }
  }
});