"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.create = void 0;

var _joi = _interopRequireDefault(require("joi"));

// const validation schema
var nameAndCategory = _joi["default"].string().min(4).max(13);

var price = _joi["default"].number().positive().precision(2);

var imgURL = _joi["default"].string().min(13); // schema de creación


var create = _joi["default"].object({
  name: nameAndCategory.required(),
  category: nameAndCategory.required(),
  price: price.required(),
  imgURL: imgURL.required()
}); // schema de actualización


exports.create = create;

var update = _joi["default"].object({
  name: nameAndCategory,
  category: nameAndCategory,
  price: price,
  imgURL: imgURL
});

exports.update = update;