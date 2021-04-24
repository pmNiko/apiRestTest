"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _package = _interopRequireDefault(require("../../package.json"));

var _products = _interopRequireDefault(require("../routes/products.routes"));

var _auth = _interopRequireDefault(require("../routes/auth.routes"));

var _users = _interopRequireDefault(require("../routes/users.routes"));

var _database = require("./database");

var _initialSetup = require("../libs/initialSetup");

var app = (0, _express["default"])();
app.use(_express["default"].json());
(0, _database.connect)();
(0, _initialSetup.createRoles)(); //setup roles

app.use((0, _morgan["default"])("dev")); // seteamos un par clave valor al server

app.set("pkg", _package["default"]);
app.get("/", function (req, res) {
  var _app$get = app.get("pkg"),
      name = _app$get.name,
      author = _app$get.author,
      description = _app$get.description,
      version = _app$get.version;

  res.json({
    name: name,
    author: author,
    description: description,
    version: version
  });
});
app.use("/api/products", _products["default"]);
app.use("/api/auth", _auth["default"]);
app.use("/api/users", _users["default"]);
var _default = app;
exports["default"] = _default;