"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signin = exports.signup = void 0;

var auth = _interopRequireWildcard(require("../../schema/authSchema"));

// Middleware de validación de schema para registrar un user
var signup = function signup(req, res, next) {
  var _auth$signup$validate = auth.signup.validate(req.body),
      error = _auth$signup$validate.error;

  error ? res.status(422).json({
    error: error.details[0].message
  }) : next();
}; // Middleware de validación de schema para login de user


exports.signup = signup;

var signin = function signin(req, res, next) {
  var _auth$signin$validate = auth.signin.validate(req.body),
      error = _auth$signin$validate.error;

  error ? res.status(422).json({
    error: error.details[0].message
  }) : next();
};

exports.signin = signin;