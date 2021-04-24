"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isModerator = exports.isAdmin = exports.verifyToken = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var token = _interopRequireWildcard(require("../libs/token"));

var _User = _interopRequireDefault(require("../models/User"));

var _Role = _interopRequireDefault(require("../models/Role"));

/*
  Validacion del token
*/
var verifyToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var tokenJwt, decoded, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tokenJwt = req.headers["x-access-token"];

            if (tokenJwt) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(403).json({
              message: "No token provided."
            }));

          case 3:
            _context.prev = 3;
            // verify token
            decoded = token.verify(tokenJwt);
            req.userId = decoded.id; // la vamos a utilizar en los siguientes middle

            _context.next = 8;
            return _User["default"].findById(req.userId, {
              password: 0
            });

          case 8:
            user = _context.sent;

            if (user) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              message: "no user found"
            }));

          case 11:
            next();
            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](3);
            console.log(_context.t0);
            res.status(403).json({
              message: "Unauthorized"
            });

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 14]]);
  }));

  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}(); // verifica que el rol sea admin


exports.verifyToken = verifyToken;

var isAdmin = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return verifyRole("admin", req, res, next);

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function isAdmin(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}(); // verifica que el rol sea moderator


exports.isAdmin = isAdmin;

var isModerator = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return verifyRole("moderator", req, res, next);

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function isModerator(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}(); // fn modular para validar rol


exports.isModerator = isModerator;

function verifyRole(_x10, _x11, _x12, _x13) {
  return _verifyRole.apply(this, arguments);
}

function _verifyRole() {
  _verifyRole = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(role, req, res, next) {
    var user, roles, i;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (req.userId) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt("return", res.status(422).json({
              message: "Role does not exists"
            }));

          case 2:
            _context4.next = 4;
            return _User["default"].findById(req.userId);

          case 4:
            user = _context4.sent;
            _context4.next = 7;
            return _Role["default"].find({
              _id: {
                $in: user.roles
              }
            });

          case 7:
            roles = _context4.sent;
            i = 0;

          case 9:
            if (!(i < roles.length)) {
              _context4.next = 16;
              break;
            }

            if (!(roles[i].name === role)) {
              _context4.next = 13;
              break;
            }

            next();
            return _context4.abrupt("return");

          case 13:
            i++;
            _context4.next = 9;
            break;

          case 16:
            res.status(403).json({
              message: "Role ".concat(role, " is required.")
            });

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _verifyRole.apply(this, arguments);
}