"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verify = exports.sign = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

/*
  fn para generar y verificar la firma del token
*/
var key = _fs["default"].readFileSync(_path["default"].join(__dirname, "../keys/private.pem"));

var certificate = _fs["default"].readFileSync(_path["default"].join(__dirname, "../keys/public.pem"));

var options = {
  expiresIn: "6h",
  algorithm: "RS256"
}; // create token with private key

var sign = function sign(payload) {
  return _jsonwebtoken["default"].sign(payload, key, options);
}; // verify token with public key


exports.sign = sign;

var verify = function verify(token) {
  return _jsonwebtoken["default"].verify(token, certificate);
};

exports.verify = verify;