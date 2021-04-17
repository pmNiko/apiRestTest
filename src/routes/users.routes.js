import { Router } from "express";
import * as userCtrl from "../controllers/users.controller";
import { verifyToken, isAdmin, checkRoles, duplicate } from "../middlewares";
import * as schema from "../middlewares/validators/user";

const router = Router();

router.post(
  "/",
  [verifyToken, isAdmin, schema.create, duplicate, checkRoles],
  userCtrl.createUser
);

router.get("/", userCtrl.getUsers);

export default router;
