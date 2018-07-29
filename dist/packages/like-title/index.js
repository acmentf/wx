'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({
  properties: {
    title: {
      type: String,
      value: ''
    },
    handleTex: {
      type: String,
      value: ''
    }
  },
  data: {},
  methods: {
    handleTap: function handleTap() {
      console.log(this.data.msg);
    }
  }
});