"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsers = exports.createUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _User = _interopRequireDefault(require("../models/User"));

var _Role = _interopRequireDefault(require("../models/Role"));

// fn para crear users
var createUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, username, email, roles, user, foundRoles, role;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, email = _req$body.email, roles = _req$body.roles;
            _context.t0 = _User["default"];
            _context.t1 = username;
            _context.t2 = email;
            _context.next = 6;
            return _User["default"].encryptPassword("changeme");

          case 6:
            _context.t3 = _context.sent;
            _context.t4 = {
              username: _context.t1,
              email: _context.t2,
              password: _context.t3
            };
            user = new _context.t0(_context.t4);

            if (!roles) {
              _context.next = 18;
              break;
            }

            _context.next = 12;
            return _Role["default"].find({
              name: {
                $in: roles
              }
            });

          case 12:
            foundRoles = _context.sent;

            if (!(foundRoles <= 0)) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", res.status(422).json({
              message: "Roles not found"
            }));

          case 15:
            user.roles = foundRoles.map(function (role) {
              return role._id;
            });
            _context.next = 22;
            break;

          case 18:
            _context.next = 20;
            return _Role["default"].findOne({
              name: "user"
            });

          case 20:
            role = _context.sent;
            user.roles = [role._id];

          case 22:
            user.save(function (error, user) {
              resServer(res, error, user);
            });

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // get users


exports.createUser = createUser;

var getUsers = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _User["default"].find({}, {
              password: 0
            }).populate("roles", {
              _id: 0
            }).exec(function (error, users) {
              resServer(res, error, users);
            });

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getUsers(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
/*
    Esta función abstrae la respuesta del servidor
  */


exports.getUsers = getUsers;

function resServer(res, error, resource) {
  if (error) return res.status(500).send({
    message: "Internal server error."
  });
  if (!resource) return res.status(404).send({
    message: "404 not found."
  });
  res.status(200).json({
    data: resource
  });
}