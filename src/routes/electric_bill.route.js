import express from "express";
import { destroy, index, show, store, update } from "../controllers/electricBill.controller.js";


const router = express.Router();

// Index
router.get("/index", index);
// Store
router.post("/store", store);
// Show
router.get("/show/:id", show);
// Update
router.put("/update/:id", update);
// Delete
router.delete("/destroy/:id", destroy);

export default router;