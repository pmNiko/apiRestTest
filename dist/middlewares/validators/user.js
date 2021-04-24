"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = void 0;

var user = _interopRequireWildcard(require("../../schema/userSchema"));

var create = function create(req, res, next) {
  var _user$create$validate = user.create.validate(req.body),
      error = _user$create$validate.error;

  error ? res.status(422).json({
    error: error.details[0].message
  }) : next();
};

exports.create = create;