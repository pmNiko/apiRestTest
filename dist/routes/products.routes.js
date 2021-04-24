"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var productCtrl = _interopRequireWildcard(require("../controllers/products.controller"));

var _middlewares = require("../middlewares");

var schema = _interopRequireWildcard(require("../middlewares/validators/product"));

var router = (0, _express.Router)(); // fn crear un producto protect

router.post("/", [_middlewares.verifyToken, _middlewares.isAdmin, schema.create], productCtrl.createProduct);
router.get("/data-fake", productCtrl.generateDataFake);
router.get("/page/:number?", productCtrl.getProductsPerPage); // fn para obtener producto por ID

router.get("/:id", productCtrl.getProductById); // fn para obtener los productos

router.get("/", productCtrl.getProducts); // fn para actualizar productos protect

router.put("/:id", [_middlewares.verifyToken, _middlewares.isAdmin, schema.update], productCtrl.updateProductById);
router["delete"]("/delete-data-fake", productCtrl.deleteDataFake); // fn para borrar productos protect

router["delete"]("/:id", [_middlewares.verifyToken, _middlewares.isAdmin], productCtrl.deleteProductById);
var _default = router;
exports["default"] = _default;