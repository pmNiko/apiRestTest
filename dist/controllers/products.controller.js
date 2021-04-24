"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteDataFake = exports.deleteProductById = exports.updateProductById = exports.getProductById = exports.getProducts = exports.getProductsPerPage = exports.generateDataFake = exports.createProduct = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _faker = _interopRequireDefault(require("faker"));

var _Product = _interopRequireDefault(require("../models/Product"));

/*
  Controller de Products
*/
_faker["default"].locale = "es";

// fn para crear productos
var createProduct = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, name, category, price, imgURL, product;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // destructuring
            _req$body = req.body, name = _req$body.name, category = _req$body.category, price = _req$body.price, imgURL = _req$body.imgURL;
            product = new _Product["default"]({
              name: name,
              category: category,
              price: price,
              imgURL: imgURL
            });
            product.save(function (error, product) {
              resServer(res, error, product);
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createProduct(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // fn para generar datos falsos a travez de faker


exports.createProduct = createProduct;

var generateDataFake = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var categories, i, product;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            categories = ["categoria1", "categoria2", "categoria3", "categoria4", "categoria5"];
            i = 0;

          case 2:
            if (!(i < 5)) {
              _context2.next = 20;
              break;
            }

            product = new _Product["default"]();
            product.dataFake = true;
            product.name = _faker["default"].commerce.product();
            product.category = categories[Math.floor(Math.random() * categories.length)];
            product.price = _faker["default"].finance.amount();
            product.imgURL = _faker["default"].image.technics();
            _context2.prev = 9;
            _context2.next = 12;
            return product.save();

          case 12:
            _context2.next = 17;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](9);
            console.log(_context2.t0);

          case 17:
            i++;
            _context2.next = 2;
            break;

          case 20:
            res.status(201).json({
              message: "Data fake insert"
            });

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[9, 14]]);
  }));

  return function generateDataFake(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); // get products per page


exports.generateDataFake = generateDataFake;

var getProductsPerPage = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$query, category, limit, conditions, page, skip;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$query = req.query, category = _req$query.category, limit = _req$query.limit;
            conditions = category && {
              category: category
            };
            page = parseInt(req.params.number) || 0;
            limit = limit && limit > 0 ? parseInt(limit) : 0;
            skip = page > 0 ? limit * page - limit : 0; //example 2 * 1 = 2 ; 2-2= 0; // in the first page the value of the skip is 0

            search({
              conditions: conditions,
              skip: skip,
              limit: limit,
              res: res
            });

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getProductsPerPage(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); // fn para obtener productos


exports.getProductsPerPage = getProductsPerPage;

var getProducts = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$query2, name, category, sort, skip, limit, conditions;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$query2 = req.query, name = _req$query2.name, category = _req$query2.category, sort = _req$query2.sort, skip = _req$query2.skip, limit = _req$query2.limit;
            conditions = name && {
              name: name
            } || category && {
              category: category
            };
            sort = sort === "asc" ? {
              _id: 1
            } : {
              _id: -1
            };
            skip = skip && parseInt(skip);
            limit = limit && parseInt(limit);
            search({
              conditions: conditions,
              sort: sort,
              skip: skip,
              limit: limit,
              res: res
            });

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getProducts(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}(); // fn modular de busqueda


exports.getProducts = getProducts;

var search = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_ref5) {
    var _ref5$conditions, conditions, _ref5$sort, sort, _ref5$skip, skip, _ref5$limit, limit, res;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _ref5$conditions = _ref5.conditions, conditions = _ref5$conditions === void 0 ? {} : _ref5$conditions, _ref5$sort = _ref5.sort, sort = _ref5$sort === void 0 ? {} : _ref5$sort, _ref5$skip = _ref5.skip, skip = _ref5$skip === void 0 ? 0 : _ref5$skip, _ref5$limit = _ref5.limit, limit = _ref5$limit === void 0 ? 10 : _ref5$limit, res = _ref5.res;

            _Product["default"].find(conditions).sort(sort).skip(skip).limit(limit).exec(function (error, products) {
              resServer(res, error, products);
            });

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function search(_x9) {
    return _ref6.apply(this, arguments);
  };
}(); // fn para obtener productos por ID


var getProductById = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _Product["default"].findById(req.params.id, function (error, product) {
              resServer(res, error, product);
            });

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getProductById(_x10, _x11) {
    return _ref7.apply(this, arguments);
  };
}(); // fn para actualizar productos


exports.getProductById = getProductById;

var updateProductById = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _Product["default"].findByIdAndUpdate(req.params.id, req.body, {
              "new": true
            }, function (error, product) {
              resServer(res, error, product);
            });

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function updateProductById(_x12, _x13) {
    return _ref8.apply(this, arguments);
  };
}(); // fn para borrar productos


exports.updateProductById = updateProductById;

var deleteProductById = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _Product["default"].findByIdAndDelete(req.params.id, function (error, product) {
              if (error) return res.status(500).send({
                message: "500 internal server error."
              });
              if (!product) return res.status(404).send({
                message: "404 not found."
              });
              res.json(true);
            });

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function deleteProductById(_x14, _x15) {
    return _ref9.apply(this, arguments);
  };
}(); // delete data fake


exports.deleteProductById = deleteProductById;

var deleteDataFake = function deleteDataFake(req, res) {
  _Product["default"].deleteMany({
    dataFake: true
  }, function (error, products) {
    resServer(res, error, products);
  });
};
/*
    Esta función abstrae la respuesta del servidor
  */


exports.deleteDataFake = deleteDataFake;

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