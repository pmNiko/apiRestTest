"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = connect;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var NODE_ENV = process.env.NODE_ENV;

var _dotenv$config = _dotenv["default"].config(),
    parsed = _dotenv$config.parsed;

var DB_DATABASE = parsed.DB_DATABASE,
    DB_DATABASE_DEV = parsed.DB_DATABASE_DEV,
    DB_DATABASE_TEST = parsed.DB_DATABASE_TEST;
var environment = '';
if (NODE_ENV === 'prod') environment = "".concat(DB_DATABASE);
if (NODE_ENV === 'dev') environment = "".concat(DB_DATABASE_DEV);
if (NODE_ENV === 'test') environment = "".concat(DB_DATABASE_TEST); // fn conexion a la BD

function connect() {
  return _connect.apply(this, arguments);
}

function _connect() {
  _connect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _mongoose["default"].connect("".concat(environment), {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useFindAndModify: true,
              useCreateIndex: true
            }).then(function () {
              return console.log('>>>> db is connected! :sunglasses:', environment);
            })["catch"](function (err) {
              return console.log('Error: ', err);
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _connect.apply(this, arguments);
}