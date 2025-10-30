import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { list, create, update, remove } from "../controllers/incidentController.js";

const router = express.Router();
router.use(verifyToken);

router.get("/", list);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
