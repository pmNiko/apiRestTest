import { Router } from "express";
import * as productCtrl from "../controllers/products.controller";
import { verifyToken, isAdmin, isModerator } from "../middlewares";
import * as schema from "../middlewares/validators/product";

const router = Router();

// fn crear un producto protect
router.post(
  "/",
  [verifyToken, isAdmin, schema.create],
  productCtrl.createProduct
);

router.get("/page/:number?", productCtrl.getProductsPerPage);

// fn para obtener producto por ID
router.get("/:id", productCtrl.getProductById);

// fn para obtener los productos
router.get("/", productCtrl.getProducts);

// fn para actualizar productos protect
router.put(
  "/:id",
  [verifyToken, isAdmin, schema.update],
  productCtrl.updateProductById
);

// fn para borrar productos protect
router.delete("/:id", [verifyToken, isAdmin], productCtrl.deleteProductById);

export default router;
