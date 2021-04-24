"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _app = _interopRequireDefault(require("./app"));

// recuperación de datos
var _dotenv$config = _dotenv["default"].config(),
    parsed = _dotenv$config.parsed;

var SERVER_PORT = parsed.SERVER_PORT; // server escuchando en el port 4000

_app["default"].listen(SERVER_PORT);

console.log('Server corriendo en el port: ', SERVER_PORT);