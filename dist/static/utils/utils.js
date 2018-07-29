'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var categorysJson = require('./categorys.js');
exports.default = {
  getCategorys: function getCategorys() {
    return new Promise(function (resolve, reject) {
      var liked = wx.getStorageSync('USER_COLLECT') || [];
      var categorys = categorysJson.data;
      categorys.forEach(function (category) {
        if (!liked.length) {
          // 缓存中没有用户选择的栏目 默认全部
          category.selected = true;
        } else {
          category.selected = false;
          liked.forEach(function (like) {
            return category.lanmu_id === like.lanmu_id && (category.selected = true);
          });
        }
      });
      resolve(categorys);
    });
  }
};