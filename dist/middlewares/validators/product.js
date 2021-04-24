"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.create = void 0;

var schema = _interopRequireWildcard(require("../../schema/productSchema"));

var create = function create(req, res, next) {
  var _schema$create$valida = schema.create.validate(req.body),
      error = _schema$create$valida.error;

  error ? res.status(422).json({
    error: error.details[0].message
  }) : next();
};

exports.create = create;

var update = function update(req, res, next) {
  var _schema$update$valida = schema.update.validate(req.body),
      error = _schema$update$valida.error;

  error ? res.status(422).json({
    error: error.details[0].message
  }) : next();
};

exports.update = update;