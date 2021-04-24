"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.duplicate = exports.checkRoles = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Role = require("../models/Role");

var _User = _interopRequireDefault(require("../models/User"));

/*
  comprobación de user y rol existente
*/
var checkRoles = function checkRoles(req, res, next) {
  var roles = req.body.roles;

  if (roles) {
    for (var i = 0; i < roles.length; i++) {
      if (!_Role.ROLES.includes(roles[i])) {
        return res.status(403).json({
          message: "Role ".concat(roles[i], " does not exists.")
        });
      }
    }
  }

  next();
};

exports.checkRoles = checkRoles;

var duplicate = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _req$body, username, email, user, emailUser;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, email = _req$body.email;
            _context.next = 3;
            return _User["default"].findOne({
              username: username
            });

          case 3:
            user = _context.sent;

            if (!user) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              message: "username ".concat(username, " already exists.")
            }));

          case 6:
            _context.next = 8;
            return _User["default"].findOne({
              email: email
            });

          case 8:
            emailUser = _context.sent;

            if (!emailUser) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              message: "email already exists"
            }));

          case 11:
            next();

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function duplicate(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.duplicate = duplicate;