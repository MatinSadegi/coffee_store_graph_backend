import express from "express";
import {
  createProduct,
  // deleteProduct,
  getProduct,
  getProducts,
} from "../controller/productController.js";
const router = express.Router();

router.post("/", createProduct);
router.get("/",getProducts);
router.get("/:slug", getProduct);
// router.delete("/:id", deleteProduct);

export default router;
