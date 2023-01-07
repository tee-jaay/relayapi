import express from "express";
import { deactivate, password_rest_request, signIn, signUp } from "../controllers/auth.controller.js";


const router = express.Router();

// Sign up
router.post("/sign-up", signUp);
// Sign in
router.post("/sign-in", signIn);
// Email check
router.post("/password-reset-request/:email", password_rest_request);
// Deactivate
router.delete("/destroy/:id", deactivate);

export default router;