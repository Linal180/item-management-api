// src/routes/items.ts
import express from "express";
import { getItems, addItem } from "../controllers/itemsController";
import { RequestHandler } from "express";

const router = express.Router();

router.get("/items", getItems as unknown as RequestHandler);
router.post("/items", addItem as unknown as RequestHandler);

export default router;
