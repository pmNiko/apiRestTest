"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var authCtrl = _interopRequireWildcard(require("../controllers/auth.controller"));

var _verify = require("../middlewares/verify");

var schema = _interopRequireWildcard(require("../middlewares/validators/auth"));

var router = (0, _express.Router)();
router.post("/signup", [schema.signup, _verify.duplicate, _verify.checkRoles], authCtrl.signup);
router.post("/signin", schema.signin, authCtrl.signin);
var _default = router;
exports["default"] = _default;