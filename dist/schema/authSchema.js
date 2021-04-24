"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signin = exports.signup = void 0;

var _joi = _interopRequireDefault(require("joi"));

// const de roles permitidos
var roles = _joi["default"].array().items(_joi["default"].string().valid("admin", "moderator")); // const password validate


var password = _joi["default"].string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(); // const email


var email = _joi["default"].string().email().required(); // schema validación de registro de usuarios


var signup = _joi["default"].object({
  username: _joi["default"].string().required(),
  email: email,
  password: password,
  roles: roles
}); // schema validación de login de usuarios


exports.signup = signup;

var signin = _joi["default"].object({
  email: email,
  password: password
});

exports.signin = signin;