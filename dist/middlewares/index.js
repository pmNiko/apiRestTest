"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "verifyToken", {
  enumerable: true,
  get: function get() {
    return _authorization.verifyToken;
  }
});
Object.defineProperty(exports, "isAdmin", {
  enumerable: true,
  get: function get() {
    return _authorization.isAdmin;
  }
});
Object.defineProperty(exports, "isModerator", {
  enumerable: true,
  get: function get() {
    return _authorization.isModerator;
  }
});
Object.defineProperty(exports, "checkRoles", {
  enumerable: true,
  get: function get() {
    return _verify.checkRoles;
  }
});
Object.defineProperty(exports, "duplicate", {
  enumerable: true,
  get: function get() {
    return _verify.duplicate;
  }
});

var _authorization = require("./authorization");

var _verify = require("./verify");