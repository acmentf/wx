"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = getApp();

exports.default = Page({

  data: {
    userInfo: {}
  },
  onLoad: function onLoad() {},
  onShow: function onShow() {
    // this.getUserInfo().then(res=>{
    //   console.log(res)
    // })
    var userInfo = this._getUserInfo();
    console.log(userInfo);
  },
  login: function login() {
    return new Promise(function (resolve, reject) {
      return wx.login({
        success: resolve,
        fail: reject
      });
    });
  },
  getUserInfo: function getUserInfo() {
    return this.login().then(function (res) {
      return new Promise(function (resolve, reject) {
        return wx.getUserInfo({
          success: resolve,
          fail: reject
        });
      });
    });
  },
  _getUserInfo: function _getUserInfo() {
    var that = this;
    wx.login({
      success: function success() {
        wx.getUserInfo({
          success: function success(res) {
            that.setData({
              userInfo: res.userInfo
            });
          }
        });
      }
    });
  }
});