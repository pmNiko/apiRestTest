import { Router } from "express";
import * as rolesCtrl from "../controllers/roles.controller";

const router = Router();

router.get("/", rolesCtrl.getRoles);

export default router;
