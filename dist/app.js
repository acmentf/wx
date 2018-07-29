'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _system = require('./static/utils/system.js');

var _system2 = _interopRequireDefault(_system);

var _utils = require('./static/utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = App({
  getUserInfo: function getUserInfo() {
    return new Promise(function (resolve, reject) {
      return wx.login({
        success: resolve,
        fail: reject
      });
    });
  },

  globalData: {
    userInfo: null,
    categoryChanged: true
  },
  onLaunch: function onLaunch() {
    _system2.default.attachInfo();
  },
  onShow: function onShow() {},
  onHide: function onHide() {},
  post: function post(url, data) {
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://wx.diggid.cn/coverHttps.php?url=' + url,
        data: Object.assign({}, { method: 'POST' }, data),
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'POSt',
        success: function success(res) {
          if (!res.code) {
            resolve(res);
          }
        },
        fail: function fail(res) {
          reject(res.message);
        }
      });
    });
  },
  get: function get(url, data) {
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://wx.diggid.cn/coverHttps.php?url=' + url,
        data: Object.assign({}, { method: 'GET' }, data),
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'GET',
        success: function success(res) {
          if (!res.code) {
            resolve(res);
          }
        },
        fail: function fail(res) {
          reject(res.message);
        }
      });
    });
  },

  convertHtmlToText: function convertHtmlToText(inputText) {
    var returnText = "" + inputText;
    returnText = returnText.replace(/<\/div>/ig, '\r\n');
    returnText = returnText.replace(/<\/li>/ig, '\r\n');
    returnText = returnText.replace(/<li>/ig, '  *  ');
    returnText = returnText.replace(/<\/ul>/ig, '\r\n');
    //-- remove BR tags and replace them with line break
    returnText = returnText.replace(/<br\s*[\/]?>/gi, "\r\n");

    //-- remove P and A tags but preserve what's inside of them
    returnText = returnText.replace(/<p.*?>/gi, "\r\n");
    returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

    //-- remove all inside SCRIPT and STYLE tags
    returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
    returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
    //-- remove all else
    returnText = returnText.replace(/<(?:.|\s)*?>/g, "");

    //-- get rid of more than 2 multiple line breaks:
    returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\r\n\r\n");

    //-- get rid of more than 2 spaces:
    returnText = returnText.replace(/ +(?= )/g, '');

    //-- get rid of html-encoded characters:
    returnText = returnText.replace(/ /gi, " ");
    returnText = returnText.replace(/&/gi, "&");
    returnText = returnText.replace(/"/gi, '"');
    returnText = returnText.replace(/</gi, '<');
    returnText = returnText.replace(/>/gi, '>');

    return returnText;
  },
  utils: _utils2.default
});