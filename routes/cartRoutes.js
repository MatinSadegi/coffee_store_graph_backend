import express from "express";
// import { isAdmin, protect, checkUser } from "../middlewares/authMiddleware.js";
import {
  addToCart,
  getCart
} from "../controller/cartController.js";
const router = express.Router();

router.get("/", getCart);
router.post("/add-to-cart",addToCart);
// router.post("/remove",checkUser, removeFromCart);

export default router;
 