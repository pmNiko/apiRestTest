import { Router } from "express";
import * as authCtrl from "../controllers/auth.controller";
import { checkRoles, duplicate } from "../middlewares/verify";
import * as schema from "../middlewares/validators/auth";

const router = Router();

router.post("/signup", [schema.signup, duplicate, checkRoles], authCtrl.signup);
router.post("/signin", schema.signin, authCtrl.signin);

export default router;
