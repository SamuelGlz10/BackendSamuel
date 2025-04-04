import { Router } from "express";
import {
    getItems,
    getItem,
    postItem,
    putItem,
    deleteItem
} from "../controllers/itemsFB.controllers.js";

const router = Router();

router.get("/itemsFB/", getItems);
router.get("/itemsFB/:id", getItem);

router.post("/itemsFB/", postItem);

router.put("/itemsFB/:id", putItem);

router.delete("/itemsFB/:id", deleteItem);

export default router;
