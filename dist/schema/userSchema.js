"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = void 0;

var _joi = _interopRequireDefault(require("joi"));

// schema validación de creacion de usuarios
var create = _joi["default"].object({
  username: _joi["default"].string().required(),
  email: _joi["default"].string().email().required(),
  roles: _joi["default"].array().items(_joi["default"].string().valid("admin", "moderator"))
});

exports.create = create;