"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

/*
  Modelo de producto
*/
var productSchema = new _mongoose.Schema({
  name: String,
  category: {
    type: String,
    "default": "Generico",
    trim: true
  },
  price: Number,
  imgURL: String,
  dataFake: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Product", productSchema);

exports["default"] = _default;