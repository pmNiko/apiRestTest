"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var userCtrl = _interopRequireWildcard(require("../controllers/users.controller"));

var _middlewares = require("../middlewares");

var schema = _interopRequireWildcard(require("../middlewares/validators/user"));

var router = (0, _express.Router)();
router.post("/", [_middlewares.verifyToken, _middlewares.isAdmin, schema.create, _middlewares.duplicate, _middlewares.checkRoles], userCtrl.createUser);
router.get("/", userCtrl.getUsers);
var _default = router;
exports["default"] = _default;