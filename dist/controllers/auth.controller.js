"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signin = exports.signup = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _User = _interopRequireDefault(require("../models/User"));

var _Role = _interopRequireDefault(require("../models/Role"));

var token = _interopRequireWildcard(require("../libs/token"));

/*
  Controller de autenticacion
*/
// fn de registro de user
var signup = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, username, email, password, roles, user, foundRoles, role, saveUser, tokenJwt;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password, roles = _req$body.roles;
            _context.prev = 1;
            _context.t0 = _User["default"];
            _context.t1 = username;
            _context.t2 = email;
            _context.next = 7;
            return _User["default"].encryptPassword(password);

          case 7:
            _context.t3 = _context.sent;
            _context.t4 = {
              username: _context.t1,
              email: _context.t2,
              password: _context.t3
            };
            user = new _context.t0(_context.t4);

            if (!roles) {
              _context.next = 19;
              break;
            }

            _context.next = 13;
            return _Role["default"].find({
              name: {
                $in: roles
              }
            });

          case 13:
            foundRoles = _context.sent;

            if (!(foundRoles <= 0)) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return", res.status(422).json({
              message: "Roles not found"
            }));

          case 16:
            user.roles = foundRoles.map(function (role) {
              return role._id;
            });
            _context.next = 23;
            break;

          case 19:
            _context.next = 21;
            return _Role["default"].findOne({
              name: "user"
            });

          case 21:
            role = _context.sent;
            user.roles = [role._id];

          case 23:
            _context.next = 25;
            return user.save();

          case 25:
            saveUser = _context.sent;
            // creación del token: data - secret - expiresIn
            tokenJwt = token.sign({
              id: saveUser._id
            });
            res.status(201).json({
              tokenJwt: tokenJwt
            });
            _context.next = 34;
            break;

          case 30:
            _context.prev = 30;
            _context.t5 = _context["catch"](1);
            console.log(_context.t5);
            return _context.abrupt("return", res.status(400).json({
              message: "user already exists"
            }));

          case 34:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 30]]);
  }));

  return function signup(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // fn de login de user


exports.signup = signup;

var signin = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var userFound, matchPassword, tokenJwt;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _User["default"].findOne({
              email: req.body.email
            }).populate("roles", {
              _id: 0
            });

          case 2:
            userFound = _context2.sent;

            if (userFound) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              message: "User not found"
            }));

          case 5:
            _context2.next = 7;
            return _User["default"].comparePassword(req.body.password, //string
            userFound.password //hash
            );

          case 7:
            matchPassword = _context2.sent;

            if (matchPassword) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(401).json({
              message: "Invalid password"
            }));

          case 10:
            // creación del token: data - secret - expiresIn
            tokenJwt = token.sign({
              id: userFound._id
            });
            res.json({
              tokenJwt: tokenJwt
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function signin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signin = signin;